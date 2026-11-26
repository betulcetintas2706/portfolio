import { useState } from 'react';
import { caseStudies, caseOrder } from '../../data/caseStudies';
import { projectIconMap } from '../Icons';

export function CaseStudy({ id, onOpen, onBack, compact }) {
  const c = caseStudies[id];
  if (!c) return null;
  const Icon = projectIconMap[c.icon];
  const [big, setBig] = useState(null);
  const next = caseOrder[(caseOrder.indexOf(id) + 1) % caseOrder.length];

  return (
    <article className={`case${compact ? ' case-compact' : ''}`}>
      {onBack && <button className="case-back" onClick={onBack}>← All projects</button>}

      <header className="case-hero">
        <div className={`case-banner${c.logo ? ' has-logo' : ''}`}>
          {c.logo ? <img className="case-logo" src={c.logo} alt={`${c.title} app icon`} />
            : c.image ? <img src={c.image} alt={c.title} /> : Icon && <Icon />}
        </div>
        <div className="case-kicker">// case study</div>
        <h1 className="case-title">{c.title}</h1>
        <p className="case-tagline">{c.tagline}</p>
        <span className="case-award">{c.award}</span>
      </header>

      <dl className="case-meta">
        {c.meta.map((m) => (
          <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
        ))}
      </dl>

      <div className="case-stats">
        {c.stats.map((s) => (
          <div key={s.l} className="case-stat"><b>{s.n}</b><span>{s.l}</span></div>
        ))}
      </div>

      <section>
        <h3>// The problem</h3>
        {c.problem.map((p) => <p key={p}>{p}</p>)}
      </section>

      <section>
        <h3>// What we built</h3>
        {c.built.map((p) => <p key={p}>{p}</p>)}
        <div className="case-flow" aria-label="How it works">
          {c.flow.map((f, i) => (
            <span key={f} className="case-flow-item">
              <span className="case-flow-step"><i>{i + 1}</i>{f}</span>
              {i < c.flow.length - 1 && <span className="case-flow-arrow">→</span>}
            </span>
          ))}
        </div>
      </section>

      {(c.demo || c.screens) && (
        <section>
          <h3>// Inside the app</h3>
          <div className="case-app">
            {c.demo && (
              <figure className="case-phone">
                <video src={c.demo.src} poster={c.demo.poster} autoPlay muted loop playsInline controls preload="metadata" />
                <figcaption>Real recording from the iOS build</figcaption>
              </figure>
            )}
            {c.screens && (
              <div className="case-screens" role="list">
                {c.screens.map((sc, i) => (
                  <button key={sc.src} role="listitem" className="case-screen" onClick={() => setBig(i)}>
                    <img src={sc.src} alt={`${c.title}: ${sc.label}`} loading="lazy" />
                    <span>{sc.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {big !== null && (
            <div className="case-lightbox" onClick={() => setBig(null)}>
              <button className="case-lb-nav" onClick={(e) => { e.stopPropagation(); setBig((big - 1 + c.screens.length) % c.screens.length); }} aria-label="Previous screen">‹</button>
              <figure onClick={(e) => e.stopPropagation()}>
                <img src={c.screens[big].src} alt={c.screens[big].label} />
                <figcaption>{c.screens[big].label} · {big + 1} / {c.screens.length}</figcaption>
              </figure>
              <button className="case-lb-nav" onClick={(e) => { e.stopPropagation(); setBig((big + 1) % c.screens.length); }} aria-label="Next screen">›</button>
              <button className="case-lb-close" onClick={() => setBig(null)} aria-label="Close">×</button>
            </div>
          )}
        </section>
      )}

      {c.video && (
        <section>
          <h3>// Demo</h3>
          <div className="case-video">
            <iframe src={`${c.video}?dnt=1&title=0&byline=0&portrait=0`} title={`${c.title} demo`}
              allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />
          </div>
        </section>
      )}

      <section className="case-mine">
        <h3>// My part</h3>
        <ul>{c.myPart.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>

      <section>
        <h3>// The hard parts</h3>
        <div className="case-hard">
          {c.hard.map((h) => (
            <div key={h.t} className="case-hard-card"><b>{h.t}</b><p>{h.d}</p></div>
          ))}
        </div>
      </section>

      <section>
        <h3>// Results</h3>
        <ul className="case-results">{c.results.map((r) => <li key={r}>{r}</li>)}</ul>
      </section>

      <section className="case-learned">
        <h3>// What I learned</h3>
        <p>{c.learned}</p>
      </section>

      <footer className="case-foot">
        <div className="project-links">
          {c.links.map((l) => (
            <a key={l.label} className="project-link" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
        {onOpen && (
          <button className="case-next" onClick={() => onOpen(next)}>
            Next: {caseStudies[next].title} →
          </button>
        )}
      </footer>
    </article>
  );
}

export default function CaseStudyPage({ caseId, showPage }) {
  return (
    <div className="page active">
      <CaseStudy
        id={caseId}
        onOpen={(n) => showPage(`case-${n}`)}
        onBack={() => showPage('projects')}
      />
    </div>
  );
}
