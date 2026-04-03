export default function PhotoWidget({ src, type = "large" }) {
  return (
    <div className={`widget-panel photo-widget-${type}`}>
      <img src={src} alt="Widget Photo" />
    </div>
  );
}
