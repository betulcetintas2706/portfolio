import { awards, personalInfo } from '../../data/portfolioData';

export default function AwardsPage() {
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">Awards & <span>Recognition</span></div>
        <div className="section-sub">Hackathon wins, scholarships and more</div>
      </div>
      <div className="awards-list">
        {awards.map((a, i) => (
          <div key={i} className="award-card">
            <div className="award-emoji">{a.emoji}</div>
            <div className="award-body">
              <div className="award-head">
                <div className="award-title">{a.title}</div>
                <div className="exp-date">{a.year}</div>
              </div>
              <div className="award-where">{a.where}{a.project ? ` · ${a.project}` : ''}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="open-to">✦ <a href={personalInfo.devpost} target="_blank" rel="noreferrer">See every project on Devpost</a></div>
    </div>
  );
}
