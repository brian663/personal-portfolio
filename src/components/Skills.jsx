import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaCode,
  FaDatabase,
  FaGitAlt,
} from "react-icons/fa";

import { SiFirebase } from "react-icons/si";
import { subscribeToSkills } from "../services/skillService.js";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => subscribeToSkills(setSkills), []);

  const getSkillIcon = (name) => {
    const icons = {
      HTML: <FaHtml5 />,
      CSS: <FaCss3Alt />,
      JavaScript: <FaJs />,
      React: <FaReact />,
      MySQL: <FaDatabase />,
      Firebase: <SiFirebase />,
      Git: <FaGitAlt />,
    };

    return icons[name] || <FaCode />;
  };

  return (
    <section className="skills" id="skills">
      <div className="section-heading">
        <span>MY SKILLS</span>
        <h2>Technologies I Use</h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-item" key={skill.id}>
            <div className="skill-icon">{getSkillIcon(skill.name)}</div>

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
