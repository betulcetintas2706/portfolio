import { useEffect, useRef, useState } from 'react';

// A cake decorating mini game in the spirit of Betül's Comfy Cakes FPGA project.
// A customer orders a cake, you build it to match, then bake it.

const OPTIONS = {
  shape: [
    { id: 'round', label: 'Round' },
    { id: 'square', label: 'Square' },
    { id: 'heart', label: 'Heart' },
  ],
  sponge: [
    { id: 'vanilla', label: 'Vanilla', c: '#f3d9a4', d: '#dcbc7c' },
    { id: 'chocolate', label: 'Chocolate', c: '#7a4a2a', d: '#5e3820' },
    { id: 'strawberry', label: 'Strawberry', c: '#f2a5c4', d: '#d9819f' },
  ],
  layers: [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
  ],
  frosting: [
    { id: 'pink', label: 'Pink', c: '#f7b6cf' },
    { id: 'white', label: 'White', c: '#fffaf3' },
    { id: 'choc', label: 'Choco', c: '#4a2a18' },
    { id: 'none', label: 'None', c: null },
  ],
  topping: [
    { id: 'cherries', label: 'Cherries' },
    { id: 'sprinkles', label: 'Sprinkles' },
    { id: 'candles', label: 'Candles' },
    { id: 'berries', label: 'Berries' },
    { id: 'none', label: 'None' },
  ],
};
const KEYS = ['shape', 'sponge', 'layers', 'frosting', 'topping'];
const TITLES = { shape: 'Shape', sponge: 'Sponge', layers: 'Layers', frosting: 'Frosting', topping: 'Topping' };
const CUSTOMERS = ['Mochi', 'Mr. Pickle', 'Bunny', 'Nazar', 'Kahve', 'Lale'];
const ORDER_TIME = 40;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const newOrder = () => ({
  who: pick(CUSTOMERS),
  ...Object.fromEntries(KEYS.map((k) => [k, pick(OPTIONS[k]).id])),
});
const blank = () => ({ shape: 'round', sponge: 'vanilla', layers: 1, frosting: 'none', topping: 'none' });
const opt = (k, id) => OPTIONS[k].find((o) => o.id === id);

function topPath(shape, cx, cy, w) {
  const h = w * 0.28;
  if (shape === 'square') return `M${cx - w / 2},${cy + h / 2} L${cx - w / 2 + h * 0.7},${cy - h / 2} L${cx + w / 2 - h * 0.7},${cy - h / 2} L${cx + w / 2},${cy + h / 2} Z`;
  if (shape === 'heart') {
    const s = w / 2;
    return `M${cx},${cy + h * 0.35} C${cx - s * 1.1},${cy - h * 0.2} ${cx - s * 0.55},${cy - h * 1.35} ${cx},${cy - h * 0.6} C${cx + s * 0.55},${cy - h * 1.35} ${cx + s * 1.1},${cy - h * 0.2} ${cx},${cy + h * 0.35} Z`;
  }
  return null;
}

