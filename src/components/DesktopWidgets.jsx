import WeatherWidget from './widgets/WeatherWidget';
import CalendarWidget from './widgets/CalendarWidget';
import EventWidget from './widgets/EventWidget';
import PhotoWidget from './widgets/PhotoWidget';
import MediaWidget from './widgets/MediaWidget';

export default function DesktopWidgets() {
  return (
    <div className="desktop-widgets-container">
      <div className="widget-zone left">
        <div className="widget-row">
          <WeatherWidget />
          <CalendarWidget />
        </div>
        <EventWidget />
        {/* Rug and cats */}
        <div className="widget-row">
          <PhotoWidget src="./rug.png" type="small" />
          <PhotoWidget src="./cats.jpg" type="small" />
        </div>
        {/* Large aesthetic image */}
        <PhotoWidget src="./lilies.png" type="large" />
      </div>

      <div className="widget-zone right">
        {/* Large aesthetic image matching the reference top right */}
        <PhotoWidget src="./quote-bg.jpg" type="large" />
        <MediaWidget />
      </div>
    </div>
  );
}
