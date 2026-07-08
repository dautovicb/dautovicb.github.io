import PanelHero from "./PanelHero";
import MediaGrid from "./MediaGrid";
import IconArrow from "./IconArrow";
import { pad2 } from "../utils";

export default function CaseStudyPanel({ p, index, total, onClose, onViewMedia }) {
  const heroItem = p.media[0];
  const viewableMedia = p.media.filter((m) => m.src);
  const extraMedia = p.media.slice(1).filter((m) => m.src);
  const heroViewIndex = viewableMedia.indexOf(heroItem);

  return (
    <aside className="mg-panel" aria-label={`Case study: ${p.name}`}>
      <div className="mg-panel-bar">
        <span className="mg-panel-counter">
          {pad2(index + 1)} / {pad2(total)} · case study
        </span>
        <button className="mg-close" onClick={onClose} aria-label="Close case study">
          close ×
        </button>
      </div>

      <PanelHero
        item={heroItem}
        projectName={p.name}
        onView={heroViewIndex >= 0 ? () => onViewMedia(heroViewIndex) : undefined}
      />

      <div className="mg-panel-body">
        <div className="mg-panel-meta">{p.year} · {p.role.toUpperCase()}</div>
        <h2 className="mg-panel-title">{p.name}</h2>
        <p className="mg-panel-tagline">{p.tagline}</p>

        <ul className="mg-tags mg-panel-tags">
          {p.tech.map((t) => <li key={t} className="mg-tag">{t}</li>)}
        </ul>

        {extraMedia.length > 0 && (
          <MediaGrid items={extraMedia} viewableMedia={viewableMedia} projectName={p.name} onView={onViewMedia} />
        )}

        {p.links.length > 0 && (
          <div className="mg-panel-links">
            {p.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="mg-panel-link">
                {l.label} <IconArrow />
              </a>
            ))}
          </div>
        )}

        <p className="mg-panel-desc">{p.description}</p>

        <div className="mg-panel-problems">
          {p.problems.map((pr, i) => (
            <div key={i} className="mg-problem">
              <span className="mg-problem-marker" aria-hidden="true" />
              <span className="mg-problem-eyebrow">problem {pad2(i + 1)}</span>
              <p className="mg-problem-q">{pr.q}</p>
              <p className="mg-problem-a">{pr.a}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
