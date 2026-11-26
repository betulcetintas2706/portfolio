// Actions shared by the ⌘K launcher and the terminal, so both can do the same
// things. Everything goes through window events that App and Extras listen to.
import { personalInfo, contact, projects } from '../data/portfolioData';
import { caseForProject } from '../data/caseStudies';

const fire = (name, detail) => window.dispatchEvent(detail === undefined ? new Event(name) : new CustomEvent(name, { detail }));

export const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

export const GAME_IDS = { goldminer: 'goldminer', gold: 'goldminer', miner: 'goldminer', cakes: 'cakes', comfycakes: 'cakes', comfy: 'cakes', cake: 'cakes' };
export const GAME_NAMES = { goldminer: 'Gold Miner', cakes: 'Comfy Cakes' };

export const actions = {
  page: (p) => fire('show-page', p),
  project: (title) => {
    const caseId = caseForProject[title];
    if (caseId) { fire('show-page', `case-${caseId}`); return; }
    fire('show-page', 'projects');
    setTimeout(() => fire('focus-project', slug(title)), 250);
  },
  play: (id) => fire('open-extra', { id, view: 'play' }),
  inspect: (id) => fire('open-extra', { id, view: 'inspect' }),
  url: (u) => window.open(u, '_blank', 'noopener'),
  resume: () => window.open(personalInfo.resume, '_blank', 'noopener'),
  terminal: () => fire('open-terminal'),
  tour: () => fire('start-tour'),
  simple: () => fire('go-simple'),
  hack: () => fire('start-hack'),
  email: () => {
    try { navigator.clipboard.writeText(contact.email); } catch { /* ignore */ }
    window.location.href = `mailto:${contact.email}`;
  },
  search: (q = '') => fire('open-launcher', q),
};

// Short traces of how a project's data flows, for `trace <project>`.
// Only facts that are in the project write-ups.
export const TRACES = {
  iris: {
    title: 'IRIS',
    hops: [
      ['glasses', 'ESP32-S3 camera on the safety glasses captures the bench'],
      ['backend', 'Python FastAPI receives the frame'],
      ['vision', 'Overshoot vision reads what is happening'],
      ['reasoning', 'Gemini 2.5 Flash confirms the step or flags an error'],
      ['voice', 'ElevenLabs answers the student out loud'],
      ['app', 'SwiftUI iOS app with Auth0 login follows along'],
    ],
  },
  nanotrade: {
    title: 'NanoTrade',
    hops: [
      ['input', 'market data enters the Tiny Tapeout ASIC'],
      ['rtl', '5 RTL modules in Verilog'],
      ['checks', '8 anomaly checks run in parallel at 50 MHz'],
      ['flag', 'an alert comes out in about 80 ns'],
    ],
  },
  goldminer: {
    title: 'Gold Miner',
    hops: [
      ['input', 'PS/2 keyboard press'],
      ['control', '31-state control FSM plus sub-FSMs'],
      ['memory', 'five custom RAM modules hold the graphics'],
      ['logic', 'pixel-level collision detection'],
      ['output', '320×240 VGA, HEX timer and win/fail audio'],
    ],
  },
};
export const traceKey = (name) => {
  const s = slug(name);
  if (TRACES[s]) return s;
  if (GAME_IDS[s] === 'goldminer') return 'goldminer';
  return null;
};

export const projectBySlug = (s) => projects.find((p) => slug(p.title) === s || slug(p.title).startsWith(s));
