import { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

const pages = {
  home: WelcomePage,
  about: AboutPage,
  experience: ExperiencePage,
  projects: ProjectsPage,
  skills: SkillsPage,
  contact: ContactPage,
};

export default function Window({ activePage, showPage, title, windowBodyRef }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  if (!activePage) return null;

  const PageComponent = pages[activePage];

  const handlePointerDown = (e) => {
    // Prevent dragging if the user is clicking on the control buttons
    if (e.target.closest('.traffic-lights')) return;
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || window.innerWidth <= 768) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="window" 
      id="mainWindow"
      style={{ 
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        transition: isDragging ? 'none' : 'transform 0.1s' 
      }}
    >
      <div 
        className="window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none'
        }}
      >
        <div className="traffic-lights">
          <div className="tl tl-red" onClick={() => showPage(null)}>×</div>
          <div className="tl tl-yellow">−</div>
          <div className="tl tl-green">+</div>
        </div>
        <div className="window-title">{title}</div>
      </div>
      <div className="window-body" ref={windowBodyRef}>
        {PageComponent && <PageComponent showPage={showPage} />}
      </div>
    </div>
  );
}
