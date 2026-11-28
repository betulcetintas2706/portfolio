import { useState, useRef, useEffect } from 'react';
import { pageTitles } from './data/portfolioData';
import { caseStudies } from './data/caseStudies';
import MenuBar from './components/MenuBar';
import DesktopIcons from './components/DesktopIcons';
import Window from './components/Window';
import Dock from './components/Dock';
import DesktopWidgets from './components/DesktopWidgets';
import Stickers from './components/Stickers';
import SimpleView from './components/SimpleView';
import Tour from './components/Tour';
import Terminal from './components/Terminal';
import MobileHome from './components/MobileHome';
import HackIntro from './components/HackIntro';
import Launcher from './components/Launcher';

function startSimple() {
  try {
    const q = new URLSearchParams(window.location.search).get('view');
    if (q) return q === 'simple';
    return localStorage.getItem('view') === 'simple';
  } catch { return false; }
}

export default function App() {
  const [activePage, setActivePage] = useState(() => (window.innerWidth <= 768 ? null : 'home')); // phones start on the home screen
  const [minimized, setMinimized] = useState(() => new URLSearchParams(window.location.search).has('hack'));
  const [simple, setSimple] = useState(startSimple);
  const [touring, setTouring] = useState(false);
  const [term, setTerm] = useState(false);
  const [launch, setLaunch] = useState(null); // null = closed, string = starting query
  // Intro game is off on first load for now. It only runs with ?hack=1 or the start-hack event.
  const [hack, setHack] = useState(() => new URLSearchParams(window.location.search).has('hack'));
  const windowBodyRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem('view', simple ? 'simple' : 'desktop'); } catch { /* ignore */ }
    document.body.classList.toggle('simple-mode', simple);
  }, [simple]);

  useEffect(() => {
    const replay = () => { setTerm(false); setMinimized(true); setHack(true); };
    window.addEventListener('start-hack', replay);
    return () => window.removeEventListener('start-hack', replay);
  }, []);

  useEffect(() => {
    const open = () => setTerm(true);
    const key = (e) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName || '');
      if (e.key === '`' && !typing) { e.preventDefault(); setTerm((t) => !t); }
    };
    window.addEventListener('open-terminal', open);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('open-terminal', open); window.removeEventListener('keydown', key); };
  }, []);

  useEffect(() => {
    const start = () => { setMinimized(true); setTouring(true); };
    window.addEventListener('start-tour', start);
    return () => window.removeEventListener('start-tour', start);
  }, []);

  useEffect(() => {
    const go = () => setSimple(true);
    window.addEventListener('go-simple', go);
    return () => window.removeEventListener('go-simple', go);
  }, []);

  // ⌘K / Ctrl+K search and command launcher
  useEffect(() => {
    const open = (e) => setLaunch(typeof e.detail === 'string' ? e.detail : '');
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setLaunch((l) => (l === null ? '' : null));
      }
    };
    window.addEventListener('open-launcher', open);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('open-launcher', open); window.removeEventListener('keydown', key); };
  }, []);

  const showPage = (name) => {
    setActivePage(name);
    setMinimized(false);
    if (windowBodyRef.current && name) {
      windowBodyRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const go = (e) => showPage(e.detail);
    window.addEventListener('show-page', go);
    return () => window.removeEventListener('show-page', go);
  });

  if (simple) return <SimpleView onDesktop={() => setSimple(false)} />;

  return (
    <>
      <MenuBar showPage={showPage} onSimple={() => setSimple(true)} />
      <div className="desktop">
        <div className="desktop-widgets-wrapper">
          <DesktopWidgets />
        </div>
      </div>
      <MobileHome showPage={showPage} onSimple={() => setSimple(true)} />
      <Stickers />
      <DesktopIcons activePage={activePage} showPage={showPage} />
      <Window
        activePage={activePage}
        showPage={showPage}
        title={pageTitles[activePage] || (activePage?.startsWith('case-') && caseStudies[activePage.slice(5)] ? `${caseStudies[activePage.slice(5)].title} · case study` : activePage)}
        windowBodyRef={windowBodyRef}
        minimized={minimized}
        setMinimized={setMinimized}
      />
      <Dock activePage={activePage} showPage={showPage} />
      {hack && <HackIntro onDone={() => { setHack(false); setMinimized(false); }} />}
      {launch !== null && <Launcher initial={launch} onClose={() => setLaunch(null)} />}
      {term && <Terminal onClose={() => setTerm(false)} showPage={showPage} />}
      {touring && (
        <Tour
          onClose={() => { setTouring(false); setMinimized(false); }}
          onFinish={() => { setTouring(false); showPage('projects'); }}
        />
      )}
    </>
  );
}
