import { useState, useRef } from 'react';

// Positions use vw/vh so they scale with the screen. Stickers can be dragged around.
const STICKERS = [
  { src: 'doily.png', alt: 'Lace doily', style: { left: '26.1vw', top: '3.2vh', height: '15.3vh' }, cls: 'flat' },
  { src: 'turkish-coffee.png', alt: 'Turkish coffee', style: { left: '28.3vw', top: '4.6vh', height: '8.9vh' } },
  { src: 'evil-eye.png', alt: 'Evil eye charm', style: { left: '38.7vw', top: '28px', height: '11.8vh' }, cls: 'swing' },
  { src: 'cat-loaf.png', alt: 'Loaf cat', style: { left: '84.3vw', top: '4.4vh', height: '8.9vh' } },
  { src: 'pickle-sleepy.png', alt: 'Sleepy pickle', style: { left: '65vw', top: '20.5vh', height: '21.8vh' } },
  { src: 'lace-corner.png', alt: 'Lace corner', style: { left: '3vw', top: '46.7vh', height: '10vh' }, cls: 'flat' },
  { src: 'cat-sitting.png', alt: 'Grumpy cat', style: { left: '3.5vw', top: '79.5vh', height: '13.2vh' } },
  { src: 'pickle-notes.png', alt: 'Pickle taking notes', style: { left: '64.8vw', top: '81.3vh', height: '16vh' } },
];

function Sticker({ s }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  const down = (e) => {
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drag.current) return;
    setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
  };
  const up = () => { drag.current = null; };
  return (
    <img
      src={`./stickers/${s.src}`}
      alt={s.alt}
      draggable={false}
      className={`sticker ${s.cls || ''}`}
      style={{ ...s.style, translate: `${offset.x}px ${offset.y}px` }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  );
}

function StickyNote() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="sticky-note" role="note">
      <div className="sticky-head">
        <span>note.txt</span>
        <button className="sticky-x" onClick={() => setOpen(false)} aria-label="Close note">×</button>
      </div>
      <p>psst! the stickers aren't glued down.</p>
      <p>drag them anywhere you like.</p>
      <p className="sticky-small">also, click the ★ in the top left 5 times.</p>
    </div>
  );
}

export default function Stickers() {
  return (
    <>
      <div className="stickers-layer" aria-hidden="true">
        {STICKERS.map((s) => <Sticker key={s.src} s={s} />)}
      </div>
      <StickyNote />
    </>
  );
}
