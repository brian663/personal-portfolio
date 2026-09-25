import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import {
  loadSettings,
  saveSettings,
  subscribeToSettings,
} from "../settings/siteSettings.js";

function Navbar({ siteName, homepage }) {
  const [settings, setSettings] = useState(loadSettings);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => subscribeToSettings(setSettings), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextTheme = settings.theme === "dark" ? "light" : "dark";
    const nextSettings = { ...settings, theme: nextTheme };

    setSettings(nextSettings);
    saveSettings(nextSettings);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <h2 className="logo">
        {siteName}
        <span>.</span>
      </h2>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <span>Menu</span>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <a className="nav-link" href="#home" onClick={closeMenu}>
          Home
        </a>
        {homepage.about && (
          <a className="nav-link" href="#about" onClick={closeMenu}>
            About
          </a>
        )}
        {homepage.skills && (
          <a className="nav-link" href="#skills" onClick={closeMenu}>
            Skills
          </a>
        )}
        {homepage.projects && (
          <a className="nav-link" href="#projects" onClick={closeMenu}>
            Projects
          </a>
        )}
        {homepage.contact && (
          <a className="nav-link" href="#contact" onClick={closeMenu}>
            Contact
          </a>
        )}
      </div>

      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${settings.theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${settings.theme === "dark" ? "light" : "dark"} mode`}
        >
          {settings.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <Menu size={21} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
