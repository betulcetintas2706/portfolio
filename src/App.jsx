import { useState, useRef, useEffect } from 'react';
import { pageTitles } from './data/portfolioData';
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

function startSimple() {
  try {
    const q = new URLSearchParams(window.location.search).get('view');
    if (q) return q === 'simple';
    return localStorage.getItem('view') === 'simple';
  } catch { return false; }
}

export default function App() {
  const [activePage, setActivePage] = useState(() => (window.innerWidth <= 768 ? null : 'home')); // phones start on the home screen
  const [minimized, setMinimized] = useState(false);
  const [simple, setSimple] = useState(startSimple);
  const [touring, setTouring] = useState(false);
  const [term, setTerm] = useState(false);
  const windowBodyRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem('view', simple ? 'simple' : 'desktop'); } catch { /* ignore */ }
    document.body.classList.toggle('simple-mode', simple);
  }, [simple]);

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

  const showPage = (name) => {
    setActivePage(name);
    setMinimized(false);
    if (windowBodyRef.current && name) {
      windowBodyRef.current.scrollTop = 0;
    }
  };

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
        title={pageTitles[activePage] || activePage}
        windowBodyRef={windowBodyRef}
        minimized={minimized}
        setMinimized={setMinimized}
      />
      <Dock activePage={activePage} showPage={showPage} />
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
