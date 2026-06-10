import { profile } from '../data/projects'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-cta-label">Get in touch</p>
          <a className="footer-mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        
      </div>
      
    </footer>
  )
}
