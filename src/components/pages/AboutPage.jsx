import { personalInfo, about } from '../../data/portfolioData';
import { actions } from '../../lib/actions';

export default function AboutPage() {
  const ed = personalInfo.education;
  return (
    <div className="page active ab">
      <section className="ab-hero">
        <div className="framed-photo ab-photo">
          <img src={personalInfo.photo} alt={`${personalInfo.name} ${personalInfo.lastName}`} />
          <img className="frame-overlay" src="./frame.png" alt="" />
        </div>
        <div className="ab-hero-text">
          <div className="ab-kicker">{about.kicker}</div>
          <h2 className="ab-title">{about.title[0]}<br /><em>{about.title[1]}</em></h2>
          <p className="ab-intro">{about.intro}</p>
          <div className="ab-meta">BASc Computer Engineering · PEY Co-op</div>
        </div>
      </section>

      <section className="ab-stats">
        {about.stats.map((s) => (
          <div key={s.label} className="ab-stat">
            <div className="ab-stat-num">{s.num}</div>
            <div className="ab-stat-label">{s.label}</div>
            {s.sub && <div className="ab-stat-sub">{s.sub}</div>}
          </div>
        ))}
      </section>

      <section className="ab-building">
        <span className="ab-label">Currently building</span>
        {about.building.map((b, i) => (
          <span key={b.name} className="ab-build">
            {i > 0 && <i aria-hidden="true">·</i>}
            <button onClick={() => actions.project(b.project)}>{b.name}</button>
            <small>{b.note}</small>
          </span>
        ))}
      </section>

      <section className="ab-draws">
        <h3 className="ab-h">What draws me in</h3>
        {about.drawsMe.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        <div className="ab-areas">
          {about.areas.map((a, i) => (
            <div key={a.title} className="ab-area">
              <div className="ab-area-n">{String(i + 1).padStart(2, '0')}</div>
              <div className="ab-area-t">{a.title}</div>
              <div className="ab-area-tags">{a.tags.join(' · ')}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ab-foot">
        <div className="ab-edu">
          <div className="ab-small">Education</div>
          <div className="ab-big">{ed.school}</div>
          <p>B.A.Sc. Computer Engineering<br />PEY Co-op</p>
          <details className="ab-more">
            <summary>Scholarships &amp; coursework</summary>
            <p><b>Scholarships:</b> {ed.awards.join(' · ')}</p>
            <p><b>Coursework:</b> {ed.coursework.join(' · ')}</p>
          </details>
        </div>
        <div className="ab-open">
          <div className="ab-small">Summer 2027</div>
          <div className="ab-big">Open to internships</div>
          <p>Software, AI, and hardware engineering.</p>
          <a className="ab-cv" href={personalInfo.resume} target="_blank" rel="noopener noreferrer">View résumé ↗</a>
        </div>
      </section>
    </div>
  );
}
