import { useEffect, useState } from 'react';

export default function CalendarWidget() {
  const [dateInfo, setDateInfo] = useState({ month: '', date: 1, days: [], startDay: 0 });

  useEffect(() => {
    const d = new Date();
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    
    const year = d.getFullYear();
    const month = d.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    
    setDateInfo({
      month: months[month],
      date: d.getDate(),
      days: Array.from({length: daysInMonth}, (_, i) => i + 1),
      startDay: firstDay
    });
  }, []);

  return (
    <div className="widget-panel calendar-widget">
      <div className="calendar-header">{dateInfo.month}</div>
      <div className="calendar-grid">
        <span className="calendar-day-label">S</span>
        <span className="calendar-day-label">M</span>
        <span className="calendar-day-label">T</span>
        <span className="calendar-day-label">W</span>
        <span className="calendar-day-label">T</span>
        <span className="calendar-day-label">F</span>
        <span className="calendar-day-label">S</span>
        
        {Array.from({length: dateInfo.startDay}).map((_, i) => (
          <span key={`empty-${i}`} className="calendar-day"></span>
        ))}
        
        {dateInfo.days.map((num) => (
          <span key={num} className={`calendar-day ${num === dateInfo.date ? 'active' : ''}`}>{num}</span>
        ))}
      </div>
    </div>
  );
}
