import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// First-visit mini game in three quick stages that mirror what Betül does:
//   1. Debug    (software): squash bugs that are stealing real things off the page
//   2. Rewire   (hardware): flip switches so the logic gates light the LED
//   3. Override (terminal): run `sudo restore`
// Always skippable, works with touch,. Plays on every visit.

const BUGS = 6;
const LIMIT = 45; // seconds to save the site before it is fully hacked
const NAME = 'Betül Cetintas';
const GLYPHS = '#$%&@!?*01<>/\\[]{}~^';
const LINES = [
  '> connecting to betulcetintas.com ...',
  '⚠ INTRUSION DETECTED',
  '⚠ bugs are stealing the portfolio',
  '⚠ circuit board offline · admin locked out',
  '> 3 steps to restore · you have 45 seconds',
];

const isPhone = () => window.matchMedia('(max-width: 768px)').matches;

function scramble(text, level) {
  return [...text].map((ch) => (ch !== ' ' && Math.random() < level ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : ch)).join('');
}

// Things the bugs can steal: real icons and stickers on screen.
function findLoot() {
  const sel = isPhone()
    ? '.m-app .m-icon'
    : '.dock-item .dock-icon, .desktop-icon, img.sticker';
  return [...document.querySelectorAll(sel)].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 10 && r.height > 10 && r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth;
  });
}

function lootImage(el) {
  const img = el.tagName === 'IMG' ? el : el.querySelector('img');
  if (img) return { src: img.currentSrc || img.src };
  return { text: (el.textContent || '?').trim().slice(0, 2) };
}

let nextId = 1;
function spawnBug(target) {
  const w = window.innerWidth; const h = window.innerHeight;
  let x; let y;
  if (target) {
    // crawl in from just off screen near the thing it wants to steal
    const r = target.getBoundingClientRect();
    const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
    const a = Math.random() * Math.PI * 2; const d = 160 + Math.random() * 120;
    x = Math.min(w + 10, Math.max(-10, cx + Math.cos(a) * d));
    y = Math.min(h + 10, Math.max(50, cy + Math.sin(a) * d));
  } else {
    x = Math.random() * w; y = 80 + Math.random() * (h - 160);
  }
  return { id: nextId++, x, y, vx: 0, vy: 0, target, carry: null, mode: target ? 'seek' : 'wander', wob: Math.random() * 6, kind: Math.random() > 0.5 ? '🐛' : '👾' };
}

