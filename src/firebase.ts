/**
 * Firebase Configuration for PROJECT VAULT
 * 
 * This module initializes Firebase using credentials from:
 * 1. Environment variables (VITE_FIREBASE_*) - for production builds
 * 2. localStorage - for quick setup via the Setup Wizard
 * 
 * Firebase client config values are PUBLIC by design.
 * They identify your Firebase project but cannot be used to access data
 * without the corresponding server-side credentials.
 */

import { initializeApp, FirebaseApp, deleteApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const FIREBASE_CONFIG_KEY = 'project-vault-firebase-config';

// Get config from environment variables
function getEnvConfig(): FirebaseConfig | null {
  const config: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  const isValid = config.apiKey && config.authDomain && config.projectId && config.appId;
  return isValid ? config : null;
}

// Get config from localStorage (set via Setup Wizard)
function getStoredConfig(): FirebaseConfig | null {
  try {
    const stored = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (!stored) return null;
    const config = JSON.parse(stored) as FirebaseConfig;
    const isValid = config.apiKey && config.authDomain && config.projectId && config.appId;
    return isValid ? config : null;
  } catch {
    return null;
  }
}

// Save config to localStorage
export function saveFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
}

// Clear stored config
export function clearFirebaseConfig(): void {
  localStorage.removeItem(FIREBASE_CONFIG_KEY);
}

// Get the active Firebase config (env takes priority over stored)
export function getFirebaseConfig(): FirebaseConfig | null {
  return getEnvConfig() || getStoredConfig();
}

// Check if Firebase is configured
export function isFirebaseConfigured(): boolean {
  return getFirebaseConfig() !== null;
}

// Firebase app and auth instances
let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

// Initialize Firebase
export function initializeFirebase(): { app: FirebaseApp; auth: Auth } | null {
  const config = getFirebaseConfig();
  if (!config) return null;

  try {
    // Delete existing app if re-initializing with new config
    if (firebaseApp) {
      deleteApp(firebaseApp).catch(() => {});
      firebaseApp = null;
      firebaseAuth = null;
    }

    // Also clean up any other apps
    const existingApps = getApps();
    existingApps.forEach(app => {
      try { deleteApp(app); } catch {}
    });

    firebaseApp = initializeApp(config);
    firebaseAuth = getAuth(firebaseApp);
    
    // Enable persistent auth state
    // This ensures user stays logged in after browser refresh
    return { app: firebaseApp, auth: firebaseAuth };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
}

// Get the auth instance
export function getAuthInstance(): Auth | null {
  if (!firebaseAuth) {
    initializeFirebase();
  }
  return firebaseAuth;
}

// Get the app instance
export function getAppInstance(): FirebaseApp | null {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return firebaseApp;
}

// Re-initialize Firebase (called after Setup Wizard saves new config)
export function reinitializeFirebase(): boolean {
  const result = initializeFirebase();
  return result !== null;
}
