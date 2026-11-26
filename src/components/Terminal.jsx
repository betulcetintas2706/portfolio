import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { personalInfo, about, experiences, projects, awards, skills, contact } from '../data/portfolioData';
import { caseStudies, caseForProject } from '../data/caseStudies';

const PROMPT = 'guest@betul ~ %';

const COMMANDS = [
  ['help', 'show this list'],
  ['whoami', 'who I am'],
  ['about', 'a little about me'],
  ['projects', 'list my projects'],
  ['open <project>', 'open a project, like open nanotrade'],
  ['experience', 'where I have worked'],
  ['awards', 'hackathon wins and scholarships'],
  ['skills', 'languages and tools'],
  ['cat resume.txt', 'open my résumé'],
  ['contact', 'how to reach me'],
  ['github / linkedin / devpost', 'open my profiles'],
  ['tour', 'take the desktop tour'],
  ['hack', 'replay the save-the-site game'],
  ['ls', 'list files'],
  ['clear', 'clear the screen'],
  ['exit', 'close the terminal'],
];

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

function banner() {
  return [
    { t: 'accent', s: '  ╭──────────────────────────────────────╮' },
    { t: 'accent', s: '  │  betül cetintas · portfolio terminal │' },
    { t: 'accent', s: '  ╰──────────────────────────────────────╯' },
    { s: "Welcome! Type 'help' to see what you can do." },
    { s: '' },
  ];
}

