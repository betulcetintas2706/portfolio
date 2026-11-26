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

function startSimple() {
  try {
    const q = new URLSearchParams(window.location.search).get('view');
    if (q) return q === 'simple';
    return localStorage.getItem('view') === 'simple';
  } catch { return false; }
}

export default function App() {
  const [activePage, setActivePage] = useState('home'); // start with welcome window
  const [minimized, setMinimized] = useState(false);
  const [simple, setSimple] = useState(startSimple);
  const [touring, setTouring] = useState(false);
  const windowBodyRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem('view', simple ? 'simple' : 'desktop'); } catch { /* ignore */ }
    document.body.classList.toggle('simple-mode', simple);
  }, [simple]);

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
      {touring && (
        <Tour
          onClose={() => { setTouring(false); setMinimized(false); }}
          onFinish={() => { setTouring(false); showPage('projects'); }}
        />
      )}
    </>
  );
}
