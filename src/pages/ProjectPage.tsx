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

function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  const resolvedMedia = useMemo<ResolvedMediaItem[]>(() => {
    if (!project) {
      return []
    }

    return project.media.map((item) => {
      if (typeof item === 'string') {
        return {
          src: item,
          type: inferMediaType(item),
        }
      }

      return {
        src: item.src,
        type: item.type ?? inferMediaType(item.src),
        poster: item.poster,
        label: item.label,
      }
    })
  }, [project])

  const [activeMediaIndex, setActiveMediaIndex] = useState(0)

  useEffect(() => {
    setActiveMediaIndex(0)
  }, [slug])

  const activeMedia = resolvedMedia[activeMediaIndex]

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
            <Link to="/" className="inline-link">
              Back to project index
            </Link>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link to="/" className="inline-link">
          Project index
        </Link>
        <p className="meta">{project.year}</p>
      </header>

      <main>
        <section className="project-detail" aria-labelledby="project-title">
          <p className="kicker">{project.category}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="lead">{project.summary}</p>

          <div className="project-hero-media">
            {activeMedia ? (
              activeMedia.type === 'video' ? (
                <video
                  key={activeMedia.src}
                  className="project-video"
                  controls
                  preload="metadata"
                  poster={activeMedia.poster}
                >
                  <source src={activeMedia.src} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.label ?? `${project.title} media ${activeMediaIndex + 1}`}
                  className="project-thumbnail"
                />
              )
            ) : (
              <img
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                className="project-thumbnail"
              />
            )}
          </div>

          <section className="project-media" aria-label="Project media gallery">
            {resolvedMedia.map((mediaItem, index) => (
              <button
                key={`${project.slug}-media-${index}`}
                type="button"
                className={`project-media-item ${activeMediaIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveMediaIndex(index)}
                aria-label={`Show ${mediaItem.type} ${index + 1}`}
                aria-pressed={activeMediaIndex === index}
              >
                {mediaItem.type === 'video' ? (
                  <div className="project-video-thumb" aria-hidden="true">
                    {mediaItem.poster ? (
                      <img
                        src={mediaItem.poster}
                        alt=""
                        className="project-thumbnail"
                        loading="lazy"
                      />
                    ) : (
                      <span className="video-label">Video</span>
                    )}
                    <span className="video-badge">Play</span>
                  </div>
                ) : (
                  <img
                    src={mediaItem.src}
                    alt={mediaItem.label ?? `${project.title} media ${index + 1}`}
                    className="project-thumbnail"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </section>

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
