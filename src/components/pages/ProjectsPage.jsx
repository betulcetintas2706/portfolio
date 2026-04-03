import { projects } from '../../data/portfolioData';
import { projectIconMap } from '../Icons';

export default function ProjectsPage() {
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">My <span>Projects</span></div>
        <div className="section-sub">Things I've built from scratch</div>
      </div>
      <div className="projects-grid">
        {projects.map((proj, i) => {
          const IconComp = projectIconMap[proj.icon];
          return (
            <div key={i} className="project-card">
              <div className="project-thumb">
                {proj.image ? (
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  IconComp && <IconComp />
                )}
              </div>
              <div className="project-body">
                <div className="project-title">{proj.title}</div>
                <div className="project-desc">{proj.desc}</div>
                <div className="exp-tags" style={{ marginBottom: 10 }}>
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <span className="project-link">GitHub</span>
                  {proj.award && (
                    <span className="project-link outline" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                      {proj.award}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
