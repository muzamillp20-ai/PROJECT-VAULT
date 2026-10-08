import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AuthUser,
  signIn as authSignIn,
  signUp as authSignUp,
  signInWithGoogle as authSignInWithGoogle,
  signOut as authSignOut,
  sendPasswordReset as authSendPasswordReset,
  subscribeToAuthChanges,
  isAuthConfigured,
} from '../services/authService';
import { sendLoginThankYouEmail, isEmailConfigured } from '../services/emailService';
import { isFirebaseConfigured } from '../firebase';

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  emailStatus: 'idle' | 'sending' | 'sent' | 'failed';
  emailMessage: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const hasSentThankYou = useRef(false);
  const previousUser = useRef<AuthUser | null>(null);

  useEffect(() => {
    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setUser(authUser);
      setLoading(false);

      // Detect transition from unauthenticated → authenticated
      // This prevents sending emails on page refresh
      if (authUser && !previousUser.current && !hasSentThankYou.current) {
        hasSentThankYou.current = true;
        triggerThankYouEmail(authUser);
      }

      previousUser.current = authUser;
    });

    return () => unsubscribe();
  }, []);

  const triggerThankYouEmail = async (authUser: AuthUser) => {
    if (!isEmailConfigured()) {
      return;
    }

    setEmailStatus('sending');
    setEmailMessage('Welcome back! Preparing your vault...');

    const name = authUser.displayName || authUser.email || 'User';
    const email = authUser.email || '';

    const result = await sendLoginThankYouEmail(email, name);

    if (result.success) {
      setEmailStatus('sent');
      setEmailMessage("You're signed in.");
      setTimeout(() => {
        setEmailStatus('idle');
        setEmailMessage(null);
      }, 3000);
    } else {
      setEmailStatus('failed');
      setEmailMessage("You're signed in. We couldn't send the welcome email right now.");
      setTimeout(() => {
        setEmailStatus('idle');
        setEmailMessage(null);
      }, 4000);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authSignIn(email, password);
    return { success: result.success, error: result.error };
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const result = await authSignUp(name, email, password);
    return { success: result.success, error: result.error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const result = await authSignInWithGoogle();
    return { success: result.success, error: result.error };
  }, []);

  const handleSignOut = useCallback(async () => {
    hasSentThankYou.current = false;
    previousUser.current = null;
    setEmailStatus('idle');
    setEmailMessage(null);
    const result = await authSignOut();
    return { success: result.success, error: result.error };
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const result = await authSendPasswordReset(email);
    return { success: result.success, error: result.error };
  }, []);

  return {
    user,
    loading,
    isConfigured: isAuthConfigured(),
    signIn,
    signUp,
    signInWithGoogle,
    signOut: handleSignOut,
    sendPasswordReset,
    emailStatus,
    emailMessage,
  };
}
