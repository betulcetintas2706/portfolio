import { useState, useEffect } from 'react';
import { MenuStarIcon } from './Icons';

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

  const items = [
    { label: 'Portfolio', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Experience', page: 'experience' },
    { label: 'Projects', page: 'projects' },
    { label: 'Skills', page: 'skills' },
    { label: 'Awards', page: 'awards' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="menubar">
      <div className="menubar-logo" onClick={starClick} style={{ cursor: 'pointer' }}><MenuStarIcon /></div>
      {egg && (
        <div className="easter-egg">Merhaba! You found it. Fun fact: NanoTrade spots a flash crash 27 billion times faster than the 2010 crash unfolded. ⚡</div>
      )}
      <div className="menubar-items">
        {items.map((item) => (
          <div key={item.page} className="menubar-item" onClick={() => showPage(item.page)}>
            {item.label}
          </div>
        ))}
      </div>
      <div className="menubar-right">
        <button className="simple-toggle term-toggle" onClick={() => window.dispatchEvent(new Event('open-terminal'))} title="Open the terminal (shortcut: `)">&gt;_ Terminal</button>
        <button className="simple-toggle" onClick={onSimple} title="A plain, scrollable version of this site">Simple view</button>
        <a href="./BetulCetintas-Resume.pdf?v=2029" target="_blank" rel="noopener noreferrer">Résumé</a>
        <a href="https://github.com/betulcetintas2706" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://devpost.com/betulcetintas2706" target="_blank" rel="noopener noreferrer">Devpost</a>
        <a href="https://www.linkedin.com/in/betul-cetintas/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span>{time}</span>
      </div>
    </div>
  );
}
