import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  User,
} from "lucide-react";
import { subscribeToMessages } from "../../services/messageService.js";
import { subscribeToProjects } from "../../services/projectService.js";
import { subscribeToSkills } from "../../services/skillService.js";
import { useAuth } from "../../context/AuthContext.jsx";

function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setLogoutError("");

    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      setLogoutError(`Unable to log out: ${error.message}`);
    }
  };

  useEffect(() => {
    const handleProjects = (projects) => {
      setStats((previous) => ({ ...previous, projects: projects.length }));
    };
    const handleSkills = (skills) => {
      setStats((previous) => ({ ...previous, skills: skills.length }));
    };
    const handleMessages = (messages) => {
      setStats((previous) => ({ ...previous, messages: messages.length }));
    };

    const unsubscribeProjects = subscribeToProjects(handleProjects);
    const unsubscribeSkills = subscribeToSkills(handleSkills);
    const unsubscribeMessages = subscribeToMessages(handleMessages);

    return () => {
      unsubscribeProjects();
      unsubscribeSkills();
      unsubscribeMessages();
    };
  }, []);

  return (
    <div className="admin-page">
      {/* =========================
          HEADER
      ========================== */}

      <header className="admin-header">
        <div className="admin-brand">
          <h1>
            BRI<span>TECH</span>
          </h1>

          <p>Portfolio Management System</p>
        </div>

        <div className="admin-header-actions">
          <Link to="/" className="view-site-btn">
            <ExternalLink size={17} />
            View Website
          </Link>

          <button type="button" className="logout-btn" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {logoutError && <p className="login-error">{logoutError}</p>}
      </header>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="admin-content">
        {/* Dashboard Heading */}

        <div className="dashboard-heading">
          <div className="heading-icon">
            <LayoutDashboard size={24} />
          </div>

          <div>
            <h2>Dashboard</h2>

            <p>Welcome to your portfolio management system.</p>
          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================== */}

        <div className="admin-stats">
          {/* Projects */}

          <div className="stat-card">
            <div className="stat-icon">
              <FolderKanban size={24} />
            </div>

            <div>
              <h3>{stats.projects}</h3>
              <p>Projects</p>
            </div>
          </div>

          {/* Skills */}

          <div className="stat-card">
            <div className="stat-icon">
              <Code2 size={24} />
            </div>

            <div>
              <h3>{stats.skills}</h3>
              <p>Skills</p>
            </div>
          </div>

          {/* Messages */}

          <div className="stat-card">
            <div className="stat-icon">
              <Mail size={24} />
            </div>

            <div>
              <h3>{stats.messages}</h3>
              <p>Messages</p>
            </div>
          </div>

          {/* Account */}

          <div className="stat-card">
            <div className="stat-icon">
              <User size={24} />
            </div>

            <div>
              <h3>Admin</h3>
              <p>Account</p>
            </div>
          </div>
        </div>

        {/* =========================
            MANAGEMENT
        ========================== */}

        <section className="dashboard-section">
          <div className="section-heading">
            <h2>Manage Portfolio</h2>

            <p>Choose what you want to manage.</p>
          </div>

          <div className="admin-cards">
            {/* Projects */}

            <Link to="/admin/projects" className="admin-card">
              <div className="card-icon">
                <FolderKanban size={28} />
              </div>

              <h3>Projects</h3>

              <p>Add, edit and remove projects displayed on your portfolio.</p>
            </Link>

            {/* Skills */}

            <Link to="/admin/skills" className="admin-card">
              <div className="card-icon">
                <Code2 size={28} />
              </div>

              <h3>Skills</h3>

              <p>Manage the technical skills displayed on your portfolio.</p>
            </Link>

            {/* Messages */}

            <Link to="/admin/messages" className="admin-card">
              <div className="card-icon">
                <Mail size={28} />
              </div>

              <h3>Messages</h3>

              <p>
                View messages submitted by visitors through your contact form.
              </p>
            </Link>

            {/* Settings */}

            <Link to="/admin/settings" className="admin-card">
              <div className="card-icon">
                <Settings size={28} />
              </div>

              <h3>Settings</h3>

              <p>Manage your administrator and portfolio settings.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
