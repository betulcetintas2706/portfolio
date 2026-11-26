import { useEffect, useLayoutEffect, useState, useCallback } from 'react';

const STEPS = [
  { sel: ['.dock'], title: 'The dock', text: 'Jump to any section from here: projects, experience, awards and more.' },
  { sel: ['.desktop-icon'], title: 'Desktop folders', text: 'The same pages live here too, plus my résumé.' },
  { sel: ['img.sticker[alt="Sleepy pickle"]'], title: 'Stickers', text: "They're not glued down. Drag them anywhere you like.", wiggle: true },
  { sel: ['.media-widget'], title: 'Music player', text: 'Press play, it really works.' },
  { sel: ['.extras'], title: 'extras.zip', text: 'Open it for my gallery, music and movies.', openZip: true, pad: 110 },
  { sel: ['.menubar-logo'], title: 'A little secret', text: 'Click the ★ five times for a surprise.' },
];

function unionRect(sels) {
  const rects = sels.flatMap((s) => [...document.querySelectorAll(s)])
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0);
  if (!rects.length) return null;
  const l = Math.min(...rects.map((r) => r.left));
  const t = Math.min(...rects.map((r) => r.top));
  const r = Math.max(...rects.map((x) => x.right));
  const b = Math.max(...rects.map((x) => x.bottom));
  return { left: l, top: t, width: r - l, height: b - t };
}

export default function Tour({ onFinish, onClose }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  const measure = useCallback(() => {
    let r = unionRect(step.sel);
    if (r && step.pad) {
      // leave room for the icons that slide out to the left
      r = { ...r, left: r.left - step.pad * 3 + 40, width: r.width + step.pad * 3 - 40 };
    }
    setRect(r);
  }, [step]);

  useLayoutEffect(() => {
    if (step.openZip) {
      const ex = document.querySelector('.extras');
      if (ex && !ex.classList.contains('open')) document.querySelector('.zip-icon')?.click();
    }
    const els = step.wiggle ? step.sel.flatMap((s) => [...document.querySelectorAll(s)]) : [];
    els.forEach((el) => el.classList.add('tour-wiggle'));
    measure();
    const t = setTimeout(measure, 650); // after the zip animation
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
      els.forEach((el) => el.classList.remove('tour-wiggle'));
    };
  }, [step, measure]);

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((n) => Math.min(n + 1, STEPS.length - 1));
      if (e.key === 'ArrowLeft') setI((n) => Math.max(n - 1, 0));
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const pad = 10;
  const hole = rect && {
    left: rect.left - pad, top: rect.top - pad,
    width: rect.width + pad * 2, height: rect.height + pad * 2,
  };

  // Place the card next to the highlight, kept inside the screen.
  const W = 290, H = 170, vw = window.innerWidth, vh = window.innerHeight;
  let card = { left: vw / 2 - W / 2, top: vh / 2 - H / 2 };
  if (hole) {
    const below = hole.top + hole.height + 16;
    const above = hole.top - H - 16;
    const left = hole.left - W - 20;
    const right = hole.left + hole.width + 20;
    if (below + H < vh) card = { top: below, left: hole.left + hole.width / 2 - W / 2 };
    else if (above > 40) card = { top: above, left: hole.left + hole.width / 2 - W / 2 };
    else if (left > 10) card = { top: hole.top + hole.height / 2 - H / 2, left };
    else card = { top: hole.top + hole.height / 2 - H / 2, left: right };
    card.left = Math.max(12, Math.min(card.left, vw - W - 12));
    card.top = Math.max(44, Math.min(card.top, vh - H - 12));
  }

  return (
    <div className="tour" role="dialog" aria-label="Site tour">
      <div className="tour-block" onClick={onClose} />
      {hole && <div className="tour-hole" style={hole} />}
      <div className="tour-card" style={{ ...card, width: W }}>
        <div className="tour-head">
          <span>{step.title}</span>
          <span className="tour-count">{i + 1}/{STEPS.length}</span>
        </div>
        <p>{step.text}</p>
        <div className="tour-dots">{STEPS.map((_, n) => <i key={n} className={n === i ? 'on' : ''} />)}</div>
        <div className="tour-btns">
          <button className="tour-skip" onClick={onClose}>Skip</button>
          <div>
            {i > 0 && <button className="tour-back" onClick={() => setI(i - 1)}>Back</button>}
            {last
              ? <button className="tour-next" onClick={onFinish}>See my Featured Work →</button>
              : <button className="tour-next" onClick={() => setI(i + 1)}>Next →</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
