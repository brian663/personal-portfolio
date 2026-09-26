import { useScrollReveal } from "../hooks/useScrollReveal.js";

function Hero() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      ref={sectionRef}
      className={`hero scroll-reveal ${isVisible ? "is-visible" : ""}`}
      id="home"
    >
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>

        <h1>
          Brian <span>Muturi</span>
        </h1>

        <h2>Software Engineer in Learning</h2>

        <p className="hero-description">
          I build modern, responsive and user-friendly web applications while
          continuously improving my skills in software engineering, frontend
          development and backend technologies.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn primary-btn">
            View My Work
          </a>

          <a href="#contact" className="btn secondary-btn">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-frame">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
            alt="Laptop and code editor on a developer's desk"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
