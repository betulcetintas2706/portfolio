import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { projects, skills, experiences, contact } from '../data/portfolioData';
import { actions, GAME_NAMES } from '../lib/actions';

const isMac = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
export const MOD = isMac ? '⌘' : 'Ctrl';

const norm = (s) => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function buildIndex() {
  const items = [];
  const add = (it) => {
    const k = norm(it.keys || '');
    items.push({ ...it, _t: norm(it.title), _k: k, _kw: k.split(/[^a-z0-9+#.]+/).filter(Boolean), _d: norm(it.sub || '') });
  };

  // projects
  projects.forEach((p) => add({
    id: `p-${p.title}`, group: 'Project', title: p.title.replace(' (FPGA Game)', ''), sub: p.award || p.tags.slice(0, 3).join(' · '),
    keys: `${p.tags.join(' ')} ${p.desc} ${p.title}`, run: () => actions.project(p.title), featured: p.featured,
  }));
  // project links (demos, GitHub, Devpost)
  projects.forEach((p) => (p.links || []).forEach((l) => add({
    id: `l-${p.title}-${l.label}`, group: 'Link', title: `${p.title.replace(' (FPGA Game)', '')} ${l.label.toLowerCase()}`,
    sub: l.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 46), keys: `${p.title} ${l.label} ${l.label === 'Demo' ? 'video watch' : ''}`, run: () => actions.url(l.url), ext: true,
  })));
  // games
  Object.entries(GAME_NAMES).forEach(([id, name]) => {
    add({ id: `g-${id}`, group: 'Game', title: `Play ${name}`, sub: 'browser version of my FPGA game', keys: 'play game fpga verilog arcade', run: () => actions.play(id) });
    add({ id: `i-${id}`, group: 'Game', title: `See how ${name} works`, sub: 'state machine, inputs and registers', keys: 'inspect fsm state machine how it works verilog fpga debug', run: () => actions.inspect(id) });
  });
  // pages
  [['home', 'Welcome'], ['about', 'About me'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills & tools'], ['awards', 'Awards'], ['contact', 'Contact']]
    .forEach(([page, title]) => add({ id: `pg-${page}`, group: 'Page', title, sub: `open ${page === 'home' ? 'welcome' : page}`, keys: page, run: () => actions.page(page) }));
  // skills
  skills.languages.forEach((s) => add({
    id: `s-${s.name}`, group: 'Skill', title: s.name, sub: s.usedIn?.length ? `used in ${s.usedIn.join(', ')}` : 'language', keys: (s.usedIn || []).join(' '), run: () => actions.page('skills'),
  }));
  const seen = new Set(skills.languages.map((s) => norm(s.name)));
  skills.categories.forEach((c) => c.chips.forEach((chip) => {
    if (seen.has(norm(chip))) return; seen.add(norm(chip));
    add({ id: `c-${chip}`, group: 'Skill', title: chip, sub: c.title.replace('// ', ''), keys: '', run: () => actions.page('skills') });
  }));
  // experience
  experiences.forEach((e) => add({
    id: `e-${e.role}-${e.company}`, group: 'Experience', title: `${e.role} · ${e.company.split(' · ')[0]}`, sub: e.date, keys: `${(e.tags || []).join(' ')} ${e.desc}`, run: () => actions.page('experience'),
  }));
  // actions
  [
    { title: 'Open résumé', sub: 'PDF in a new tab', keys: 'resume cv pdf', run: actions.resume, ext: true },
    { title: 'Email me', sub: contact.email, keys: 'email mail contact hire', run: actions.email },
    { title: 'Open terminal', sub: 'shortcut: `', keys: 'terminal shell command line zsh', run: actions.terminal },
    { title: 'Take the desktop tour', sub: 'a quick guided walk through', keys: 'tour guide help', run: actions.tour },
    { title: 'Simple view', sub: 'one plain scrolling page', keys: 'simple plain page accessible', run: actions.simple },
    { title: 'Replay the hack game', sub: 'save the site from the pickle', keys: 'hack pickle virus play game intro', run: actions.hack },
    { title: 'GitHub', sub: contact.github, keys: 'github code repos', run: () => actions.url(contact.githubUrl), ext: true },
    { title: 'LinkedIn', sub: contact.linkedin, keys: 'linkedin', run: () => actions.url(contact.linkedinUrl), ext: true },
    { title: 'Devpost', sub: contact.devpost, keys: 'devpost hackathons', run: () => actions.url(contact.devpostUrl), ext: true },
  ].forEach((a) => add({ ...a, id: `a-${a.title}`, group: 'Action' }));
  return items;
}

function score(it, tokens) {
  let total = 0;
  for (const t of tokens) {
    let s = 0;
    if (it._t.startsWith(t)) s = 30;
    else if (it._t.split(/[\s·]+/).some((w) => w.startsWith(t))) s = 22;
    else if (it._t.includes(t)) s = 14;
    else if (it._kw.includes(t)) s = 9;
    else if (it._kw.some((w) => w.startsWith(t))) s = 5;
    else if (t.length >= 5 && it._k.includes(t)) s = 3;
    else if (it._d.split(/[^a-z0-9+#.]+/).some((w) => w.startsWith(t))) s = 3;
    if (!s) return 0;
    total += s;
  }
  const groupBoost = { Project: 3, Game: 2, Action: 2, Link: 1, Page: 1, Skill: 0, Experience: 0 }[it.group] || 0;
  return total + groupBoost + (it.featured ? 1 : 0);
}

const SUGGEST = ['p-NanoTrade', 'p-IRIS', 'p-49th', 'g-goldminer', 'i-goldminer', 'g-cakes', 'a-Open résumé', 'a-Open terminal', 'a-Email me'];

export default function Launcher({ onClose, initial = '' }) {
  const [q, setQ] = useState(initial);
  const [sel, setSel] = useState(0);
  const index = useMemo(buildIndex, []);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const tokens = norm(q).split(/\s+/).filter(Boolean);
    if (!tokens.length) return SUGGEST.map((id) => index.find((it) => it.id === id)).filter(Boolean);
    return index.map((it) => ({ it, s: score(it, tokens) })).filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s).slice(0, 14).map((x) => x.it);
  }, [q, index]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    listRef.current?.querySelector('.lx-item.on')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  const go = (it) => { if (!it) return; onClose(); setTimeout(() => it.run(), 0); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[sel]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  // group while keeping rank order of first appearance
  const groups = [];
  results.forEach((it, i) => {
    let g = groups.find((x) => x.name === it.group);
    if (!g) { g = { name: it.group, items: [] }; groups.push(g); }
    g.items.push({ it, i });
  });

  return createPortal(
    <div className="lx-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lx" role="dialog" aria-label="Search and commands">
        <div className="lx-field">
          <span className="lx-glyph" aria-hidden="true">⌕</span>
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
            placeholder="Search projects, skills, demos, or type play…" spellCheck={false} autoComplete="off"
            aria-label="Search" aria-controls="lx-list" aria-activedescendant={results[sel] ? `lx-${sel}` : undefined}
          />
          <kbd className="lx-esc" onClick={onClose}>esc</kbd>
        </div>
        <div className="lx-list" id="lx-list" ref={listRef} role="listbox">
          {!q && <div className="lx-group">Try “Verilog”, “iOS”, “IRIS demo”, “résumé” or “play”</div>}
          {results.length === 0 && <div className="lx-empty">No match for “{q}”. Try a language, a project or “play”.</div>}
          {groups.map((g) => (
            <div key={g.name}>
              {q && <div className="lx-group">{g.name === 'Experience' ? 'Experience' : `${g.name}s`}</div>}
              {g.items.map(({ it, i }) => (
                <button
                  key={it.id} id={`lx-${i}`} role="option" aria-selected={i === sel}
                  className={`lx-item${i === sel ? ' on' : ''}`} onMouseMove={() => setSel(i)} onClick={() => go(it)}
                >
                  <span className="lx-title">{it.title}{it.ext && <span className="arrow"> ↗</span>}</span>
                  <span className="lx-sub">{it.sub}</span>
                  {!q && <span className="lx-tag">{it.group.toLowerCase()}</span>}
                  {i === sel && <kbd className="lx-enter">↵</kbd>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="lx-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
          <span className="lx-foot-r"><kbd>{MOD}</kbd><kbd>K</kbd> anywhere</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
