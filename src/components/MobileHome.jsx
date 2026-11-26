import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolioData';

const APPS = [
  { label: 'Welcome', img: './icons/Welcome.png', page: 'home' },
  { label: 'About', img: './icons/About.png', page: 'about' },
  { label: 'Experience', img: './icons/Experience.png', page: 'experience' },
  { label: 'Projects', img: './icons/Projects.png', page: 'projects' },
  { label: 'Skills', img: './icons/Skills.png', page: 'skills' },
  { label: 'Awards', img: './icons/Awards.png', page: 'awards' },
  { label: 'Contact', img: './icons/Contact.png', page: 'contact' },
  { label: 'Résumé', tile: 'cv', href: personalInfo.resume },
  { label: 'Gallery', img: './fun/Gallery.png', extra: 'gallery' },
  { label: 'Music', img: './fun/Music.png', extra: 'music' },
  { label: 'Movies', img: './fun/Movies.png', extra: 'movies' },
  { label: 'Terminal', tile: 'term', terminal: true },
  { label: 'Gold Miner', img: './fun/GoldMiner.png', extra: 'goldminer' },
  { label: 'Comfy Cakes', img: './fun/ComfyCakes.png', extra: 'cakes' },
];

const DOCK = ['Projects', 'Experience', 'Music', 'Contact'];

function Tile({ app }) {
  if (app.tile === 'cv') return <span className="m-tile m-tile-cv">CV</span>;
  if (app.tile === 'term') return <span className="m-tile m-tile-term">&gt;_</span>;
  if (app.tile === 'game') return <span className="m-tile m-tile-game">{app.emoji}</span>;
  return <img src={app.img} alt="" draggable="false" />;
}

export default function MobileHome({ showPage, onSimple }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M/, ''));
    u(); const id = setInterval(u, 10000); return () => clearInterval(id);
  }, []);

  const open = (app) => {
    if (app.href) window.open(app.href, '_blank', 'noopener');
    else if (app.extra) window.dispatchEvent(new CustomEvent('open-extra', { detail: app.extra }));
    else if (app.terminal) window.dispatchEvent(new Event('open-terminal'));
    else showPage(app.page);
  };

  const App = ({ app, label = true }) => (
    <button className="m-app" onClick={() => open(app)} aria-label={app.label}>
      <span className="m-icon"><Tile app={app} /></span>
      {label && <span className="m-label">{app.label}</span>}
    </button>
  );

  return (
    <div className="mobile-home">
      <div className="m-status">
        <span className="m-time">{time}</span>
        <span className="m-site">betulcetintas.com</span>
        <span className="m-signal" aria-hidden="true">▂▄▆ ◔</span>
      </div>

      <div className="m-scroll">
        <section className="m-widget" onClick={() => showPage('home')}>
          <div className="framed-photo m-framed">
            <img src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} />
            <img className="frame-overlay" src="./frame.png" alt="" />
          </div>
          <div className="m-widget-text">
            <div className="m-hi">Hi, I'm <span>{personalInfo.name}</span>.</div>
            <div className="m-sub">Computer Engineering @ UofT · 5x hackathon winner</div>
            <div className="m-chip">Open to Summer 2027 internships</div>
          </div>
          <img className="m-widget-cat" src="./stickers/cat-loaf.png" alt="" />
        </section>

        <button className="m-search" onClick={() => window.dispatchEvent(new CustomEvent('open-launcher', { detail: '' }))}>
          <span aria-hidden="true">⌕</span> Search projects, skills, demos…
        </button>

        <div className="m-grid">
          {APPS.map((a) => <App key={a.label} app={a} />)}
        </div>

        <div className="m-dots" aria-hidden="true"><i className="on" /><i /></div>

        <button className="m-simple" onClick={onSimple}>Prefer one simple page? Tap here →</button>
      </div>

      <nav className="m-dock">
        {DOCK.map((l) => <App key={l} app={APPS.find((a) => a.label === l)} label={false} />)}
      </nav>
    </div>
  );
}