// ---------- Stage 2: logic gate puzzle ----------
// LED = (A AND B) AND (NOT C). Starts at A=0, B=1, C=1 so two flips are needed.
function Circuit({ onSolved }) {
  const [sw, setSw] = useState({ A: 0, B: 1, C: 1 });
  const and1 = sw.A & sw.B;
  const notC = sw.C ? 0 : 1;
  const out = and1 & notC;
  const solved = useRef(false);
  useEffect(() => {
    if (out && !solved.current) { solved.current = true; setTimeout(onSolved, 900); }
  }, [out, onSolved]);
  const on = (v) => (v ? '#e2c069' : '#5a2a3a');
  const flip = (k) => { if (!solved.current) setSw((s) => ({ ...s, [k]: s[k] ? 0 : 1 })); };

  return (
    <div className="hk-circuit">
      <svg viewBox="0 0 340 170" className="hk-svg" aria-hidden="true">
        {/* wires */}
        <path d="M70 35 H130 V55 H150" stroke={on(sw.A)} strokeWidth="4" fill="none" />
        <path d="M70 85 H130 V70 H150" stroke={on(sw.B)} strokeWidth="4" fill="none" />
        <path d="M70 135 H150" stroke={on(sw.C)} strokeWidth="4" fill="none" />
        <path d="M195 62 H230 V82 H245" stroke={on(and1)} strokeWidth="4" fill="none" />
        <path d="M188 135 H230 V100 H245" stroke={on(notC)} strokeWidth="4" fill="none" />
        <path d="M290 91 H305" stroke={on(out)} strokeWidth="4" fill="none" />
        {/* AND gate 1 */}
        <path d="M150 42 H172 A20 20 0 0 1 172 82 H150 Z" fill="#2b0a14" stroke="#f2a5c4" strokeWidth="2" />
        <text x="163" y="66" className="hk-gate-t">AND</text>
        {/* NOT gate */}
        <path d="M150 122 L180 135 L150 148 Z" fill="#2b0a14" stroke="#f2a5c4" strokeWidth="2" />
        <circle cx="184" cy="135" r="4" fill="#2b0a14" stroke="#f2a5c4" strokeWidth="2" />
        <text x="160" y="139" className="hk-gate-t" style={{ fontSize: 8 }}>NOT</text>
        {/* AND gate 2 */}
        <path d="M245 71 H267 A20 20 0 0 1 267 111 H245 Z" fill="#2b0a14" stroke="#f2a5c4" strokeWidth="2" />
        <text x="258" y="95" className="hk-gate-t">AND</text>
        {/* LED */}
        <circle cx="318" cy="91" r="13" fill={out ? '#7ee08a' : '#3a1a24'} stroke={out ? '#c9ffcf' : '#f2a5c4'} strokeWidth="2" className={out ? 'hk-led-on' : ''} />
        <text x="318" y="122" className="hk-gate-t" style={{ fontSize: 9 }}>LED</text>
      </svg>
      <div className="hk-switches">
        {['A', 'B', 'C'].map((k) => (
          <button key={k} className={`hk-switch ${sw[k] ? 'on' : ''}`} onClick={() => flip(k)} aria-label={`Switch ${k} is ${sw[k] ? 'on' : 'off'}`}>
            <span className="hk-switch-k">{k}</span>
            <span className="hk-switch-track"><i /></span>
            <span className="hk-switch-v">{sw[k]}</span>
          </button>
        ))}
      </div>
      <p className="hk-hint">{out ? '✓ LED on, board back online' : 'Flip the switches until the LED turns on.'}</p>
    </div>
  );
}

// ---------- Stage 3: terminal override ----------
function Override({ onDone }) {
  const [val, setVal] = useState('');
  const [out, setOut] = useState([]);
  const [err, setErr] = useState('');
  const ran = useRef(false);
  const ref = useRef(null);
  useEffect(() => { if (!isPhone()) ref.current?.focus(); }, []);

  const run = (cmd) => {
    if (ran.current) return;
    if (cmd.trim().toLowerCase().replace(/\s+/g, ' ') !== 'sudo restore') { setErr(`command not found: ${cmd.trim() || '(empty)'} · try: sudo restore`); return; }
    ran.current = true; setErr(''); setVal('sudo restore');
    const steps = ['restoring projects/ ...... ✓', 'restoring resume.pdf ..... ✓', 'restoring stickers ....... ✓', 'admin access granted ✓'];
    steps.forEach((s, i) => setTimeout(() => setOut((o) => [...o, s]), 260 * (i + 1)));
    setTimeout(onDone, 260 * steps.length + 500);
  };

  return (
    <div className="hk-override">
      <p className="hk-hint">The site locked its owner out. Type the command below to take it back.</p>
      <div className="hk-term-line">
        <span className="hk-prompt">root@betul ~ #</span>
        <input ref={ref} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && run(val)}
          placeholder="sudo restore" spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" aria-label="Command" />
      </div>
      {err && <div className="hk-err">{err}</div>}
      {out.map((l) => <div key={l} className="hk-ok">{l}</div>)}
      {!ran.current && (
        <div className="hk-override-btns">
          <button className="hk-go" onClick={() => run(val || 'sudo restore')}>{isPhone() ? '⌨ Run sudo restore' : '↵ Run'}</button>
        </div>
      )}
    </div>
  );
}

