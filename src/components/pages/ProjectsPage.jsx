import { projects, personalInfo } from '../../data/portfolioData';
import { useState } from 'react';
import { projectIconMap } from '../Icons';
import { caseForProject } from '../../data/caseStudies';
import { CaseStudy } from './CaseStudyPage';

const PLAYABLE = { 'Gold Miner (FPGA Game)': 'goldminer', 'Comfy Cakes': 'cakes' };

function ProjectCard({ proj, onCase }) {
  const caseId = caseForProject[proj.title];
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
        {PLAYABLE[proj.title] && (
          <button className="case-open play-open" onClick={() => window.dispatchEvent(new CustomEvent('open-extra', { detail: PLAYABLE[proj.title] }))}>
            ▶ Play it here
          </button>
        )}
        {caseId && onCase && (
          <button className="case-open" onClick={() => onCase(caseId)}>Read the case study →</button>
        )}
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

export default function ProjectsPage({ showPage, simple }) {
  const [inline, setInline] = useState(null);
  const onCase = (id) => {
    if (simple) setInline(id);
    else showPage(`case-${id}`);
  };
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">My <span>Projects</span></div>
        <div className="section-sub">Things I've built from scratch</div>
      </div>
      <div className="skill-category-title" style={{ margin: '4px 0 10px' }}>// Featured Work</div>
      <div className="projects-grid">
        {featured.map((proj) => <ProjectCard key={proj.title} proj={proj} onCase={onCase} />)}
      </div>
      {simple && inline && (
        <div className="case-inline">
          <CaseStudy id={inline} compact onOpen={setInline} onBack={() => setInline(null)} />
        </div>
      )}
      <div className="skill-category-title" style={{ margin: '22px 0 10px' }}>// More Projects</div>
      <div className="projects-grid">
        {rest.map((proj) => <ProjectCard key={proj.title} proj={proj} />)}
      </div>
    </div>
  );
}
