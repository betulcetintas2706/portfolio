import Extras from './Extras';
const icons = [
  { page: 'home', label: 'Welcome', imgSrc: './f_welcome.png' },
  { page: 'about', label: 'About.txt', imgSrc: './f2.png' },
  { page: 'experience', label: 'Experience', imgSrc: './f3.png' },
  { page: 'projects', label: 'Projects', imgSrc: './f4.png' },
  { page: 'skills', label: 'Skills', imgSrc: './f5.png' },
  { page: 'awards', label: 'Awards', imgSrc: './f1.png' },
  { page: 'contact', label: 'Contact', imgSrc: './f_contact.png' },
  { href: './BetulCetintas-Resume.pdf?v=2029', page: 'resume', label: 'Resume.pdf', imgSrc: './f6.png' },
];

const GAMES = [
  { id: 'goldminer', label: 'Gold Miner', img: './fun/GoldMiner_t.png' },
  { id: 'cakes', label: 'Comfy Cakes', img: './fun/ComfyCakes_t.png' },
];

export default function DesktopIcons({ activePage, showPage }) {
  return (
    <div className="desktop-icons">
      {icons.map(({ page, label, imgSrc, href }) => (
        <div
          key={page}
          className={`desktop-icon${activePage === page ? ' active' : ''}`}
          onClick={() => (href ? window.open(href, '_blank') : showPage(page))}
        >
          <div className="icon-img" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <img 
              src={imgSrc} 
              alt={label} 
              style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} 
            />
          </div>
          <div className="icon-label">{label}</div>
        </div>
      ))}
      <Extras />
      {GAMES.map((g) => (
        <div key={g.id} className="desktop-icon game-icon" onClick={() => window.dispatchEvent(new CustomEvent('open-extra', { detail: { id: g.id, view: 'play' } }))}>
          <div className="icon-img" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <img src={g.img} alt={g.label} style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
          </div>
          <div className="icon-label">{g.label}</div>
        </div>
      ))}
    </div>
  );
}
