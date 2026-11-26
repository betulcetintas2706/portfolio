const icons = [
  { page: 'home', label: 'Welcome', imgSrc: './f_welcome.png' },
  { page: 'about', label: 'About.txt', imgSrc: './f2.png' },
  { page: 'experience', label: 'Experience', imgSrc: './f3.png' },
  { page: 'projects', label: 'Projects', imgSrc: './f4.png' },
  { page: 'skills', label: 'Skills', imgSrc: './f5.png' },
  { page: 'awards', label: 'Awards', imgSrc: './f1.png' },
  { page: 'contact', label: 'Contact', imgSrc: './f_contact.png' },
  { href: './BetulCetintas-Resume.pdf', page: 'resume', label: 'Resume.pdf', imgSrc: './f6.png' },
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
    </div>
  );
}
