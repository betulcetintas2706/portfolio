import { useEffect, useRef, useState } from 'react';

// Gold Miner, rebuilt in the browser from Betül and Sehreen's ECE241 project
// (Verilog on the DE1-SoC). It follows the project slides:
//   Control FSM   S_background -ENTER-> S_draw_bg -> S_draw_objects -> S_move_hook
//                 -down-> S_release -> S_pull_back -> S_update_score -> S_check_score
//                 -> S_move_hook | S_success | S_fail_page
//   Move hook     the hook slides left and right (we simplified the original
//                 angle swing to left-right movement); speed set by the level
//   Release       drops straight down drawing the rope, stops on an object or the bottom
//   Pull back     speed depends on what was caught (nothing, medium, large)
//   Score         +200 large gold, +50 medium gold, -20 large rock, -10 medium rock,
//                 3-digit BCD
//   Timer         45 seconds on the HEX display; time_done ends the round
// Screen is 320x240 like the VGA output, with the colours we saw on the board.

const W = 320;
const H = 240;
const HOOK_Y = 44;
const GOAL = 200;
const LEVEL_TIME = 45;
const HOOK_SPEED = [0, 55, 85, 120];   // px/s for levels 1..3
const DROP_SPEED = 110;
const PULL_SPEED = { none: 160, GM: 75, RM: 75, GL: 32, RL: 32 };
const VALUE = { GL: 200, GM: 50, RL: -20, RM: -10 };
const SIZE = { GL: 10, GM: 6, RL: 10, RM: 7 };
const TYPE_NAME = { GL: 'large gold', GM: 'medium gold', RL: 'large rock', RM: 'medium rock' };

// object RAM: the layout from our board demo (centre x, centre y, type)
const OBJECTS = [
  [187, 66, 'RM'], [106, 91, 'RL'], [102, 135, 'GM'], [262, 133, 'GM'], [103, 160, 'RM'],
  [226, 158, 'RL'], [300, 159, 'GL'], [183, 180, 'GM'], [105, 186, 'RL'], [296, 200, 'RM'], [221, 222, 'GM'],
];

export const GOLD_SPEC = {
  name: 'GoldMiner',
  view: '380 272',
  stepHint: 'Advance the game by 0.1 seconds',
  states: [
    { id: 'S_BACKGROUND', label: 'BACKGROUND', x: 95, y: 16 },
    { id: 'S_DRAW_BG', label: 'DRAW_BG', x: 95, y: 56 },
    { id: 'S_DRAW_OBJECTS', label: 'DRAW_OBJECTS', x: 95, y: 96 },
    { id: 'S_MOVE_HOOK', label: 'MOVE_HOOK', x: 95, y: 140 },
    { id: 'S_RELEASE', label: 'RELEASE', x: 285, y: 140 },
    { id: 'S_PULL_BACK', label: 'PULL_BACK', x: 285, y: 182 },
    { id: 'S_UPDATE_SCORE', label: 'UPDATE_SCORE', x: 285, y: 224 },
    { id: 'S_CHECK_SCORE', label: 'CHECK_SCORE', x: 95, y: 224 },
    { id: 'S_SUCCESS', label: 'SUCCESS', x: 45, y: 260 },
    { id: 'S_FAIL', label: 'FAIL_PAGE', x: 165, y: 260 },
  ],
  edges: [
    { from: 'S_BACKGROUND', to: 'S_DRAW_BG', label: 'ENTER', lx: 118, ly: 40 },
    { from: 'S_DRAW_BG', to: 'S_DRAW_OBJECTS', label: '_done', lx: 116, ly: 80 },
    { from: 'S_DRAW_OBJECTS', to: 'S_MOVE_HOOK', label: '_done', lx: 116, ly: 122 },
    { from: 'S_MOVE_HOOK', to: 'S_RELEASE', label: 'go_down' },
    { from: 'S_RELEASE', to: 'S_PULL_BACK', label: 'hit / bottom', lx: 334, ly: 165 },
    { from: 'S_PULL_BACK', to: 'S_UPDATE_SCORE', label: 'at top', lx: 314, ly: 207 },
    { from: 'S_UPDATE_SCORE', to: 'S_CHECK_SCORE', label: '_done' },
    { from: 'S_CHECK_SCORE', to: 'S_MOVE_HOOK', label: 'keep going', lx: 128, ly: 186 },
    { from: 'S_CHECK_SCORE', to: 'S_SUCCESS', d: 'M80,237 L58,247', label: 'goal met', lx: 40, ly: 240 },
    { from: 'S_CHECK_SCORE', to: 'S_FAIL', d: 'M110,237 L150,247', label: 'time_done', lx: 152, ly: 240 },
    { from: 'S_MOVE_HOOK', to: 'S_CHECK_SCORE', d: 'M58,152 C30,175 30,205 58,218', label: 'time_done', lx: 26, ly: 184 },
  ],
  captions: [{ x: 300, y: 262, text: 'ENTER → next level / restart' }],
  note: 'The original is Verilog on a DE1-SoC: a control FSM with move hook, release, pull back and score update sub-FSMs, object RAMs, a 45 second HEX timer, PS/2 or KEY input and win/fail audio. This browser version follows the same states and rules.',
  board: null,
};

