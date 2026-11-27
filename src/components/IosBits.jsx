// Small iPhone-only pieces: a back button for app nav bars and the home
// indicator bar. Both are hidden on desktop by CSS.
import { useRef } from 'react';

export function IosBack({ onClick, label = 'Home' }) {
  return (
    <button className="ios-back" onClick={onClick} aria-label={`Back to ${label}`}>
      <svg viewBox="0 0 12 20" aria-hidden="true"><path d="M10 2L2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {label}
    </button>
  );
}

// Tap or swipe up on the bar to go home, like an iPhone.
export function HomeBar({ onHome }) {
  const y = useRef(null);
  return (
    <div className="ios-homebar" role="button" aria-label="Go to home screen" tabIndex={0}
      onClick={onHome}
      onKeyDown={(e) => { if (e.key === 'Enter') onHome(); }}
      onTouchStart={(e) => { y.current = e.touches[0].clientY; }}
      onTouchEnd={(e) => { if (y.current !== null && y.current - e.changedTouches[0].clientY > 30) onHome(); y.current = null; }}>
      <i />
    </div>
  );
}
