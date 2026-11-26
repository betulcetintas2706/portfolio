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
    { id: 'cherries', label: '🍒' },
    { id: 'sprinkles', label: '✨' },
    { id: 'candles', label: '🕯️' },
    { id: 'berries', label: '🍓' },
    { id: 'none', label: '—' },
  ],
};
const KEYS = ['shape', 'sponge', 'layers', 'frosting', 'topping'];
const TITLES = { shape: 'Shape', sponge: 'Sponge', layers: 'Layers', frosting: 'Frosting', topping: 'Topping' };
const CUSTOMERS = ['🐱 Mochi', '🥒 Mr. Pickle', '🐰 Bunny', '🧿 Nazar', '☕ Kahve', '🌷 Lale'];
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

export default function ComfyCakes() {
  const [order, setOrder] = useState(newOrder);
  const [cake, setCake] = useState(blank);
  const [phase, setPhase] = useState('build'); // build | baking | result
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(ORDER_TIME);
  const timer = useRef(null);

  useEffect(() => {
    if (phase !== 'build') return undefined;
    timer.current = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer.current);
  }, [phase, order]);

  const bake = () => {
    clearInterval(timer.current);
    setPhase('baking');
    setTimeout(() => {
      const wrong = KEYS.filter((k) => order[k] !== cake[k]);
      const perfect = wrong.length === 0;
      const pts = perfect ? 100 + time * 5 : Math.max(0, (KEYS.length - wrong.length) * 10);
      setScore((s) => s + pts);
      setStreak((s) => (perfect ? s + 1 : 0));
      setResult({ wrong, perfect, pts });
      setPhase('result');
    }, 1600);
  };

  useEffect(() => { if (phase === 'build' && time === 0) bake(); });

  const next = () => { setOrder(newOrder()); setCake(blank()); setResult(null); setTime(ORDER_TIME); setPhase('build'); };
  const label = (k, id) => {
    const o = opt(k, id);
    if (k === 'layers') return `${id} layer${id > 1 ? 's' : ''}`;
    if (k === 'topping') return id === 'none' ? 'no topping' : { cherries: 'cherries 🍒', sprinkles: 'sprinkles ✨', candles: 'candles 🕯️', berries: 'strawberries 🍓' }[id];
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
        <div className="cc-score"><b>{score}</b><span>points</span>{streak > 1 && <em>🔥 {streak} streak</em>}</div>
      </div>

      <div className="cc-stage">
        <div className={`cc-cake ${phase === 'baking' ? 'cc-baking' : ''}`}>
          <Cake cake={cake} size={210} />
        </div>
        {phase === 'baking' && <div className="cc-oven">baking... 🔥</div>}
        {phase === 'result' && (
          <div className={`cc-result ${result.perfect ? 'ok' : 'meh'}`}>
            <b>{result.perfect ? 'Perfect cake! ⭐' : `Almost! ${KEYS.length - result.wrong.length}/5 right`}</b>
            <span>+{result.pts} points{result.perfect && time > 0 ? ` (time bonus ${time * 5})` : ''}</span>
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
                <button key={o.id} className={`cc-opt${cake[k] === o.id ? ' on' : ''}`} onClick={() => setCake({ ...cake, [k]: o.id })}
                  style={o.c ? { '--sw': o.c } : undefined} disabled={phase !== 'build'}>
                  {o.c && <i className="cc-swatch" />}{o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="cc-bake" onClick={bake} disabled={phase !== 'build'}>Bake it! 🎂</button>
      </div>
      <div className="gm-note">Inspired by Comfy Cakes, my FPGA project with Sehreen Basara.</div>
    </div>
  );
}
