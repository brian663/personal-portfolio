import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig.js";

// Default website settings
export const defaultSettings = {
  siteName: "BMUTURI Digital",
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

const SETTINGS_COLLECTION = "siteSettings";
const SETTINGS_DOCUMENT = "main";

// Check Firebase configuration
function requireDatabase() {
  if (!db) {
    throw new Error(
      "Firebase is not configured. Check your VITE_FIREBASE_* variables.",
    );
  }

  return db;
}

// Merge saved settings with defaults
export function mergeSettings(savedSettings = {}) {
  return {
    ...defaultSettings,
    ...savedSettings,

    homepage: {
      ...defaultSettings.homepage,
      ...savedSettings.homepage,
    },

    social: {
      ...defaultSettings.social,
      ...savedSettings.social,
    },

    contact: {
      ...defaultSettings.contact,
      ...savedSettings.contact,
    },

    admin: {
      ...defaultSettings.admin,
      ...savedSettings.admin,
    },
  };
}

// Retrieve settings from Firestore
export async function loadSettings() {
  const settingsRef = doc(
    requireDatabase(),
    SETTINGS_COLLECTION,
    SETTINGS_DOCUMENT,
  );

  const snapshot = await getDoc(settingsRef);

  if (!snapshot.exists()) {
    return defaultSettings;
  }

  return mergeSettings(snapshot.data());
}

// Save settings to Firestore
export async function saveSettings(settings) {
  const settingsRef = doc(
    requireDatabase(),
    SETTINGS_COLLECTION,
    SETTINGS_DOCUMENT,
  );

  await setDoc(settingsRef, mergeSettings(settings));
}

// Listen for real-time settings updates
export function subscribeToSettings(onChange, onError) {
  const settingsRef = doc(
    requireDatabase(),
    SETTINGS_COLLECTION,
    SETTINGS_DOCUMENT,
  );

  return onSnapshot(
    settingsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onChange(mergeSettings(snapshot.data()));
      } else {
        onChange(defaultSettings);
      }
    },
    onError,
  );
}