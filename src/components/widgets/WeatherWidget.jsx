import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [data, setData] = useState({ temp: '--', condition: 'Loading...', high: '--', low: '--', icon: '☁' });

  useEffect(() => {
    // Fetch from free open-meteo API for Toronto (-79.38, 43.65)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.38&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York')
      .then(res => res.json())
      .then(resData => {
        const temp = Math.round(resData.current_weather.temperature);
        const code = resData.current_weather.weathercode;
        const max = Math.round(resData.daily.temperature_2m_max[0]);
        const min = Math.round(resData.daily.temperature_2m_min[0]);
        
        let condition = "Clear";
        let icon = "☀";
        if (code > 0 && code <= 3) { condition = "Cloudy"; icon = "☁"; }
        if (code >= 51 && code <= 67) { condition = "Rain"; icon = "🌧"; }
        if (code >= 71 && code <= 77) { condition = "Snow"; icon = "❄"; }
        if (code >= 95) { condition = "Thunderstorm"; icon = "⛈"; }
        
        setData({ temp, condition, high: max, low: min, icon });
      })
      .catch(err => {
        console.error("Weather error:", err);
        setData({ temp: '17', condition: 'Partly Cloudy', high: 19, low: 12, icon: '☁' });
      });
  }, []);

  return (
    <div className="widget-panel weather-widget">
      <div className="weather-top">
        <span>Toronto ⚲</span>
        <span style={{ fontSize: '24px', lineHeight: '0.8', display: 'inline-block', transform: 'translateY(-4px)' }}>{data.icon}</span>
      </div>
      <div className="weather-temp">{data.temp}°</div>
      <div className="weather-bottom">
        <div>{data.condition}</div>
        <div>H:{data.high}° L:{data.low}°</div>
      </div>
    </div>
  );
}
