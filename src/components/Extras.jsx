import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TRACKS } from './widgets/MediaWidget';
import GoldMiner, { GOLD_SPEC } from './games/GoldMiner';
import ComfyCakes, { CAKE_SPEC } from './games/ComfyCakes';
import Inspector from './games/Inspector';

const ITEMS = [
  { id: 'gallery', label: 'Gallery', img: './fun/Gallery.png' },
  { id: 'music', label: 'Music', img: './fun/Music.png' },
  { id: 'movies', label: 'Movies', img: './fun/Movies.png' },
];

const BABIES = [
  { src: './gallery/babies/baby-01.jpg', cap: 'looking up' },
  { src: './gallery/babies/baby-02.jpg', cap: 'on the landing' },
  { src: './gallery/babies/baby-03.jpg', cap: 'unimpressed' },
  { src: './gallery/babies/baby-04.jpg', cap: 'up close' },
  { src: './gallery/babies/baby-05.jpg', cap: 'co-pilot' },
  { src: './gallery/babies/baby-06.jpg', cap: 'nap time' },
  { src: './gallery/babies/baby-07.jpg', cap: 'judging you' },
  { src: './gallery/babies/baby-08.jpg', cap: 'with her toy' },
  { src: './gallery/babies/baby-09.jpg', cap: 'comfy' },
  { src: './gallery/babies/baby-10.jpg', cap: 'treat time' },
  { src: './gallery/babies/baby-11.jpg', cap: 'belly up' },
  { src: './gallery/babies/baby-12.jpg', cap: 'the stare' },
  { src: './gallery/babies/baby-13.jpg', cap: 'sunbathing' },
  { src: './gallery/babies/baby-14.jpg', cap: 'let me out' },
  { src: './gallery/babies/baby-15.jpg', cap: 'paw up' },
  { src: './gallery/babies/baby-16.jpg', cap: 'long cat' },
  { src: './gallery/babies/baby-17.jpg', cap: 'study buddy' },
  { src: './gallery/babies/baby-18.jpg', cap: 'loaf mode' },
  { src: './gallery/babies/baby-19.jpg', cap: 'blep' },
  { src: './gallery/babies/baby-20.jpg', cap: 'blanket fort' },
  { src: './gallery/babies/baby-21.jpg', cap: 'nap together' },
  { src: './gallery/babies/baby-22.jpg', cap: 'helping me study' },
];
const PLACES = [
  { src: './gallery/places/place-01.jpg', cap: 'sunset on the water' },
  { src: './gallery/places/place-02.jpg', cap: 'washington, dc' },
  { src: './gallery/places/place-03.jpg', cap: 'air & space museum, dc' },
  { src: './gallery/places/place-04.jpg', cap: 'new york at night' },
  { src: './gallery/places/place-05.jpg', cap: 'toronto from above' },
  { src: './gallery/places/place-06.jpg', cap: 'ottawa canal at night' },
  { src: './gallery/places/place-07.jpg', cap: 'chicago river at night' },
  { src: './gallery/places/place-08.jpg', cap: 'lake michigan' },
  { src: './gallery/places/place-09.jpg', cap: 'chicago river' },
  { src: './gallery/places/place-10.jpg', cap: 'cloud gate, chicago' },
  { src: './gallery/places/place-11.jpg', cap: 'old montreal' },
  { src: './gallery/places/place-12.jpg', cap: 'montreal from the mountain' },
  { src: './gallery/places/place-13.jpg', cap: 'the oculus, new york' },
  { src: './gallery/places/place-14.jpg', cap: 'tribeca, new york' },
  { src: './gallery/places/place-15.jpg', cap: 'central park at dusk' },
  { src: './gallery/places/place-16.jpg', cap: 'fifth avenue, new york' },
  { src: './gallery/places/place-17.jpg', cap: 'hoboken' },
  { src: './gallery/places/place-18.jpg', cap: 'new york public library' },
  { src: './gallery/places/place-19.jpg', cap: 'woolsey hall, yale' },
  { src: './gallery/places/place-20.jpg', cap: 'new river gorge bridge' },
  { src: './gallery/places/place-21.jpg', cap: 'dusable bridge, chicago' },
  { src: './gallery/places/place-22.jpg', cap: 'northern lights' },
  { src: './gallery/places/place-23.jpg', cap: 'soho, new york' },
  { src: './gallery/places/place-24.jpg', cap: 'brooklyn bridge at sunset' },
  { src: './gallery/places/place-25.jpg', cap: 'old quebec' },
  { src: './gallery/places/place-26.jpg', cap: 'quebec city at night' },
  { src: './gallery/places/place-27.jpg', cap: 'petit champlain' },
  { src: './gallery/places/place-28.jpg', cap: 'umbrella alley, quebec' },
];
const MORE = [
  { src: './lilies.png', cap: 'lilies' },
  { src: './rug.png', cap: 'home' },
  { src: './quote-bg.jpg', cap: 'words to live by' },
];


