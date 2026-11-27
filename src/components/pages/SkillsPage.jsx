import { useMemo, useRef, useState } from 'react';
import { skills, projects } from '../../data/portfolioData';
import { actions } from '../../lib/actions';

// Skills explorer: a category list on the left, everything on the right.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ICONS = {
  all: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" {...S} /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" {...S} /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" {...S} /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" {...S} /></>,
  languages: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" {...S} />,
  web: <><circle cx="12" cy="12" r="8.5" {...S} /><path d="M3.5 12h17M12 3.5c2.6 2.8 2.6 14.2 0 17M12 3.5c-2.6 2.8-2.6 14.2 0 17" {...S} /></>,
  platforms: <><rect x="7" y="2.5" width="10" height="19" rx="2.2" {...S} /><path d="M11 18.5h2" {...S} /></>,
  ai: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3" {...S} /><rect x="7" y="7" width="10" height="10" rx="3" {...S} /><circle cx="12" cy="12" r="1.6" {...S} /></>,
  cloud: <path d="M7 18h10.5a4 4 0 000-8 5.5 5.5 0 00-10.6 1.2A3.5 3.5 0 007 18z" {...S} />,
  fintech: <><circle cx="12" cy="12" r="8.5" {...S} /><path d="M14.8 9.2c-.5-1-1.6-1.5-2.8-1.5-1.6 0-2.8.8-2.8 2.1 0 3 5.8 1.5 5.8 4.4 0 1.3-1.2 2.1-3 2.1-1.3 0-2.5-.6-3-1.6M12 6v1.7M12 16.3V18" {...S} /></>,
  fundamentals: <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" {...S} />,
  hardware: <><rect x="6" y="6" width="12" height="12" rx="2" {...S} /><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" {...S} /></>,
  tools: <path d="M14.5 6.5a4 4 0 015 5L9 22l-3-3L16.5 8.5M14.5 6.5L12 4M19.5 11.5L22 14" {...S} />,
  folder: <path d="M3 7.5V18a2 2 0 002 2h14a2 2 0 002-2V9.5a2 2 0 00-2-2h-7l-2-2.5H5a2 2 0 00-2 2.5z" {...S} />,
  search: <><circle cx="11" cy="11" r="6.5" {...S} /><path d="M16 16l4.5 4.5" {...S} /></>,
};
const Ic = ({ n }) => <svg className="sk-ic" viewBox="0 0 24 24" aria-hidden="true">{ICONS[n]}</svg>;

const SECTIONS = [
  { id: 'languages', title: 'Languages' },
  ...skills.categories.map((c) => ({ id: c.id, title: c.title })),
];

// "IRIS backend" → IRIS, "Gold Miner" → Gold Miner (FPGA Game)
const findProject = (label) => projects.find((p) => label === p.title || label.startsWith(p.title + ' ') || p.title.startsWith(label + ' '));

export default function SkillsPage() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const mainRef = useRef(null);
  const term = q.trim().toLowerCase();
  const match = (t) => !term || t.toLowerCase().includes(term);

  const langs = useMemo(() => skills.languages.filter((l) => match(l.name) || l.usedIn.some(match)), [term]); // eslint-disable-line react-hooks/exhaustive-deps
  const cats = useMemo(() => skills.categories.map((c) => ({ ...c, chips: c.chips.filter(match) })), [term]); // eslint-disable-line react-hooks/exhaustive-deps

  const show = (id) => cat === 'all' || cat === id;
  const pick = (id) => { setCat(id); mainRef.current?.scrollTo?.({ top: 0 }); };
  const total = skills.languages.length + skills.categories.reduce((n, c) => n + c.chips.length, 0);
  let num = 0;
  const nothing = term && langs.length === 0 && cats.every((c) => c.chips.length === 0);

  return (
    <div className="page active sk">
      <aside className="sk-side">
        <div className="sk-side-head"><Ic n="folder" />Toolkit</div>
        <nav className="sk-nav" aria-label="Skill categories">
          <button className={cat === 'all' ? 'on' : ''} onClick={() => pick('all')}><Ic n="all" />All skills</button>
          {SECTIONS.map((s) => (
            <button key={s.id} className={cat === s.id ? 'on' : ''} onClick={() => pick(s.id)}><Ic n={s.id} />{s.title}</button>
          ))}
        </nav>
        <div className="sk-side-foot">{SECTIONS.length} categories · {total} skills</div>
      </aside>

      <div className="sk-main" ref={mainRef}>
        <header className="sk-top">
          <div>
            <h2 className="sk-title">Skills &amp; <span>tools</span></h2>
            <div className="sk-sub">My technical toolkit, with the work behind it.</div>
          </div>
          <label className="sk-search">
            <Ic n="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills..." aria-label="Search skills" />
            {q && <button onClick={() => setQ('')} aria-label="Clear search">×</button>}
          </label>
        </header>

        {show('languages') && langs.length > 0 && (
          <section className="sk-sec">
            <h3><Ic n="languages" />{String(++num).padStart(2, '0')} / Languages <em>· Where I've used them</em></h3>
            <div className="sk-langs">
              {langs.map((l) => (
                <div key={l.name} className="sk-lang">
                  <div className="sk-lang-head">
                    <b>{l.name}</b>
                    {l.usedIn.length > 0 && <span className="sk-count">{l.usedIn.length} {l.name === 'C / C++' ? 'coursework examples' : l.usedIn.length === 1 ? 'example' : 'examples'}</span>}
                  </div>
                  {l.usedIn.length > 0 && (
                    <div className="sk-used">
                      <span className="sk-arrow">→</span>
                      <span>
                        {l.usedIn.map((u, i) => {
                          const p = findProject(u);
                          return (
                            <span key={u}>
                              {i > 0 && <i> · </i>}
                              {p ? <button onClick={() => actions.project(p.title)}>{u}</button> : u}
                            </span>
                          );
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {cats.map((c) => show(c.id) && c.chips.length > 0 && (
          <section key={c.id} className="sk-sec">
            <h3><Ic n={c.id} />{String(++num).padStart(2, '0')} / {c.title}</h3>
            <div className="sk-chips">
              {c.chips.map((chip) => <span key={chip} className="sk-chip">{chip}</span>)}
            </div>
          </section>
        ))}

        {nothing && <p className="sk-empty">Nothing matches "{q}" yet.</p>}
      </div>
    </div>
  );
}
