import { useState, useEffect, useRef } from 'react';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import AwardsPage from './pages/AwardsPage';
import CaseStudyPage from './pages/CaseStudyPage';
import { IosBack, HomeBar } from './IosBits';

const pages = {
  home: WelcomePage,
  about: AboutPage,
  experience: ExperiencePage,
  projects: ProjectsPage,
  skills: SkillsPage,
  contact: ContactPage,
  awards: AwardsPage,
};

export default function Window({ activePage, showPage, title, windowBodyRef, minimized, setMinimized }) {
  const [maximized, setMaximized] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Show a "scroll for more" hint until the visitor scrolls.
  useEffect(() => {
    const el = windowBodyRef.current;
    if (!el) return undefined;
    const check = () => setShowHint(el.scrollHeight - el.clientHeight > 60 && el.scrollTop < 40);
    const t = setTimeout(check, 400);
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { clearTimeout(t); el.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [activePage, maximized, windowBodyRef]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(null); // {w, h} once the visitor resizes
  const [resizing, setResizing] = useState(null);
  const winRef = useRef(null);

  if (!activePage) return null;

  const caseId = activePage.startsWith('case-') ? activePage.slice(5) : null;
  const PageComponent = caseId ? CaseStudyPage : pages[activePage];

  const handlePointerDown = (e) => {
    // Prevent dragging if the user is clicking on the control buttons
    if (e.target.closest('.traffic-lights') || maximized) return;
    
    const r = winRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
      // how far the window can travel so the title bar always stays reachable
      minX: position.x - (r.left + r.width - 140), maxX: position.x + (window.innerWidth - 140 - r.left),
      minY: position.y - (r.top - 44), maxY: position.y + (window.innerHeight - 90 - r.top),
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || window.innerWidth <= 768) return;
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    setPosition({
      x: clamp(e.clientX - dragStart.x, dragStart.minX, dragStart.maxX),
      y: clamp(e.clientY - dragStart.y, dragStart.minY, dragStart.maxY),
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Resize from any edge or corner. The window is centred with translate(-50%),
  // so we shift it by half the size change to keep the opposite edge still.
  const startResize = (dir) => (e) => {
    if (maximized || window.innerWidth <= 768) return;
    e.preventDefault(); e.stopPropagation();
    const r = winRef.current.getBoundingClientRect();
    setResizing({ dir, sx: e.clientX, sy: e.clientY, w: r.width, h: r.height, px: position.x, py: position.y, top: r.top, left: r.left });
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onResize = (e) => {
    if (!resizing) return;
    const { dir, sx, sy, w, h, px, py, top, left } = resizing;
    const minW = 420, minH = 300;
    const maxW = window.innerWidth - 24, maxH = window.innerHeight - 110;
    let dx = e.clientX - sx, dy = e.clientY - sy;
    let nw = w, nh = h, nx = px, ny = py;
    if (dir.includes('e')) { nw = Math.min(Math.max(w + dx, minW), Math.min(maxW, window.innerWidth - left - 8)); nx = px + (nw - w) / 2; }
    if (dir.includes('w')) { nw = Math.min(Math.max(w - dx, minW), Math.min(maxW, left + w - 8)); nx = px - (nw - w) / 2; }
    if (dir.includes('s')) { nh = Math.min(Math.max(h + dy, minH), Math.min(maxH, window.innerHeight - top - 70)); ny = py + (nh - h) / 2; }
    if (dir.includes('n')) { nh = Math.min(Math.max(h - dy, minH), Math.min(maxH, top + h - 44)); ny = py - (nh - h) / 2; }
    setSize({ w: nw, h: nh }); setPosition({ x: nx, y: ny });
  };
  const endResize = (e) => { if (resizing) { setResizing(null); try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ } } };
  const reset = () => { setMaximized(false); setPosition({ x: 0, y: 0 }); setSize(null); };

  return (
    <div 
      ref={winRef}
      className={`window${maximized ? ' maximized' : ''}${minimized ? ' minimized' : ''}${(['projects', 'awards', 'contact', 'experience', 'skills'].includes(activePage) || activePage.startsWith('case-')) ? ' window-wide' : ''}`}
      id="mainWindow"
      aria-hidden={minimized}
      style={maximized || minimized ? undefined : {
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        transition: isDragging || resizing ? 'none' : 'transform 0.1s',
        ...(size ? { width: size.w, height: size.h, maxWidth: 'none', maxHeight: 'none' } : {}),
      }}
    >
      <div 
        className="window-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={(e) => { if (!e.target.closest('.traffic-lights')) setMaximized((m) => !m); }}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none'
        }}
      >
        <IosBack label={caseId ? 'Projects' : 'Home'} onClick={() => (caseId ? showPage('projects') : (reset(), showPage(null)))} />
        <div className="traffic-lights">
          <button className="tl tl-red" title="Close" aria-label="Close window"
            onClick={() => { reset(); showPage(null); }}>×</button>
          <button className="tl tl-yellow" title="Minimize" aria-label="Minimize window"
            onClick={() => setMinimized(true)}>−</button>
          <button className="tl tl-green" title={maximized ? 'Exit full size' : 'Full size'} aria-label="Toggle full size"
            onClick={() => setMaximized((m) => !m)}>{maximized ? '−' : '+'}</button>
        </div>
        <div className="window-title"><span className="win-path">~/{(activePage || "").replace("case-", "case-studies/").replace("home", "welcome")}</span><span className="win-name">{String(title).split(' · ')[0]}{String(title).includes(' · ') && <span className="win-sub"> · {String(title).split(' · ').slice(1).join(' · ')}</span>}</span></div>
      </div>
      <div className="window-body" ref={windowBodyRef}>
        {PageComponent && <PageComponent showPage={showPage} caseId={caseId} />}
      </div>
      {!maximized && !minimized && ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map((d) => (
        <div key={d} className={`win-rz win-rz-${d}`} aria-hidden="true"
          onPointerDown={startResize(d)} onPointerMove={onResize} onPointerUp={endResize} onPointerCancel={endResize}
          onDoubleClick={d === 'se' ? reset : undefined} />
      ))}
      {!maximized && !minimized && <span className="win-grip" aria-hidden="true" />}
      <HomeBar onHome={() => { reset(); showPage(null); }} />
      <div className={`scroll-fade${showHint ? ' on' : ''}`} aria-hidden="true" />
      <button
        className={`scroll-hint${showHint ? ' on' : ''}`}
        tabIndex={showHint ? 0 : -1}
        onClick={() => windowBodyRef.current?.scrollBy({ top: windowBodyRef.current.clientHeight * 0.7, behavior: 'smooth' })}
      >
        scroll for more <span>↓</span>
      </button>
    </div>
  );
}
