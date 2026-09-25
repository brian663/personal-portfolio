import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

// Admin pages
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageProjects from "../pages/admin/ManageProjects.jsx";
import ManageSkills from "../pages/admin/ManageSkills.jsx";
import ManageMessages from "../pages/admin/ManageMessages.jsx";
import AdminSettings from "../pages/admin/AdminSettings.jsx";

// Authentication protection
import ProtectedRoute from "./ProtectedRoute.jsx";
import { loadSettings, subscribeToSettings } from "../settings/siteSettings.js";

function SiteStatusPage({ status }) {
  const isMaintenance = status === "maintenance";

  return (
    <main className="admin-page">
      <div className="admin-panel">
        <p className="eyebrow">{isMaintenance ? "Maintenance" : "Offline"}</p>
        <h1>
          {isMaintenance ? "We are tuning things up." : "The site is offline."}
        </h1>
        <p>
          {isMaintenance
            ? "The portfolio will be back shortly. Please check again soon."
            : "This portfolio is temporarily unavailable."}
        </p>
      </div>
    </main>
  );
}

function AppRoutes() {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  useEffect(() => subscribeToSettings(setSettings), []);

  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================== */}

      <Route
        path="/"
        element={
          settings.siteStatus === "live" ? (
            <Home settings={settings} />
          ) : (
            <SiteStatusPage status={settings.siteStatus} />
          )
        }
      />

      {/* Admin Login - Public */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* =========================
          PROTECTED ADMIN ROUTES
      ========================== */}

      <Route element={<ProtectedRoute />}>
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Manage Projects */}
        <Route path="/admin/projects" element={<ManageProjects />} />

        {/* Manage Skills */}
        <Route path="/admin/skills" element={<ManageSkills />} />

        {/* Manage Messages */}
        <Route path="/admin/messages" element={<ManageMessages />} />

        {/* Admin Settings */}
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* =========================
          404 PAGE
      ========================== */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
