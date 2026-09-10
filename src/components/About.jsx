function About() {
  return (
    <section className="about" id="about">
      <div className="section-heading">
        <span>ABOUT ME</span>
        <h2>Who I am</h2>
      </div>

      <div className="about-container">
        <div className="about-text">
          <p>
            I'm Brian Muturi, a Software Engineering student passionate about
            creating modern and practical web applications.
          </p>

          <p>
            I enjoy working with frontend technologies such as HTML, CSS,
            JavaScript and React, while continuously expanding my knowledge in
            backend development and databases.
          </p>

          <div className="about-buttons">
            <a href="/Brian-Muturi-CV.pdf" download className="btn primary-btn">
              Download CV
            </a>

            <a href="#contact" className="btn secondary-btn">
              Contact Me
            </a>
          </div>
        </div>

        <div className="about-details">
          <div>
            <span>Education</span>
            <p>BSc Software Engineering</p>
          </div>

          <div>
            <span>Focus</span>
            <p>Frontend & Web Development</p>
          </div>

          <div>
            <span>Currently</span>
            <p>Learning & Building</p>
          </div>

          <div>
            <span>Location</span>
            <p>Kenya</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
