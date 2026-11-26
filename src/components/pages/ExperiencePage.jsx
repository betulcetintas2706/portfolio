import { useState } from 'react';
import { experiences, personalInfo } from '../../data/portfolioData';
import { caseForProject } from '../../data/caseStudies';
import { actions } from '../../lib/actions';

// Timeline layout. All text comes from experiences in portfolioData.js:
// the first sentence becomes the summary, the rest become bullets, and
// numbers are highlighted.

const SHOWN = 3;

function parse(exp) {
  const parts = exp.company.split(' · ');
  let name = parts[0];
  let note = '';
  const m = name.match(/^(.*?)\s*\((.*)\)$/);
  if (m) { name = m[1]; note = m[2]; }
  const location = parts.find((p, i) => i > 0 && /,\s*[A-Z]{2}|Remote|Toronto|Montreal|Vaughan/.test(p)) || '';
  const extra = parts.filter((p, i) => i > 0 && p !== location);
  const sentences = exp.desc.match(/[^.!?]+(?:\.\d+[^.!?]*)*[.!?]+/g)?.map((s) => s.trim()) || [exp.desc];
  const [range0, range1] = exp.date.split(/\s+[–-]\s+/);
  return { name, note, location, award: extra.join(' · '), summary: sentences[0], bullets: sentences.slice(1), from: range0, to: range1 || '', current: /present/i.test(exp.date) };
}

function Num({ text }) {
  const bits = text.split(/(~?\d[\d,.]*\+?%?)/g);
  return bits.map((b, i) => (i % 2 ? <b key={i} className="xp-num">{b}</b> : b));
}

function Role({ exp }) {
  const r = parse(exp);
  const caseId = caseForProject[r.name];
  return (
    <article className="xp-item">
      <div className="xp-when">
        <i className="xp-dot" aria-hidden="true" />
        <div className="xp-date">{r.from}{r.to && <><br />{r.to}</>}</div>
        {r.current && <div className="xp-live"><i />Current</div>}
      </div>
      <div className="xp-body">
        <div className="xp-co">{r.name}{r.note && <span> · {r.note}</span>}</div>
        <div className="xp-head">
          <h3 className="xp-role">{exp.role}</h3>
          {r.location && <span className="xp-loc">{r.location}</span>}
        </div>
        <p className="xp-sum"><Num text={r.summary} /></p>
        {r.bullets.length > 0 && <ul className="xp-bul">{r.bullets.map((b) => <li key={b}><Num text={b} /></li>)}</ul>}
        {r.award && (
          <div className="xp-award">
            <svg viewBox="0 0 40 32" aria-hidden="true"><path d="M12 28C4 22 3 12 8 4M28 28c8-6 9-16 4-24" fill="none" stroke="#b8913a" strokeWidth="1.6" />{[0, 1, 2, 3].map((k) => <g key={k}><ellipse cx={8 - k * 0.6} cy={24 - k * 6} rx="3.4" ry="1.7" fill="#b8913a" transform={`rotate(${-40 + k * 12} ${8 - k * 0.6} ${24 - k * 6})`} /><ellipse cx={32 + k * 0.6} cy={24 - k * 6} rx="3.4" ry="1.7" fill="#b8913a" transform={`rotate(${40 - k * 12} ${32 + k * 0.6} ${24 - k * 6})`} /></g>)}</svg>
            <span>{r.award}</span>
          </div>
        )}
        <div className="xp-foot">
          <div className="xp-stack">{exp.tags.join(' · ')}</div>
          {caseId && <button className="xp-link" onClick={() => actions.page(`case-${caseId}`)}>Explore {r.name} ↗</button>}
        </div>
      </div>
    </article>
  );
}

export default function ExperiencePage() {
  const [more, setMore] = useState(false);
  const top = experiences.slice(0, SHOWN);
  const rest = experiences.slice(SHOWN);
  return (
    <div className="page active xp">
      <header className="xp-top">
        <div>
          <h2 className="xp-title">Work <span>experience</span></h2>
          <div className="xp-sub">Where I've been. What I've built.</div>
        </div>
        <div className="xp-meta">
          <span>{experiences.length} internships &amp; roles</span>
          <i aria-hidden="true" />
          <a className="xp-cv" href={personalInfo.resume} target="_blank" rel="noopener noreferrer">View résumé ↗</a>
        </div>
      </header>
      <div className="xp-line">
        {top.map((e) => <Role key={e.role + e.company} exp={e} />)}
        <button className="xp-more" onClick={() => setMore((m) => !m)} aria-expanded={more}>
          <span className={more ? 'open' : ''}>⌄</span> {more ? 'Hide earlier experience' : `Earlier experience (${rest.length})`}
        </button>
        {more && rest.map((e) => <Role key={e.role + e.company} exp={e} />)}
      </div>
    </div>
  );
}
