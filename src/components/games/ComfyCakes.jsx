import { useEffect, useRef, useState } from 'react';
import { FONT } from './cakesFont';

// Comfy Cakes, rebuilt in the browser from Betül and Sehreen's DE1-SoC project.
// The logic follows the Verilog one to one:
//   game_fsm.v       IDLE -> NEW_ORDER -> RUN -> JUDGE -> RESULT -> ... GAME_OVER
//   game_datapath.v  8-bit order/cake {topping, frosting, batter, shape},
//                    stations by cake_x, 90 s BCD timer, BCD score, 3 strikes,
//                    level up every 3 correct cakes (40/50/67/100 px per second)
//   lfsr8.v          taps 8,6,5,4, seed A5, shifting every 50 MHz clock
//   menu_control.v   title -> any key -> how to play -> Enter
//   tone_gen.v       660 + 880 Hz for a correct cake, 220 Hz buzz for a wrong one
// The art is the project's own background, sprite ROM images and 8x8 font.

const W = 640;
const H = 480;
const X_END = 288;
const STATIONS = [
  { id: 'PAN', l: 40, r: 79 },
  { id: 'BATTER', l: 100, r: 139 },
  { id: 'FROST', l: 160, r: 199 },
  { id: 'TOP', l: 220, r: 259 },
];
const SPEED = [40, 50, 67, 100]; // conveyor pixels per second, by level
const TIME_START = 90;
const HOLD_SECONDS = 2;
const LANE_Y = 224;
const PANEL = { x: 24, y: 64 };
const HUD = { x: 396, y: 8, fg: '#92dbff', bg: '#242449' };

const SHAPES = ['', 'round', 'square', 'heart'];
const BATTERS = ['', 'vanilla', 'chocolate', 'strawberry'];
const FROSTS = ['none', 'vanilla', 'chocolate', 'strawberry'];
const TOPS = ['none', 'sprinkles', 'cherry', 'candles'];

// cake byte helpers: {topping[7:6], frosting[5:4], batter[3:2], shape[1:0]}
const f = (c) => ({ shape: c & 3, batter: (c >> 2) & 3, frost: (c >> 4) & 3, top: (c >> 6) & 3 });
const bits8 = (c) => {
  const s = c.toString(2).padStart(8, '0');
  return `${s.slice(0, 2)} ${s.slice(2, 4)} ${s.slice(4, 6)} ${s.slice(6)}`;
};

// lfsr8.v: shifts every 50 MHz clock, period 255. The value you get depends on
// exactly when you press a key, which is what makes the orders random.
const SEED = 0xa5;
function lfsrStep(q) { const fb = ((q >> 7) ^ (q >> 5) ^ (q >> 4) ^ (q >> 3)) & 1; return ((q << 1) | fb) & 0xff; }
const LFSR_TABLE = (() => { const t = [SEED]; for (let i = 1; i < 255; i += 1) t.push(lfsrStep(t[i - 1])); return t; })();

const STATION_OF = (x) => (STATIONS.find((s) => x >= s.l && x <= s.r)?.id) || 'NONE';
const bcd = (n) => String(n).padStart(2, '0');

// State diagram of game_fsm.v for the inspector
export const CAKE_SPEC = {
  name: 'ComfyCakes',
  view: '380 236',
  stepHint: 'Advance the game clock by 0.5 seconds',
  states: [
    { id: 'IDLE', label: 'IDLE', x: 55, y: 42 },
    { id: 'NEW_ORDER', label: 'NEW_ORDER', x: 190, y: 42 },
    { id: 'RUN', label: 'RUN', x: 325, y: 42 },
    { id: 'JUDGE', label: 'JUDGE', x: 325, y: 126 },
    { id: 'RESULT', label: 'RESULT', x: 190, y: 126 },
    { id: 'GAME_OVER', label: 'GAME_OVER', x: 55, y: 210 },
  ],
  edges: [
    { from: 'IDLE', to: 'NEW_ORDER', label: 'act_start' },
    { from: 'NEW_ORDER', to: 'RUN', label: 'load_target' },
    { from: 'RUN', to: 'JUDGE', label: 'at_end', lx: 346, ly: 88 },
    { from: 'JUDGE', to: 'RESULT', label: 'match?' },
    { from: 'RESULT', to: 'NEW_ORDER', label: 'hold_zero', lx: 220, ly: 88 },
    { from: 'RESULT', to: 'GAME_OVER', label: '3 strikes', lx: 140, ly: 176 },
    { from: 'RUN', to: 'GAME_OVER', d: 'M362,52 C380,236 220,226 92,212', label: 'time_zero', lx: 300, ly: 214 },
    { from: 'GAME_OVER', to: 'IDLE', label: 'act_start', lx: 82, ly: 128 },
  ],
  captions: [{ x: 55, y: 14, text: 'title → how to play' }],
  note: 'This is the same game logic as our Verilog (game_fsm.v and game_datapath.v), running in the browser with the project art. On the DE1-SoC it runs at 50 MHz with a PS/2 keyboard, VGA and the audio codec.',
  board: null,
};