// The villain: a mischievous pickle hacker in a robe and bunny slippers.
const TAUNTS = {
  alert: ['hehe... your portfolio is mine now 🥒', 'I already took the résumé 😏', 'good luck getting it back'],
  debug: ['my bugs are faster than you', 'ooh, that icon looks tasty', 'go little bugs, go!'],
  rewire: ['you know logic gates?? 😳', "that circuit is MY circuit"],
  override: ["you don't have root 😤", "don't you dare type that..."],
  low: ['tick tock ⏰', 'almost mine... 🥒'],
  hit: ['hey!! stop that 😠', 'my poor bug 😭', 'rude!!'],
  dead: ['MWAHAHA too slow! 🥒', 'this desktop is pickle territory now'],
  won: ["noooo! I'll be back... 🥒💨"],
};

function Villain({ mode, hit, low }) {
  const [i, setI] = useState(0);
  const key = hit ? 'hit' : low && mode !== 'dead' && mode !== 'won' ? 'low' : mode;
  const lines = TAUNTS[key] || [];
  useEffect(() => { setI(0); }, [key]);
  const bubbleRef = useRef(null);
  const [shift, setShift] = useState({ x: 0, below: false });
  // keep the speech bubble fully on screen
  useLayoutEffect(() => {
    const el = bubbleRef.current;
    if (!el) return undefined;
    const fit = () => {
      const prev = el.style.getPropertyValue('--dx');
      el.style.setProperty('--dx', '0px');
      const r = el.getBoundingClientRect();
      el.style.setProperty('--dx', prev);
      const m = 8; let dx = 0;
      if (r.left < m) dx = m - r.left;
      else if (r.right > window.innerWidth - m) dx = window.innerWidth - m - r.right;
      const below = el.classList.contains('hk-bubble-below');
      const vil = el.parentElement.getBoundingClientRect();
      const needBelow = below ? vil.top - r.height - 6 < 48 : r.top < 48;
      setShift((p) => (Math.abs(p.x - dx) > 1 || p.below !== needBelow ? { x: dx, below: needBelow } : p));
    };
    fit();
    const id = setInterval(fit, 300); // the villain moves and sways, so keep checking
    window.addEventListener('resize', fit);
    return () => { clearInterval(id); window.removeEventListener('resize', fit); };
  }, [key, i, mode]);
  useEffect(() => {
    if (lines.length < 2) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % lines.length), 2600);
    return () => clearInterval(id);
  }, [key, lines.length]);
  return (
    <div className={`hk-villain hk-v-${mode}${hit ? ' hk-v-hit' : ''}`} aria-hidden="true">
      {lines[i] && (
        <div ref={bubbleRef} className={`hk-bubble${shift.below ? ' hk-bubble-below' : ''}`} key={`${key}${i}`}
          style={{ '--dx': `${shift.x}px` }}>{lines[i]}</div>
      )}
      <img src="./stickers/pickle-hacker.png" alt="" draggable="false" />
    </div>
  );
}

export function hasSeenIntro() {
  // Plays on every visit and refresh. Add ?nointro to a link to skip it.
  try { return new URLSearchParams(window.location.search).has('nointro'); } catch { return false; }
}

