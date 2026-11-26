import { useEffect, useState } from 'react';

// "See how it works" panel shown beside a game. The game writes what it is
// doing into probe.current every frame; this panel reads it a few times a
// second and draws it like a small instrument panel. ctl.current lets the
// panel pause, slow down or step the game.
//
// spec = {
//   name, view: 'w h', groups?: [{ x, y, w, h, label }],
//   states: [{ id, label, x, y }],
//   edges: [{ from, to, label, d?, lx?, ly? }],   // d = custom svg path
//   note, board: url | null,
// }

const NODE_W = 74;
const NODE_H = 24;

function center(s) { return { x: s.x, y: s.y }; }

// straight line between two boxes, trimmed to the box edges
function edgePath(a, b) {
  const dx = b.x - a.x; const dy = b.y - a.y;
  const trim = (p, sx, sy) => {
    const tx = dx === 0 ? Infinity : (NODE_W / 2 + 3) / Math.abs(dx);
    const ty = dy === 0 ? Infinity : (NODE_H / 2 + 3) / Math.abs(dy);
    const t = Math.min(tx, ty);
    return { x: p.x + sx * dx * t, y: p.y + sy * dy * t };
  };
  const s = trim(center(a), 1, 1);
  const e = trim(center(b), -1, -1);
  return { d: `M${s.x},${s.y} L${e.x},${e.y}`, mx: (s.x + e.x) / 2, my: (s.y + e.y) / 2 };
}

function Diagram({ spec, state, lastEdge }) {
  const byId = Object.fromEntries(spec.states.map((s) => [s.id, s]));
  return (
    <svg viewBox={`0 0 ${spec.view}`} className="ins-diagram" role="img" aria-label={`${spec.name} state diagram, current state ${state}`}>
      <defs>
        <marker id={`arr-${spec.name}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="#b89a52" />
        </marker>
        <marker id={`arr-on-${spec.name}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="#f3d27a" />
        </marker>
      </defs>
      {(spec.groups || []).map((g) => (
        <g key={g.label}>
          <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="8" className="ins-group" />
          <text x={g.x + g.w - 8} y={g.y + g.h - 6} className="ins-group-label" textAnchor="end">{g.label}</text>
        </g>
      ))}
      {spec.edges.map((e) => {
        const a = byId[e.from]; const b = byId[e.to];
        const p = e.d ? { d: e.d, mx: e.lx, my: e.ly } : edgePath(a, b);
        const on = lastEdge === `${e.from}>${e.to}`;
        return (
          <g key={`${e.from}>${e.to}`} className={on ? 'ins-edge on' : 'ins-edge'}>
            <path d={p.d} markerEnd={`url(#${on ? 'arr-on-' : 'arr-'}${spec.name})`} />
            {e.label && <text x={(e.lx ?? p.mx)} y={(e.ly ?? p.my) - 3} className="ins-edge-label">{e.label}</text>}
          </g>
        );
      })}
      {(spec.captions || []).map((c) => <text key={c.text} x={c.x} y={c.y} className="ins-caption">{c.text}</text>)}
      {spec.states.map((s) => (
        <g key={s.id} className={s.id === state ? 'ins-node on' : 'ins-node'}>
          <rect x={s.x - NODE_W / 2} y={s.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx="5" />
          <text x={s.x} y={s.y + 4}>{s.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Inspector({ spec, probe, ctl }) {
  const [snap, setSnap] = useState(() => probe.current);
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let prev = probe.current?.state;
    const id = setInterval(() => {
      const p = probe.current;
      if (!p) return;
      setSnap({ ...p });
      if (p.state !== prev) {
        const from = prev; prev = p.state;
        setTrail((t) => [{ from, to: p.state, k: Date.now() + Math.random() }, ...t].slice(0, 6));
      }
    }, 60);
    return () => clearInterval(id);
  }, [probe]);

  useEffect(() => () => { ctl.current.paused = false; ctl.current.slow = false; }, [ctl]);

  const togglePause = () => { ctl.current.paused = !paused; setPaused(!paused); };
  const toggleSlow = () => { ctl.current.slow = !slow; setSlow(!slow); };
  const step = () => {
    if (!paused) { ctl.current.paused = true; setPaused(true); }
    ctl.current.step = (ctl.current.step || 0) + 1;
  };

  if (!snap) return null;
  const stateLabel = spec.states.find((s) => s.id === snap.state)?.label || snap.state;

  return (
    <aside className="ins" aria-label={`How ${spec.name} works`}>
      <div className="ins-head">
        <span className="ins-title">{spec.name.toLowerCase()}.inspect</span>
        <span className="ins-badge">browser recreation</span>
      </div>
      <div className="ins-ctl">
        <button onClick={togglePause} className={paused ? 'on' : ''}>{paused ? '▶ Resume' : '❚❚ Pause'}</button>
        <button onClick={step} title={spec.stepHint}>Step</button>
        <button onClick={toggleSlow} className={slow ? 'on' : ''}>{slow ? 'Normal speed' : 'Slow ×¼'}</button>
      </div>

      <section className="ins-sec">
        <div className="ins-label">Current state</div>
        <div className="ins-state"><i className="ins-led on" />{stateLabel}</div>
        <Diagram spec={spec} state={snap.state} lastEdge={snap.edge} />
      </section>

      <section className="ins-sec">
        <div className="ins-label">Inputs</div>
        <div className="ins-inputs">
          {snap.inputs.map((inp) => (
            inp.kind === 'key'
              ? <span key={inp.id} className={`ins-key${inp.on ? ' on' : ''}`} title={inp.title}>{inp.label}</span>
              : inp.kind === 'switch'
                ? (
                  <span key={inp.id} className={`ins-sw${inp.on ? ' on' : ''}`} title={inp.title}>
                    <span className="ins-sw-bits">{inp.bits.split('').map((b, i) => <i key={i} className={b === '1' ? 'up' : ''} />)}</span>
                    <span className="ins-sw-name">{inp.label}</span>
                  </span>
                )
                : <span key={inp.id} className={`ins-sig${inp.on ? ' on' : ''}`} title={inp.title}><i className="ins-led" />{inp.label}</span>
          ))}
        </div>
      </section>

      <section className="ins-sec">
        <div className="ins-label">Registers</div>
        <div className="ins-regs">
          {snap.regs.map((r) => (
            <div key={r.name} className={`ins-reg${r.wide ? ' wide' : ''}`}>
              <span className="ins-reg-name">{r.name}</span>
              {r.bits
                ? <span className="ins-reg-bits">{r.bits.split('').map((b, i) => <i key={i} className={b === '1' ? 'one' : b === '0' ? 'zero' : 'gap'}>{b === ' ' ? '' : b}</i>)}</span>
                : <span className="ins-reg-val">{r.value}</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="ins-sec">
        <div className="ins-label">Transitions</div>
        <ol className="ins-trail">
          {trail.length === 0 && <li className="dim">play to see transitions</li>}
          {trail.map((t) => (
            <li key={t.k}>
              {(spec.states.find((s) => s.id === t.from)?.label || t.from || 'start')} <b>→</b> {spec.states.find((s) => s.id === t.to)?.label || t.to}
            </li>
          ))}
        </ol>
      </section>

      <div className="ins-foot">
        <p>{spec.note}</p>
        {spec.board
          ? <a className="ins-board" href={spec.board} target="_blank" rel="noopener noreferrer">Watch it on the board <span className="arrow">↗</span></a>
          : <span className="ins-board off" title="Video of the real DE1-SoC board coming soon">Board video coming soon</span>}
      </div>
    </aside>
  );
}
