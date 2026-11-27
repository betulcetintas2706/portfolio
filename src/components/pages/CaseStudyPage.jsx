import { useEffect, useRef, useState } from 'react';
import { caseStudies, caseOrder, caseForProject } from '../../data/caseStudies';
import { explorer } from '../../data/projectExplorer';
import { projectIconMap } from '../Icons';

const pad = (n) => String(n).padStart(2, '0');
const openExtra = (id, view) => window.dispatchEvent(new CustomEvent('open-extra', { detail: { id, view } }));

const RESULT_ICONS = {
  medal: <><circle cx="12" cy="9" r="5.5" /><path d="M12 6.4l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" /><path d="M8.5 13.5L6.5 21l3-1.6 1.5 2.4 1-6.2M15.5 13.5l2 7.5-3-1.6-1.5 2.4-1-6.2" /></>,
  laurel: <><path d="M12 21c-4.5-2-7.5-6.5-7-12.5M12 21c4.5-2 7.5-6.5 7-12.5" />{[[6.6, 19.6, 20], [3.9, 16.2, 45], [2.6, 12.2, 70], [2.8, 8, 95], [17.4, 19.6, -20], [20.1, 16.2, -45], [21.4, 12.2, -70], [21.2, 8, -95]].map(([x, y, r]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx="2.4" ry="1.1" transform={`rotate(${r} ${x} ${y})`} />)}</>,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />,
};
const RIcon = ({ n }) => (
  <svg className="cs-ricon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{RESULT_ICONS[n] || RESULT_ICONS.star}</svg>
);

function Phone({ children, className = '' }) {
  return <div className={`cs-phone ${className}`}><div className="cs-phone-screen">{children}</div></div>;
}

export function CaseStudy({ id, onOpen, onBack, compact }) {
  const c = caseStudies[id];
  const [big, setBig] = useState(null);
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState('overview');
  const rootRef = useRef(null);
  const refs = useRef({});
  const lock = useRef(0);

  const projectTitle = Object.keys(caseForProject).find((t) => caseForProject[t] === id);
  const x = explorer[projectTitle] || {};
  const Icon = c && projectIconMap[c.icon];
  const next = caseOrder[(caseOrder.indexOf(id) + 1) % caseOrder.length];

  const hasProduct = c && (c.problem?.length || c.built?.length);
  const tabs = c ? [
    ['overview', 'Overview'],
    hasProduct && ['product', 'Product'],
    c.myPart?.length && ['contribution', 'My contribution'],
    c.hard?.length && ['decisions', 'Decisions'],
    (c.results?.length || c.learned) && ['results', 'Results'],
  ].filter(Boolean) : [];

  // scroll spy on whatever element scrolls this page
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let sc = root.parentElement;
    while (sc && sc !== document.body && !/(auto|scroll)/.test(getComputedStyle(sc).overflowY)) sc = sc.parentElement;
    const target = sc && sc !== document.body ? sc : window;
    const onScroll = () => {
      if (Date.now() < lock.current) return;
      const top = (target === window ? 0 : target.getBoundingClientRect().top) + 110;
      let cur = 'overview';
      tabs.forEach(([k]) => { const el = refs.current[k]; if (el && el.getBoundingClientRect().top <= top) cur = k; });
      // at the very bottom the last sections can't reach the top, so pick the last one
      const atEnd = target === window
        ? window.innerHeight + window.scrollY >= document.body.scrollHeight - 4
        : target.scrollTop + target.clientHeight >= target.scrollHeight - 4;
      if (atEnd && tabs.length) cur = tabs[tabs.length - 1][0];
      setTab(cur);
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    if (target !== window) target.scrollTop = 0;
    setTab('overview');
    return () => target.removeEventListener('scroll', onScroll);
    setShot(0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!c) return null;
  const go = (k) => { setTab(k); lock.current = Date.now() + 900; refs.current[k]?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const reg = (k) => (el) => { refs.current[k] = el; };

  const meta = c.meta || [];
  const team = meta.find((m) => m.k === 'Team');
  const cols = meta.filter((m) => m.k !== 'Team');
  const kicker = (x.kicker || '').split(' · ').join(' / ');
  const headline = x.headline;
  const screens = c.screens || [];
  const isApp = screens.length > 0 || c.demo;
  let n = 0;

  // hero picture
  let hero = null;
  if (screens.length >= 3) {
    hero = (
      <div className="cs-hero-phones">
        <Phone className="back"><img src={screens[0].src} alt={`${c.title}: ${screens[0].label}`} /></Phone>
        <Phone className="front"><img src={screens[2].src} alt={`${c.title}: ${screens[2].label}`} /></Phone>
        <div className="cs-cap">Real screens from the app</div>
      </div>
    );
  } else if (c.demo) {
    hero = (
      <div className="cs-hero-phones single">
        <Phone className="front"><video src={c.demo.src} poster={c.demo.poster} autoPlay muted loop playsInline controls /></Phone>
        <div className="cs-cap">Screen recording from the iOS build</div>
      </div>
    );
  } else if (c.image) {
    hero = <div className="cs-hero-img"><img src={c.image} alt={`${c.title} preview`} /></div>;
  } else if (Icon) {
    hero = <div className="cs-hero-icon"><Icon /></div>;
  }

  // inside the project: real screens, a demo video or the live sandbox
  const inside = (screens.length > 0 || c.video || c.live || c.embed) && (
    <div className="cs-inside">
      <h3 className="cs-h">Inside the {isApp ? 'app' : 'project'}</h3>
      {screens.length > 0 && (
        <div className="cs-inside-app">
          {c.demo
            ? <Phone className="demo"><video src={c.demo.src} poster={c.demo.poster} autoPlay muted loop playsInline controls preload="metadata" /></Phone>
            : <Phone className="demo"><img src={screens[2].src} alt="" /></Phone>}
          <div className="cs-shots">
            {screens.slice(0, 4).map((s, i) => (
              <button key={s.src} className="cs-shot" onClick={() => setBig(i)}>
                <img src={s.src} alt={`${c.title}: ${s.label}`} loading="lazy" /><span>{s.label}</span>
              </button>
            ))}
            {screens.length > 4 && (
              <button className="cs-more" onClick={() => setBig(4)}>+{screens.length - 4} more screens</button>
            )}
          </div>
        </div>
      )}
      {c.live && (
        <>
          <div className="cs-live"><iframe src={c.live} title={`${c.title} live demo`} loading="lazy" /></div>
          <a className="cs-small-link" href={c.live} target="_blank" rel="noopener noreferrer">Open the demo full screen ↗</a>
        </>
      )}
      {c.embed && (
        <div className="cs-video">
          <iframe src={c.embed} title={`${c.title} demo`} allow="autoplay; fullscreen" allowFullScreen loading="lazy" />
        </div>
      )}
      {c.video && !c.live && c.videoPortrait && (
        <div className="cs-phone-video">
          <Phone className="demo"><iframe src={`${c.video}?dnt=1&title=0&byline=0&portrait=0`} title={`${c.title} demo`}
            allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" /></Phone>
        </div>
      )}
      {c.video && !c.live && !c.videoPortrait && (
        <div className="cs-video">
          <iframe src={`${c.video}?dnt=1&title=0&byline=0&portrait=0`} title={`${c.title} demo`}
            allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />
        </div>
      )}
      {screens.length > 0 && <div className="cs-cap">{c.demo ? 'Real recording and screens from the iOS build' : 'Real screens'}</div>}
    </div>
  );

  return (
    <article className={`cs${compact ? ' cs-compact' : ''}`} ref={rootRef}>
      <nav className="cs-bar">
        {onBack && <button className="cs-back" onClick={onBack}>← All projects</button>}
        <div className="cs-tabs">
          {tabs.map(([k, l]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => go(k)}>{l}</button>
          ))}
        </div>
      </nav>

      <section className="cs-hero" ref={reg('overview')}>
        <div className="cs-hero-text">
          {kicker && <div className="cs-kicker">{kicker}</div>}
          <div className="cs-titlerow">
            {c.logo && <img className="cs-logo" src={c.logo} alt="" />}
            <h1 className="cs-title">{c.title}</h1>
          </div>
          {headline && <p className="cs-headline">{headline}</p>}
          <p className="cs-tagline">{c.tagline}</p>
          {c.award && <span className="cs-award">{c.award}</span>}
          <div className="cs-actions">
            {c.play && <button className="cs-btn gold" onClick={() => openExtra(c.play, 'play')}>▶ Play it here</button>}
            {c.play && <button className="cs-btn line" onClick={() => openExtra(c.play, 'inspect')}>See how it works</button>}
            {!c.play && hasProduct && <button className="cs-btn gold" onClick={() => go('product')}>Explore the {isApp ? 'app' : 'project'} ↓</button>}
            {c.myPart?.length > 0 && <button className="cs-link" onClick={() => go('contribution')}>My contribution ↓</button>}
          </div>
          {c.links?.length > 0 && (
            <div className="cs-links">
              {c.links.map((l) => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
            </div>
          )}
        </div>
        {hero && <div className="cs-hero-art">{hero}</div>}
      </section>

      {cols.length > 0 && (
        <dl className="cs-meta">
          {cols.map((m) => {
            const [main, ...rest] = m.k === 'Stack' ? [m.v] : m.v.split(/,\s(?=\d)/);
            return (
              <div key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.k === 'Stack' ? m.v.split(/,\s*/).join(' · ') : main}{rest.length > 0 && <small>{rest.join(', ')}</small>}</dd>
              </div>
            );
          })}
        </dl>
      )}
      {team && <div className="cs-team"><b>Team</b><span>{team.v.split(/,\s*(?![^()]*\))/).join(' · ')}</span></div>}

      {c.stats?.length > 0 && (
        <div className="cs-stats">
          {c.stats.map((s) => <div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
        </div>
      )}

      {hasProduct && (
        <section className="cs-sec" ref={reg('product')}>
          <div className="cs-two">
            {c.problem?.length > 0 && (
              <div>
                <h2 className="cs-h2">{pad(++n)} / The problem</h2>
                <p className="cs-lead">{c.problem[0]}</p>
                {c.problem.slice(1).map((p) => <p key={p} className="cs-note">{p}</p>)}
              </div>
            )}
            {c.built?.length > 0 && (
              <div>
                <h2 className="cs-h2">{pad(++n)} / What we built</h2>
                <p className="cs-lead">{c.built[0]}</p>
                {c.built.slice(1).map((p) => <p key={p}>{p}</p>)}
              </div>
            )}
          </div>
          {c.flow?.length > 0 && (
            <ol className="cs-flow" aria-label="How it works">
              {c.flow.map((f, i) => (
                <li key={f}><i>{i + 1}</i><span>{f}</span>{i < c.flow.length - 1 && <em aria-hidden="true">→</em>}</li>
              ))}
            </ol>
          )}
        </section>
      )}

      {c.web && (
        <section className="cs-sec cs-web">
          <div className="cs-web-head">
            <h3 className="cs-h">The landing page</h3>
            <a href={c.web.url} target="_blank" rel="noopener noreferrer">{c.web.url.replace('https://', '')} ↗</a>
          </div>
          <div className="cs-browser">
            <div className="cs-browser-bar"><i /><i /><i /><span>{c.web.url.replace('https://', '')}</span></div>
            <img src={c.web.shots[shot].src} alt={`${c.title} landing page: ${c.web.shots[shot].label}`} />
          </div>
          <div className="cs-web-thumbs">
            {c.web.shots.map((w, i) => (
              <button key={w.src} className={i === shot ? 'on' : ''} onClick={() => setShot(i)}>
                <img src={w.src} alt="" loading="lazy" /><span>{w.label}</span>
              </button>
            ))}
          </div>
          <div className="cs-cap">Real screenshots from praevo.band. Open the live site to see it move.</div>
        </section>
      )}

      {(inside || c.myPart?.length > 0) && (
        <section className={`cs-sec cs-split${inside && c.myPart?.length ? '' : ' solo'}`}>
          {inside}
          {c.myPart?.length > 0 && (
            <div className="cs-contrib" ref={reg('contribution')}>
              <h2 className="cs-h2">{pad(++n)} / My contribution</h2>
              <ol>
                {c.myPart.map((p, i) => (
                  <li key={i}>
                    <b className="cs-num">{pad(i + 1)}</b>
                    <div>{typeof p === 'string' ? <p>{p}</p> : <><h4>{p.t}</h4><p>{p.d}</p></>}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}

      {c.hard?.length > 0 && (
        <section className="cs-sec" ref={reg('decisions')}>
          <h2 className="cs-h2 big">{pad(++n)} / The decisions behind the build</h2>
          <div className="cs-decisions">
            {c.hard.map((h, i) => (
              <div key={h.t}>
                <b className="cs-num">{pad(i + 1)}</b>
                <div>
                  <h4>{h.t}</h4>
                  <p>{h.d}</p>
                  {h.decision && <span className="cs-pill">Decision: {h.decision}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(c.results?.length > 0 || c.learned) && (
        <section className="cs-sec" ref={reg('results')}>
          {c.results?.length > 0 && (
            <>
              <h2 className="cs-h2 big">{pad(++n)} / Results{c.results.some((r) => typeof r !== 'string') ? ' & recognition' : ''}</h2>
              <div className="cs-results">
                {c.results.map((r, i) => (typeof r === 'string'
                  ? <div key={i} className="plain"><RIcon n="star" /><p>{r}</p></div>
                  : <div key={i}><RIcon n={r.icon} /><div><h4>{r.h}</h4><p>{r.d}</p></div></div>))}
              </div>
            </>
          )}
          {c.learned && (
            <div className="cs-learned">
              <h3>What I learned</h3>
              <blockquote>“{c.learned}”</blockquote>
            </div>
          )}
        </section>
      )}

      <footer className="cs-foot">
        {onBack ? <button className="cs-back" onClick={onBack}>← All projects</button> : <span />}
        {onOpen && <button className="cs-btn gold" onClick={() => onOpen(next)}>Next: {caseStudies[next].title} →</button>}
      </footer>

      {big !== null && (
        <div className="case-lightbox" onClick={() => setBig(null)}>
          <button className="case-lb-nav" onClick={(e) => { e.stopPropagation(); setBig((big - 1 + screens.length) % screens.length); }} aria-label="Previous screen">‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={screens[big].src} alt={screens[big].label} />
            <figcaption>{screens[big].label} · {big + 1} / {screens.length}</figcaption>
          </figure>
          <button className="case-lb-nav" onClick={(e) => { e.stopPropagation(); setBig((big + 1) % screens.length); }} aria-label="Next screen">›</button>
          <button className="case-lb-close" onClick={() => setBig(null)} aria-label="Close">×</button>
        </div>
      )}
    </article>
  );
}

export default function CaseStudyPage({ caseId, showPage }) {
  return (
    <div className="page active cs-page">
      <CaseStudy
        id={caseId}
        onOpen={(n) => showPage(`case-${n}`)}
        onBack={() => showPage('projects')}
      />
    </div>
  );
}
