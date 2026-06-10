import { profile } from '../data/projects'

function GitHubIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.08.66-.22.66-.49v-1.88c-2.78.6-3.36-1.18-3.36-1.18a2.66 2.66 0 0 0-1.1-1.47c-.9-.62.07-.6.07-.6a2.11 2.11 0 0 1 1.54 1 2.14 2.14 0 0 0 2.93.83 2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.94A3.86 3.86 0 0 1 6.68 8a3.58 3.58 0 0 1 .1-2.54s.84-.27 2.75 1a9.57 9.57 0 0 1 5 0c1.9-1.31 2.74-1 2.74-1a3.58 3.58 0 0 1 .1 2.54 3.86 3.86 0 0 1 1 2.67c0 3.84-2.35 4.69-4.58 4.94a2.39 2.39 0 0 1 .69 1.86V21c0 .27.18.58.67.48A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3-1.83-3s-2.11 1.43-2.11 2.9v5.67H9.39V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.48Zm-15.08-13A2.07 2.07 0 1 1 7.44 5.4a2.07 2.07 0 0 1-2.07 2.05Zm1.78 13H3.59V9h3.56Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Zm-2 0-8 5L4 6h16Zm0 12H4V8l8 5 8-5v10Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SocialLinks() {
  return (
    <div className="social-links">
      <a
        className="social-link"
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
      >
        <GitHubIcon />
        <span>GitHub</span>
      </a>
      <a
        className="social-link"
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
      >
        <LinkedInIcon />
        <span>LinkedIn</span>
      </a>
      <a className="social-link" href={`mailto:${profile.email}`} aria-label="Email me">
        <MailIcon />
        <span>Email</span>
      </a>
    </div>
  )
}
