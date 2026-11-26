import { personalInfo, about } from '../../data/portfolioData';

export default function AboutPage() {
  const ed = personalInfo.education;
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">About <span>Me</span></div>
        <div className="section-sub">A little background on who I am</div>
      </div>
      <div className="about-grid">
        <div className="about-avatar">
          <div className="avatar-circle">
            <img src={personalInfo.photo} alt={personalInfo.name} />
          </div>
          <div className="avatar-name">{personalInfo.name} {personalInfo.lastName}</div>
          <div className="avatar-role">{personalInfo.role}</div>
          <div className="avatar-badges">
            <span className="badge">{personalInfo.degree}</span>
            <span className="badge">{personalInfo.years}</span>
          </div>
        </div>
        <div className="about-bio">
          <h3>// Hello World</h3>
          <p>{about.hello}</p>
        </div>
        <div className="about-bio">
          <h3>// What Drives Me</h3>
          <p>{about.drives}</p>
        </div>
      </div>

      <div className="about-bio" style={{ marginTop: 16 }}>
        <h3>// Focus Areas</h3>
        <div className="skills-chips" style={{ marginTop: 8 }}>
          {personalInfo.focusAreas.map((f) => <span key={f} className="skill-chip">{f}</span>)}
        </div>
      </div>

      <div className="about-bio" style={{ marginTop: 16 }}>
        <h3>// Education</h3>
        <p><strong>{ed.school}</strong> · {ed.degree} · {ed.dates}</p>
        <p style={{ marginTop: 6 }}><strong>Awards:</strong> {ed.awards.join(' · ')}</p>
        <p style={{ marginTop: 6 }}><strong>Coursework:</strong> {ed.coursework.join(' · ')}</p>
      </div>

      <div className="open-to">✦ Open to Summer 2027 software, AI and hardware internships · <a href={personalInfo.resume} target="_blank" rel="noreferrer">View Résumé</a></div>

      <div className="about-stats">
        {about.stats.map((s) => (
          <div key={s.label} className="stat-box">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
