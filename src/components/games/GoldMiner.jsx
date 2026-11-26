import { useEffect, useRef, useState } from 'react';

// Browser version of the Gold Miner game Betül and Sehreen built in Verilog
// on the DE1-SoC. Same idea: a swinging hook, gold adds points, rocks take
// points away, 45 seconds per level and a score goal. Drawn at 320x240 like
// the original VGA output, then scaled up.

const W = 320;
const H = 240;
const ORIGIN = { x: 160, y: 40 };
const LEVEL_TIME = 45;

const KINDS = {
  gold: { r: 7, value: 50, pull: 2.6, color: '#f5c542', ore: '#8d8d8d' },
  bigGold: { r: 14, value: 250, pull: 0.9, color: '#f5c542', ore: '#7a7a7a' },
  diamond: { r: 6, value: 400, pull: 3.4, color: '#5ee0e6', ore: '#6f6f6f' },
  rock: { r: 11, value: -30, pull: 0.7, color: null, ore: '#6b6b6b' },
};

// 16-bit LFSR, like the hardware version used for random placement.
function makeLfsr(seed) {
  let s = seed & 0xffff || 0xace1;
  const next = () => {
    const bit = ((s >> 0) ^ (s >> 2) ^ (s >> 3) ^ (s >> 5)) & 1;
    s = (s >> 1) | (bit << 15);
    return s / 0xffff;
  };
  next.reg = () => s;
  return next;
}

function makeLevel(level) {
  const rnd = makeLfsr(Date.now() + level * 7919);
  const counts = {
    gold: 5 + level,
    bigGold: 2 + Math.floor(level / 2),
    diamond: level >= 2 ? Math.min(level - 1, 3) : 0,
    rock: 3 + level * 2,
  };
  const objs = [];
  Object.entries(counts).forEach(([kind, n]) => {
    for (let i = 0; i < n; i += 1) {
      const k = KINDS[kind];
      for (let tries = 0; tries < 40; tries += 1) {
        const x = 14 + rnd() * (W - 28);
        const y = 78 + rnd() * (H - 92);
        if (objs.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + k.r + 4)) {
          objs.push({ kind, x, y, r: k.r });
          break;
        }
      }
    }
  });
  return {
    lfsr: rnd.reg(),
    level,
    goal: 300 + (level - 1) * 350,
    time: LEVEL_TIME,
    objs,
    swingSpeed: 1.6 + level * 0.25,
  };
}

function beep(ctxRef, freq, dur = 0.12, type = 'square', vol = 0.05) {
  try {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ac = ctxRef.current;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + dur);
  } catch { /* no audio */ }
}

function tune(ctxRef, notes) {
  notes.forEach(([f, d], i) => setTimeout(() => beep(ctxRef, f, d, 'square', 0.05), i * 130));
}

