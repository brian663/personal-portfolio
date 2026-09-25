export const defaultSettings = {
  siteName: "BRITECH",
  professionalTitle: "Software Engineer",
  description: "Software Engineering student and aspiring software engineer.",
  email: "brian@example.com",
  phone: "",
  location: "Kenya",
  siteStatus: "live",
  theme: "dark",
  homepage: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    contact: true,
    footer: true,
  },
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  },
  contact: {
    showEmail: true,
    showPhone: false,
    showLocation: true,
  },
  admin: {
    name: "Brian Muturi",
    role: "Administrator",
  },
};

const STORAGE_KEY = "portfolio-settings";

function mergeSettings(savedSettings) {
  return {
    ...defaultSettings,
    ...savedSettings,
    homepage: { ...defaultSettings.homepage, ...savedSettings?.homepage },
    social: { ...defaultSettings.social, ...savedSettings?.social },
    contact: { ...defaultSettings.contact, ...savedSettings?.contact },
    admin: { ...defaultSettings.admin, ...savedSettings?.admin },
  };
}

export function loadSettings() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    return savedSettings
      ? mergeSettings(JSON.parse(savedSettings))
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event("portfolio-settings-updated"));
}

export function subscribeToSettings(onChange) {
  const handleChange = () => onChange(loadSettings());

  window.addEventListener("storage", handleChange);
  window.addEventListener("portfolio-settings-updated", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("portfolio-settings-updated", handleChange);
  };
}