import { useEffect, useRef, useState } from 'react';

// First-visit mini game: the site "gets hacked" and the visitor squashes
// bugs to restore it. Always skippable, and only shown once per browser.

const GOAL = 10;
const TIME = 20;
const LINES = [
  '> connecting to betulcetintas.com ...',
  '⚠ INTRUSION DETECTED',
  '⚠ 10 bugs are eating the portfolio',
  '⚠ projects.exe corrupted · resume.pdf at risk',
  '> manual override required',
];

let nextId = 1;
const spawn = () => {
  const w = window.innerWidth; const h = window.innerHeight;
  const edge = Math.floor(Math.random() * 4);
  const x = edge === 0 ? -30 : edge === 1 ? w + 30 : Math.random() * w;
  const y = edge === 2 ? -30 : edge === 3 ? h + 30 : 60 + Math.random() * (h - 120);
  const speed = 70 + Math.random() * 90;
  const a = Math.atan2(h / 2 - y + (Math.random() - 0.5) * h * 0.6, w / 2 - x + (Math.random() - 0.5) * w * 0.6);
  return { id: nextId++, x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, kind: Math.random() > 0.5 ? '🐛' : '👾', wob: Math.random() * 6 };
};

export function hasSeenIntro() {
  try { return localStorage.getItem('seenHackIntro') === '1'; } catch { return true; }
}

export default function HackIntro({ onDone }) {
  const [phase, setPhase] = useState('alert'); // alert | play | won | lost
  const [shown, setShown] = useState(0);
  const [bugs, setBugs] = useState([]);
  const [squashed, setSquashed] = useState(0);
  const [splats, setSplats] = useState([]);
  const [time, setTime] = useState(TIME);
  const bugsRef = useRef([]);

  const finish = () => {
    try { localStorage.setItem('seenHackIntro', '1'); } catch { /* ignore */ }
    document.documentElement.style.removeProperty('--corrupt');
    document.body.classList.remove('hacked');
    onDone();
  };

  // corruption level drives the glitch effect on the desktop behind
  useEffect(() => {
    document.body.classList.add('hacked');
    return () => document.body.classList.remove('hacked');
  }, []);
  useEffect(() => {
    const level = phase === 'won' ? 0 : Math.max(0, 1 - squashed / GOAL);
    document.documentElement.style.setProperty('--corrupt', String(level));
  }, [squashed, phase]);

  // type out the alert lines
  useEffect(() => {
    if (phase !== 'alert' || shown >= LINES.length) return undefined;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 450);
    return () => clearTimeout(t);
  }, [phase, shown]);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') finish(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  // game loop
  useEffect(() => {
    if (phase !== 'play') return undefined;
    bugsRef.current = Array.from({ length: 5 }, spawn);
    setBugs(bugsRef.current);
    let raf; let last = performance.now(); let spawnT = 0;
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      spawnT += dt;
      const w = window.innerWidth; const h = window.innerHeight;
      bugsRef.current = bugsRef.current
        .map((b) => {
          let { x, y, vx, vy } = b;
          x += vx * dt; y += vy * dt;
          if (Math.random() < 0.02) { const a = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.6; const sp = Math.hypot(vx, vy); vx = Math.cos(a) * sp; vy = Math.sin(a) * sp; }
          if ((x < 10 && vx < 0) || (x > w - 10 && vx > 0)) vx = -vx;
          if ((y < 50 && vy < 0) || (y > h - 10 && vy > 0)) vy = -vy;
          return { ...b, x, y, vx, vy, wob: b.wob + dt * 12 };
        });
      if (spawnT > 0.9 && bugsRef.current.length < 7) { spawnT = 0; bugsRef.current.push(spawn()); }
      setBugs([...bugsRef.current]);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => { cancelAnimationFrame(raf); clearInterval(timer); };
  }, [phase]);

  useEffect(() => {
    if (phase === 'play' && time <= 0) setPhase('lost');
  }, [time, phase]);

  const squash = (b, e) => {
    e.stopPropagation();
    bugsRef.current = bugsRef.current.filter((x) => x.id !== b.id);
    setBugs([...bugsRef.current]);
    setSplats((s) => [...s.slice(-8), { id: b.id, x: b.x, y: b.y }]);
    setSquashed((n) => {
      const v = n + 1;
      if (v >= GOAL) setTimeout(() => setPhase('won'), 250);
      return v;
    });
  };

  const pct = Math.min(100, Math.round((squashed / GOAL) * 100));

  return (
    <div className={`hack hack-${phase}`} role="dialog" aria-label="Save the site mini game">
      <div className="hack-scan" aria-hidden="true" />
      <button className="hack-skip" onClick={finish}>Skip intro →</button>

      {phase === 'alert' && (
        <div className="hack-term">
          <div className="hack-term-bar">⚠ security.exe</div>
          <div className="hack-term-body">
            {LINES.slice(0, shown).map((l) => <div key={l} className={l.startsWith('⚠') ? 'hack-red' : ''}>{l}</div>)}
            {shown >= LINES.length && (
              <div className="hack-cta">
                <p>Help me save my portfolio! Squash {GOAL} bugs in {TIME} seconds.</p>
                <button className="hack-go" onClick={() => setPhase('play')}>⚔️ Fight back</button>
              </div>
            )}
            {shown < LINES.length && <span className="hack-caret">▋</span>}
          </div>
        </div>
      )}

      {phase === 'play' && (
        <>
          <div className="hack-hud">
            <span>🐛 {squashed}/{GOAL}</span>
            <div className="hack-bar"><i style={{ width: `${pct}%` }} /></div>
            <span>system restored {pct}%</span>
            <span className={time <= 5 ? 'hack-red' : ''}>⏱ {Math.max(0, time)}s</span>
          </div>
          {splats.map((s) => <span key={`s${s.id}`} className="hack-splat" style={{ left: s.x, top: s.y }}>✦</span>)}
          {bugs.map((b) => (
            <button key={b.id} className="hack-bug" onPointerDown={(e) => squash(b, e)}
              style={{ left: b.x, top: b.y, transform: `translate(-50%,-50%) rotate(${Math.atan2(b.vy, b.vx) * 57.3 + 90 + Math.sin(b.wob) * 12}deg)` }}
              aria-label="Squash bug">{b.kind}</button>
          ))}
        </>
      )}

      {(phase === 'won' || phase === 'lost') && (
        <div className="hack-term hack-end">
          <div className="hack-term-bar">{phase === 'won' ? '✓ security.exe' : '⚠ security.exe'}</div>
          <div className="hack-term-body">
            {phase === 'won' ? (
              <>
                <div className="hack-green">✓ all bugs squashed</div>
                <div className="hack-green">✓ betulcetintas.com restored</div>
                <p>You saved my portfolio! 🎉 Thank you, hero. Welcome in.</p>
              </>
            ) : (
              <>
                <div className="hack-red">⚠ the bugs got away ({squashed}/{GOAL})</div>
                <p>Don't worry, I patched it myself 😌 Welcome in.</p>
              </>
            )}
            <div className="hack-end-btns">
              <button className="hack-go" onClick={finish}>Enter the site →</button>
              {phase === 'lost' && (
                <button className="hack-again" onClick={() => { setSquashed(0); setTime(TIME); setSplats([]); setPhase('play'); }}>Try again</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