export function Cake({ cake, size = 200 }) {
  const sp = opt('sponge', cake.sponge);
  const fr = opt('frosting', cake.frosting);
  const n = cake.layers;
  const cx = 100;
  const base = 150;
  const tierH = 26;
  const tiers = Array.from({ length: n }, (_, i) => ({ w: 130 - i * 26, y: base - i * tierH }));
  const top = tiers[n - 1];
  const topY = top.y - tierH;
  const rx = cake.shape === 'square' ? 2 : 10;

  return (
    <svg viewBox="0 0 200 190" width={size} height={size * 0.95} className="cake-svg" aria-hidden="true">
      <ellipse cx={cx} cy={base + 6} rx={82} ry={10} fill="#e9dfe9" />
      <ellipse cx={cx} cy={base + 3} rx={76} ry={7} fill="#fff" stroke="#e2c069" />
      {tiers.map((t, i) => (
        <g key={i}>
          <rect x={cx - t.w / 2} y={t.y - tierH} width={t.w} height={tierH} rx={rx} fill={sp.c} stroke={sp.d} />
          {fr.c && <rect x={cx - t.w / 2} y={t.y - tierH} width={t.w} height={8} rx={rx} fill={fr.c} />}
          {fr.c && [0.2, 0.45, 0.7].map((p) => (
            <ellipse key={p} cx={cx - t.w / 2 + t.w * p + 6} cy={t.y - tierH + 8} rx={4} ry={5} fill={fr.c} />
          ))}
        </g>
      ))}
      {/* top face shows the shape */}
      {cake.shape === 'round'
        ? <ellipse cx={cx} cy={topY} rx={top.w / 2} ry={top.w * 0.13} fill={fr.c || sp.c} stroke={fr.c ? 'rgba(0,0,0,0.08)' : sp.d} />
        : <path d={topPath(cake.shape, cx, topY, top.w)} fill={fr.c || sp.c} stroke={fr.c ? 'rgba(0,0,0,0.1)' : sp.d} />}
      {/* toppings */}
      {cake.topping === 'cherries' && [-0.25, 0, 0.25].map((p) => (
        <g key={p}><line x1={cx + p * top.w} y1={topY - 4} x2={cx + p * top.w + 4} y2={topY - 14} stroke="#3c6b2a" strokeWidth="1.5" /><circle cx={cx + p * top.w} cy={topY - 3} r={5} fill="#c4162a" /></g>
      ))}
      {cake.topping === 'berries' && [-0.22, 0.05, 0.28].map((p) => (
        <g key={p}><path d={`M${cx + p * top.w - 5},${topY - 6} Q${cx + p * top.w},${topY + 6} ${cx + p * top.w + 5},${topY - 6} Z`} fill="#e23b4e" /><rect x={cx + p * top.w - 3} y={topY - 8} width={6} height={2} fill="#3c8a2a" /></g>
      ))}
      {cake.topping === 'candles' && [-0.2, 0, 0.2].map((p) => (
        <g key={p}><rect x={cx + p * top.w - 2} y={topY - 18} width={4} height={16} fill="#8b2942" /><ellipse cx={cx + p * top.w} cy={topY - 22} rx={3} ry={5} fill="#ffcf4a" className="cake-flame" /></g>
      ))}
      {cake.topping === 'sprinkles' && Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={cx - top.w * 0.38 + ((i * 37) % (top.w * 0.76))} y={topY - 4 + ((i * 13) % 8)} width={4} height={1.6}
          transform={`rotate(${(i * 47) % 180} ${cx - top.w * 0.38 + ((i * 37) % (top.w * 0.76))} ${topY - 3 + ((i * 13) % 8)})`}
          fill={['#e2c069', '#5ee0e6', '#c4162a', '#7ac74f', '#fff'][i % 5]} />
      ))}
    </svg>
  );
}

// State diagram for the inspector (browser version of the game logic).
export const CAKE_SPEC = {
  name: 'ComfyCakes',
  view: '380 246',
  stepHint: 'Advance the game clock by 0.5 seconds',
  states: [
    { id: 'NEW_ORDER', label: 'NEW ORDER', x: 45, y: 50 },
    { id: 'BUILD', label: 'BUILD', x: 190, y: 50 },
    { id: 'BAKE', label: 'BAKE', x: 335, y: 50 },
    { id: 'CHECK', label: 'CHECK', x: 335, y: 135 },
    { id: 'PERFECT', label: 'PERFECT', x: 190, y: 135 },
    { id: 'MISS', label: 'MISS', x: 190, y: 220 },
  ],
  edges: [
    { from: 'NEW_ORDER', to: 'BUILD', label: 'load order' },
    { from: 'BUILD', to: 'BUILD', d: 'M176,37 C170,8 210,8 204,37', label: 'SW change', lx: 190, ly: 12 },
    { from: 'BUILD', to: 'BAKE', label: 'KEY0 / t=0' },
    { from: 'BAKE', to: 'CHECK', label: 'oven done', lx: 352, ly: 96 },
    { from: 'CHECK', to: 'PERFECT', label: 'match=11111', lx: 262, ly: 152 },
    { from: 'CHECK', to: 'MISS', label: 'else', lx: 280, ly: 186 },
    { from: 'PERFECT', to: 'NEW_ORDER', label: 'next', lx: 112, ly: 100 },
    { from: 'MISS', to: 'NEW_ORDER', d: 'M153,220 C60,222 40,150 45,65', label: 'next', lx: 70, ly: 196 },
  ],
  note: 'This panel shows the browser recreation. On the DE1-SoC the same logic is written in Verilog: FSMs, order generation and checking, scoring and timing, with switches and keys as inputs.',
  board: null,
};