function playTune(ac, notes) {
  let t = ac.currentTime;
  notes.forEach(([freq, dur]) => {
    const o = ac.createOscillator(); const g = ac.createGain();
    o.type = 'square'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.05, t); g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
    t += dur;
  });
}

// 7-segment patterns for the HEX display (a b c d e f g)
const SEG = ['1111110', '0110000', '1101101', '1111001', '0110011', '1011011', '1011111', '1110000', '1111111', '1111011'];
function Hex({ d }) {
  const s = SEG[d] || '0000000';
  return (
    <svg viewBox="0 0 20 34" className="gm-hex-digit" aria-hidden="true">
      {[['M4,2 H16', 0], ['M17,4 V16', 1], ['M17,18 V30', 2], ['M4,32 H16', 3], ['M3,18 V30', 4], ['M3,4 V16', 5], ['M4,17 H16', 6]].map(([p, i]) => (
        <path key={i} d={p} className={s[i] === '1' ? 'on' : ''} />
      ))}
    </svg>
  );
}

export default function GoldMiner({ probe, ctl, active = true }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [timeShown, setTimeShown] = useState(LEVEL_TIME);
  const mutedRef = useRef(false); mutedRef.current = muted;
  const activeRef = useRef(active); activeRef.current = active;

  const g = useRef({
    state: 'S_BACKGROUND', startPage: 'title', t: 0, level: 1, money: 0, time: LEVEL_TIME, objs: [],
    hookX: 160, dir: 1, ropeY: HOOK_Y, caught: null, reached: null, reachBottom: false,
    history: [], edge: null, keyT: {}, hitT: 0, doneT: 0, drawT: 0,
  });

  const sfx = (notes) => {
    if (mutedRef.current) return;
    try {
      if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      audioRef.current.resume(); playTune(audioRef.current, notes);
    } catch { /* no audio */ }
  };

  const go = (to) => {
    const s = g.current;
    s.history = [...s.history, [s.state, to]].slice(-8);
    s.edge = `${s.state}>${to}`;
    s.state = to;
  };

  const startRound = () => {
    const s = g.current;
    go('S_DRAW_BG');
    s.drawT = 0.25; // drawing the background and objects takes a moment on screen
    s.objs = OBJECTS.map(([x, y, type], i) => ({ id: i, x, y, type, r: SIZE[type] }));
    s.money = 0; s.time = LEVEL_TIME; s.hookX = 160; s.dir = 1; s.ropeY = HOOK_Y; s.caught = null; s.reached = null;
  };

  const press = (k) => {
    const s = g.current;
    s.keyT[k] = performance.now();
    if (k === 'enter') {
      if (s.state === 'S_BACKGROUND' && s.startPage === 'title') { s.startPage = 'enter'; sfx([[520, 0.06]]); }
      else if (s.state === 'S_BACKGROUND') { startRound(); sfx([[660, 0.08]]); }
      else if (s.state === 'S_SUCCESS') { s.level = s.level === 3 ? 1 : s.level + 1; startRound(); sfx([[660, 0.08]]); }
      else if (s.state === 'S_FAIL') { go('S_BACKGROUND'); s.startPage = 'title'; s.level = 1; }
    } else if (k === 'down' && s.state === 'S_MOVE_HOOK') {
      go('S_RELEASE'); s.ropeY = HOOK_Y; s.reachBottom = false;
    }
  };
  const pressRef = useRef(press); pressRef.current = press;

  useEffect(() => {
    const key = (e) => {
      if (!activeRef.current || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea/i.test(document.activeElement?.tagName || '')) return;
      if (e.key === 'Enter') { e.preventDefault(); pressRef.current('enter'); }
      else if (g.current.state === 'S_BACKGROUND' && g.current.startPage === 'title' && e.key.length === 1) { e.preventDefault(); pressRef.current('enter'); }
      else if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 's' || e.key === 'S') { e.preventDefault(); pressRef.current('down'); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const tap = () => {
    const s = g.current.state;
    pressRef.current(s === 'S_MOVE_HOOK' ? 'down' : 'enter');
  };

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // background RAM: sky, clouds, grass and the dirt (crimson, like our board's colours)
    const bg = document.createElement('canvas'); bg.width = W; bg.height = H;
    const b = bg.getContext('2d');
    b.fillStyle = '#7fd0f7'; b.fillRect(0, 0, W, 50);
    let seed = 7;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    [[30, 14, 46], [120, 8, 40], [205, 18, 52], [265, 6, 38]].forEach(([x, y, w]) => {
      for (let i = 0; i < 70; i += 1) {
        const px = x + Math.floor(rnd() * w); const py = y + Math.floor(rnd() * 12 * (1 - Math.abs(px - x - w / 2) / w));
        b.fillStyle = rnd() > 0.4 ? '#eaf6ff' : '#c4e6fa'; b.fillRect(px, py, 3, 2);
      }
    });
    b.fillStyle = '#21c44a'; b.fillRect(0, 50, W, 7);
    for (let x = 0; x < W; x += 4) { b.fillStyle = rnd() > 0.5 ? '#178a35' : '#2fe05a'; b.fillRect(x, 50 + Math.floor(rnd() * 5), 4, 2); }
    const grad = b.createLinearGradient(0, 57, 0, H); grad.addColorStop(0, '#9e2045'); grad.addColorStop(1, '#b9285a');
    b.fillStyle = grad; b.fillRect(0, 57, W, H - 57);

    const blob = (o, x, y) => {
      const gold = o.type[0] === 'G';
      const r = o.r;
      for (let dy = -r; dy <= r; dy += 2) for (let dx = -r; dx <= r; dx += 2) {
        const d = (dx * dx) / (r * r) + (dy * dy * 1.3) / (r * r);
        if (d > 1) continue;
        let c;
        if (gold) c = dy < -r * 0.3 ? '#f1e45a' : d > 0.6 ? '#7ccf4a' : (dx + dy) % 4 === 0 ? '#e8a640' : '#e9df50';
        else c = dy < -r * 0.3 ? '#78a8f0' : d > 0.7 ? '#3d66c6' : '#5b8ae0';
        ctx.fillStyle = c; ctx.fillRect(Math.round(x + dx), Math.round(y + dy), 2, 2);
      }
    };

    // our miner (a cat in a hard hat) standing on the grass
    const drawMiner = (ox = 168, oy = 22, k = 1) => {
      ctx.save(); ctx.translate(ox, oy); ctx.scale(k, k);
      const x = 0; const y = 0;
      ctx.fillStyle = '#e2c069'; ctx.fillRect(x + 2, y, 16, 5); ctx.fillRect(x + 7, y - 3, 6, 3);
      ctx.fillStyle = '#fff3a8'; ctx.fillRect(x + 8, y - 2, 4, 2);
      ctx.fillStyle = '#4a4a4a'; ctx.fillRect(x + 2, y + 5, 16, 11); ctx.fillRect(x + 2, y + 2, 3, 3); ctx.fillRect(x + 15, y + 2, 3, 3);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 6, y + 10, 8, 6);
      ctx.fillStyle = '#e2c069'; ctx.fillRect(x + 5, y + 8, 3, 2); ctx.fillRect(x + 12, y + 8, 3, 2);
      ctx.fillStyle = '#f2a5c4'; ctx.fillRect(x + 9, y + 12, 2, 1);
      ctx.fillStyle = '#8b2942'; ctx.fillRect(x + 4, y + 16, 12, 2);
      ctx.fillStyle = '#4a4a4a'; ctx.fillRect(x + 4, y + 18, 12, 9); ctx.fillRect(x + 4, y + 27, 4, 3); ctx.fillRect(x + 12, y + 27, 4, 3);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 7, y + 19, 6, 6);
      ctx.restore();
    };

    // start screen 1: title badge on sand, like our board's first page
    const titlePage = (t) => {
      ctx.fillStyle = '#f0cf78'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(160,200,120,0.35)';
      for (let i = 0; i < 160; i += 1) { const px = (i * 97) % W; const py = (i * 53) % H; ctx.fillRect(px, py, 2, 1); }
      // stepped pixel badge
      const cx = 92; const cy = 112; const r = 66;
      for (let y = -r; y <= r; y += 3) for (let x = -r; x <= r; x += 3) {
        const d = Math.hypot(x * 0.95, y * 1.05);
        if (d > r) continue;
        const edge = d > r - 5;
        ctx.fillStyle = edge ? '#5f7a3a' : (x + y < -20 ? '#cdeea0' : '#f4d690');
        ctx.fillRect(cx + x, cy + y, 3, 3);
      }
      // sparkle
      const tw = 0.6 + Math.sin(t * 4) * 0.4;
      ctx.fillStyle = `rgba(170,215,255,${tw})`;
      ctx.fillRect(cx - 1, cy - 70, 3, 26); ctx.fillRect(cx - 12, cy - 58, 25, 3);
      ctx.fillStyle = '#5d9ad8'; ctx.fillRect(cx - 4, cy - 61, 9, 9);
      ctx.font = 'bold 30px VT323, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d9a63a'; ctx.fillText('GOLD', cx + 2, cy - 12); ctx.fillText('MINER', cx + 2, cy + 18);
      ctx.fillStyle = '#4e5a2c'; ctx.fillText('GOLD', cx, cy - 14); ctx.fillText('MINER', cx, cy + 16);
      // our miner, waving
      drawMiner(186, 58 + Math.sin(t * 3) * 2, 4.2);
      ctx.font = '14px VT323, monospace'; ctx.fillStyle = Math.floor(t * 2) % 2 ? '#7a4a2a' : 'rgba(122,74,42,0.35)';
      ctx.fillText('press any key', cx, H - 22);
    };
    // start screen 2: ENTER TO BEGIN on blue
    const enterPage = (t) => {
      const gr = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, 220);
      gr.addColorStop(0, '#3d63b8'); gr.addColorStop(1, '#1f3a7a');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
      ctx.font = 'bold 34px VT323, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const glow = 0.75 + Math.sin(t * 5) * 0.25;
      ctx.fillStyle = 'rgba(120,220,255,0.6)'; ctx.fillText('ENTER', W / 2 + 1, H / 2 - 32); ctx.fillText('BEGIN', W / 2 + 1, H / 2 + 34);
      ctx.fillStyle = `rgba(255,255,255,${glow})`; ctx.fillText('ENTER', W / 2, H / 2 - 33); ctx.fillText('BEGIN', W / 2, H / 2 + 33);
      ctx.fillStyle = 'rgba(200,200,210,0.55)'; ctx.fillText('TO', W / 2, H / 2);
    };
    const drawHook = (x, y) => {
      ctx.fillStyle = '#d9d9d9'; ctx.fillRect(x - 5, y, 10, 3);
      ctx.fillRect(x - 6, y + 2, 3, 6); ctx.fillRect(x + 3, y + 2, 3, 6);
      ctx.fillStyle = '#c0392b'; ctx.fillRect(x - 2, y - 3, 4, 3);
    };
    const text = (s, x, y, size, color, align = 'left') => {
      ctx.font = `${size}px VT323, monospace`; ctx.textAlign = align; ctx.textBaseline = 'middle';
      ctx.fillStyle = color; ctx.fillText(s, x, y);
    };
    const page = (title, lines, tone) => {
      ctx.drawImage(bg, 0, 0);
      ctx.fillStyle = 'rgba(30,6,14,0.82)'; ctx.fillRect(36, 70, W - 72, 128);
      ctx.strokeStyle = tone; ctx.lineWidth = 2; ctx.strokeRect(37, 71, W - 74, 126);
      text(title, W / 2, 96, 30, tone, 'center');
      lines.forEach((l, i) => text(l, W / 2, 128 + i * 18, 14, '#fdf6f0', 'center'));
    };

    let raf; let last = performance.now();
    const loop = (now) => {
      const real = Math.min(0.05, (now - last) / 1000); last = now;
      const c = ctl?.current || {};
      let dt = real;
      if (c.paused) { if (c.step) { c.step -= 1; dt = 0.1; } else dt = 0; } else if (c.slow) dt = real * 0.25;
      const s = g.current;
      const playing = ['S_MOVE_HOOK', 'S_RELEASE', 'S_PULL_BACK', 'S_UPDATE_SCORE'].includes(s.state);

      if (dt > 0) {
        if (s.state === 'S_DRAW_BG' || s.state === 'S_DRAW_OBJECTS') {
          s.drawT -= dt;
          if (s.drawT <= 0) {
            s.doneT = now;
            if (s.state === 'S_DRAW_BG') { go('S_DRAW_OBJECTS'); s.drawT = 0.25; } else go('S_MOVE_HOOK');
          }
        }
        if (playing) {
          s.time = Math.max(0, s.time - dt);
          if (s.time === 0 && s.state === 'S_MOVE_HOOK') { go('S_CHECK_SCORE'); }
        }
        if (s.state === 'S_MOVE_HOOK') {
          s.hookX += s.dir * HOOK_SPEED[s.level] * dt;
          if (s.hookX > W - 10) { s.hookX = W - 10; s.dir = -1; }
          if (s.hookX < 10) { s.hookX = 10; s.dir = 1; }
        } else if (s.state === 'S_RELEASE') {
          s.ropeY += DROP_SPEED * dt;
          const tip = s.ropeY + 8;
          const hit = s.objs.find((o) => Math.abs(o.x - s.hookX) <= o.r + 2 && Math.abs(o.y - tip) <= o.r);
          if (hit) {
            s.caught = hit; s.reached = hit.type; s.objs = s.objs.filter((o) => o !== hit); s.hitT = now;
            go('S_PULL_BACK'); sfx([[hit.type[0] === 'G' ? 520 : 180, 0.06]]);
          } else if (tip >= H - 2) { s.reachBottom = true; s.reached = null; go('S_PULL_BACK'); }
        } else if (s.state === 'S_PULL_BACK') {
          s.ropeY -= PULL_SPEED[s.caught ? s.caught.type : 'none'] * dt;
          if (s.caught) { s.caught.x = s.hookX; s.caught.y = s.ropeY + 10 + s.caught.r; }
          if (s.ropeY <= HOOK_Y) { s.ropeY = HOOK_Y; go('S_UPDATE_SCORE'); }
        } else if (s.state === 'S_UPDATE_SCORE') {
          if (s.caught) { s.money = Math.max(0, Math.min(999, s.money + VALUE[s.caught.type])); if (VALUE[s.caught.type] > 0) sfx([[880, 0.07], [1175, 0.09]]); }
          s.caught = null;
          go('S_CHECK_SCORE');
        } else if (s.state === 'S_CHECK_SCORE') {
          if (s.money >= GOAL) { go('S_SUCCESS'); sfx([[523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.3]]); }
          else if (s.time <= 0) { go('S_FAIL'); sfx([[392, 0.18], [330, 0.18], [262, 0.4]]); }
          else go('S_MOVE_HOOK');
        }
      }

      // draw
      s.t += real;
      if (s.state === 'S_BACKGROUND') {
        if (s.startPage === 'title') titlePage(s.t); else enterPage(s.t);
      } else if (s.state === 'S_SUCCESS') {
        page('YOU WIN!', [`MONEY $${s.money}`, s.level < 3 ? `ENTER for level ${s.level + 1}` : 'all 3 levels done!', s.level < 3 ? 'the hook gets faster' : 'ENTER to play again'], '#9be37a');
      } else if (s.state === 'S_FAIL') {
        page("TIME'S UP", [`MONEY $${s.money} / GOAL $${GOAL}`, 'press ENTER to try again'], '#ff8fa3');
      } else {
        ctx.drawImage(bg, 0, 0);
        const shown = s.state === 'S_DRAW_BG' ? [] : s.objs;
        shown.forEach((o) => blob(o, o.x, o.y));
        drawMiner();
        if (s.state !== 'S_DRAW_BG' && s.state !== 'S_DRAW_OBJECTS') {
          if (s.ropeY > HOOK_Y) { ctx.fillStyle = '#111'; ctx.fillRect(Math.round(s.hookX), HOOK_Y, 1, Math.round(s.ropeY - HOOK_Y)); }
          drawHook(Math.round(s.hookX), Math.round(s.ropeY));
          if (s.caught) blob(s.caught, s.caught.x, s.caught.y);
        }
        text('MONEY $', 6, 10, 14, '#111'); text(String(s.money), 76, 10, 14, '#e0242f');
        text('GOAL  $', 6, 26, 14, '#111'); text(String(GOAL), 76, 26, 14, '#e0242f');
        text('LEVEL', W - 20, 30, 14, '#111', 'right'); text(String(s.level), W - 8, 30, 14, '#e0242f', 'right');
      }

      const shownTime = Math.ceil(s.time);
      setTimeShown((t) => (t === shownTime ? t : shownTime));

      if (probe) {
        const lit = (t) => now - (t || 0) < 220;
        probe.current = {
          state: s.state,
          edge: s.edge,
          history: s.history,
          inputs: [
            { id: 'enter', kind: 'key', label: 'Enter', on: lit(s.keyT.enter), title: 'go_enter' },
            { id: 'down', kind: 'key', label: '↓ Down', on: lit(s.keyT.down), title: 'go_down' },
            { id: 'done', kind: 'sig', label: '_done', on: lit(s.doneT), title: 'a drawing module finished' },
            { id: 'touch', kind: 'sig', label: 'check_for_touch', on: lit(s.hitT), title: 'hook tip found an object in ram_type' },
            { id: 'bottom', kind: 'sig', label: 'reach_bottom', on: s.state === 'S_PULL_BACK' && s.reachBottom, title: 'rope hit the bottom' },
            { id: 'td', kind: 'sig', label: 'time_done', on: s.time <= 0 && s.state !== 'S_BACKGROUND', title: '45 s timer finished' },
          ],
          regs: [
            { name: 'money (BCD)', value: String(s.money).padStart(3, '0') },
            { name: 'goal', value: GOAL },
            { name: 'timer', value: `${Math.floor(shownTime / 10)}${shownTime % 10}` },
            { name: 'levels[1:0]', value: s.level.toString(2).padStart(2, '0') },
            { name: 'hook_x', value: Math.round(s.hookX) },
            { name: 'hook_y', value: Math.round(s.ropeY) },
            { name: 'type_reached', value: s.reached ? `${s.reached} · ${TYPE_NAME[s.reached]}` : 'none', wide: true },
            { name: 'pull_back speed', value: `${PULL_SPEED[s.caught ? s.caught.type : 'none']} px/s` },
            { name: 'objects in RAM', value: s.objs.length },
          ],
        };
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="gm">
      <canvas ref={canvasRef} width={W} height={H} className="gm-canvas" onPointerDown={tap} />
      <div className="gm-board">
        <div className="gm-hex" aria-label={`Timer ${timeShown} seconds`}>
          <Hex d={Math.floor(timeShown / 10)} /><Hex d={timeShown % 10} />
        </div>
        <div className="gm-bar">
          <span>Enter to start · ↓ / Space / tap drops the hook</span>
          <button onClick={() => setMuted((m) => !m)}>{muted ? 'Sound off' : 'Sound on'}</button>
        </div>
      </div>
      <div className="gm-note">Large gold +200 · medium gold +50 · large rock −20 · medium rock −10. Built in Verilog on a DE1-SoC with Sehreen Basara.</div>
    </div>
  );
}
