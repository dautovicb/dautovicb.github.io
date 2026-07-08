import { MAX_VISIBLE_TAGS } from "../constants";
import { pad2 } from "../utils";

export default function GalleryCard({ proj, index, onClick }) {
  const extra = proj.tech.length - MAX_VISIBLE_TAGS;
  return (
    <article
      className="mg-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      aria-label={`Open case study: ${proj.name}`}
    >
      <div className="mg-thumb">
        {proj.media[0].src ? (
          <>
            <img src={proj.media[0].src} alt={proj.name} className="mg-thumb-img" />
            <span className="mg-thumb-num">{pad2(index + 1)}</span>
          </>
        ) : (
          <div className="mg-thumb-placeholder">
            <span className="mg-thumb-num">{pad2(index + 1)}</span>
            <span className="mg-thumb-label">{proj.name}</span>
          </div>
        )}
      </div>
      <div className="mg-card-body">
        <div className="mg-card-meta">{proj.year} · {proj.role.toUpperCase()}</div>
        <h3 className="mg-card-title">{proj.name}</h3>
        <p className="mg-card-tagline">{proj.tagline}</p>
        <ul className="mg-tags">
          {proj.tech.slice(0, MAX_VISIBLE_TAGS).map((t) => (
            <li key={t} className="mg-tag">{t}</li>
          ))}
          {extra > 0 && <li className="mg-tag mg-tag-more">+{extra}</li>}
        </ul>
      </div>
    </article>
  );
}
