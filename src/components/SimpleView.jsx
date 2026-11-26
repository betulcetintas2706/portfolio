import { personalInfo } from '../data/portfolioData';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import AwardsPage from './pages/AwardsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

const sections = [
  { id: 'projects', label: 'Projects', C: ProjectsPage },
  { id: 'experience', label: 'Experience', C: ExperiencePage },
  { id: 'awards', label: 'Awards', C: AwardsPage },
  { id: 'about', label: 'About', C: AboutPage },
  { id: 'skills', label: 'Skills', C: SkillsPage },
  { id: 'contact', label: 'Contact', C: ContactPage },
];

export default function SimpleView({ onDesktop }) {
  const go = (id) => {
    const el = document.getElementById(`s-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="simple-view">
      <nav className="simple-nav">
        <span className="simple-brand" onClick={() => go('top')}>Betül Cetintas</span>
        <div className="simple-links">
          {sections.map((s) => <button key={s.id} onClick={() => go(s.id)}>{s.label}</button>)}
          <a href={personalInfo.resume} target="_blank" rel="noreferrer">Résumé</a>
        </div>
        <button className="simple-desktop-btn" onClick={onDesktop}>✦ Desktop view</button>
      </nav>

      <main className="simple-main">
        <section id="s-top" className="simple-hero">
          <div className="framed-photo simple-framed"><img src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} /><img className="frame-overlay" src="./frame.png" alt="" /></div>
          <div>
            <h1>Hi, I'm <span>{personalInfo.name}</span>.</h1>
            <p className="simple-tag">{personalInfo.headline}</p>
            <ul className="status-list">
              {personalInfo.status.map((line) => (
                <li key={line}><span className="status-check">✓</span>{line}</li>
              ))}
            </ul>
            <div className="simple-hero-links">
              <a href={personalInfo.resume} target="_blank" rel="noreferrer">Résumé</a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={personalInfo.devpost} target="_blank" rel="noreferrer">Devpost</a>
              <a href="https://www.linkedin.com/in/betul-cetintas/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        {sections.map(({ id, C }) => (
          <section key={id} id={`s-${id}`} className="simple-section">
            <C showPage={go} simple />
          </section>
        ))}

        <footer className="simple-footer">
          Want the fun version? <button onClick={onDesktop}>Open desktop view ✦</button>
        </footer>
      </main>
    </div>
  );
}