// field encodings used for the register view
const ENC = {
  shape: { bits: 2, list: OPTIONS.shape.map((o) => o.id) },
  sponge: { bits: 2, list: OPTIONS.sponge.map((o) => o.id) },
  layers: { bits: 2, list: OPTIONS.layers.map((o) => o.id) },
  frosting: { bits: 2, list: OPTIONS.frosting.map((o) => o.id) },
  topping: { bits: 3, list: OPTIONS.topping.map((o) => o.id) },
};
const bin = (n, w) => n.toString(2).padStart(w, '0');
const code = (k, id) => bin(ENC[k].list.indexOf(id), ENC[k].bits);
const encode = (c) => KEYS.map((k) => code(k, c[k])).join(' ');

export default function ComfyCakes({ probe, ctl }) {
  const [order, setOrder] = useState(newOrder);
  const [cake, setCake] = useState(blank);
  const [phase, setPhase] = useState('build'); // neworder | build | baking | checking | result
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(ORDER_TIME);

  // one game clock drives everything, so the inspector can pause, slow and step it
  const eng = useRef({ phase: 'build', left: ORDER_TIME, wait: 0, swT: 0, swKey: null, keyT: 0, st: 'BUILD', edge: null });
  const live = useRef({});
  live.current = { order, cake, time, score, streak, result };

  const go = (ph, wait = 0) => { eng.current.phase = ph; eng.current.wait = wait; setPhase(ph); };

  const finishCheck = () => {
    const { order: o, cake: c } = live.current;
    const wrong = KEYS.filter((k) => o[k] !== c[k]);
    const perfect = wrong.length === 0;
    const t = Math.ceil(eng.current.left);
    const pts = perfect ? 100 + t * 5 : Math.max(0, (KEYS.length - wrong.length) * 10);
    setScore((x) => x + pts);
    setStreak((x) => (perfect ? x + 1 : 0));
    setResult({ wrong, perfect, pts, t });
    go('result');
  };

  const advance = (dt) => {
    const e = eng.current;
    if (e.phase === 'build') {
      e.left = Math.max(0, e.left - dt);
      setTime(Math.ceil(e.left));
      if (e.left <= 0) go('baking', 1.6);
    } else if (e.phase === 'baking') {
      e.wait -= dt; if (e.wait <= 0) go('checking', 0.5);
    } else if (e.phase === 'checking') {
      e.wait -= dt; if (e.wait <= 0) finishCheck();
    } else if (e.phase === 'neworder') {
      e.wait -= dt; if (e.wait <= 0) go('build');
    }
  };

  const tick = useRef(null);
  tick.current = () => {
    const c = ctl?.current || {};
    if (c.paused) { if (c.step) { c.step -= 1; advance(0.5); } }
    else advance(c.slow ? 0.025 : 0.1);
    report();
  };
  useEffect(() => {
    const id = setInterval(() => tick.current(), 100);
    return () => clearInterval(id);
  }, []);

  const bake = () => { eng.current.keyT = performance.now(); if (eng.current.phase === 'build') go('baking', 1.6); };
  const choose = (k, id) => { eng.current.swT = performance.now(); eng.current.swKey = k; setCake({ ...cake, [k]: id }); };

  const report = () => {
    if (!probe) return;
    const e = eng.current;
    const { order: o, cake: c, score: sc, streak: sk, result: r } = live.current;
    const st = { neworder: 'NEW_ORDER', build: 'BUILD', baking: 'BAKE', checking: 'CHECK', result: r?.perfect ? 'PERFECT' : 'MISS' }[e.phase];
    const nowMs = performance.now();
    const swLit = nowMs - e.swT < 260;
    if (st !== e.st) { e.edge = `${e.st}>${st}`; e.st = st; }
    else if (st === 'BUILD' && swLit) e.edge = 'BUILD>BUILD';
    probe.current = {
      state: st,
      edge: e.edge,
      inputs: [
        ...KEYS.map((k) => ({ id: k, kind: 'switch', label: k, bits: code(k, c[k]), on: swLit && e.swKey === k, title: `${TITLES[k]} switches` })),
        { id: 'key0', kind: 'key', label: 'KEY0 bake', on: nowMs - e.keyT < 260, title: 'push button that starts baking' },
        { id: 'tz', kind: 'sig', label: 't_zero', on: e.left <= 0, title: 'order timer ran out' },
      ],
      regs: [
        { name: 'order_reg', bits: encode(o), wide: true },
        { name: 'cake_reg', bits: encode(c), wide: true },
        { name: 'match', bits: KEYS.map((k) => (o[k] === c[k] ? '1' : '0')).join(''), wide: true },
        { name: 'timer', value: `${Math.ceil(e.left)}s` },
        { name: 'score', value: sc },
        { name: 'streak', value: sk },
      ],
    };
  };

  const next = () => { setOrder(newOrder()); setCake(blank()); setResult(null); setTime(ORDER_TIME); eng.current.left = ORDER_TIME; go('neworder', 0.6); };
  const label = (k, id) => {
    const o = opt(k, id);
    if (k === 'layers') return `${id} layer${id > 1 ? 's' : ''}`;
    if (k === 'topping') return id === 'none' ? 'no topping' : { cherries: 'cherries', sprinkles: 'sprinkles', candles: 'candles', berries: 'strawberries' }[id];
    if (k === 'frosting') return id === 'none' ? 'no frosting' : `${o.label.toLowerCase()} frosting`;
    return o.label.toLowerCase();
  };

  return (
    <div className="cc">
      <div className="cc-top">
        <div className="cc-order">
          <div className="cc-order-head"><b>Order for {order.who}</b><span className={time <= 10 && phase === 'build' ? 'cc-hurry' : ''}>⏱ {time}s</span></div>
          <div className="cc-order-list">
            {KEYS.map((k) => (
              <span key={k} className={`cc-chip${result && result.wrong.includes(k) ? ' cc-bad' : ''}${result && !result.wrong.includes(k) ? ' cc-good' : ''}`}>
                {label(k, order[k])}
              </span>
            ))}
          </div>
        </div>
        <div className="cc-score"><b>{score}</b><span>points</span>{streak > 1 && <em>{streak} in a row</em>}</div>
      </div>

      <div className="cc-stage">
        <div className={`cc-cake ${phase === 'baking' || phase === 'checking' ? 'cc-baking' : ''}`}>
          <Cake cake={cake} size={210} />
        </div>
        {phase === 'baking' && <div className="cc-oven">baking...</div>}
        {phase === 'checking' && <div className="cc-oven">checking the order...</div>}
        {phase === 'neworder' && <div className="cc-oven">next customer...</div>}
        {phase === 'result' && (
          <div className={`cc-result ${result.perfect ? 'ok' : 'meh'}`}>
            <b>{result.perfect ? 'Perfect cake!' : `Almost! ${KEYS.length - result.wrong.length}/5 right`}</b>
            <span>+{result.pts} points{result.perfect && result.t > 0 ? ` (time bonus ${result.t * 5})` : ''}</span>
            <button onClick={next}>Next order →</button>
          </div>
        )}
      </div>

      <div className={`cc-controls ${phase !== 'build' ? 'cc-locked' : ''}`}>
        {KEYS.map((k) => (
          <div key={k} className="cc-row">
            <span className="cc-row-title">{TITLES[k]}</span>
            <div className="cc-opts">
              {OPTIONS[k].map((o) => (
                <button key={o.id} className={`cc-opt${cake[k] === o.id ? ' on' : ''}`} onClick={() => choose(k, o.id)}
                  style={o.c ? { '--sw': o.c } : undefined} disabled={phase !== 'build'}>
                  {o.c && <i className="cc-swatch" />}{o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="cc-bake" onClick={bake} disabled={phase !== 'build'}>Bake it!</button>
      </div>
      <div className="gm-note">Inspired by Comfy Cakes, my FPGA project with Sehreen Basara.</div>
    </div>
  );
}
