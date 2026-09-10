import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaDatabase,
  FaGitAlt,
} from "react-icons/fa";

import { SiFirebase } from "react-icons/si";
function Skills() {
  const skills = [
    {
      name: "HTML",
      category: "Frontend",
      icon: <FaHtml5 />,
    },
    {
      name: "CSS",
      category: "Frontend",
      icon: <FaCss3Alt />,
    },
    {
      name: "JavaScript",
      category: "Frontend",
      icon: <FaJs />,
    },
    {
      name: "React",
      category: "Frontend",
      icon: <FaReact />,
    },
    {
      name: "MySQL",
      category: "Database",
      icon: <FaDatabase />,
    },
    {
      name: "Firebase",
      category: "Backend",
      icon: <SiFirebase />,
    },
    {
      name: "Git",
      category: "Tools",
      icon: <FaGitAlt />,
    },
  ];

  return (
    <section className="skills" id="skills">
      <div className="section-heading">
        <span>MY SKILLS</span>
        <h2>Technologies I Use</h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-icon">{skill.icon}</div>

            <div className="skill-info">
              <h3>{skill.name}</h3>
              <p>{skill.category}</p>
            </div>

            <span className="skill-arrow">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
