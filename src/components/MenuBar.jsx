import { useState, useEffect } from 'react';
import { MenuStarIcon } from './Icons';
import { MOD } from './Launcher';

export default function MenuBar({ showPage, onSimple }) {
  const [time, setTime] = useState('');
  const [clicks, setClicks] = useState(0);
  const [egg, setEgg] = useState(false);
  const starClick = () => {
    const n = clicks + 1;
    setClicks(n);
    if (n >= 5) { setEgg(true); setClicks(0); setTimeout(() => setEgg(false), 4500); }
  };

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const links = [
    { label: 'Résumé', href: './BetulCetintas-Resume.pdf?v=2029' },
    { label: 'GitHub', href: 'https://github.com/betulcetintas2706' },
    { label: 'Devpost', href: 'https://devpost.com/betulcetintas2706' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/betul-cetintas/' },
  ];

  return (
    <div className="menubar">
      <div className="menubar-logo" onClick={starClick} style={{ cursor: 'pointer' }}><MenuStarIcon /></div>
      {egg && (
        <div className="easter-egg">Merhaba! You found it. Fun fact: NanoTrade spots a flash crash 27 billion times faster than the 2010 crash unfolded. ⚡</div>
      )}
      <div className="menubar-items">
        <div className="menubar-item" onClick={() => showPage('home')}>Portfolio</div>
        {links.map((l) => (
          <a key={l.label} className="menubar-item" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
        ))}
      </div>
      <div className="menubar-right">
        <button className="simple-toggle lx-open" onClick={() => window.dispatchEvent(new CustomEvent('open-launcher', { detail: '' }))} title="Search everything">
          <span aria-hidden="true">⌕</span> Search <kbd>{MOD}</kbd><kbd>K</kbd>
        </button>
        <button className="simple-toggle term-toggle" onClick={() => window.dispatchEvent(new Event('open-terminal'))} title="Open the terminal (shortcut: `)">&gt;_ Terminal</button>
        <button className="simple-toggle" onClick={onSimple} title="A plain, scrollable version of this site">Simple view</button>
        <span className="sys-status" title="All systems running"><b />online · v2.6 · YYZ</span>
        <span className="mono-time">{time}</span>
      </div>
    </div>
  );
}
