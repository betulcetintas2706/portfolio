import { StarIcon, UserIcon, BriefcaseIcon, CodeIcon, LayersIcon, PhoneIcon } from './Icons';

const dockItems = [
  { page: 'home', Icon: StarIcon, label: 'Welcome' },
  { page: 'about', Icon: UserIcon, label: 'About' },
  { page: 'experience', Icon: BriefcaseIcon, label: 'Experience' },
  'divider',
  { page: 'projects', Icon: CodeIcon, label: 'Projects' },
  { page: 'skills', Icon: LayersIcon, label: 'Skills' },
  'divider',
  { page: 'contact', Icon: PhoneIcon, label: 'Contact' },
];

export default function Dock({ activePage, showPage }) {
  return (
    <div className="dock">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="20%" stopColor="#e2c069" />
            <stop offset="45%" stopColor="#f8e597" />
            <stop offset="70%" stopColor="#b48c36" />
            <stop offset="100%" stopColor="#ffe6a0" />
          </linearGradient>
        </defs>
      </svg>
      {dockItems.map((item, i) => {
        if (item === 'divider') return <div key={`div-${i}`} className="dock-divider" />;
        const { page, Icon, label } = item;
        return (
          <div
            key={page}
            className={`dock-item${activePage === page ? ' active' : ''}`}
            onClick={() => showPage(page)}
          >
            <div className="dock-tooltip">{label}</div>
            <div className="dock-icon"><Icon /></div>
            <div className="dock-dot" />
          </div>
        );
      })}
    </div>
  );
}
