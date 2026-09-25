import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  FolderKanban,
  Pencil,
  Trash2,
  X,
  Image,
  Eye,
} from "lucide-react";

import {
  addProject,
  editProject,
  removeProject,
  subscribeToProjects,
} from "../../services/projectService.js";

function ManageProjects() {
  // =========================================================
  // PROJECT STATE
  // =========================================================

  const [projects, setProjects] = useState([]);

  // =========================================================
  // LOAD PROJECTS FROM FIRESTORE
  // =========================================================

  useEffect(() => {
    const unsubscribe = subscribeToProjects((projectsFromFirestore) => {
      const formattedProjects = projectsFromFirestore.map((project) => ({
        ...project,

        technologies: Array.isArray(project.technologies)
          ? project.technologies
          : typeof project.technologies === "string"
            ? project.technologies
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean)
            : [],

        image: project.image || "",
        url: project.url || "",
        description: project.description || "",
        status: project.status || "Active",
      }));

      setProjects(formattedProjects);
    });

    return unsubscribe;
  }, []);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    technologies: "",
    image: "",
  });

  // =========================================================
  // HANDLE INPUT CHANGES
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN ADD PROJECT FORM
  // =========================================================

  const openAddForm = () => {
    setEditingProject(null);

    setFormData({
      name: "",
      url: "",
      description: "",
      technologies: "",
      image: "",
    });

    setShowForm(true);
  };

  // =========================================================
  // OPEN EDIT PROJECT FORM
  // =========================================================

  const openEditForm = (project) => {
    setEditingProject(project);

    /*
      Make sure technologies can be handled whether
      they are an array or a string.
    */

    const technologies = Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies || "";

    setFormData({
      name: project.name || "",
      url: project.url || "",
      description: project.description || "",
      technologies,
      image: project.image || "",
    });

    setShowForm(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);

    setFormData({
      name: "",
      url: "",
      description: "",
      technologies: "",
      image: "",
    });
  };

  // =========================================================
  // SAVE / UPDATE PROJECT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.technologies.trim()
    ) {
      alert("Please fill in the required fields.");

      return;
    }

    /*
      Convert:

      React, Firebase, CSS

      into:

      ["React", "Firebase", "CSS"]
    */

    const technologies = formData.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    const projectData = {
      name: formData.name.trim(),

      url: formData.url.trim(),

      description: formData.description.trim(),

      technologies,

      image: formData.image.trim(),

      status: "Active",
    };

    try {
      // -----------------------------------------------------
      // UPDATE EXISTING PROJECT
      // -----------------------------------------------------

      if (editingProject) {
        await editProject(editingProject.id, projectData);
      }

      // -----------------------------------------------------
      // ADD NEW PROJECT
      // -----------------------------------------------------
      else {
        await addProject(projectData);
      }

      closeForm();
    } catch (error) {
      console.error("Unable to save project:", error);

      alert(`Unable to save project: ${error.message}`);
    }
  };

  // =========================================================
  // DELETE PROJECT
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      await removeProject(id);
    } catch (error) {
      console.error("Unable to delete project:", error);

      alert(`Unable to delete project: ${error.message}`);
    }
  };

  // =========================================================
  // VIEW PROJECT
  // =========================================================

  const handleViewProject = (url) => {
    if (!url) {
      alert("This project does not have a URL yet.");

      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="admin-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="admin-page-header">
        <div className="admin-page-title">
          <div className="admin-title-icon">
            <FolderKanban size={22} />
          </div>

          <div>
            <h1>Projects</h1>

            <p>Manage the projects displayed on your portfolio.</p>
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
        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <div className="management-toolbar">
          <div>
            <h2>All Projects</h2>

            <p>
              {projects.length} {projects.length === 1 ? "project" : "projects"}{" "}
              currently available.
            </p>
          </div>

          <button type="button" className="primary-btn" onClick={openAddForm}>
            <Plus size={17} />
            Add Project
          </button>
        </div>

        {/* ===================================================
            PROJECT LIST
        =================================================== */}

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FolderKanban size={28} />
            </div>

            <h3>No Projects Yet</h3>

            <p>Add your first project to start building your portfolio.</p>

            <button type="button" className="primary-btn" onClick={openAddForm}>
              <Plus size={16} />
              Add Project
            </button>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                {/* =========================================
                    PROJECT IMAGE
                ========================================== */}

                <div className="project-card-image">
                  {project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <>
                      <Image size={31} />

                      <span>No image</span>
                    </>
                  )}
                </div>

                {/* =========================================
                    PROJECT CONTENT
                ========================================== */}

                <div className="project-card-body">
                  {/* PROJECT TITLE */}

                  <div className="project-card-heading">
                    <div>
                      <h3>{project.name}</h3>

                      <span className="project-status">{project.status}</span>
                    </div>

                    {/* EDIT */}

                    <button
                      type="button"
                      className="icon-btn"
                      title="Edit project"
                      onClick={() => openEditForm(project)}
                    >
                      <Pencil size={15} />
                    </button>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="project-description">{project.description}</p>

                  {/* TECHNOLOGIES */}

                  <div className="project-tags">
                    {Array.isArray(project.technologies) &&
                      project.technologies.map((technology, index) => (
                        <span key={`${technology}-${index}`}>{technology}</span>
                      ))}
                  </div>

                  {/* FOOTER */}

                  <div className="project-card-footer">
                    {/* VIEW PROJECT */}

                    <button
                      type="button"
                      className="project-link"
                      onClick={() => handleViewProject(project.url)}
                    >
                      <Eye size={14} />
                      View Project
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ===================================================
            ADD / EDIT MODAL
        =================================================== */}

        {showForm && (
          <div className="admin-modal-overlay" onClick={closeForm}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              {/* =========================================
                  MODAL HEADER
              ========================================== */}

              <div className="admin-modal-header">
                <div>
                  <h2>{editingProject ? "Edit Project" : "Add Project"}</h2>

                  <p>
                    {editingProject
                      ? "Update your project information."
                      : "Add a new project to your portfolio."}
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

              {/* =========================================
                  FORM
              ========================================== */}

              <form className="admin-form" onSubmit={handleSubmit}>
                {/* PROJECT NAME + URL */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="project-name">Project Name</label>

                    <input
                      id="project-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Portfolio Website"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="project-url">Project URL</label>

                    <input
                      id="project-url"
                      name="url"
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="form-group">
                  <label htmlFor="project-description">Description</label>

                  <textarea
                    id="project-description"
                    name="description"
                    rows="4"
                    placeholder="Describe your project..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* TECHNOLOGIES + IMAGE */}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="project-technologies">Technologies</label>

                    <input
                      id="project-technologies"
                      name="technologies"
                      type="text"
                      placeholder="React, Firebase, CSS"
                      value={formData.technologies}
                      onChange={handleChange}
                      required
                    />

                    <small>Separate technologies with commas.</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="project-image">Image URL</label>

                    <input
                      id="project-image"
                      name="image"
                      type="url"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* FORM ACTIONS */}

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-btn">
                    {editingProject ? (
                      <>
                        <Pencil size={16} />
                        Update Project
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Save Project
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

export default ManageProjects;