// State diagram for the inspector. This is the browser version's state
// machine; the FPGA build has a 31-state control FSM with sub-FSMs.
export const GOLD_SPEC = {
  name: 'GoldMiner',
  view: '360 252',
  stepHint: 'Advance the game by 0.1 seconds',
  groups: [{ x: 8, y: 40, w: 252, h: 206, label: 'PLAY · 45 s timer' }],
  states: [
    { id: 'IDLE', label: 'IDLE', x: 70, y: 16 },
    { id: 'SWING', label: 'SWING', x: 70, y: 76 },
    { id: 'EXTEND', label: 'EXTEND', x: 196, y: 76 },
    { id: 'RETRACT', label: 'RETRACT', x: 70, y: 150 },
    { id: 'REEL', label: 'REEL IN', x: 196, y: 150 },
    { id: 'SCORE', label: 'ADD SCORE', x: 196, y: 220 },
    { id: 'WIN', label: 'LEVEL CLEAR', x: 314, y: 100 },
    { id: 'GAME_OVER', label: 'GAME OVER', x: 314, y: 196 },
  ],
  edges: [
    { from: 'IDLE', to: 'SWING', label: 'start', lx: 94, ly: 39 },
    { from: 'SWING', to: 'EXTEND', label: 'drop' },
    { from: 'EXTEND', to: 'REEL', label: 'hit', lx: 212, ly: 116 },
    { from: 'EXTEND', to: 'RETRACT', label: 'miss', lx: 140, ly: 110 },
    { from: 'RETRACT', to: 'SWING', label: 'at top', lx: 96, ly: 116 },
    { from: 'REEL', to: 'SCORE', label: 'at top', lx: 222, ly: 188 },
    { from: 'SCORE', to: 'SWING', d: 'M159,220 C40,236 10,120 33,82', label: '+value', lx: 54, ly: 214 },
    { from: 'PLAY', to: 'WIN', d: 'M260,122 L278,108' },
    { from: 'PLAY', to: 'GAME_OVER', d: 'M260,170 L278,186' },
  ],
  captions: [{ x: 314, y: 74, text: 't=0, score ≥ goal' }, { x: 314, y: 126, text: '↺ next level' }, { x: 314, y: 170, text: 't=0, score < goal' }, { x: 314, y: 222, text: '↺ retry' }],
  note: 'This panel shows the browser recreation. The original runs in Verilog on a DE1-SoC FPGA with a 31-state control FSM, five RAM modules, a HEX timer and PS/2 keyboard input.',
  board: null,
};

const STATE_OF = (s) => {
  if (s.screen === 'title') return 'IDLE';
  if (s.screen === 'win') return 'WIN';
  if (s.screen === 'over') return 'GAME_OVER';
  if (s.scoreT > 0) return 'SCORE';
  if (s.hook === 'swing') return 'SWING';
  if (s.hook === 'extend') return 'EXTEND';
  return s.caught ? 'REEL' : 'RETRACT';
};

