import { personalInfo } from '../../data/portfolioData';
import { UserIcon, BriefcaseIcon, CodeIcon, LayersIcon, PhoneIcon } from '../Icons';

const navCards = [
  { page: 'about', Icon: UserIcon, title: 'About Me', desc: 'Background, education & interests' },
  { page: 'experience', Icon: BriefcaseIcon, title: 'Experience', desc: "Where I've worked & built" },
  { page: 'projects', Icon: CodeIcon, title: 'Projects', desc: 'Explore my latest builds' },
  { page: 'skills', Icon: LayersIcon, title: 'Skills & Tools', desc: 'My technical toolkit' },
  { page: 'contact', Icon: PhoneIcon, title: 'Contact', desc: "Let's work together" },
];

export default function WelcomePage({ showPage }) {
  return (
    <div className="page active welcome-page">
      <img className="hero-photo" src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} />

      <div>
        <div className="hero-title">{personalInfo.name} <span>{personalInfo.lastName}</span></div>
      </div>

      <div className="hero-tagline">{personalInfo.tagline}</div>

      <div className="nav-cards">
        {navCards.map(({ page, Icon, title, desc }) => (
          <div key={page} className="nav-card" onClick={() => showPage(page)}>
            <div className="nav-card-icon"><Icon /></div>
            <div className="nav-card-text">
              <div className="nav-card-title">{title}</div>
              <div className="nav-card-desc">{desc}</div>
            </div>
            <button className="nav-card-btn">Open →</button>
          </div>
        ))}
      </div>

      <div className="tip-bar"><span>• TIP</span> Double-click dock icons or use the menu bar to navigate any section</div>
    </div>
  );
}
