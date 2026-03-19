import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

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
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="project-thumbnail"
            />
          </div>

          <dl className="detail-grid">
            <div>
              <dt>Challenge</dt>
              <dd>{project.challenge}</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>{project.approach}</dd>
            </div>
            <div>
              <dt>Impact</dt>
              <dd>
                <ul className="impact-list">
                  {project.impact.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </dd>
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
