import { useState, useEffect } from 'react';
import { MenuStarIcon } from './Icons';

export default function MenuBar({ showPage }) {
  const [time, setTime] = useState('');

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
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="menubar">
      <div className="menubar-logo"><MenuStarIcon /></div>
      <div className="menubar-items">
        {items.map((item) => (
          <div key={item.page} className="menubar-item" onClick={() => showPage(item.page)}>
            {item.label}
          </div>
        ))}
      </div>
      <div className="menubar-right">
        <a href="https://github.com/betulcetintas2706" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>🔗 GitHub</a>
        <a href="https://www.linkedin.com/in/betul-cetintas/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>🔗 linkedin.com/in/betul-cetintas</a>
        <span>{time}</span>
      </div>
    </div>
  );
}
