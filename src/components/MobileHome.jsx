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
        <span className="m-island" aria-hidden="true" />
        <span className="m-icons" aria-hidden="true">
          <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
          <svg viewBox="0 0 16 12"><path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3C13.5 1.4 10.9.4 8 .4S2.5 1.4.5 3.4l1.2 1.3C3.4 3.1 5.6 2.2 8 2.2zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3C11.6 4.7 9.9 4 8 4s-3.6.7-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4zm0 3.6c-.5 0-1 .2-1.4.6L8 11.6l1.4-1.6c-.4-.4-.9-.6-1.4-.6z" /></svg>
          <span className="m-batt"><i /></span>
        </span>
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
          {APPS.filter((a) => !DOCK.includes(a.label)).map((a) => <App key={a.label} app={a} />)}
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
