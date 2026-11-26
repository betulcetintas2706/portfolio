import { useEffect, useRef } from 'react';
import { skills } from '../../data/portfolioData';
import { devicon } from '../../lib/devicons';

export default function SkillsPage() {
  const barsRef = useRef(null);

  useEffect(() => {
    // Animate skill bars on mount
    if (barsRef.current) {
      const fills = barsRef.current.querySelectorAll('.skill-fill');
      fills.forEach((el) => {
        const w = el.getAttribute('data-width');
        el.style.width = '0';
        setTimeout(() => { el.style.width = w; }, 50);
      });
    }
  }, []);

  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">Skills & <span>Tools</span></div>
        <div className="section-sub">My technical toolkit</div>
      </div>
      <div className="skills-section" ref={barsRef}>
        <div>
          <div className="skill-category-title">// Languages · where I've used them</div>
          <div className="lang-grid">
            {skills.languages.map((lang) => (
              <div key={lang.name} className="lang-card">
                <div className="lang-head">
                  {devicon(lang.name) && <img className="devicon lang-logo" src={devicon(lang.name)} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}
                  <span className="lang-name">{lang.name}</span>
                  {lang.usedIn.length > 0 && <span className="lang-count">{lang.usedIn.length}</span>}
                </div>
                {lang.usedIn.length > 0 && (
                  <div className="lang-used"><span className="lang-arrow">→</span>{lang.usedIn.join(' · ')}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        {skills.categories.map((cat) => (
          <div key={cat.title}>
            <div className="skill-category-title">{cat.title}</div>
            <div className="skills-chips">
              {cat.chips.map((chip) => (
                <span key={chip} className="skill-chip">{devicon(chip) && <img className="devicon" src={devicon(chip)} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
