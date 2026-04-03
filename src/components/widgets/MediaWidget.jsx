export default function MediaWidget() {
  return (
    <div className="widget-panel media-widget">
      <div className="media-art">
        {/* Using a cinematic, vintage floral placeholder for Lana Del Rey */}
        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=200&fit=crop" alt="Album Art" />
      </div>
      <div className="media-info">
        <div className="media-title">Cinnamon Girl</div>
        <div className="media-artist">Lana Del Rey - NFR!</div>
        <div className="media-controls">
          <span>⏮</span>
          <span>▶</span>
          <span>⏭</span>
        </div>
      </div>
    </div>
  );
}
