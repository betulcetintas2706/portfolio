import { useState } from 'react';
import { awards, personalInfo } from '../../data/portfolioData';
import { actions } from '../../lib/actions';

// Awards & recognition: a featured win, the hackathon list, and what sits
// beyond the podium. Medals are drawn in SVG so they stay crisp.

const GOLD = ['#f6dc8c', '#c9a84c', '#8a6a24'];
const SILVER = ['#f4f4f6', '#b9bcc4', '#6e7380'];
const BRONZE = ['#f3c7a0', '#c07a48', '#7a4422'];

function Laurel({ color = '#b8913a', flip = false }) {
  const leaves = Array.from({ length: 6 }, (_, i) => i);
  return (
    <g transform={flip ? 'translate(64,0) scale(-1,1)' : undefined}>
      <path d="M18 54 C8 44 6 28 14 14" stroke={color} strokeWidth="1.6" fill="none" />
      {leaves.map((i) => {
        const t = i / 5;
        const x = 18 - Math.sin(t * 2.2) * 9 - t * 2; const y = 52 - t * 38;
        return <ellipse key={i} cx={x - 3} cy={y} rx="4.2" ry="2" fill={color} transform={`rotate(${-50 + t * 40} ${x - 3} ${y})`} />;
      })}
    </g>
  );
}

function Medal({ n, metal, star }) {
  const [hi, mid, lo] = metal;
  const id = `m${n}${star ? 's' : ''}${mid.slice(1)}`;
  return (
    <svg viewBox="0 0 64 64" className="aw-medal" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="70%"><stop offset="0" stopColor={hi} /><stop offset="0.6" stopColor={mid} /><stop offset="1" stopColor={lo} /></radialGradient>
      </defs>
      <Laurel color={mid} /><Laurel color={mid} flip />
      {star
        ? <path d="M32 18 l4.2 8.6 9.4 1.3 -6.8 6.6 1.6 9.4 -8.4 -4.4 -8.4 4.4 1.6 -9.4 -6.8 -6.6 9.4 -1.3z" fill={`url(#${id})`} stroke={lo} strokeWidth="0.8" />
        : (
          <>
            <circle cx="32" cy="32" r="15" fill={`url(#${id})`} stroke={lo} strokeWidth="1" />
            <circle cx="32" cy="32" r="12" fill="none" stroke={hi} strokeWidth="0.8" opacity="0.7" />
            <text x="32" y="38.5" textAnchor="middle" fontFamily="Lora, serif" fontWeight="700" fontSize="17" fill={lo}>{n}</text>
          </>
        )}
    </svg>
  );
}

function Rosette() {
  const petals = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg viewBox="0 0 120 150" className="aw-rosette" aria-hidden="true">
      <defs>
        <radialGradient id="rg-gold" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#fbe6a2" /><stop offset="0.55" stopColor="#d4ad55" /><stop offset="1" stopColor="#8a6a24" /></radialGradient>
        <linearGradient id="rg-rib" x1="0" x2="1"><stop offset="0" stopColor="#6b1f35" /><stop offset="0.5" stopColor="#a83050" /><stop offset="1" stopColor="#6b1f35" /></linearGradient>
      </defs>
      <path d="M44 78 L28 140 L42 130 L52 146 L64 86 Z" fill="url(#rg-rib)" stroke="#c9a84c" strokeWidth="1.4" />
      <path d="M76 78 L92 140 L78 130 L68 146 L56 86 Z" fill="url(#rg-rib)" stroke="#c9a84c" strokeWidth="1.4" />
      {petals.map((a) => (
        <ellipse key={a} cx="60" cy="30" rx="11" ry="22" fill={a % 40 ? '#8b2942' : '#a83050'} stroke="#5a1527" strokeWidth="0.8" transform={`rotate(${a} 60 58)`} />
      ))}
      <circle cx="60" cy="58" r="26" fill="url(#rg-gold)" stroke="#8a6a24" strokeWidth="1.2" />
      <circle cx="60" cy="58" r="21" fill="none" stroke="#fbe6a2" strokeWidth="0.8" opacity="0.8" />
      <g transform="translate(28,26)"><Laurel color="#8a6a24" /><Laurel color="#8a6a24" flip /></g>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 120 64" className="aw-book" aria-hidden="true">
      <g transform="translate(-2,0)"><Laurel color="#b8913a" /></g>
      <g transform="translate(58,0)"><Laurel color="#b8913a" flip /></g>
      <path d="M30 20 Q45 14 60 22 Q75 14 90 20 L90 48 Q75 42 60 50 Q45 42 30 48 Z" fill="#f6ead7" stroke="#7a4a2a" strokeWidth="1.6" />
      <path d="M60 22 L60 50" stroke="#7a4a2a" strokeWidth="1.4" />
      {[26, 31, 36, 41].map((y) => <path key={y} d={`M35 ${y} Q46 ${y - 4} 56 ${y + 1} M64 ${y + 1} Q74 ${y - 4} 85 ${y}`} stroke="#c2a77a" strokeWidth="0.9" fill="none" />)}
    </svg>
  );
}

