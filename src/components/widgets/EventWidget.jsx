import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';

export default function EventWidget() {
  const [date, setDate] = useState({ day: 1, text: '' });
  
  useEffect(() => {
    const d = new Date();
    const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    setDate({ day: d.getDate(), text: weekDays[d.getDay()] });
  }, []);

  return (
    <div className="widget-panel wide-widget">
      <div className="date-section">
        <div className="date-day-name">{date.text}</div>
        <div className="date-number">{date.day}</div>
        <div style={{fontSize: '10px', opacity: 0.6}}>Open to Summer 2027</div>
      </div>
      <div className="events-section">
        {personalInfo.nowBuilding.map((item) => (
          <div key={item} className="date-event">
            <div>Now building</div>
            <div style={{opacity: 0.5}}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
