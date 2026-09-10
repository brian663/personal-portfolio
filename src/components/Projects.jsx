function Projects() {
  const projects = [
    {
      title: "Vehicle Maintenance System",
      description:
        "A web-based system for managing county vehicles, inspections, maintenance and reporting.",
      tech: ["PHP", "MySQL", "JavaScript"],
      link: "#",
    },
    {
      title: "Britech Academy",
      description:
        "An online learning platform designed for learning graphic design and frontend web development.",
      tech: ["React", "Firebase", "JavaScript"],
      link: "#",
    },
    {
      title: "Hospital Queue System",
      description:
        "A digital queue management system designed to improve patient flow and service delivery.",
      tech: ["React", "Firebase", "CSS"],
      link: "#",
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="section-heading">
        <span>MY WORK</span>
        <h2>Featured Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={index}>
            <div className="project-image">
              <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
            </div>

            <div className="project-content">
              <div className="project-top">
                <h3>{project.title}</h3>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  ↗
                </a>
              </div>

              <p>{project.description}</p>

              <div className="project-tech">
                {project.tech.map((technology, techIndex) => (
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