export default function GoldMiner({ probe, ctl }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  mutedRef.current = muted;
  const g = useRef({
    screen: 'title', // title | play | win | over
    lvl: null, score: 0, angle: 0, t: 0,
    hook: 'swing', len: 18, caught: null, flash: null, best: 0, scoreT: 0,
    keyT: 0, enterT: 0, tapT: 0, hitT: 0, topT: 0, st: 'IDLE', edge: null,
  });

  const sfx = (f, d, type) => { if (!mutedRef.current) beep(audioRef, f, d, type); };
  const song = (n) => { if (!mutedRef.current) tune(audioRef, n); };

  const startLevel = (level, keepScore) => {
    const s = g.current;
    s.lvl = makeLevel(level);
    if (!keepScore) s.score = 0;
    s.screen = 'play'; s.hook = 'swing'; s.len = 18; s.caught = null; s.t = 0;
  };

  const press = (src = 'key') => {
    const s = g.current;
    const now = performance.now();
    if (src === 'enter') s.enterT = now; else if (src === 'tap') s.tapT = now; else s.keyT = now;
    if (s.screen === 'title' || s.screen === 'over') { startLevel(1, false); sfx(660, 0.08); return; }
    if (s.screen === 'win') { startLevel(s.lvl.level + 1, true); sfx(660, 0.08); return; }
    if (s.screen === 'play' && s.hook === 'swing') { s.hook = 'extend'; sfx(220, 0.05); }
  };

  useEffect(() => {
    const key = (e) => {
      if (/input|textarea/i.test(document.activeElement?.tagName || '')) return;
      if (['ArrowDown', ' ', 'Enter', 's', 'S'].includes(e.key)) { e.preventDefault(); press(e.key === 'Enter' ? 'enter' : 'key'); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  });

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Pre-render the dirt background once.
    const bg = document.createElement('canvas');
    bg.width = W; bg.height = H;
    const b = bg.getContext('2d');
    b.fillStyle = '#f6d7e2'; b.fillRect(0, 0, W, 50);
    for (let i = 0; i < 6; i += 1) { b.fillStyle = 'rgba(255,255,255,0.7)'; b.fillRect(20 + i * 55, 8 + (i % 2) * 6, 22, 6); b.fillRect(24 + i * 55, 4 + (i % 2) * 6, 12, 4); }
    b.fillStyle = '#5c8a3a'; b.fillRect(0, 50, W, 6);
    b.fillStyle = '#4a7230'; for (let x = 0; x < W; x += 4) if ((x / 4) % 3 === 0) b.fillRect(x, 56, 4, 3);
    b.fillStyle = '#7a4a2a'; b.fillRect(0, 56, W, H - 56);
    let seed = 1234;
    const r = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
    for (let i = 0; i < 900; i += 1) {
      b.fillStyle = r() > 0.5 ? '#6a3f22' : '#8a5a34';
      b.fillRect(Math.floor(r() * W / 4) * 4, 59 + Math.floor(r() * (H - 59) / 4) * 4, 4, 4);
    }

    const drawBlock = (o) => {
      const k = KINDS[o.kind];
      const s = o.r * 2; const x = Math.round(o.x - o.r); const y = Math.round(o.y - o.r);
      ctx.fillStyle = k.ore; ctx.fillRect(x, y, s, s);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x, y + s - 2, s, 2); ctx.fillRect(x + s - 2, y, 2, s);
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(x, y, s, 2);
      if (k.color) {
        const step = Math.max(3, Math.floor(s / 4));
        ctx.fillStyle = k.color;
        for (let i = 0; i < 4; i += 1) for (let j = 0; j < 4; j += 1) {
          if ((i * 3 + j * 5 + o.kind.length) % 3 === 0) ctx.fillRect(x + 1 + i * step, y + 1 + j * step, Math.max(2, step - 1), Math.max(2, step - 1));
        }
      } else {
        ctx.fillStyle = '#5a5a5a';
        for (let i = 0; i < s; i += 5) ctx.fillRect(x + ((i * 7) % s), y + i, 4, 3);
      }
    };

    const drawCat = () => {
      const x = ORIGIN.x - 10; const y = ORIGIN.y - 24;
      ctx.fillStyle = '#e2c069'; ctx.fillRect(x + 2, y, 16, 5); ctx.fillRect(x + 7, y - 3, 6, 3); // helmet
      ctx.fillStyle = '#fff3a8'; ctx.fillRect(x + 8, y - 2, 4, 2); // lamp
      ctx.fillStyle = '#4a4a4a'; ctx.fillRect(x + 2, y + 5, 16, 11); // head
      ctx.fillRect(x + 2, y + 2, 3, 3); ctx.fillRect(x + 15, y + 2, 3, 3); // ears
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 6, y + 10, 8, 6);
      ctx.fillStyle = '#e2c069'; ctx.fillRect(x + 5, y + 8, 3, 2); ctx.fillRect(x + 12, y + 8, 3, 2); // eyes
      ctx.fillStyle = '#f2a5c4'; ctx.fillRect(x + 9, y + 12, 2, 1);
      ctx.fillStyle = '#8b2942'; ctx.fillRect(x + 4, y + 16, 12, 2); // collar
      ctx.fillStyle = '#2f6fd6'; ctx.fillRect(x + 9, y + 18, 2, 2); // evil eye charm
    };

    const text = (s, x, y, size = 16, color = '#fff', align = 'center') => {
      ctx.font = `${size}px VT323, monospace`; ctx.textAlign = align; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillText(s, x + 1, y + 1);
      ctx.fillStyle = color; ctx.fillText(s, x, y);
    };

    let raf; let last = performance.now();
    const loop = (now) => {
      const real = Math.min(0.05, (now - last) / 1000); last = now;
      const c = ctl?.current || {};
      let dt = real;
      if (c.paused) {
        if (c.step) { c.step -= 1; dt = 0.1; } else dt = 0;
      } else if (c.slow) dt = real * 0.25;
      const s = g.current;
      s.t += dt;
      if (s.scoreT > 0) s.scoreT -= dt;

      if (s.screen === 'play' && dt > 0) {
        const L = s.lvl;
        L.time -= dt;
        if (s.hook === 'swing') {
          s.angle = Math.sin(s.t * L.swingSpeed) * 1.22;
        } else if (s.hook === 'extend') {
          s.len += 170 * dt;
          const tx = ORIGIN.x + Math.sin(s.angle) * s.len;
          const ty = ORIGIN.y + Math.cos(s.angle) * s.len;
          const hit = L.objs.find((o) => Math.abs(o.x - tx) < o.r + 2 && Math.abs(o.y - ty) < o.r + 2);
          if (hit) { s.hitT = performance.now(); s.caught = hit; L.objs = L.objs.filter((o) => o !== hit); s.hook = 'retract'; sfx(hit.kind === 'rock' ? 140 : 440, 0.06); }
          else if (tx < 0 || tx > W || ty > H) s.hook = 'retract';
        } else if (s.hook === 'retract') {
          const pull = s.caught ? KINDS[s.caught.kind].pull : 4;
          s.len -= 60 * pull * dt;
          if (s.caught) {
            s.caught.x = ORIGIN.x + Math.sin(s.angle) * (s.len + s.caught.r);
            s.caught.y = ORIGIN.y + Math.cos(s.angle) * (s.len + s.caught.r);
          }
          if (s.len <= 18) {
            s.len = 18; s.hook = 'swing'; s.topT = performance.now();
            if (s.caught) {
              s.scoreT = 0.45;
              const v = KINDS[s.caught.kind].value;
              s.score = Math.max(0, s.score + v);
              s.flash = { v, t: 1 };
              if (v > 0) song([[880, 0.07], [1175, 0.09]]); else sfx(110, 0.15, 'sawtooth');
              s.caught = null;
            }
          }
        }
        if (L.time <= 0) {
          L.time = 0;
          if (s.score >= L.goal) { s.screen = 'win'; song([[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.2]]); }
          else { s.screen = 'over'; s.best = Math.max(s.best, s.score); song([[392, 0.15], [330, 0.15], [262, 0.3]]); }
        }
        if (s.flash) { s.flash.t -= dt; if (s.flash.t <= 0) s.flash = null; }
      }

      // report to the inspector
      if (probe) {
        const st = STATE_OF(s);
        if (st !== s.st) {
          s.edge = st === 'WIN' || st === 'GAME_OVER' ? `PLAY>${st}` : `${s.st}>${st}`;
          s.st = st;
        }
        const nowMs = performance.now();
        const lit = (t) => nowMs - t < 220;
        const L = s.lvl;
        probe.current = {
          state: st,
          edge: s.edge,
          inputs: [
            { id: 'down', kind: 'key', label: '↓ / Space', on: lit(s.keyT), title: 'drop the hook (PS/2 keyboard on the board)' },
            { id: 'enter', kind: 'key', label: 'Enter', on: lit(s.enterT), title: 'start or continue' },
            { id: 'tap', kind: 'key', label: 'Tap', on: lit(s.tapT), title: 'mouse or touch' },
            { id: 'hit', kind: 'sig', label: 'collide', on: lit(s.hitT), title: 'hook touched an object' },
            { id: 'top', kind: 'sig', label: 'at_top', on: lit(s.topT), title: 'hook back at the cart' },
            { id: 'tz', kind: 'sig', label: 't_zero', on: !!L && L.time <= 0, title: 'level timer reached zero' },
          ],
          regs: [
            { name: 'score', value: s.score },
            { name: 'goal', value: L ? L.goal : '-' },
            { name: 'timer', value: L ? `0:${String(Math.ceil(L.time)).padStart(2, '0')}` : '0:45' },
            { name: 'level', value: L ? L.level : '-' },
            { name: 'angle', value: `${Math.round((s.angle * 180) / Math.PI)}°` },
            { name: 'hook_len', value: Math.round(s.len) },
            { name: 'caught', value: s.caught ? s.caught.kind.replace('bigGold', 'big gold') : 'none' },
            { name: 'lfsr', value: L ? `0x${L.lfsr.toString(16).toUpperCase().padStart(4, '0')}` : '0xACE1' },
          ],
        };
      }

      // draw
      ctx.drawImage(bg, 0, 0);
      if (s.lvl) s.lvl.objs.forEach(drawBlock);

      if (s.screen === 'play') {
        const tx = ORIGIN.x + Math.sin(s.angle) * s.len;
        const ty = ORIGIN.y + Math.cos(s.angle) * s.len;
        ctx.strokeStyle = '#2b1a10'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ORIGIN.x, ORIGIN.y); ctx.lineTo(tx, ty); ctx.stroke();
        if (s.caught) drawBlock(s.caught);
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(-s.angle);
        ctx.fillStyle = '#cfcfcf'; ctx.fillRect(-5, 0, 10, 2); ctx.fillRect(-5, 0, 2, 6); ctx.fillRect(3, 0, 2, 6);
        ctx.restore();
      }
      drawCat();

      // HUD
      if (s.lvl) {
        text(`$${s.score}`, 8, 12, 16, '#fff3a8', 'left');
        text(`GOAL ${s.lvl.goal}`, 8, 28, 13, '#ffffff', 'left');
        text(`LV ${s.lvl.level}`, W - 8, 28, 13, '#ffffff', 'right');
        const tl = Math.ceil(s.lvl.time);
        text(`0:${String(tl).padStart(2, '0')}`, W - 8, 12, 16, tl <= 10 ? '#ff8fa3' : '#fff3a8', 'right');
      }
      if (s.flash) text(`${s.flash.v > 0 ? '+' : ''}${s.flash.v}`, ORIGIN.x + 30, ORIGIN.y - 10 - (1 - s.flash.t) * 12, 16, s.flash.v > 0 ? '#fff3a8' : '#ff8fa3');

      const panel = (lines) => {
        ctx.fillStyle = 'rgba(30,6,14,0.78)'; ctx.fillRect(40, 70, W - 80, 120);
        ctx.strokeStyle = '#e2c069'; ctx.strokeRect(40.5, 70.5, W - 81, 119);
        lines.forEach(([str, size, color], i) => text(str, W / 2, 92 + i * 22, size, color));
      };
      const blink = Math.floor(s.t * 2) % 2 === 0;
      if (s.screen === 'title') panel([['GOLD MINER', 28, '#e2c069'], ['grab gold, avoid rocks', 14, '#fdf6f0'], ['45 seconds per level', 14, '#fdf6f0'], [blink ? 'press ENTER or tap to start' : '', 14, '#f2a5c4']]);
      if (s.screen === 'win') panel([[`LEVEL ${s.lvl.level} CLEAR!`, 24, '#e2c069'], [`score ${s.score}`, 16, '#fdf6f0'], ['next level: more rocks', 14, '#fdf6f0'], [blink ? 'press ENTER or tap' : '', 14, '#f2a5c4']]);
      if (s.screen === 'over') panel([["TIME'S UP", 24, '#ff8fa3'], [`score ${s.score} / goal ${s.lvl.goal}`, 16, '#fdf6f0'], [`best ${s.best}`, 14, '#e2c069'], [blink ? 'press ENTER or tap to retry' : '', 14, '#f2a5c4']]);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="gm">
      <canvas ref={canvasRef} width={W} height={H} className="gm-canvas" onPointerDown={() => press('tap')} />
      <div className="gm-bar">
        <span>↓ / Space / tap to drop the hook · Enter to start</span>
        <button onClick={() => setMuted((m) => !m)}>{muted ? 'Sound off' : 'Sound on'}</button>
      </div>
      <div className="gm-note">Originally built in Verilog on a DE1-SoC FPGA with Sehreen Basara: 31-state FSM, VGA at 320×240, LFSR random placement.</div>
    </div>
  );
}