const MOVIES = [];

function RetroWindow({ title, onClose, z, onFocus, start, children, width }) {
  const [pos, setPos] = useState(start);
  // keep a window that just got wider on screen
  useEffect(() => {
    if (!width) return;
    setPos((p) => {
      const maxX = Math.max(16, window.innerWidth - Math.min(width, window.innerWidth - 32) - 16);
      const big = width > 900;
      const next = { x: Math.min(p.x, maxX), y: big ? Math.min(p.y, 44) : p.y };
      return next.x !== p.x || next.y !== p.y ? next : p;
    });
  }, [width]);
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
    <div className={`retro-win${width ? ' retro-wide' : ''}`} style={{ left: pos.x, top: pos.y, zIndex: z, width }} onPointerDown={onFocus}>
      <div className="retro-bar" onPointerDown={down} onPointerMove={move} onPointerUp={up}>
        <div className="traffic-lights">
          <button className="tl tl-red" onClick={onClose} aria-label={`Close ${title}`}>×</button>
          <span className="tl tl-yellow tl-off" />
          <span className="tl tl-green tl-off" />
        </div>
        <span className="retro-title">{title}</span>
      </div>
      <div className="retro-body">{children}</div>
    </div>
  );
}

function Gallery() {
  const [album, setAlbum] = useState(null); // null = top level, or 'babies' / 'places'
  const [big, setBig] = useState(null);
  const ALB = { babies: { name: 'my babies', list: BABIES }, places: { name: 'places', list: PLACES } };
  const list = album ? ALB[album].list : MORE;

  if (big !== null) {
    const p = list[big];
    return (
      <div className="gal-big">
        <img src={p.src} alt={p.cap} />
        <div className="gal-nav">
          <button onClick={() => setBig((big - 1 + list.length) % list.length)}>◀</button>
          <span>{p.cap} · {big + 1}/{list.length}</span>
          <button onClick={() => setBig((big + 1) % list.length)}>▶</button>
        </div>
        <button className="retro-btn" onClick={() => setBig(null)}>{album ? `back to ${ALB[album].name}` : 'back to all'}</button>
      </div>
    );
  }

  const tile = (p, i, onClick) => (
    <button key={p.src} className="polaroid" style={{ '--r': `${(i % 2 ? 1 : -1) * (1.5 + (i % 3))}deg` }} onClick={onClick}>
      <img src={p.src} alt={p.cap} loading="lazy" />
      <span>{p.cap}</span>
    </button>
  );

  if (album) {
    return (
      <div className="gal">
        <div className="gal-path">
          <button onClick={() => setAlbum(null)}>← Gallery</button>
          <span>/ {ALB[album].name}</span>
          <small>{list.length} photos</small>
        </div>
        <div className="gal-grid">{list.map((p, i) => tile(p, i, () => setBig(i)))}</div>
      </div>
    );
  }

  return (
    <div className="gal">
      <div className="gal-grid">
        <button className="polaroid gal-folder" style={{ '--r': '-2deg' }} onClick={() => setAlbum('babies')} aria-label={`Open my babies, ${BABIES.length} photos`}>
          <span className="gal-stack" aria-hidden="true"><i /><i /></span>
          <img src="./cats.jpg" alt="" />
          <span>my babies</span>
          <em>{BABIES.length} photos</em>
        </button>
        <button className="polaroid gal-folder" style={{ '--r': '2.5deg' }} onClick={() => setAlbum('places')} aria-label={`Open places, ${PLACES.length} photos`}>
          <span className="gal-stack" aria-hidden="true"><i /><i /></span>
          <img src={PLACES[0].src} alt="" />
          <span>places</span>
          <em>{PLACES.length} photos</em>
        </button>
        {MORE.map((p, i) => tile(p, i + 2, () => setBig(i)))}
      </div>
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
      <div className="music-now">{st.playing ? '// now playing' : '// pick a song'}</div>
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
        <img className="reel" src="./fun/Movies.png" alt="" />
        <p>Coming soon</p>
        <small>my favorite films are on their way</small>
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

const GAMES = { goldminer: { Game: GoldMiner, spec: GOLD_SPEC }, cakes: { Game: ComfyCakes, spec: CAKE_SPEC } };

// Play · See how it works
function GameShell({ id, view, setView, active }) {
  const probe = useRef(null);
  const ctl = useRef({ paused: false, slow: false, step: 0 });
  const { Game, spec } = GAMES[id];
  const inspect = view === 'inspect';
  return (
    <div className={`gshell${inspect ? ' inspecting' : ''}`}>
      <div className="gtabs" role="tablist" aria-label="View">
        <button role="tab" aria-selected={!inspect} className={!inspect ? 'on' : ''} onClick={() => setView('play')}>Play</button>
        <span aria-hidden="true">·</span>
        <button role="tab" aria-selected={inspect} className={inspect ? 'on' : ''} onClick={() => setView('inspect')}>See how it works</button>
      </div>
      <div className="gshell-row">
        <div className="gshell-game"><Game probe={probe} ctl={ctl} active={active} /></div>
        {inspect && <Inspector spec={spec} probe={probe} ctl={ctl} />}
      </div>
    </div>
  );
}

const BODIES = { gallery: Gallery, music: Music, movies: Movies };
const WIDTHS = { goldminer: 680, cakes: 680, gallery: 520 };
const INSPECT_WIDTHS = { goldminer: 1010, cakes: 1010 };
const TITLES = { gallery: 'Gallery', music: 'Music', movies: 'Movies', goldminer: 'Gold Miner', cakes: 'Comfy Cakes' };

export default function Extras({ windowsOnly = false }) {
  const [open, setOpen] = useState(false);
  const [wins, setWins] = useState([]); // ids in z order
  const [views, setViews] = useState({}); // game id -> 'play' | 'inspect'
  const [sparks, setSparks] = useState(0);

  useEffect(() => {
    const onOpen = (e) => {
      const d = typeof e.detail === 'string' ? { id: e.detail } : e.detail;
      if (d.view) setViews((v) => ({ ...v, [d.id]: d.view }));
      setWins((w) => [...w.filter((x) => x !== d.id), d.id]);
    };
    window.addEventListener('open-extra', onOpen);
    return () => window.removeEventListener('open-extra', onOpen);
  }, []);

  const toggleZip = () => { setOpen((o) => !o); setSparks((n) => n + 1); };
  const launch = (id) => setWins((w) => [...w.filter((x) => x !== id), id]);
  const close = (id) => setWins((w) => w.filter((x) => x !== id));

  const starts = {
    gallery: { x: Math.round(window.innerWidth * 0.36), y: Math.round(window.innerHeight * 0.14) },
    music: { x: Math.round(window.innerWidth * 0.44), y: Math.round(window.innerHeight * 0.22) },
    movies: { x: Math.round(window.innerWidth * 0.52), y: Math.round(window.innerHeight * 0.18) },
    goldminer: { x: Math.max(16, Math.round(window.innerWidth / 2 - 340)), y: Math.max(40, Math.round(window.innerHeight / 2 - 330)) },
    cakes: { x: Math.max(16, Math.round(window.innerWidth / 2 - 340)), y: Math.max(40, Math.round(window.innerHeight / 2 - 330)) },
  };

  return (
    <>
      {!windowsOnly && <div className={`extras${open ? ' open' : ''}`}>
        <button className="zip-icon" onClick={toggleZip} aria-expanded={open} title={open ? 'Zip it back up' : 'Open me'}>
          <span className="zip-svg"><img src={open ? './fun/Extras.png' : './fun/Extras_Zip.png'} alt="" draggable="false" /></span>
          <span className="zip-label">{open ? 'extras' : 'extras.zip'}</span>
          {sparks > 0 && (
            <span key={sparks} className="sparks" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ '--a': `${i * 45}deg` }} />)}
            </span>
          )}
        </button>
        {ITEMS.map((it, i) => (
          <button key={it.id} className="fun-icon" style={{ '--i': i }} onClick={() => launch(it.id)} tabIndex={open ? 0 : -1}>
            {it.img ? <img src={it.img} alt="" draggable="false" /> : <span className="game-tile">{it.tile}</span>}
            <span>{it.label}</span>
          </button>
        ))}
      </div>}
      {createPortal(wins.map((id, z) => {
        const Body = BODIES[id];
        const view = views[id] || 'play';
        const game = !!GAMES[id];
        const width = game && view === 'inspect' ? INSPECT_WIDTHS[id] : WIDTHS[id];
        return (
          <RetroWindow key={id} title={game && view === 'inspect' ? `${TITLES[id]} · inspector` : TITLES[id]} z={600 + z} start={starts[id]} width={width}
            onClose={() => close(id)} onFocus={() => launch(id)}>
            {game ? <GameShell id={id} view={view} active={z === wins.length - 1} setView={(v) => setViews((s) => ({ ...s, [id]: v }))} /> : <Body />}
          </RetroWindow>
        );
      }), document.body)}
    </>
  );
}
