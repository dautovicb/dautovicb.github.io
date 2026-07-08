import { useState, useEffect, useRef } from "react";
import "./PortfolioWork.css";
import projects from "./projects";
import { FILTERS } from "./constants";
import { getGalleryColumns, reorderForGallery } from "./utils";
import GalleryCard from "./components/GalleryCard";
import CaseStudyPanel from "./components/CaseStudyPanel";
import MediaViewer from "./components/MediaViewer";

export default function PortfolioWork() {
  const [active, setActive] = useState(null);
  const [viewedIndex, setViewedIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [galleryColumns, setGalleryColumns] = useState(getGalleryColumns());
  const projectHistoryStatePushed = useRef(false);
  const mediaHistoryStatePushed = useRef(false);

  const visible = filter === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(filter));
  const displayProjects = reorderForGallery(visible, galleryColumns);

  const activeProject = active !== null ? projects[active] : null;
  const viewableMedia = activeProject ? activeProject.media.filter((m) => m.src) : [];

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
    if (viewedIndex !== null) {
      if (!mediaHistoryStatePushed.current) {
        window.history.pushState({ mgPortfolioWork: "media" }, "", window.location.href);
        mediaHistoryStatePushed.current = true;
      }
      return;
    }

    mediaHistoryStatePushed.current = false;
  }, [viewedIndex]);

  useEffect(() => {
    const onResize = () => setGalleryColumns(getGalleryColumns());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key !== "Escape") return;
      if (viewedIndex !== null) {
        setViewedIndex(null);
        return;
      }
      setActive(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [viewedIndex]);

  useEffect(() => {
    const onPopState = () => {
      if (viewedIndex !== null) {
        setViewedIndex(null);
        return;
      }

      if (active !== null) {
        setActive(null);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [active, viewedIndex]);

  const openCaseStudy = (idx) => {
    setViewedIndex(null);
    setActive(idx);
  };

  const closeCaseStudy = () => {
    setViewedIndex(null);
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

    setViewedIndex(null);
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
        {displayProjects.map(({ proj, idx }) => (
          <GalleryCard key={proj.id} proj={proj} index={idx} onClick={() => openCaseStudy(idx)} />
        ))}
      </div>

      {active !== null && (
        <>
          <div className="mg-overlay" onClick={closeCaseStudy} aria-hidden="true" />
          <CaseStudyPanel
            p={projects[active]}
            index={active}
            total={projects.length}
            onClose={closeCaseStudy}
            onViewMedia={setViewedIndex}
          />
        </>
      )}

      {viewedIndex !== null && viewableMedia[viewedIndex] && (
        <MediaViewer
          items={viewableMedia}
          index={viewedIndex}
          projectName={activeProject.name}
          onNavigate={setViewedIndex}
          onClose={closeMediaViewer}
        />
      )}
    </section>
  );
}
