import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebaseConfig';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

// Convert Firebase User to our AuthUser type
function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

// Map Firebase error codes to user-friendly messages
function mapAuthError(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email or password is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password must contain at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Unable to connect right now. Please try again.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please allow popups for this site.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthResult> {
  if (!isFirebaseConfigured || !auth) {
    return {
      success: false,
      error: 'Authentication is not configured. Please set up Firebase credentials.',
    };
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: toAuthUser(credential.user),
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapAuthError(error),
    };
  }
}

// Sign up with email and password
export async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  if (!isFirebaseConfigured || !auth) {
    return {
      success: false,
      error: 'Authentication is not configured. Please set up Firebase credentials.',
    };
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    if (name && credential.user) {
      await updateProfile(credential.user, { displayName: name });
    }
    return {
      success: true,
      user: toAuthUser(credential.user),
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapAuthError(error),
    };
  }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!isFirebaseConfigured || !auth) {
    return {
      success: false,
      error: 'Authentication is not configured. Please set up Firebase credentials.',
    };
  }

  try {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return {
      success: true,
      user: toAuthUser(credential.user),
    };
  } catch (error: any) {
    return {
      success: false,
      error: mapAuthError(error),
    };
  }
}

// Sign out
export async function signOut(): Promise<AuthResult> {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Authentication is not configured.' };
  }

  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: mapAuthError(error),
    };
  }
}

// Send password reset email
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  if (!isFirebaseConfigured || !auth) {
    return {
      success: false,
      error: 'Authentication is not configured. Please set up Firebase credentials.',
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    // For security, don't reveal if email exists
    // Firebase will return auth/user-not-found but we show generic success
    if (error?.code === 'auth/user-not-found') {
      return { success: true }; // Pretend success for security
    }
    return {
      success: false,
      error: mapAuthError(error),
    };
  }
}

// Get current user
export function getCurrentUser(): AuthUser | null {
  if (!isFirebaseConfigured || !auth) return null;
  const user = auth.currentUser;
  return user ? toAuthUser(user) : null;
}

// Subscribe to auth state changes
export function subscribeToAuthChanges(callback: (user: AuthUser | null) => void): () => void {
  if (!isFirebaseConfigured || !auth) {
    // If not configured, immediately return null
    callback(null);
    return () => {};
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user ? toAuthUser(user) : null);
  });

  return unsubscribe;
}

// Check if auth is configured
export function isAuthConfigured(): boolean {
  return isFirebaseConfigured;
}
