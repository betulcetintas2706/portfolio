import { useEffect, useState } from 'react';

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
        <div style={{fontSize: '10px', opacity: 0.6}}>No upcoming meetings</div>
      </div>
      <div className="events-section">
        <div className="date-event">
          <div>Next Week</div>
          <div style={{opacity: 0.5}}>Hackathon Presentation</div>
        </div>
        <div className="date-event">
          <div>Check-in</div>
          <div style={{opacity: 0.5}}>Team Sync</div>
        </div>
      </div>
    </div>
  );
}
