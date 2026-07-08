export default function MediaPlayOverlay() {
  return (
    <span className="mg-media-play-overlay" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <circle cx="24" cy="24" r="22" fill="rgba(17,17,17,.7)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" />
        <path d="M20 16.5L33 24L20 31.5V16.5Z" fill="white" />
      </svg>
    </span>
  );
}
