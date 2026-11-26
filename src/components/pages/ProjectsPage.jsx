import { projects, personalInfo } from '../../data/portfolioData';
import { projectIconMap } from '../Icons';

function ProjectCard({ proj }) {
  const IconComp = projectIconMap[proj.icon];
  return (
    <div className="project-card">
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
          {(proj.links || [{ label: 'GitHub', url: personalInfo.github }]).map((l) => (
            <a key={l.label} className="project-link" href={l.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          {proj.award && (
            <span className="project-link outline" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              {proj.award}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">My <span>Projects</span></div>
        <div className="section-sub">Things I've built from scratch</div>
      </div>
      <div className="skill-category-title" style={{ margin: '4px 0 10px' }}>// ★ Featured Work</div>
      <div className="projects-grid">
        {featured.map((proj) => <ProjectCard key={proj.title} proj={proj} />)}
      </div>
      <div className="skill-category-title" style={{ margin: '22px 0 10px' }}>// More Projects</div>
      <div className="projects-grid">
        {rest.map((proj) => <ProjectCard key={proj.title} proj={proj} />)}
      </div>
    </div>
  );
}
