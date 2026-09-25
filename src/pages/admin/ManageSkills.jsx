import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Code2,
  Pencil,
  Trash2,
  X,
  Layers,
  Wrench,
} from "lucide-react";
import {
  addSkill,
  editSkill,
  removeSkill,
  subscribeToSkills,
} from "../../services/skillService.js";

function ManageSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => subscribeToSkills(setSkills), []);

  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    proficiency: "",
    description: "",
  });

  /* =========================================================
     FORM HANDLING
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     OPEN ADD FORM
  ========================================================= */

  const openAddForm = () => {
    setEditingSkill(null);

    setFormData({
      name: "",
      category: "",
      level: "",
      proficiency: "",
      description: "",
    });

    setShowForm(true);
  };

  /* =========================================================
     OPEN EDIT FORM
  ========================================================= */

  const openEditForm = (skill) => {
    setEditingSkill(skill);

    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      proficiency: skill.proficiency.toString(),
      description: skill.description,
    });

    setShowForm(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  /* =========================================================
     SAVE / UPDATE SKILL
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.level ||
      !formData.proficiency ||
      !formData.description.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const proficiency = Number(formData.proficiency);

    if (proficiency < 0 || proficiency > 100) {
      alert("Proficiency must be between 0 and 100.");
      return;
    }

    const skillData = {
      name: formData.name.trim(),
      category: formData.category,
      level: formData.level,
      proficiency,
      description: formData.description.trim(),
    };

    /* UPDATE */

    try {
      if (editingSkill) {
        await editSkill(editingSkill.id, skillData);
      } else {
        await addSkill(skillData);
      }

      closeForm();
    } catch (error) {
      alert(`Unable to save skill: ${error.message}`);
    }
  };

  /* =========================================================
     DELETE SKILL
  ========================================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?",
    );

    if (!confirmed) return;

    try {
      await removeSkill(id);
    } catch (error) {
      alert(`Unable to delete skill: ${error.message}`);
    }
  };

  /* =========================================================
     SKILL ICON
  ========================================================= */

  const getSkillIcon = (category) => {
    if (category === "Database") {
      return <Layers size={21} />;
    }

    if (category === "Tools & Technologies") {
      return <Wrench size={21} />;
    }

    return <Code2 size={21} />;
  };

  return (
    <div className="admin-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="admin-page-header">
        <div className="admin-page-title">
          <div className="admin-title-icon">
            <Code2 size={22} />
          </div>

          <div>
            <h1>Skills</h1>

            <p>Manage the technical skills displayed on your portfolio.</p>
          </div>
        </div>

        <Link to="/admin" className="back-dashboard-btn">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="admin-section">
        <div className="management-toolbar">
          <div>
            <h2>Technical Skills</h2>

            <p>
              {skills.length} {skills.length === 1 ? "skill" : "skills"}{" "}
              currently available.
            </p>
          </div>

          <button className="primary-btn" onClick={openAddForm}>
            <Plus size={17} />
            Add Skill
          </button>
        </div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {skills.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Code2 size={28} />
            </div>

            <h3>No Skills Yet</h3>

            <p>
              Add your first technical skill to start building your portfolio.
            </p>

            <button className="primary-btn" onClick={openAddForm}>
              <Plus size={16} />
              Add Skill
            </button>
          </div>
        ) : (
          /* =================================================
             SKILL GRID
          ================================================= */

          <div className="skill-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.id}>
                <div className="skill-card-top">
                  <div className="skill-icon">
                    {getSkillIcon(skill.category)}
                  </div>

                  <div className="skill-card-actions">
                    <button
                      className="icon-btn"
                      title="Edit skill"
                      onClick={() => openEditForm(skill)}
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      className="icon-btn danger-icon"
                      title="Delete skill"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* =================================================
                   SKILL NAME + CATEGORY
                ================================================= */}

                <div className="skill-card-info">
                  <h3>{skill.name}</h3>

                  <span>{skill.category}</span>
                </div>

                {/* =================================================
                   DESCRIPTION
                ================================================= */}

                <p>{skill.description}</p>

                {/* =================================================
                   PROGRESS
                ================================================= */}

                <div className="skill-progress">
                  <div className="skill-progress-label">
                    <span>{skill.level}</span>

                    <span>{skill.proficiency}%</span>
                  </div>

                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-bar"
                      style={{
                        width: `${skill.proficiency}%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =====================================================
            ADD / EDIT MODAL
        ===================================================== */}

        {showForm && (
          <div className="admin-modal-overlay" onClick={closeForm}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              {/* =================================================
                 MODAL HEADER
              ================================================= */}

              <div className="admin-modal-header">
                <div>
                  <h2>{editingSkill ? "Edit Skill" : "Add Skill"}</h2>

                  <p>
                    {editingSkill
                      ? "Update your skill information."
                      : "Add a technical skill to your portfolio."}
                  </p>
                </div>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeForm}
                >
                  <X size={18} />
                </button>
              </div>

              {/* =================================================
                 FORM
              ================================================= */}

              <form className="admin-form" onSubmit={handleSubmit}>
                {/* NAME + CATEGORY */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="skill-name">Skill Name</label>

                    <input
                      id="skill-name"
                      name="name"
                      type="text"
                      placeholder="e.g. React"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="skill-category">Category</label>

                    <select
                      id="skill-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select category</option>

                      <option>Frontend Development</option>

                      <option>Backend Development</option>

                      <option>Database</option>

                      <option>Tools & Technologies</option>
                    </select>
                  </div>
                </div>

                {/* LEVEL + PROFICIENCY */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="skill-level">Skill Level</label>

                    <select
                      id="skill-level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select level</option>

                      <option>Beginner</option>

                      <option>Intermediate</option>

                      <option>Advanced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="skill-proficiency">Proficiency %</label>

                    <input
                      id="skill-proficiency"
                      name="proficiency"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="e.g. 70"
                      value={formData.proficiency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="form-group">
                  <label htmlFor="skill-description">Description</label>

                  <textarea
                    id="skill-description"
                    name="description"
                    rows="4"
                    placeholder="Briefly describe your experience..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ACTIONS */}

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-btn">
                    {editingSkill ? (
                      <>
                        <Pencil size={16} />
                        Update Skill
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Save Skill
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageSkills;
