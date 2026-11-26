import { projects, personalInfo } from '../../data/portfolioData';
import { useEffect, useState } from 'react';
import { projectIconMap } from '../Icons';
import { caseForProject } from '../../data/caseStudies';
import { CaseStudy } from './CaseStudyPage';

const FILTERS = ['All', 'AI', 'Hardware', 'iOS', 'Full Stack'];
const has = (p, words) => p.tags.concat(p.title).some((t) => words.some((w) => t.toLowerCase().includes(w)));
const inFilter = (p, f) => {
  if (f === 'All') return true;
  if (f === 'AI') return has(p, ['ai', 'gemini', 'claude', 'computer vision', 'agent', 'adk']);
  if (f === 'Hardware') return has(p, ['verilog', 'fpga', 'asic', 'esp32', 'micro:bit', 'sensors']);
  if (f === 'iOS') return has(p, ['swift', 'react native', 'watchos']);
  return has(p, ['react', 'node', 'fastapi', 'supabase', 'typescript']);
};

const PLAYABLE = { 'Gold Miner (FPGA Game)': 'goldminer', 'Comfy Cakes': 'cakes' };

function ProjectCard({ proj, onCase }) {
  const caseId = caseForProject[proj.title];
  const IconComp = projectIconMap[proj.icon];
  return (
    <div className="project-card" id={`proj-${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
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
        <div className="stack-line">{proj.tags.map((t) => t.toLowerCase()).join(' · ')}</div>
        <div className="project-links">
          {(proj.links || [{ label: 'GitHub', url: personalInfo.github }]).map((l) => (
            <a key={l.label} className="project-link" href={l.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              {l.label} <span className="arrow">↗</span>
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
  const [filter, setFilter] = useState('All');
  // jump to a project picked in the ⌘K launcher
  useEffect(() => {
    const focus = (e) => {
      setFilter('All');
      setTimeout(() => {
        const el = document.getElementById(`proj-${e.detail}`);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
      }, 60);
    };
    window.addEventListener('focus-project', focus);
    return () => window.removeEventListener('focus-project', focus);
  }, []);
  const featured = projects.filter((p) => p.featured && inFilter(p, filter));
  const rest = projects.filter((p) => !p.featured && inFilter(p, filter));
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">My <span>Projects</span></div>
        <div className="section-sub">Things I've built from scratch</div>
      </div>
      <div className="filter-tabs" role="tablist">
        {FILTERS.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {f}<span>{projects.filter((p) => inFilter(p, f)).length}</span>
          </button>
        ))}
      </div>
      {featured.length > 0 && <div className="skill-category-title" style={{ margin: '4px 0 10px' }}>// Featured Work</div>}
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
