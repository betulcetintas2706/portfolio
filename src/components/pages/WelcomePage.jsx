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

const K = (t) => <span className="tk-k">{t}</span>;
const S = (t) => <span className="tk-s">{t}</span>;
const N = (t) => <span className="tk-n">{t}</span>;
const C = (t) => <span className="tk-c">{t}</span>;
const F = (t) => <span className="tk-f">{t}</span>;
const CODE = [
  <>{K('class')} {F('Betul')}(Engineer):</>,
  <>{'    '}focus   = [{S('"AI agents"')}, {S('"ASIC / FPGA"')}, {S('"iOS"')}]</>,
  <>{'    '}shipped = [{S('"Meducine"')}, {S('"NanoTrade"')}, {S('"IRIS"')}, {S('"49th"')}]</>,
  <>{'    '}roles   = {N('6')}   {C('# fintech, health tech, data, startups')}</>,
  <>{'    '}awards  = {N('5')}   {C('# incl. 1st @ Harvard HSIL 2026')}</>,
  <>{'    '}open_to = {S('"Summer 2027 internships"')}</>,
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
            New here? Take a quick tour
          </button>
        </div>
      )}
      <div className="framed-photo hero-framed"><img src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} /><img className="frame-overlay" src="./frame.png" alt="" /></div>

      <div>
        <div className="hero-title">Hi, I'm <span>{personalInfo.name}</span>.</div>
      </div>

      <div className="hero-tagline">{personalInfo.headline}</div>

      <div className="hero-chips">
        <span>AI &amp; Hardware Engineer</span><i>·</i><span>5x Hackathon Winner</span><i>·</i><span>CompE @ UofT</span>
      </div>

      <div className="code-card" aria-label="Current status">
        <div className="code-head">
          <span className="code-dots"><i /><i /><i /></span>
          <span className="code-file">status.py</span>
          <span className="code-live"><b />live</span>
        </div>
        <pre className="code-body">{CODE.map((ln, i) => (
          <div key={i} className="code-line"><span className="ln">{i + 1}</span><span>{ln}</span></div>
        ))}<div className="code-line"><span className="ln">{CODE.length + 1}</span><span className="caret">▍</span></div></pre>
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