const pick = (title) => awards.find((a) => a.title.startsWith(title));

export default function AwardsPage() {
  const [tab, setTab] = useState('all');
  const first = pick('First Place');
  const top120 = pick('HSIL Venture');
  const judge = pick('Judge');
  const hackathons = [
    { a: pick('Second Place'), title: 'Second place', medal: <Medal n="2" metal={SILVER} /> },
    { a: pick('Third Place Overall'), title: 'Third place overall', medal: <Medal n="3" metal={BRONZE} />, note: '600+ participants' },
    { a: pick('Google Build'), title: 'Google Build with AI winner', medal: <Medal n="★" metal={GOLD} star /> },
    { a: pick('Third Place, ASIC'), title: 'Third place · ASIC', medal: <Medal n="3" metal={BRONZE} /> },
  ];
  const scholarships = awards.filter((a) => a.year === 'UofT');
  const hackCount = 1 + hackathons.length;

  const Featured = (
    <section className="aw-feature">
      <Rosette />
      <div className="aw-f-main">
        <div className="aw-f-kicker">Featured recognition</div>
        <div className="aw-f-title">First place</div>
        <div className="aw-f-where">Harvard HSIL Hackathon</div>
        <div className="aw-f-where small">Toronto Hub · {first.year}</div>
      </div>
      <div className="aw-f-proj">
        <div className="aw-f-name">{first.project}</div>
        <div className="aw-f-note">AI health literacy</div>
      </div>
      <div className="aw-f-cta">
        <div className="aw-f-big"><span>1</span><sup>st</sup></div>
        <button className="aw-f-btn" onClick={() => actions.project('Meducine')}>Explore project →</button>
      </div>
    </section>
  );

  const HackList = (
    <section className="aw-list">
      <div className="aw-h">// Hackathon awards</div>
      {hackathons.map(({ a, title, medal, note }) => (
        <button key={a.title} className="aw-row" onClick={() => actions.project(a.project)}>
          {medal}
          <span className="aw-row-text">
            <b>{title}</b>
            <i>{a.where} · {a.project}{note ? ` · ${note}` : ''}</i>
          </span>
          <span className="aw-year">{a.year}</span>
        </button>
      ))}
    </section>
  );

  const Scholar = (
    <section className="aw-scholar">
      <div className="aw-h">// Academic recognition · University of Toronto</div>
      <div className="aw-s-grid">
        {scholarships.map((s) => (
          <div key={s.title} className="aw-s-card">
            <Medal n="★" metal={GOLD} star />
            <b>{s.title}</b>
            <i>{s.where}</i>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="page active aw">
      <div className="aw-head">
        <h2 className="aw-title">Awards &amp; <span>recognition</span></h2>
        <div className="aw-sub">Hackathons, milestones &amp; scholarships</div>
      </div>
      <div className="aw-tabs" role="tablist">
        {[['all', 'All recognition'], ['hack', 'Hackathons'], ['school', 'Scholarships']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{label}</button>
        ))}
        <span className="aw-count">{hackCount} hackathon awards</span>
      </div>

      {tab !== 'school' && Featured}

      {tab === 'all' && (
        <div className="aw-cols">
          {HackList}
          <aside className="aw-side">
            <div className="aw-h">// Beyond the podium</div>
            <div className="aw-sel">★ Selected</div>
            <div className="aw-top">Top 120</div>
            <div className="aw-top-i">globally</div>
            <div className="aw-side-t">HSIL Venture Building Bootcamp</div>
            <div className="aw-side-s">{top120.where}</div>
            <div className="aw-side-s">{top120.project} · {top120.year}</div>
            <div className="aw-side-line" />
            <div className="aw-side-row">
              <svg viewBox="0 0 40 40" className="aw-gavel" aria-hidden="true"><path d="M20 6v26M10 34h20M8 12h24M8 12l-5 11h10zM32 12l-5 11h10z" stroke="#b8913a" strokeWidth="1.8" fill="none" strokeLinejoin="round" /><path d="M3 23q5 5 10 0M27 23q5 5 10 0" stroke="#b8913a" strokeWidth="1.8" fill="#f3e3b8" /></svg>
              <div><div className="aw-side-t sm">Judge</div><div className="aw-side-s">{judge.where} · {judge.year}</div></div>
            </div>
            <div className="aw-side-line" />
            <button className="aw-acad" onClick={() => setTab('school')}>
              <BookIcon />
              <span><b>Academic recognition</b><u>View scholarships →</u></span>
            </button>
          </aside>
        </div>
      )}
      {tab === 'hack' && HackList}
      {tab === 'school' && Scholar}

      <div className="aw-foot"><a href={personalInfo.devpost} target="_blank" rel="noopener noreferrer">See every project on Devpost ↗</a></div>
    </div>
  );
}
