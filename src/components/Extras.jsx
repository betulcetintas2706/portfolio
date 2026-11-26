import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TRACKS } from './widgets/MediaWidget';

const ITEMS = [
  { id: 'gallery', label: 'Gallery', img: './fun/gallery.png' },
  { id: 'music', label: 'Music', img: './fun/music.png' },
  { id: 'movies', label: 'Movies', img: './fun/movies.png' },
];

const PHOTOS = [
  { src: './cats.jpg', cap: 'the girls' },
  { src: './lilies.png', cap: 'lilies' },
  { src: './rug.png', cap: 'home' },
  { src: './quote-bg.jpg', cap: 'words to live by' },
];

const MOVIES = [];

function ZipIcon() {
  return (
    <svg viewBox="0 0 16 16" width="56" height="56" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="3" width="6" height="2" fill="#e88bb0" />
      <rect x="1" y="4" width="14" height="10" fill="#f7b6cf" />
      <rect x="1" y="4" width="14" height="1" fill="#fde1ec" />
      <rect x="1" y="13" width="14" height="1" fill="#c25a84" />
      <rect x="14" y="4" width="1" height="10" fill="#c25a84" />
      <rect x="7" y="4" width="2" height="1" fill="#6b1f35" />
      <rect x="7" y="6" width="2" height="1" fill="#6b1f35" />
      <rect x="7" y="8" width="2" height="1" fill="#6b1f35" />
      <rect x="6" y="9" width="4" height="3" fill="#e2c069" />
      <rect x="7" y="10" width="2" height="1" fill="#6b1f35" />
    </svg>
  );
}

function RetroWindow({ title, onClose, z, onFocus, start, children }) {
  const [pos, setPos] = useState(start);
  const drag = useRef(null);
  const down = (e) => {
    if (e.target.closest('button')) return;
    onFocus();
    drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => { if (drag.current) setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y }); };
  const up = () => { drag.current = null; };
  return (
    <div className="retro-win" style={{ left: pos.x, top: pos.y, zIndex: z }} onPointerDown={onFocus}>
      <div className="retro-bar" onPointerDown={down} onPointerMove={move} onPointerUp={up}>
        <span>{title}</span>
        <button onClick={onClose} aria-label={`Close ${title}`}>×</button>
      </div>
      <div className="retro-body">{children}</div>
    </div>
  );
}

function Gallery() {
  const [big, setBig] = useState(null);
  if (big !== null) {
    const p = PHOTOS[big];
    return (
      <div className="gal-big">
        <img src={p.src} alt={p.cap} />
        <div className="gal-nav">
          <button onClick={() => setBig((big - 1 + PHOTOS.length) % PHOTOS.length)}>◀</button>
          <span>{p.cap} · {big + 1}/{PHOTOS.length}</span>
          <button onClick={() => setBig((big + 1) % PHOTOS.length)}>▶</button>
        </div>
        <button className="retro-btn" onClick={() => setBig(null)}>back to all</button>
      </div>
    );
  }
  return (
    <div className="gal-grid">
      {PHOTOS.map((p, i) => (
        <button key={p.src} className="polaroid" style={{ '--r': `${(i % 2 ? 1 : -1) * (1.5 + i)}deg` }} onClick={() => setBig(i)}>
          <img src={p.src} alt={p.cap} />
          <span>{p.cap}</span>
        </button>
      ))}
    </div>
  );
}

function Music() {
  const [st, setSt] = useState({ idx: 0, playing: false });
  useEffect(() => {
    const on = (e) => setSt(e.detail);
    window.addEventListener('track-state', on);
    window.dispatchEvent(new Event('ask-track'));
    return () => window.removeEventListener('track-state', on);
  }, []);
  return (
    <div className="music-list">
      <div className="music-now">{st.playing ? '♪ now playing' : '♪ pick a song'}</div>
      {TRACKS.map((t, i) => {
        const on = st.idx === i && st.playing;
        return (
          <button key={t.id} className={`music-row${st.idx === i ? ' cur' : ''}`}
            onClick={() => window.dispatchEvent(on ? new Event('toggle-track') : new CustomEvent('play-track', { detail: i }))}>
            <span className="music-num">{on ? <span className="eq"><i /><i /><i /></span> : String(i + 1).padStart(2, '0')}</span>
            <span className="music-name">{t.title}<small>{t.artist}</small></span>
            <span className="music-act">{on ? '❚❚' : '▶'}</span>
          </button>
        );
      })}
    </div>
  );
}

function Movies() {
  if (!MOVIES.length) {
    return (
      <div className="movies-empty">
        <div className="reel">🎞️</div>
        <p>coming soon...</p>
        <small>favorite films loading</small>
      </div>
    );
  }
  return (
    <div className="film-strip">
      {MOVIES.map((m) => (
        <div key={m.title} className="film-frame">
          {m.poster && <img src={m.poster} alt="" />}
          <span>{m.title}</span>
          {m.note && <small>{m.note}</small>}
        </div>
      ))}
    </div>
  );
}

const BODIES = { gallery: Gallery, music: Music, movies: Movies };
const TITLES = { gallery: 'gallery.exe', music: 'music.exe', movies: 'movies.exe' };

export default function Extras() {
  const [open, setOpen] = useState(false);
  const [wins, setWins] = useState([]); // ids in z order
  const [sparks, setSparks] = useState(0);

  const toggleZip = () => { setOpen((o) => !o); setSparks((n) => n + 1); };
  const launch = (id) => setWins((w) => [...w.filter((x) => x !== id), id]);
  const close = (id) => setWins((w) => w.filter((x) => x !== id));

  const starts = {
    gallery: { x: Math.round(window.innerWidth * 0.36), y: Math.round(window.innerHeight * 0.14) },
    music: { x: Math.round(window.innerWidth * 0.44), y: Math.round(window.innerHeight * 0.22) },
    movies: { x: Math.round(window.innerWidth * 0.52), y: Math.round(window.innerHeight * 0.18) },
  };

  return (
    <>
      <div className={`extras${open ? ' open' : ''}`}>
        <button className="zip-icon" onClick={toggleZip} aria-expanded={open} title={open ? 'Zip it back up' : 'Open me'}>
          <span className="zip-svg"><ZipIcon /></span>
          <span className="zip-label">{open ? 'extras' : 'extras.zip'}</span>
          {sparks > 0 && (
            <span key={sparks} className="sparks" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ '--a': `${i * 45}deg` }} />)}
            </span>
          )}
        </button>
        {ITEMS.map((it, i) => (
          <button key={it.id} className="fun-icon" style={{ '--i': i }} onClick={() => launch(it.id)} tabIndex={open ? 0 : -1}>
            <img src={it.img} alt="" draggable="false" />
            <span>{it.label}</span>
          </button>
        ))}
      </div>
      {createPortal(wins.map((id, z) => {
        const Body = BODIES[id];
        return (
          <RetroWindow key={id} title={TITLES[id]} z={600 + z} start={starts[id]}
            onClose={() => close(id)} onFocus={() => launch(id)}>
            <Body />
          </RetroWindow>
        );
      }), document.body)}
    </>
  );
}
