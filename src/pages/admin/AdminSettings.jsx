import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Settings,
  Globe,
  LayoutDashboard,
  Mail,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  Database,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Link as LinkIcon,
  Sun,
  Moon,
} from "lucide-react";

import {
  defaultSettings,
  loadSettings,
  saveSettings,
  subscribeToSettings,
  mergeSettings,
} from "../../settings/siteSettings.js";

function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load settings from Firestore and listen for remote changes.
  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    async function initializeSettings() {
      try {
        const data = await loadSettings();

        if (active) {
          setSettings(mergeSettings(data));
          setError("");
        }
      } catch (err) {
        console.error("Failed to load website settings:", err);

        if (active) {
          setError(
            "Unable to load settings from Firebase. Check your connection and Firestore permissions.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    try {
      unsubscribe = subscribeToSettings(
        (data) => {
          if (active) {
            setSettings(mergeSettings(data));
            setError("");
          }
        },
        (err) => {
          console.error("Settings subscription failed:", err);

          if (active) {
            setError(
              "Live updates are unavailable. Check your Firestore permissions.",
            );
          }
        },
      );
    } catch (err) {
      console.error("Could not subscribe to settings:", err);

      if (active) {
        setError("Could not connect to the Firebase settings document.");
      }
    }

    initializeSettings();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Update ordinary form fields.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  // Update nested settings such as social, homepage and contact.
  const handleNestedChange = (section, name, value) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [name]: value,
      },
    }));

    setSaved(false);
  };

  // Change website availability.
  const handleSiteStatus = (status) => {
    setSettings((previous) => ({
      ...previous,
      siteStatus: status,
    }));

    setSaved(false);
  };

  // Change appearance preference.
  const handleTheme = (theme) => {
    setSettings((previous) => ({
      ...previous,
      theme,
    }));

    setSaved(false);
  };

  // Save settings to the shared Firestore document.
  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      await saveSettings(settings);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save website settings:", err);

      setError(
        "Failed to save settings. Check your internet connection and Firestore security rules.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Reset shared settings for all devices.
  const handleReset = async () => {
    const confirmed = window.confirm(
      "Reset all shared website settings to their defaults? This will affect every device using this portfolio.",
    );

    if (!confirmed) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      await saveSettings(defaultSettings);

      setSettings(defaultSettings);
      setSaved(true);

      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to reset website settings:", err);

      setError("Unable to reset settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Display a loading state while retrieving the initial settings.
  if (loading) {
    return (
      <div className="admin-page">
        <main className="admin-section">
          <p>Loading website settings from Firebase...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* PAGE HEADER */}

      <header className="admin-page-header">
        <div className="admin-page-title">
          <div className="admin-title-icon">
            <Settings size={22} />
          </div>

          <div>
            <h1>Settings</h1>
            <p>Control your portfolio, website and administrator settings.</p>
          </div>
        </div>

        <Link to="/admin" className="back-dashboard-btn">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </header>

      <main className="admin-section settings-section">
        {/* SITE IDENTITY */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <Globe size={21} />
            </div>

            <div>
              <h2>Site Identity</h2>
              <p>
                Control the main information displayed on your public portfolio.
              </p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label htmlFor="siteName">Portfolio Name</label>

              <input
                id="siteName"
                name="siteName"
                type="text"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="professionalTitle">Professional Title</label>

              <input
                id="professionalTitle"
                name="professionalTitle"
                type="text"
                value={settings.professionalTitle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Site Description</label>

            <textarea
              id="description"
              name="description"
              rows="3"
              value={settings.description}
              onChange={handleChange}
            />
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={14} />
                Contact Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={14} />
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+254..."
                value={settings.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={14} />
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={settings.location}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* LIVE SITE */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <Globe size={21} />
            </div>

            <div>
              <h2>Live Site</h2>
              <p>
                Control whether your public portfolio is available to visitors.
              </p>
            </div>
          </div>

          <div className="site-status-panel">
            <div className="site-status-info">
              <div className={`site-status-indicator ${settings.siteStatus}`}>
                {settings.siteStatus === "live" ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <AlertTriangle size={22} />
                )}
              </div>

              <div>
                <h3>
                  {settings.siteStatus === "live"
                    ? "Website is Live"
                    : settings.siteStatus === "maintenance"
                      ? "Maintenance Mode"
                      : "Website Offline"}
                </h3>

                <p>
                  {settings.siteStatus === "live"
                    ? "Your portfolio is currently visible to everyone."
                    : settings.siteStatus === "maintenance"
                      ? "Visitors will see a maintenance message."
                      : "Your public portfolio will be unavailable."}
                </p>
              </div>
            </div>

            <div className="site-status-options">
              <button
                type="button"
                className={
                  settings.siteStatus === "live"
                    ? "status-option active"
                    : "status-option"
                }
                onClick={() => handleSiteStatus("live")}
              >
                <CheckCircle2 size={16} />
                Live
              </button>

              <button
                type="button"
                className={
                  settings.siteStatus === "maintenance"
                    ? "status-option active"
                    : "status-option"
                }
                onClick={() => handleSiteStatus("maintenance")}
              >
                <Settings size={16} />
                Maintenance
              </button>

              <button
                type="button"
                className={
                  settings.siteStatus === "offline"
                    ? "status-option danger-active"
                    : "status-option"
                }
                onClick={() => handleSiteStatus("offline")}
              >
                <AlertTriangle size={16} />
                Offline
              </button>
            </div>
          </div>
        </section>

        {/* APPEARANCE */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              {settings.theme === "dark" ? (
                <Moon size={21} />
              ) : (
                <Sun size={21} />
              )}
            </div>

            <div>
              <h2>Appearance</h2>
              <p>
                Choose the color mode used across the portfolio and admin panel.
              </p>
            </div>
          </div>

          <div className="site-status-options theme-options">
            <button
              type="button"
              className={
                settings.theme === "light"
                  ? "status-option active"
                  : "status-option"
              }
              onClick={() => handleTheme("light")}
            >
              <Sun size={16} />
              Light Mode
            </button>

            <button
              type="button"
              className={
                settings.theme === "dark"
                  ? "status-option active"
                  : "status-option"
              }
              onClick={() => handleTheme("dark")}
            >
              <Moon size={16} />
              Dark Mode
            </button>
          </div>
        </section>

        {/* HOMEPAGE SECTIONS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <LayoutDashboard size={21} />
            </div>

            <div>
              <h2>Homepage Sections</h2>
              <p>Choose which sections are visible on your public portfolio.</p>
            </div>
          </div>

          <div className="settings-toggle-list">
            {[
              ["hero", "Hero Section", "Main introduction section"],
              [
                "about",
                "About Section",
                "Personal introduction and background",
              ],
              ["skills", "Skills Section", "Technical skills and technologies"],
              ["projects", "Projects Section", "Portfolio projects"],
              ["contact", "Contact Section", "Contact form and information"],
              ["footer", "Footer", "Website footer"],
            ].map(([key, title, description]) => (
              <div className="settings-toggle-item" key={key}>
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>

                <button
                  type="button"
                  className={
                    settings.homepage[key]
                      ? "toggle-switch active"
                      : "toggle-switch"
                  }
                  onClick={() =>
                    handleNestedChange("homepage", key, !settings.homepage[key])
                  }
                  aria-label={`Toggle ${title}`}
                  aria-pressed={Boolean(settings.homepage[key])}
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL LINKS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <LinkIcon size={21} />
            </div>

            <div>
              <h2>Social Links</h2>
              <p>Manage the social profiles displayed on your portfolio.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label htmlFor="github">GitHub</label>

              <input
                id="github"
                type="url"
                placeholder="https://github.com/username"
                value={settings.social.github}
                onChange={(e) =>
                  handleNestedChange("social", "github", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>

              <input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={settings.social.linkedin}
                onChange={(e) =>
                  handleNestedChange("social", "linkedin", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter / X</label>

              <input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/username"
                value={settings.social.twitter}
                onChange={(e) =>
                  handleNestedChange("social", "twitter", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>

              <input
                id="instagram"
                type="url"
                placeholder="https://instagram.com/username"
                value={settings.social.instagram}
                onChange={(e) =>
                  handleNestedChange("social", "instagram", e.target.value)
                }
              />
            </div>
          </div>
        </section>

        {/* CONTACT SETTINGS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <Mail size={21} />
            </div>

            <div>
              <h2>Contact Settings</h2>
              <p>Control which contact information is visible to visitors.</p>
            </div>
          </div>

          <div className="settings-toggle-list">
            {[
              [
                "showEmail",
                "Show Email",
                "Display your email address publicly.",
              ],
              [
                "showPhone",
                "Show Phone",
                "Display your phone number publicly.",
              ],
              [
                "showLocation",
                "Show Location",
                "Display your general location publicly.",
              ],
            ].map(([key, title, description]) => (
              <div className="settings-toggle-item" key={key}>
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>

                <button
                  type="button"
                  className={
                    settings.contact[key]
                      ? "toggle-switch active"
                      : "toggle-switch"
                  }
                  onClick={() =>
                    handleNestedChange("contact", key, !settings.contact[key])
                  }
                  aria-label={`Toggle ${title}`}
                  aria-pressed={Boolean(settings.contact[key])}
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ADMIN PROFILE */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <User size={21} />
            </div>

            <div>
              <h2>Administrator Profile</h2>
              <p>
                Information about the administrator managing this portfolio.
              </p>
            </div>
          </div>

          <div className="settings-profile">
            <div className="settings-avatar">BM</div>

            <div>
              <h3>{settings.admin.name}</h3>

              <span>
                <ShieldCheck size={14} />
                {settings.admin.role}
              </span>
            </div>
          </div>

          <div className="settings-admin-info">
            <div>
              <span>Administrator</span>
              <strong>{settings.admin.name}</strong>
            </div>

            <div>
              <span>Role</span>
              <strong>{settings.admin.role}</strong>
            </div>

            <div>
              <span>Authentication</span>
              <strong>Firebase Auth</strong>
            </div>
          </div>
        </section>

        {/* SYSTEM INFORMATION */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <Database size={21} />
            </div>

            <div>
              <h2>System Information</h2>
              <p>Current BMUTURI Digital portfolio system configuration.</p>
            </div>
          </div>

          <div className="system-info-grid">
            <div className="system-info-item">
              <span>Frontend</span>
              <strong>React + Vite</strong>
            </div>

            <div className="system-info-item">
              <span>Authentication</span>
              <strong className="status-active">Firebase Auth</strong>
            </div>

            <div className="system-info-item">
              <span>Database</span>
              <strong className="status-active">Firestore</strong>
            </div>

            <div className="system-info-item">
              <span>Environment</span>
              <strong>Development</strong>
            </div>

            <div className="system-info-item">
              <span>Website Status</span>

              <strong
                className={
                  settings.siteStatus === "live" ? "status-active" : ""
                }
              >
                {settings.siteStatus}
              </strong>
            </div>

            <div className="system-info-item">
              <span>Admin Access</span>
              <strong className="status-active">Protected</strong>
            </div>
          </div>
        </section>

        {/* ACTIONS */}

        <div className="settings-actions">
          {error && (
            <div className="settings-error" role="alert">
              {error}
            </div>
          )}

          {saved && (
            <div className="settings-saved" role="status">
              <CheckCircle2 size={15} />
              Changes saved successfully.
            </div>
          )}

          <button
            type="button"
            className="secondary-btn"
            onClick={handleReset}
            disabled={saving}
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="button"
            className="primary-btn"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default AdminSettings;
