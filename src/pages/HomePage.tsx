import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { education, profile, projects } from '../data/projects'
import { SocialLinks } from '../components/SocialLinks'
import { Footer } from '../components/Footer'
import { HeroName } from '../components/HeroName'

// What you're working on right now — update this one line as it changes.
//const NOW_LINE = `Building <a href="https://preprodaja.ba" target="_blank" rel="noopener noreferrer">preprodaja.ba</a>, an AI deal-finder for the Bosnian secondhand market`
const NOW_LINE = `Preparing exams`

/**
 * In the single-column (mobile) layout, light up whichever project card is
 * closest to the vertical centre of the viewport as you scroll. On wider
 * screens the 2-column grid uses hover instead, so this stays disabled there.
 */
function useCenteredCardFocus() {
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)')
    let cards: HTMLElement[] = []
    let raf = 0
    let active = false

    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let best: HTMLElement | null = null
      let bestDist = Infinity
      for (const c of cards) {
        const r = c.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) continue // off-screen
        const dist = Math.abs(r.top + r.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = c
        }
      }
      for (const c of cards) c.classList.toggle('is-focused', c === best)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const enable = () => {
      if (active) return
      cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'))
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
      active = true
      update()
    }

    const disable = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      for (const c of cards) c.classList.remove('is-focused')
      active = false
    }

    const apply = () => {
      if (mq.matches) enable()
      else disable()
    }

    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      disable()
    }
  }, [])
}

function HomePage() {
  useCenteredCardFocus()

  return (
    <div className="site-shell">
      <header className="topbar">
        
        <SocialLinks />
      </header>

      <main>
        <section className="hero-grid" aria-labelledby="intro-heading">
          <div className="hero-intro">
            <p className="hero-role">{profile.role}</p>
            <HeroName id="intro-heading" name={profile.name} />
            <p className="lead">{profile.shortBio}</p>
            <p className="hero-now">
              <span className="hero-now-label">
                <span className="hero-now-dot" aria-hidden="true" />
                Now
              </span>
              <span className="hero-now-text" dangerouslySetInnerHTML={{ __html: NOW_LINE }} />
            </p>
          </div>
        </section>

        <section className="projects-panel" aria-labelledby="projects-heading">
          <div className="projects-header">
            <h2 id="projects-heading">
              Project Index{' '}
              <span className="projects-count">({String(projects.length).padStart(2, '0')})</span>
            </h2>
            <p>Selected work with dedicated detail pages.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                className="project-card"
                to={`/projects/${project.slug}`}
                aria-label={`Open ${project.title}`}
              >
                <div className="thumbnail-wrap">
                  <img
                    src={project.thumbnail}
                    className="project-thumbnail"
                    alt={`${project.title} abstract project thumbnail`}
                    loading="lazy"
                  />
                </div>

                <div className="project-main">
                  <p className="project-meta">
                    <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>{project.year}</span>
                    <span>{project.category}</span>
                  </p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
                <span className="project-link">
                  Open project
                  <span className="project-link-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="education-panel" aria-labelledby="education-heading">
          <div className="projects-header">
            <h2 id="education-heading">Education</h2>
          </div>
          <ul className="education-list">
            {education.map((entry) => (
              <li key={`${entry.degree}-${entry.year}`}>
                <p className="project-meta">
                  <span>{entry.year}</span>
                  <span>{entry.institution}</span>
                </p>
                <h3>{entry.degree}</h3>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