export default function HackIntro({ onDone }) {
  const [phase, setPhase] = useState('alert'); // alert | debug | rewire | override | won
  const [shown, setShown] = useState(0);
  const [bugs, setBugs] = useState([]);
  const [squashed, setSquashed] = useState(0);
  const [splats, setSplats] = useState([]);
  const [name, setName] = useState(() => scramble(NAME, 0.9));
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(null);
  const bugsRef = useRef([]);
  const lootRef = useRef([]);
  const startRef = useRef(0);
  const [hit, setHit] = useState(false);
  const hitT = useRef(null);

  const level = { alert: 1, debug: 1 - (squashed / BUGS) * 0.45, rewire: 0.5, override: 0.25, won: 0, dead: 1.6 }[phase];
  const left = Math.max(0, LIMIT - elapsed);

  const restoreAll = () => {
    document.querySelectorAll('.hack-stolen, .hack-fall').forEach((el) => {
      el.classList.remove('hack-stolen', 'hack-fall'); el.style.removeProperty('--fr'); el.style.removeProperty('--fd');
    });
    document.body.classList.remove('hack-dead');
  };

  const finish = () => {
    try { localStorage.setItem('seenHackIntro', '1'); } catch { /* ignore */ }
    restoreAll();
    document.documentElement.style.removeProperty('--corrupt');
    document.body.classList.remove('hacked');
    onDone();
  };

  useEffect(() => {
    document.body.classList.add('hacked');
    return () => { document.body.classList.remove('hacked'); restoreAll(); };
  }, []);
  useEffect(() => { document.documentElement.style.setProperty('--corrupt', String(level)); }, [level]);

  // name flickers while scrambled, settles as the site heals
  useEffect(() => {
    if (phase === 'won') { setName(NAME); return undefined; }
    const id = setInterval(() => setName(scramble(NAME, Math.max(0.12, level * 0.9))), 140);
    return () => clearInterval(id);
  }, [level, phase]);

  useEffect(() => {
    if (phase !== 'alert' || shown >= LINES.length) return undefined;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 420);
    return () => clearTimeout(t);
  }, [phase, shown]);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') finish(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  // run timer from the first stage until the win
  useEffect(() => {
    if (phase === 'alert' || phase === 'won') return undefined;
    const id = setInterval(() => setElapsed((performance.now() - startRef.current) / 1000), 100);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => { startRef.current = performance.now(); setElapsed(0); setPhase('debug'); };

  // Out of time: the desktop gets fully hacked.
  useEffect(() => {
    if (['debug', 'rewire', 'override'].includes(phase) && elapsed >= LIMIT) setPhase('dead');
  }, [elapsed, phase]);

  useEffect(() => {
    if (phase !== 'dead') return undefined;
    bugsRef.current = []; setBugs([]);
    document.body.classList.add('hack-dead');
    findLoot().concat([...document.querySelectorAll('.widget-panel, .desktop-widgets-wrapper > *, .m-widget, .window')])
      .forEach((el, i) => {
        el.style.setProperty('--fr', `${(Math.random() - 0.5) * 90}deg`);
        el.style.setProperty('--fd', `${(i % 12) * 0.06}s`);
        el.classList.add('hack-fall');
      });
    return undefined;
  }, [phase]);

  const retry = () => {
    restoreAll();
    bugsRef.current = []; setBugs([]); setSquashed(0); setSplats([]);
    startRef.current = performance.now(); setElapsed(0); setPhase('debug');
  };

  // ---------- Stage 1 loop ----------
  useEffect(() => {
    if (phase !== 'debug') return undefined;
    bugsRef.current = [];
    lootRef.current = findLoot().sort(() => Math.random() - 0.5);
    let spawned = 0;
    const take = () => lootRef.current.find((el) => !el.classList.contains('hack-stolen') && !bugsRef.current.some((b) => b.target === el));
    const add = () => { if (spawned < BUGS) { bugsRef.current.push(spawnBug(take())); spawned += 1; } };
    add(); add(); add();
    const spawner = setInterval(add, 700);

    let raf; let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const w = window.innerWidth; const h = window.innerHeight;
      const phone = w <= 768;
      const sp = phone ? 95 : 140;
      bugsRef.current = bugsRef.current.map((b0) => {
        const b = { ...b0, wob: b0.wob + dt * 12 };
        if (b.mode === 'seek' && b.target) {
          const r = b.target.getBoundingClientRect();
          const tx = r.left + r.width / 2; const ty = r.top + r.height / 2;
          const d = Math.hypot(tx - b.x, ty - b.y);
          if (d < 10 || b.target.classList.contains('hack-stolen')) {
            if (!b.target.classList.contains('hack-stolen')) {
              b.carry = lootImage(b.target);
              b.target.classList.add('hack-stolen');
            }
            b.mode = 'flee';
            const a = Math.random() * Math.PI * 2;
            b.vx = Math.cos(a) * sp * 0.85; b.vy = Math.sin(a) * sp * 0.85;
          } else {
            b.vx = ((tx - b.x) / d) * sp * 1.5; b.vy = ((ty - b.y) / d) * sp * 1.5;
          }
        } else {
          if (!b.vx && !b.vy) { const a = Math.random() * Math.PI * 2; b.vx = Math.cos(a) * sp * 0.8; b.vy = Math.sin(a) * sp * 0.8; }
          if (Math.random() < 0.02) { const a = Math.atan2(b.vy, b.vx) + (Math.random() - 0.5) * 1.6; const s = Math.hypot(b.vx, b.vy); b.vx = Math.cos(a) * s; b.vy = Math.sin(a) * s; }
        }
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.mode !== 'seek') {
          if ((b.x < 24 && b.vx < 0) || (b.x > w - 24 && b.vx > 0)) b.vx = -b.vx;
          if ((b.y < 70 && b.vy < 0) || (b.y > h - 24 && b.vy > 0)) b.vy = -b.vy;
        }
        return b;
      });
      setBugs([...bugsRef.current]);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearInterval(spawner); };
  }, [phase]);

  const squash = (b, e) => {
    e.preventDefault(); e.stopPropagation();
    if (!bugsRef.current.some((x) => x.id === b.id)) return;
    bugsRef.current = bugsRef.current.filter((x) => x.id !== b.id);
    setBugs([...bugsRef.current]);
    if (b.target) {
      b.target.classList.remove('hack-stolen');
      b.target.classList.add('hack-returned');
      setTimeout(() => b.target.classList.remove('hack-returned'), 700);
    }
    setSplats((s) => [...s.slice(-8), { id: b.id, x: b.x, y: b.y }]);
    setHit(true); clearTimeout(hitT.current); hitT.current = setTimeout(() => setHit(false), 1100);
    setSquashed((n) => {
      const v = n + 1;
      if (v >= BUGS) setTimeout(() => { restoreAll(); setPhase('rewire'); }, 400);
      return v;
    });
  };

  const win = () => {
    const t = (performance.now() - startRef.current) / 1000;
    setElapsed(t);
    let prev = null;
    try { prev = parseFloat(localStorage.getItem('hackBest')); } catch { /* ignore */ }
    const b = prev && prev < t ? prev : t;
    try { localStorage.setItem('hackBest', String(b)); } catch { /* ignore */ }
    setBest({ value: b, isNew: !prev || t < prev });
    setPhase('won');
  };

  const stageNo = { debug: 1, rewire: 2, override: 3 }[phase];
  const pct = phase === 'debug' ? Math.round((squashed / BUGS) * 33) : phase === 'rewire' ? 40 : phase === 'override' ? 75 : phase === 'won' ? 100 : 0;

  return (
    <div className={`hack hack-${phase}`} role="dialog" aria-label="Save the site mini game">
      <div className="hack-scan" aria-hidden="true" />
      <button className="hack-skip" onClick={finish}>Skip intro →</button>
      <Villain mode={phase} hit={hit && phase === 'debug'} low={left <= 10 && phase !== 'alert'} />

      {phase !== 'alert' && phase !== 'won' && phase !== 'dead' && (
        <div className="hack-hud">
          <span className="hk-owner">owner: <b>{name}</b></span>
          <span className="hk-steps">
            {['Debug', 'Rewire', 'Override'].map((s, i) => (
              <i key={s} className={i + 1 < stageNo ? 'done' : i + 1 === stageNo ? 'now' : ''}>{i + 1 < stageNo ? '✓' : i + 1} {s}</i>
            ))}
          </span>
          <div className="hack-bar"><i style={{ width: `${pct}%` }} /></div>
          <span className={left <= 10 ? 'hk-low' : ''}>⏱ {Math.ceil(left)}s left</span>
        </div>
      )}

      {phase === 'alert' && (
        <div className="hack-term">
          <div className="hack-term-bar">⚠ security.exe</div>
          <div className="hack-term-body">
            <div className="hk-owner-big">owner: <b>{name}</b></div>
            {LINES.slice(0, shown).map((l) => <div key={l} className={l.startsWith('⚠') ? 'hack-red' : ''}>{l}</div>)}
            {shown >= LINES.length && (
              <div className="hack-cta">
                <p>Help me save my portfolio! 🐛 → 🔌 → ⌨️</p>
                <button className="hack-go" onClick={start}>⚔️ Fight back</button>
              </div>
            )}
            {shown < LINES.length && <span className="hack-caret">▋</span>}
          </div>
        </div>
      )}

      {phase === 'debug' && (
        <>
          <div className="hk-stage-tag">Step 1 · Debug: squash the bugs before they run off with my stuff! ({squashed}/{BUGS})</div>
          {splats.map((s) => <span key={`s${s.id}`} className="hack-splat" style={{ left: s.x, top: s.y }}>✦</span>)}
          {bugs.map((b) => (
            <button key={b.id} className="hack-bug" onPointerDown={(e) => squash(b, e)} aria-label="Squash bug"
              style={{ left: b.x, top: b.y }}>
              <span className="hk-bug-body" style={{ transform: `rotate(${Math.atan2(b.vy, b.vx) * 57.3 + 90 + Math.sin(b.wob) * 12}deg)` }}>{b.kind}</span>
              {b.carry && (b.carry.src ? <img className="hk-carry" src={b.carry.src} alt="" /> : <span className="hk-carry hk-carry-t">{b.carry.text}</span>)}
            </button>
          ))}
        </>
      )}

      {phase === 'rewire' && (
        <div className="hack-term hk-panel">
          <div className="hack-term-bar">🔌 Step 2 · Rewire the board</div>
          <div className="hack-term-body"><Circuit onSolved={() => setPhase('override')} /></div>
        </div>
      )}

      {phase === 'override' && (
        <div className="hack-term hk-panel">
          <div className="hack-term-bar">⌨️ Step 3 · Override</div>
          <div className="hack-term-body"><Override onDone={win} /></div>
        </div>
      )}

      {phase === 'dead' && (
        <>
          <div className="hk-swarm" aria-hidden="true">
            {Array.from({ length: 36 }, (_, i) => (
              <span key={i} style={{ left: `${(i * 29) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 9) * 0.15}s` }}>{i % 3 ? '🐛' : '👾'}</span>
            ))}
          </div>
          <div className="hk-dead">
            <div className="hk-dead-title" data-text="SYSTEM COMPROMISED">SYSTEM COMPROMISED</div>
            <div className="hk-dead-sub">owner: <b>{name}</b></div>
            <p>Time ran out. The bugs took everything 👾<br />betulcetintas.com belongs to them now.</p>
            <div className="hack-end-btns hk-dead-btns">
              <button className="hack-go" onClick={retry}>⚔️ Try again</button>
              <button className="hack-again" onClick={finish}>Restore from backup →</button>
            </div>
          </div>
        </>
      )}

      {phase === 'won' && (
        <>
          <div className="hk-confetti" aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => (
              <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 10) * 0.12}s`, background: ['#e2c069', '#f2a5c4', '#7ee08a', '#fdf6f0', '#8b2942'][i % 5] }} />
            ))}
          </div>
          <div className="hack-term hack-end">
            <div className="hack-term-bar">✓ security.exe</div>
            <div className="hack-term-body">
              <div className="hk-owner-big">owner: <b className="hk-name-ok">{name}</b></div>
              <div className="hack-green">✓ bugs squashed · ✓ board rewired · ✓ admin restored</div>
              <p>You saved my portfolio! 🎉 That was software, hardware and a terminal, which is pretty much what I do all day.</p>
              <div className="hk-time">Saved in <b>{elapsed.toFixed(1)}s</b> ⚡ {best && (best.isNew ? <em>new best!</em> : <span>your best: {best.value.toFixed(1)}s</span>)}</div>
              <div className="hack-end-btns">
                <button className="hack-go" onClick={finish}>Enter the site →</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
