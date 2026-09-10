function Hero() {
  return (
    <section className="hero" id="home">
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
        <div className="code-card">
          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="code-content">
            <p>
              <span className="code-purple">const</span>{" "}
              <span className="code-blue">developer</span> = {"{"}
            </p>

            <p className="indent">
              name: <span className="code-green">"Brian Muturi"</span>,
            </p>

            <p className="indent">
              role: <span className="code-green">"Software Engineer"</span>,
            </p>

            <p className="indent">skills: [</p>

            <p className="indent-2">
              <span className="code-green">"React"</span>,
            </p>

            <p className="indent-2">
              <span className="code-green">"JavaScript"</span>,
            </p>

            <p className="indent-2">
              <span className="code-green">"MySQL"</span>
            </p>

            <p className="indent">]</p>

            <p>{"}"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
