import { useState, useEffect, useRef } from "react";
import "./PortfolioWork.css";
import projects from "./projects";

const MAX_VISIBLE_TAGS = 3;

const FILTERS = [
  { key: "all",       label: "all" },
  { key: "mlai",      label: "machine learning & ai" },
  { key: "fullstack", label: "full stack development" },
  { key: "gamedev",   label: "game development" },
];

export default function PortfolioWork() {
  const [active, setActive] = useState(null);
  const [viewedMedia, setViewedMedia] = useState(null);
  const [filter, setFilter] = useState("all");
  const [galleryColumns, setGalleryColumns] = useState(getGalleryColumns());
  const projectHistoryStatePushed = useRef(false);
  const mediaHistoryStatePushed = useRef(false);

  const visible = filter === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(filter));
  const displayProjects = reorderForGallery(visible, galleryColumns);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    if (active !== null) {
      if (!projectHistoryStatePushed.current) {
        window.history.pushState({ mgPortfolioWork: "project" }, "", window.location.href);
        projectHistoryStatePushed.current = true;
      }
      return;
    }

    projectHistoryStatePushed.current = false;
  }, [active]);

  useEffect(() => {
    if (viewedMedia !== null) {
      if (!mediaHistoryStatePushed.current) {
        window.history.pushState({ mgPortfolioWork: "media" }, "", window.location.href);
        mediaHistoryStatePushed.current = true;
      }
      return;
    }

    mediaHistoryStatePushed.current = false;
  }, [viewedMedia]);

  useEffect(() => {
    const onResize = () => setGalleryColumns(getGalleryColumns());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key !== "Escape") return;
      if (viewedMedia !== null) {
        setViewedMedia(null);
        return;
      }
      setActive(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [viewedMedia]);

  useEffect(() => {
    const onPopState = () => {
      if (viewedMedia !== null) {
        setViewedMedia(null);
        return;
      }

      if (active !== null) {
        setActive(null);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [active, viewedMedia]);

  const openCaseStudy = (idx) => {
    setViewedMedia(null);
    setActive(idx);
  };

  const closeCaseStudy = () => {
    setViewedMedia(null);
    if (window.history.state?.mgPortfolioWork === "project") {
      window.history.back();
      return;
    }

    setActive(null);
  };

  const closeMediaViewer = () => {
    if (window.history.state?.mgPortfolioWork === "media") {
      window.history.back();
      return;
    }

    setViewedMedia(null);
  };

  return (
    <section className="mg-root" aria-label="Selected work">
      <div className="mg-eyebrow">selected work</div>

      <div className="mg-filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = f.key === "all"
            ? projects.length
            : projects.filter((p) => p.categories.includes(f.key)).length;
          return (
            <button
              key={f.key}
              className={`mg-filter${filter === f.key ? " mg-filter-on" : ""}`}
              onClick={() => { setFilter(f.key); setActive(null); }}
              aria-pressed={filter === f.key}
            >
              {f.label}
              <span className="mg-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mg-gallery" key={filter}>
        {displayProjects.map(({ proj, idx }) => {
          return (
            <GalleryCard key={proj.id} proj={proj} index={idx} onClick={() => openCaseStudy(idx)} />
          );
        })}
      </div>

      {active !== null && (
        <>
          <div className="mg-overlay" onClick={closeCaseStudy} aria-hidden="true" />
          <CaseStudyPanel
            p={projects[active]}
            index={active}
            total={projects.length}
            onClose={closeCaseStudy}
            onViewMedia={setViewedMedia}
          />
        </>
      )}

      {viewedMedia !== null && (
        <MediaViewer item={viewedMedia} onClose={closeMediaViewer} />
      )}
    </section>
  );
}

function getGalleryColumns() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function reorderForGallery(items, columnCount) {
  const indexed = items.map((proj) => ({ proj, idx: projects.indexOf(proj) }));
  if (columnCount <= 1) return indexed;

  const columns = Array.from({ length: columnCount }, () => []);
  indexed.forEach((item, i) => {
    columns[i % columnCount].push(item);
  });

  return columns.flat();
}

function GalleryCard({ proj, index, onClick }) {
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
            <span className="mg-thumb-num">{String(index + 1).padStart(2, "0")}</span>
          </>
        ) : (
          <div className="mg-thumb-placeholder">
            <span className="mg-thumb-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="mg-thumb-label">{proj.media[0]?.label ?? proj.name}</span>
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

function IconArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelHero({ item, onView }) {
  if (!item?.src) {
    return (
      <div className="mg-panel-thumb">
        <span className="mg-panel-thumb-label">{item?.label}</span>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="mg-panel-thumb mg-panel-thumb-media mg-panel-thumb-button"
      onClick={() => onView(item)}
      aria-label={`View ${item.label}`}
    >
      {item.type === "video" ? (
        <>
          <video
            src={item.src}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            className="mg-panel-thumb-asset mg-panel-thumb-asset-cover mg-panel-thumb-asset-video"
          />
          <MediaPlayOverlay />
        </>
      ) : (
        <img
          src={item.src}
          alt={item.label}
          className="mg-panel-thumb-asset mg-panel-thumb-asset-cover mg-panel-thumb-asset-image"
        />
      )}
    </button>
  );
}

function MediaGrid({ items, onView }) {
  const extra = items.filter((m) => m.src);
  if (extra.length === 0) return null;
  return (
    <div className="mg-media-grid">
      {extra.map((item, i) => (
        <button
          key={i}
          type="button"
          className="mg-media-cell"
          onClick={() => onView(item)}
          aria-label={`View ${item.label}`}
        >
          {item.type === "video" ? (
            <>
              <video src={item.src} muted playsInline loop autoPlay preload="metadata" className="mg-media-asset mg-media-asset-cover mg-media-asset-video" />
              <MediaPlayOverlay />
            </>
          ) : (
            <img src={item.src} alt={item.label} className="mg-media-asset mg-media-asset-cover mg-media-asset-image" />
          )}
        </button>
      ))}
    </div>
  );
}

function CaseStudyPanel({ p, index, total, onClose, onViewMedia }) {
  const heroItem = p.media[0];
  const extraMedia = p.media.slice(1).filter((m) => m.src);

  return (
    <aside className="mg-panel" aria-label={`Case study: ${p.name}`}>
      <div className="mg-panel-bar">
        <span className="mg-panel-counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · case study
        </span>
        <button className="mg-close" onClick={onClose} aria-label="Close case study">
          close ×
        </button>
      </div>

      <PanelHero item={heroItem} onView={onViewMedia} />

      <div className="mg-panel-body">
        <div className="mg-panel-meta">{p.year} · {p.role.toUpperCase()}</div>
        <h2 className="mg-panel-title">{p.name}</h2>
        <p className="mg-panel-tagline">{p.tagline}</p>

        <ul className="mg-tags mg-panel-tags">
          {p.tech.map((t) => <li key={t} className="mg-tag">{t}</li>)}
        </ul>

        {extraMedia.length > 0 && <MediaGrid items={extraMedia} onView={onViewMedia} />}

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
              <span className="mg-problem-eyebrow">problem {String(i + 1).padStart(2, "0")}</span>
              <p className="mg-problem-q">{pr.q}</p>
              <p className="mg-problem-a">{pr.a}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function MediaViewer({ item, onClose }) {
  return (
    <div className="mg-media-viewer" role="dialog" aria-modal="true" aria-label={`View ${item.label}`} onClick={onClose}>
      <div className="mg-media-viewer-frame" onClick={(e) => e.stopPropagation()}>
        <div className="mg-media-viewer-bar">
          <span className="mg-media-viewer-label">{item.label}</span>
          <button type="button" className="mg-media-viewer-close" onClick={onClose} aria-label="Close media viewer">
            close ×
          </button>
        </div>
        {item.type === "video" ? (
          <video src={item.src} controls autoPlay playsInline className="mg-media-viewer-asset mg-media-viewer-asset-video" />
        ) : (
          <img src={item.src} alt={item.label} className="mg-media-viewer-asset mg-media-viewer-asset-image" />
        )}
      </div>
    </div>
  );
}

function MediaPlayOverlay() {
  return (
    <span className="mg-media-play-overlay" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <circle cx="24" cy="24" r="22" fill="rgba(17,17,17,.7)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" />
        <path d="M20 16.5L33 24L20 31.5V16.5Z" fill="white" />
      </svg>
    </span>
  );
}
