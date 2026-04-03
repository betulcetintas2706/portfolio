import { useEffect, useRef } from 'react';
import { skills } from '../../data/portfolioData';

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
          <div className="skill-category-title">// Programming Languages</div>
          <div className="skill-bars">
            {skills.languages.map((lang) => (
              <div key={lang.name} className="skill-bar-row">
                <div className="skill-name">{lang.name}</div>
                <div className="skill-track">
                  <div className="skill-fill" data-width={`${lang.pct}%`} style={{ width: `${lang.pct}%` }} />
                </div>
                <div className="skill-pct">{lang.pct}%</div>
              </div>
            ))}
          </div>
        </div>
        {skills.categories.map((cat) => (
          <div key={cat.title}>
            <div className="skill-category-title">{cat.title}</div>
            <div className="skills-chips">
              {cat.chips.map((chip) => (
                <span key={chip} className="skill-chip">{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