function beep(ac, freq, dur, at = 0) {
  const t = ac.currentTime + at;
  const o = ac.createOscillator(); const g = ac.createGain();
  o.type = 'square'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.06, t); g.gain.setValueAtTime(0.06, t + dur - 0.01); g.gain.linearRampToValueAtTime(0, t + dur);
  o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
}

export default function ComfyCakes({ probe, ctl, active = true }) {
  const canvasRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [page, setPage] = useState('title'); // for the hint line under the canvas
  const mutedRef = useRef(false); mutedRef.current = muted;
  const activeRef = useRef(active); activeRef.current = active;
  const audioRef = useRef(null);

  const g = useRef({
    state: 'IDLE', instructions: false,
    target: 0, cake: 0, cakeX: 0, score: 0, strikes: 0, time: TIME_START, level: 0, streak: 0,
    lastOk: false, hold: 0, moveAcc: 0, secAcc: 0, born: performance.now(),
    keyT: {}, moveT: 0, secT: 0, history: [], edge: null,
  });

  const sound = (ok) => {
    if (mutedRef.current) return;
    try {
      if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ac = audioRef.current; ac.resume();
      if (ok) { beep(ac, 660, 0.12); beep(ac, 880, 0.12, 0.12); } else beep(ac, 220, 0.35);
    } catch { /* no audio */ }
  };

  const lfsr = () => {
    const cycles = Math.floor((performance.now() - g.current.born) * 50000);
    return LFSR_TABLE[cycles % 255];
  };

  const go = (to) => {
    const s = g.current;
    s.history = [...s.history, [s.state, to]].slice(-8);
    s.edge = `${s.state}>${to}`;
    s.state = to;
  };

  // NEW_ORDER and JUDGE last one clock in hardware, so they run straight through
  const newOrder = () => {
    const s = g.current;
    go('NEW_ORDER');
    const r = lfsr();
    const shape = (r & 3) || 1; const batter = ((r >> 2) & 3) || 1;
    s.target = (r & 0xf0) | (batter << 2) | shape;
    s.cake = 0; s.cakeX = 0; s.moveAcc = 0;
    go('RUN');
  };
  const judge = () => {
    const s = g.current;
    go('JUDGE');
    const match = s.cake === s.target;
    if (match) {
      s.score = Math.min(99, s.score + 1);
      if (s.streak === 2) { s.streak = 0; s.level = Math.min(3, s.level + 1); } else s.streak += 1;
    } else s.strikes = Math.min(3, s.strikes + 1);
    s.lastOk = match; s.hold = HOLD_SECONDS;
    sound(match);
    go('RESULT');
  };

  const clearGame = () => {
    const s = g.current;
    Object.assign(s, { score: 0, strikes: 0, time: TIME_START, level: 0, streak: 0, lastOk: false, cake: 0, cakeX: 0 });
  };

  // key handling = key_map.v + menu_control.v
  const key = (k) => {
    const s = g.current;
    s.keyT[k] = performance.now();
    const start = k === 'Enter';
    if (s.state === 'IDLE') {
      if (!s.instructions) { s.instructions = true; setPage('howto'); return; }
      if (start) { clearGame(); newOrder(); setPage('play'); }
      return;
    }
    if (s.state === 'GAME_OVER') {
      if (start) { go('IDLE'); s.instructions = false; clearGame(); setPage('title'); }
      return;
    }
    if (s.state === 'RUN' && /^[0-3]$/.test(k)) {
      const opt = Number(k);
      const st = STATION_OF(s.cakeX);
      if (st === 'PAN' && opt) s.cake = (s.cake & ~3) | opt;
      else if (st === 'BATTER' && opt) s.cake = (s.cake & ~12) | (opt << 2);
      else if (st === 'FROST') s.cake = (s.cake & ~48) | (opt << 4);
      else if (st === 'TOP') s.cake = (s.cake & ~192) | (opt << 6);
    }
  };
  const keyRef = useRef(key); keyRef.current = key;

  useEffect(() => {
    const down = (e) => {
      if (!activeRef.current || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/input|textarea/i.test(document.activeElement?.tagName || '')) return;
      const k = e.key === 'Enter' ? 'Enter' : /^[0-3]$/.test(e.key) ? e.key : 'other';
      if (k !== 'other' || g.current.state === 'IDLE') {
        if (k === 'Enter' || k !== 'other') e.preventDefault();
        keyRef.current(k);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current; const ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const img = (src) => { const i = new Image(); i.src = src; return i; };
    const bg = img('./games/cakes/background.png');
    const title = img('./games/cakes/title_screen.png');
    const howto = img('./games/cakes/instructions_screen.png');
    const sheet = img('./games/cakes/sprites.png');

    const spr = (id, x, y, scale) => ctx.drawImage(sheet, id * 32, 0, 32, 32, x, y, 32 * scale, 32 * scale);
    // cake_blitter.v: plate -> base -> frosting -> topping, skipping absent layers
    const drawCake = (c, x, y, scale) => {
      const { shape, batter, frost, top } = f(c);
      spr(0, x, y, scale);
      if (shape) spr(shape * 4 + batter, x, y, scale);
      if (shape && frost) spr(16 + shape * 4 + frost, x, y, scale);
      if (top) spr(16 + top, x, y, scale);
    };
    // hud_digits.v: 13 cells of 8x8 glyphs, 2x on screen
    const drawHud = (s) => {
      const cells = [10, Math.floor(s.time / 10), s.time % 10, 15, 11, Math.floor(s.score / 10), s.score % 10, 15, 12, s.strikes, 15, 13, s.level + 1];
      cells.forEach((gl, i) => {
        const glyph = FONT[gl];
        const cx = HUD.x + i * 18;
        for (let r = 0; r < 8; r += 1) for (let c = 0; c < 8; c += 1) {
          ctx.fillStyle = glyph[r * 8 + c] === '1' ? HUD.fg : HUD.bg;
          ctx.fillRect(cx + c * 2, HUD.y + r * 2, 2, 2);
        }
      });
    };

    let raf; let last = performance.now();
    const loop = (now) => {
      const real = Math.min(0.1, (now - last) / 1000); last = now;
      const c = ctl?.current || {};
      let dt = real;
      if (c.paused) { if (c.step) { c.step -= 1; dt = 0.5; } else dt = 0; } else if (c.slow) dt = real * 0.25;
      const s = g.current;

      // rate dividers: sec_tick (1 Hz) and move_tick (level speed)
      if (dt > 0) {
        s.secAcc += dt;
        let secTicks = 0;
        while (s.secAcc >= 1) { s.secAcc -= 1; secTicks += 1; s.secT = now; }
        if (s.state === 'RUN') {
          for (let i = 0; i < secTicks && s.time > 0; i += 1) s.time -= 1;
          if (s.time === 0) { go('GAME_OVER'); setPage('over'); }
          else {
            s.moveAcc += dt * SPEED[s.level];
            while (s.moveAcc >= 1 && s.cakeX < X_END) { s.moveAcc -= 1; s.cakeX += 1; s.moveT = now; }
            if (s.cakeX === X_END) judge();
          }
        } else if (s.state === 'RESULT') {
          for (let i = 0; i < secTicks && s.hold > 0; i += 1) s.hold -= 1;
          if (s.hold === 0) {
            if (s.strikes === 3) { go('GAME_OVER'); setPage('over'); } else newOrder();
          }
        }
      }

      // draw
      if (s.state === 'IDLE') {
        const pic = s.instructions ? howto : title;
        if (pic.complete) ctx.drawImage(pic, 0, 0, W, H);
      } else {
        if (bg.complete) ctx.drawImage(bg, 0, 0, W, H);
        if (sheet.complete) {
          const px = Math.max(0, Math.min(544, 2 * s.cakeX - 16));
          drawCake(s.cake, px, LANE_Y, 3);
          if (s.state === 'RESULT' || s.state === 'GAME_OVER') spr(s.state === 'RESULT' && s.lastOk ? 1 : 2, PANEL.x, PANEL.y, 2);
          else drawCake(s.target, PANEL.x, PANEL.y, 2);
        }
        drawHud(s);
      }

      if (probe) {
        const lit = (t) => now - (t || 0) < 200;
        const st = STATION_OF(s.cakeX);
        probe.current = {
          state: s.state,
          edge: s.edge,
          history: s.history,
          inputs: [
            { id: 'enter', kind: 'key', label: 'Enter', on: lit(s.keyT.Enter), title: 'act_start' },
            ...['1', '2', '3', '0'].map((k) => ({ id: `k${k}`, kind: 'key', label: k, on: lit(s.keyT[k]), title: k === '0' ? 'option 0: no frosting or topping' : `option ${k}` })),
            { id: 'mt', kind: 'sig', label: 'move_tick', on: s.state === 'RUN' && lit(s.moveT), title: 'conveyor rate divider' },
            { id: 'st', kind: 'sig', label: 'sec_tick', on: lit(s.secT), title: '1 Hz rate divider' },
            { id: 'ae', kind: 'sig', label: 'at_end', on: s.cakeX === X_END, title: 'cake reached the box' },
            { id: 'm', kind: 'sig', label: 'match', on: s.cake === s.target && s.target !== 0, title: 'cake == target' },
            { id: 'tz', kind: 'sig', label: 'time_zero', on: s.time === 0, title: 'timer at 00' },
            { id: 'os', kind: 'sig', label: 'out_of_strikes', on: s.strikes === 3, title: 'strikes == 3' },
          ],
          regs: [
            { name: 'target', bits: bits8(s.target), wide: true },
            { name: 'cake', bits: bits8(s.cake), wide: true },
            { name: 'cake_x', value: s.cakeX },
            { name: 'station', value: st === 'NONE' ? '-' : st },
            { name: 'time_bcd', value: bcd(s.time) },
            { name: 'score_bcd', value: bcd(s.score) },
            { name: 'strikes', value: s.strikes },
            { name: 'level', value: `${s.level} (${SPEED[s.level]} px/s)` },
            { name: 'lfsr8', value: `0x${lfsr().toString(16).toUpperCase().padStart(2, '0')}` },
            { name: 'hold', value: s.hold },
          ],
        };
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = g.current;
  const order = f(s.target);
  const hint = {
    title: 'Press any key (or tap) to continue',
    howto: 'Press Enter to start',
    play: 'At each station press 1, 2 or 3 (top, middle, bottom). 0 = no frosting or topping.',
    over: 'Game over. Press Enter to go back to the title.',
  }[page];

  return (
    <div className="cc2">
      <canvas
        ref={canvasRef} width={W} height={H} className="cc2-canvas"
        onPointerDown={() => { if (g.current.state === 'IDLE') key(g.current.instructions ? 'Enter' : 'other'); }}
        aria-label={`Comfy Cakes. ${hint}${s.target ? ` Order: ${SHAPES[order.shape]} ${BATTERS[order.batter]} cake, ${FROSTS[order.frost]} frosting, ${TOPS[order.top]} topping.` : ''}`}
      />
      <div className="cc2-keys" aria-label="Keyboard">
        {['1', '2', '3', '0'].map((k) => (
          <button key={k} className="cc2-key" onPointerDown={(e) => { e.preventDefault(); key(k); }}>{k}</button>
        ))}
        <button className="cc2-key cc2-enter" onPointerDown={(e) => { e.preventDefault(); key('Enter'); }}>Enter</button>
        <button className="cc2-mute" onClick={() => setMuted((m) => !m)}>{muted ? 'Sound off' : 'Sound on'}</button>
      </div>
      <div className="gm-bar"><span>{hint}</span></div>
      <div className="gm-note">Built in Verilog on a DE1-SoC FPGA with Sehreen Basara. Same rules and art as our board version.</div>
    </div>
  );
}
