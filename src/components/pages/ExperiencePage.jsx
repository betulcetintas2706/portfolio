import { experiences } from '../../data/portfolioData';

export default function ExperiencePage() {
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">Work <span>Experience</span></div>
        <div className="section-sub">Where I've been, what I've built</div>
      </div>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-role">{exp.role}{/intern/i.test(exp.role) && <span className="type-badge">internship</span>}{/present/i.test(exp.date) && <span className="type-badge live"><b />current</span>}</div>
                <div className="exp-date">{exp.date}</div>
              </div>
              <div className="exp-company">{exp.company}</div>
              <div className="exp-desc">{exp.desc}</div>
              <div className="stack-line">{exp.tags.map((t) => t.toLowerCase()).join(' · ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
