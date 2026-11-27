import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/portfolioData';
import { explorer } from '../../data/projectExplorer';
import { projectIconMap, ChipIcon } from '../Icons';
import { caseForProject } from '../../data/caseStudies';
import { CaseStudy } from './CaseStudyPage';

// Project explorer: a compact list on the left, one big preview on the right.

const FILTERS = ['All', 'AI', 'Hardware', 'iOS', 'Full Stack', 'Design'];
const inFilter = (p, f) => f === 'All' || (p.cats || []).includes(f);

const PLAYABLE = { 'Gold Miner (FPGA Game)': 'goldminer', 'Comfy Cakes': 'cakes' };
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
const name = (t) => t.replace(' (FPGA Game)', '');
const openGame = (id, view) => window.dispatchEvent(new CustomEvent('open-extra', { detail: { id, view } }));
const ICON_FOR = { IRIS: 'eye', '49th': 'globe', NanoTrade: 'chip', 'Comfy Cakes': 'chip', 'Gold Miner (FPGA Game)': 'chip', RearView: 'rearview', SideQuest: 'globe', VYBE: 'music' };

function Icon({ p }) {
  if (p.logo) return <img className="px-logo" src={p.logo} alt="" />;
  const C = projectIconMap[p.icon || ICON_FOR[p.title]] || ChipIcon;
  return <C />;
}

function Preview({ p, x }) {
  const game = PLAYABLE[p.title];
  return (
    <div className={`px-panel${p.image ? '' : ' no-img'}`}>
      <div className="px-panel-label">{game ? 'Play it in the browser' : p.video ? 'Screen recording' : p.image ? 'Preview' : 'At a glance'}</div>
      <div className="px-panel-row">
        <div className={`px-shot${game ? ' game' : ''}${p.video ? ' vid' : ''}`}>
          {p.video
            ? <video key={p.video} src={p.video} poster={p.poster} autoPlay muted loop playsInline controls preload="metadata" />
            : p.image
            ? <img src={p.image} alt={`${name(p.title)} preview`} loading="lazy" />
            : <span className="px-shot-icon"><Icon p={p} /></span>}
          {game && <button className="px-shot-play" onClick={() => openGame(game, 'play')} aria-label={`Play ${name(p.title)}`}>▶</button>}
        </div>
        <div className="px-pitch">
          <div className="px-headline">{x.headline}</div>
          <ul className="px-points">{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage({ showPage, simple }) {
  const [filter, setFilter] = useState('All');
  const [sel, setSel] = useState('Meducine');
  const [inline, setInline] = useState(null);
  const [more, setMore] = useState(false);
  const detailRef = useRef(null);
  const listRef = useRef(null);

  const list = projects.filter((p) => inFilter(p, filter));
  const featured = list.filter((p) => p.featured);
  const rest = list.filter((p) => !p.featured);
  const ordered = [...featured, ...rest];
  const p = ordered.find((x) => x.title === sel) || ordered[0];
  const idx = ordered.indexOf(p);
  const x = explorer[p.title] || { kicker: '', sub: '', summary: p.desc, headline: name(p.title), points: [] };
  const caseId = caseForProject[p.title];
  const game = PLAYABLE[p.title];
  const links = p.links || [];
  const demo = links.find((l) => l.label === 'Demo');

  const pick = (title) => { setSel(title); setMore(false); setInline(null); detailRef.current?.scrollTo?.({ top: 0 }); };
  const step = (d) => pick(ordered[(idx + d + ordered.length) % ordered.length].title);
  const onCase = (id) => { if (simple) setInline(id); else showPage(`case-${id}`); };

  // jump to a project picked in the ⌘K launcher
  useEffect(() => {
    const focus = (e) => {
      const target = projects.find((q) => slug(q.title) === e.detail);
      if (target) { setFilter('All'); pick(target.title); }
    };
    window.addEventListener('focus-project', focus);
    return () => window.removeEventListener('focus-project', focus);
  }, []);

  // keep the selected row visible in the list
  useEffect(() => {
    listRef.current?.querySelector('.px-item.on')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [p.title, filter]);

  const onListKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  const Item = ({ q }) => {
    const qx = explorer[q.title] || {};
    return (
      <button role="option" aria-selected={q === p} className={`px-item${q === p ? ' on' : ''}`} onClick={() => pick(q.title)} id={`proj-${slug(q.title)}`}>
        <span className="px-item-icon"><Icon p={q} /></span>
        <span className="px-item-text">
          <b>{name(q.title)}</b>
          <small>{qx.sub}</small>
        </span>
        {PLAYABLE[q.title] && <span className="px-item-tag">play</span>}
      </button>
    );
  };

  return (
    <div className="page active px">
      {simple && (
        <div className="section-header px-simple-head">
          <div className="section-title">My <span>Projects</span></div>
          <div className="section-sub">Pick one to see it up close</div>
        </div>
      )}
      <div className="px-tabs" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
            {f}<sup>{projects.filter((q) => inFilter(q, f)).length}</sup>
          </button>
        ))}
      </div>

      <div className="px-body">
        <nav className="px-list" ref={listRef} role="listbox" aria-label="Projects" tabIndex={0} onKeyDown={onListKey}>
          {featured.length > 0 && <div className="px-list-label">Selected work</div>}
          {featured.map((q) => <Item key={q.title} q={q} />)}
          {rest.length > 0 && <div className="px-list-label">More projects</div>}
          {rest.map((q) => <Item key={q.title} q={q} />)}
        </nav>

        <article className="px-detail" ref={detailRef} key={p.title} aria-live="polite">
          <div className="px-top">
            <div className="px-kicker">{x.kicker}</div>
            <div className="px-count">{String(idx + 1).padStart(2, '0')} / {String(ordered.length).padStart(2, '0')}</div>
          </div>
          <h2 className="px-title">{name(p.title)}</h2>
          {p.award && <div className={`px-award${p.award === 'In Progress' ? ' wip' : ''}`}>{p.award === 'In Progress' ? 'In progress' : `★ ${p.award}`}</div>}
          <p className="px-summary">{x.summary}</p>

          <div className="px-actions">
            {caseId && <button className="px-btn primary" onClick={() => onCase(caseId)}>Explore project →</button>}
            {game && <button className="px-btn primary" onClick={() => openGame(game, 'play')}>▶ Play</button>}
            {game && <button className="px-btn dark" onClick={() => openGame(game, 'inspect')}>See how it works</button>}
            {!caseId && !game && demo && <a className="px-btn primary" href={demo.url} target="_blank" rel="noopener noreferrer">Watch demo ↗</a>}
            {links.filter((l) => !(l === demo && !caseId && !game)).map((l) => (
              <a key={l.label} className="px-link" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
            ))}
          </div>

          <Preview p={p} x={x} />

          <div className="px-built"><span>Built with</span>{p.tags.join(' · ')}</div>

          <button className="px-more-toggle" onClick={() => setMore((m) => !m)} aria-expanded={more}>
            {more ? 'Less detail ↑' : 'The full story ↓'}
          </button>
          {more && <p className="px-full">{p.desc}</p>}

          <div className="px-foot">
            <button className="px-next prev" onClick={() => step(-1)}>← Previous</button>
            <button className="px-next" onClick={() => step(1)}>Next project →</button>
          </div>

          {simple && inline && (
            <div className="case-inline">
              <CaseStudy id={inline} compact onOpen={setInline} onBack={() => setInline(null)} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
