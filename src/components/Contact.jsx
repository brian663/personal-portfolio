import { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import { addMessage } from "../services/messageService.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

function Contact() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    const now = new Date();

    try {
      await addMessage({
        ...formData,
        date: now.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        read: false,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("Message sent successfully.");
    } catch (error) {
      setStatus(`Unable to send message: ${error.message}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`contact scroll-reveal ${isVisible ? "is-visible" : ""}`}
      id="contact"
    >
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

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Form */}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
              value={formData.subject}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="send-btn">
            Send Message
          </button>

          {status && <p>{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
