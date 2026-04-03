import { useState, useRef } from 'react';
import { pageTitles } from './data/portfolioData';
import MenuBar from './components/MenuBar';
import DesktopIcons from './components/DesktopIcons';
import Window from './components/Window';
import Dock from './components/Dock';
import DesktopWidgets from './components/DesktopWidgets';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // start with welcome window
  const windowBodyRef = useRef(null);

  const showPage = (name) => {
    setActivePage(name);
    if (windowBodyRef.current && name) {
      windowBodyRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <MenuBar showPage={showPage} />
      <div className="desktop">
        <DesktopWidgets />
      </div>
      <DesktopIcons activePage={activePage} showPage={showPage} />
      <Window
        activePage={activePage}
        showPage={showPage}
        title={pageTitles[activePage] || activePage}
        windowBodyRef={windowBodyRef}
      />
      <Dock activePage={activePage} showPage={showPage} />
    </>
  );
}
