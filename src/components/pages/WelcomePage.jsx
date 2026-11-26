import { personalInfo } from '../../data/portfolioData';
import { UserIcon, BriefcaseIcon, CodeIcon, LayersIcon, PhoneIcon, StarIcon, TrophyIcon } from '../Icons';

const navCards = [
  { page: 'projects', img: 'Projects', Icon: CodeIcon, title: 'Featured Work', desc: 'Meducine, NanoTrade, 49th, IRIS and more' },
  { page: 'experience', img: 'Experience', Icon: BriefcaseIcon, title: 'Experience', desc: "Where I've worked & built" },
  { page: 'awards', img: 'Awards', Icon: TrophyIcon, title: 'Awards', desc: '5 hackathon awards and scholarships' },
  { page: 'about', img: 'About', Icon: UserIcon, title: 'About Me', desc: 'Background, education & focus areas' },
  { page: 'skills', img: 'Skills', Icon: LayersIcon, title: 'Skills & Tools', desc: 'My technical toolkit' },
  { page: 'contact', img: 'Contact', Icon: PhoneIcon, title: 'Contact', desc: "Let's work together" },
];

export default function WelcomePage({ showPage, simple }) {
  return (
    <div className="page active welcome-page">
      {!simple && (
        <div className="welcome-top-btns">
          <button className="skip-simple" onClick={() => window.dispatchEvent(new Event('go-simple'))}>
            In a hurry? Skip to simple view →
          </button>
          <button className="skip-simple tour-start" onClick={() => window.dispatchEvent(new Event('start-tour'))}>
            ✦ New here? Take a quick tour
          </button>
        </div>
      )}
      <div className="framed-photo hero-framed"><img src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} /><img className="frame-overlay" src="./frame.png" alt="" /></div>

      <div>
        <div className="hero-title">Hi, I'm <span>{personalInfo.name}</span>.</div>
      </div>

      <div className="hero-tagline">{personalInfo.headline}</div>

      <div className="status-card">
        <div className="status-title">// Current Status</div>
        <ul className="status-list">
          {personalInfo.status.map((line) => (
            <li key={line}><span className="status-check">✓</span>{line}</li>
          ))}
        </ul>
      </div>

      <div className="cta-row">
        <button className="cta-btn" onClick={() => showPage('projects')}>View Featured Work</button>
        <a className="cta-btn" href={personalInfo.resume} target="_blank" rel="noreferrer">View Résumé</a>
        <button className="cta-btn outline" onClick={() => showPage('contact')}>Contact Me</button>
      </div>

      <div className="nav-cards">
        {navCards.map(({ page, img, title, desc }) => (
          <div key={page} className="nav-card" onClick={() => showPage(page)}>
            <div className="nav-card-icon has-img"><img src={`./icons/${img}.png`} alt="" /></div>
            <div className="nav-card-text">
              <div className="nav-card-title">{title}</div>
              <div className="nav-card-desc">{desc}</div>
            </div>
            <button className="nav-card-btn img-btn" aria-label={`Open ${title}`}><img src="./open-btn.png" alt="Open" /></button>
          </div>
        ))}
      </div>

      {!simple && <div className="tip-bar"><span>• TIP</span> Click the ★ in the menu bar a few times for a surprise</div>}
    </div>
  );
}
