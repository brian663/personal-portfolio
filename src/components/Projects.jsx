import { useEffect, useState } from "react";
import { subscribeToProjects } from "../services/projectService.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [sectionRef, isVisible] = useScrollReveal();

  useEffect(() => subscribeToProjects(setProjects), []);

  return (
    <section
      ref={sectionRef}
      className={`projects scroll-reveal ${isVisible ? "is-visible" : ""}`}
      id="projects"
    >
      <div className="section-heading">
        <span>MY WORK</span>
        <h2>Featured Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="featured-project-card" key={project.id}>
            <div className="project-image">
              {project.image ? (
                <img src={project.image} alt={project.name} />
              ) : (
                <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
              )}
            </div>

            <div className="project-content">
              <div className="project-top">
                <h3>{project.name}</h3>

                <a
                  href={project.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  ↗
                </a>
              </div>

              <p>{project.description}</p>

              <div className="project-tech">
                {(project.technologies || []).map((technology, techIndex) => (
                  <span key={techIndex}>{technology}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