export default function Terminal({ onClose, showPage }) {
  const [lines, setLines] = useState(banner);
  const [input, setInput] = useState('');
  const [hist, setHist] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const [pos, setPos] = useState(() => ({
    x: Math.max(20, Math.round(window.innerWidth / 2 - 300)),
    y: Math.max(50, Math.round(window.innerHeight / 2 - 230)),
  }));
  const drag = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight); }, [lines]);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const openUrl = (url) => window.open(url, '_blank', 'noopener');

  const run = (raw) => {
    const cmd = raw.trim();
    const out = [{ t: 'cmd', s: `${PROMPT} ${cmd}` }];
    const lc = cmd.toLowerCase();
    const say = (s, t) => out.push({ s, t });

    if (!cmd) { setLines((l) => [...l, ...out]); return; }

    if (lc === 'help') {
      say('Commands:', 'accent');
      COMMANDS.forEach(([c, d]) => say(`  ${c.padEnd(28)} ${d}`));
    } else if (lc === 'whoami') {
      say(`${personalInfo.name} ${personalInfo.lastName}`, 'accent');
      say(personalInfo.tagline);
    } else if (lc === 'about') {
      say(about.hello); say(''); say(about.drives);
    } else if (lc === 'projects' || lc === 'ls projects') {
      projects.forEach((p) => say(`  ${p.featured ? '★' : '·'} ${p.title.padEnd(16)} ${p.award || ''}`));
      say(''); say("Type 'open <name>' to see one, like: open iris", 'dim');
    } else if (lc.startsWith('open ') || lc.startsWith('cd ')) {
      const name = slug(lc.replace(/^(open|cd)\s+/, ''));
      const proj = projects.find((p) => slug(p.title) === name);
      const caseId = proj && caseForProject[proj.title];
      if (caseId) {
        say(`Opening the ${caseStudies[caseId].title} case study...`, 'accent');
        showPage(`case-${caseId}`);
      } else if (proj) {
        say(`${proj.title}`, 'accent'); say(proj.desc);
        (proj.links || []).forEach((l) => say(`  ${l.label}: ${l.url}`, 'dim'));
      } else if (['about', 'experience', 'projects', 'skills', 'awards', 'contact'].includes(name)) {
        showPage(name); say(`Opening ${name}...`, 'accent');
      } else {
        say(`No project called '${raw.trim().split(/\s+/).slice(1).join(' ')}'. Try 'projects'.`, 'err');
      }
    } else if (lc === 'experience') {
      experiences.forEach((e) => say(`  ${e.date.padEnd(22)} ${e.role} · ${e.company.split(' · ')[0]}`));
    } else if (lc === 'awards') {
      awards.forEach((a) => say(`  · ${a.title}, ${a.where} (${a.year})`));
    } else if (lc === 'skills') {
      say('Languages:', 'accent');
      say('  ' + skills.languages.map((s) => s.name).join(' · '));
      skills.categories.forEach((c) => { say(c.title.replace('// ', '') + ':', 'accent'); say('  ' + c.chips.slice(0, 10).join(' · ')); });
    } else if (lc === 'ls' || lc === 'ls -la' || lc === 'ls -a') {
      say('about.txt   projects/   experience/   awards/   skills/   resume.txt   contact.txt' + (lc !== 'ls' ? '   .secret' : ''));
    } else if (lc === 'cat resume.txt' || lc === 'resume' || lc === 'open resume') {
      say('Opening résumé in a new tab...', 'accent'); openUrl(personalInfo.resume);
    } else if (lc === 'cat about.txt') {
      say(about.hello);
    } else if (lc === 'cat contact.txt' || lc === 'contact') {
      say(`  email     ${contact.email}`);
      say(`  linkedin  ${contact.linkedin}`);
      say(`  github    ${contact.github}`);
      say(`  devpost   ${contact.devpost}`);
    } else if (lc === 'cat .secret') {
      say('Merhaba! I grew up in Turkey, lived in Iraq, then moved to Canada at 13.', 'accent');
    } else if (lc === 'github' || lc === 'linkedin' || lc === 'devpost') {
      say(`Opening ${lc}...`, 'accent'); openUrl(contact[`${lc}Url`]);
    } else if (lc === 'tour') {
      say('Starting the tour...', 'accent'); onClose(); window.dispatchEvent(new Event('start-tour'));
    } else if (lc === 'hack' || lc === 'virus') {
      say('Uh oh...', 'err'); setTimeout(() => window.dispatchEvent(new Event('start-hack')), 400);
    } else if (lc === 'clear' || lc === 'cls') {
      setLines([]); return;
    } else if (lc === 'exit' || lc === 'quit') {
      onClose(); return;
    } else if (lc.startsWith('sudo')) {
      say('Permission granted. Best command so far: hire betul', 'accent');
    } else if (lc === 'hire betul' || lc === 'sudo hire betul') {
      say("Yay! Let's talk: " + contact.email, 'accent');
    } else if (lc === 'pwd') {
      say('/home/betul/portfolio');
    } else if (lc === 'date') {
      say(new Date().toString());
    } else if (lc === 'echo' || lc.startsWith('echo ')) {
      say(cmd.slice(5));
    } else if (lc === 'coffee' || lc === 'turkish coffee') {
      say('Brewing... careful, the grounds stay at the bottom.');
    } else {
      say(`command not found: ${cmd.split(/\s+/)[0]}. Type 'help' for the list.`, 'err');
    }
    setLines((l) => [...l, ...out]);
  };

  const names = ['help', 'whoami', 'about', 'projects', 'experience', 'awards', 'skills', 'contact', 'resume', 'cat resume.txt', 'github', 'linkedin', 'devpost', 'tour', 'clear', 'exit',
    ...projects.map((p) => `open ${slug(p.title)}`)];

  const onKey = (e) => {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim()) setHist((h) => [input, ...h]);
      setInput(''); setHIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(hIdx + 1, hist.length - 1);
      if (hist[n] !== undefined) { setHIdx(n); setInput(hist[n]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(n, -1)); setInput(n >= 0 ? hist[n] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = names.filter((c) => c.startsWith(input.toLowerCase()));
      if (m.length === 1) setInput(m[0]);
      else if (m.length > 1) setLines((l) => [...l, { t: 'cmd', s: `${PROMPT} ${input}` }, { s: m.join('   '), t: 'dim' }]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault(); setLines([]);
    }
  };

  const down = (e) => {
    if (e.target.closest('button')) return;
    drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => { if (drag.current) setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y }); };
  const up = () => { drag.current = null; };

  return createPortal(
    <div className="term" style={{ left: pos.x, top: pos.y }} role="dialog" aria-label="Terminal">
      <div className="term-bar" onPointerDown={down} onPointerMove={move} onPointerUp={up}>
        <div className="traffic-lights">
          <button className="tl tl-red" onClick={onClose} aria-label="Close terminal">×</button>
          <span className="tl tl-yellow tl-off" />
          <span className="tl tl-green tl-off" />
        </div>
        <span className="term-title">betul — zsh — 80×24</span>
      </div>
      <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => <div key={i} className={`term-line ${l.t || ''}`}>{l.s || ' '}</div>)}
        <div className="term-input-row">
          <span className="term-prompt">{PROMPT}</span>
          <input
            ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
            spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" aria-label="Terminal input"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
