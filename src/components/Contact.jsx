import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-heading">
        <span>GET IN TOUCH</span>
        <h2>Let's Work Together</h2>
      </div>

      <div className="contact-container">
        {/* Contact Information */}

        <div className="contact-info">
          <h3>Have a project in mind?</h3>

          <p>
            I'm always open to discussing new projects, ideas, opportunities or
            collaborations.
          </p>

          <a
            href="mailto:brianmuigaimuturi@gmail.com"
            className="contact-email"
          >
            <FaEnvelope />
            <span>brianmuigaimuturi@gmail.com</span>
          </a>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Contact Form */}

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Project subject"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Tell me about your project..."
              required
            ></textarea>
          </div>

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
