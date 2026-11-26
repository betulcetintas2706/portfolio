import { useState, useRef } from 'react';

// Positions use vw/vh so they scale with the screen. Stickers can be dragged around.
const STICKERS = [
  { src: 'evil-eye.png', alt: 'Evil eye charm', style: { left: '43vw', top: '28px', height: '13vh' }, cls: 'swing' },
  { src: 'cat-sitting.png', alt: 'Grumpy cat', style: { left: '27vw', top: '4.5vh', height: '13vh' } },
  { src: 'cat-loaf.png', alt: 'Loaf cat', style: { left: '78vw', top: '3.2vh', height: '9vh' } },
  { src: 'doily.png', alt: 'Lace doily', style: { left: '77vw', top: '57vh', height: '18vh' }, cls: 'flat' },
  { src: 'turkish-coffee.png', alt: 'Turkish coffee', style: { left: '78.6vw', top: '59.5vh', height: '11vh' } },
  { src: 'pickle-sleepy.png', alt: 'Sleepy pickle', style: { left: '86vw', top: '71vh', height: '24vh' } },
  { src: 'pickle-cool.png', alt: 'Cool pickle', style: { left: '27vw', top: '81vh', height: '17vh' } },
  { src: 'pickle-notes.png', alt: 'Pickle taking notes', style: { left: '66vw', top: '81vh', height: '17vh' } },
  { src: 'lace-corner.png', alt: 'Lace corner', style: { left: '1.6vw', top: '82vh', height: '11vh' }, cls: 'flat' },
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

export default function Stickers() {
  return (
    <div className="stickers-layer" aria-hidden="true">
      {STICKERS.map((s) => <Sticker key={s.src} s={s} />)}
    </div>
  );
}
