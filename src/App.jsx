import PortfolioWork from "./components/PortfolioWork/PortfolioWork.jsx";
import About from "./components/About/About.jsx";
import CareerTimeline from "./components/CareerTimeline/CareerTimeline.jsx";
import TechStack from "./components/TechStack/TechStack.jsx";
import Education from "./components/Education/Education.jsx";

export default function App() {
  return (
    <div className="site">
      <header className="site-nav">
        <nav className="site-nav-links">
          <a href="mailto:bdautovic2@etf.unsa.ba">email</a>
          <a href="https://github.com/dautovicb" target="_blank" rel="noreferrer">github</a>
          <a href="https://www.linkedin.com/in/beriz-dautović-60802a2a5" target="_blank" rel="noreferrer">linkedin</a>
        </nav>
      </header>

      <section className="site-hero">
        <p className="site-hero-eyebrow">ai/ml engineer · data scientist · software engineer</p>
        <h1 className="site-hero-title">
          I build software and AI solutions that turn messy real-world data into decisions.
        </h1>
        <p className="site-hero-sub">
          Data Science & AI student bringing years of software development experience to machine learning.
        </p>
      </section>

      <main>
        <PortfolioWork />
        <About />
        <CareerTimeline />
        <TechStack />
        <Education />
      </main>

      <footer className="site-footer">
        <a href="mailto:bdautovic2@etf.unsa.ba">bdautovic2@etf.unsa.ba</a>
      </footer>

    </div>
  );
}
