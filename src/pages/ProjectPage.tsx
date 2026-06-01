import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

type ResolvedMediaItem = {
  src: string
  type: 'image' | 'video'
  poster?: string
  label?: string
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov']

function inferMediaType(src: string): 'image' | 'video' {
  const sourcePath = src.toLowerCase().split('?')[0]
  return VIDEO_EXTENSIONS.some((ext) => sourcePath.endsWith(ext)) ? 'video' : 'image'
}

function VideoStripThumb({ src }: { src: string }) {
  return (
    <video
      src={src}
      preload="metadata"
      muted
      className="media-strip-thumb"
      onLoadedMetadata={(e) => {
        ;(e.target as HTMLVideoElement).currentTime = 0.5
      }}
    />
  )
}

function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  const resolvedMedia = useMemo<ResolvedMediaItem[]>(() => {
    if (!project) return []
    return project.media.map((item) => {
      if (typeof item === 'string') return { src: item, type: inferMediaType(item) }
      return {
        src: item.src,
        type: item.type ?? inferMediaType(item.src),
        poster: item.poster,
        label: item.label,
      }
    })
  }, [project])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [slug])

  useEffect(() => {
    if (resolvedMedia.length < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(resolvedMedia.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resolvedMedia.length])

  const activeMedia = resolvedMedia[activeIndex]
  const canPrev = activeIndex > 0
  const canNext = activeIndex < resolvedMedia.length - 1

  if (!project) {
    return (
      <div className="site-shell">
        <header className="topbar">
          <p className="kicker">Portfolio</p>
          <p className="meta">Project not found</p>
        </header>
        <main>
          <section className="project-detail">
            <h1>Project not found</h1>
            <p className="lead">The project URL does not match any existing entry.</p>
            <Link to="/" className="inline-link">Back to project index</Link>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link to="/" className="inline-link">Project index</Link>
        <p className="meta">{project.year}</p>
      </header>

      <main>
        <section className="project-detail" aria-labelledby="project-title">
          <p className="kicker">{project.category}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="lead">{project.summary}</p>

          {resolvedMedia.length > 0 && (
            <div className="media-gallery">
              <div className="media-viewer">
                {activeMedia.type === 'video' ? (
                  <video
                    key={activeMedia.src}
                    className="media-main-video"
                    controls
                    preload="metadata"
                    poster={activeMedia.poster}
                  >
                    <source src={activeMedia.src} />
                  </video>
                ) : (
                  <img
                    key={activeMedia.src}
                    src={activeMedia.src}
                    alt={activeMedia.label ?? `${project.title} — ${activeIndex + 1}`}
                    className="media-main-img"
                  />
                )}

                {resolvedMedia.length > 1 && (
                  <>
                    <button
                      className="media-nav media-nav--prev"
                      onClick={() => setActiveIndex((i) => i - 1)}
                      disabled={!canPrev}
                      aria-label="Previous"
                    >
                      ‹
                    </button>
                    <button
                      className="media-nav media-nav--next"
                      onClick={() => setActiveIndex((i) => i + 1)}
                      disabled={!canNext}
                      aria-label="Next"
                    >
                      ›
                    </button>
                    <span className="media-counter">
                      {activeIndex + 1} / {resolvedMedia.length}
                    </span>
                  </>
                )}
              </div>

              {resolvedMedia.length > 1 && (
                <div className="media-strip" role="tablist" aria-label="Media thumbnails">
                  {resolvedMedia.map((item, index) => (
                    <button
                      key={index}
                      role="tab"
                      className={`media-strip-item${index === activeIndex ? ' is-active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`${item.type === 'video' ? 'Video' : 'Image'} ${index + 1}`}
                      aria-selected={index === activeIndex}
                    >
                      {item.type === 'video' ? (
                        <div className="media-strip-video-wrap">
                          <VideoStripThumb src={item.src} />
                          <span className="media-strip-play" aria-hidden="true">▶</span>
                        </div>
                      ) : (
                        <img
                          src={item.src}
                          alt=""
                          className="media-strip-thumb"
                          loading="lazy"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <dl className="detail-grid">
            <div>
              <dt>Description</dt>
              <dd>{project.description}</dd>
            </div>
            <div>
              <dt>Tech Stack</dt>
              <dd>
                <ul className="stack-list">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="detail-links" aria-label="Project links">
            {project.links.map((entry) => (
              <a key={entry.label} href={entry.href} className="inline-link">
                {entry.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectPage
