import { useEffect, useRef } from "react";
import "./CareerTimeline.css";
import entries from "./entries";

function IconArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CareerTimeline() {
  const rootRef = useRef(null);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll(".ct-node") ?? [];
    const observer = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ct-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ct-root" aria-label="Career timeline" ref={rootRef}>
      <div className="ct-eyebrow">a decade of building</div>

      <div className="ct-entries">
        {entries.map((entry, i) => (
          <div
            className="ct-node"
            key={i}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <aside className="ct-year-aside" aria-label={`${entry.year}`}>
              <span className="ct-year">{entry.year}</span>
            </aside>

            <div className="ct-connector" aria-hidden="true">
              <div className="ct-dot" />
              {i < entries.length - 1 && <div className="ct-vline" />}
            </div>

            <div className="ct-content">
              <div className="ct-domain">{entry.domain}</div>
              {entry.artifact && (
                <a
                  className="ct-artifact"
                  href={entry.artifact.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {entry.artifact.label} <IconArrow />
                </a>
              )}
              <p className="ct-note">{entry.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
