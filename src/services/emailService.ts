/**
 * Email Service
 * 
 * This service sends emails through a secure backend endpoint.
 * 
 * IMPORTANT: Never send emails directly from the frontend with secret credentials.
 * The backend must verify the user is authenticated before sending.
 * 
 * Architecture:
 * React Frontend → Secure Backend API → Email Provider (Resend/SendGrid) → User
 * 
 * Backend endpoint example (Node.js/Express):
 * POST /api/send-login-thank-you
 * - Verify Firebase ID token from request header
 * - Extract user email and name
 * - Send email via Resend/SendGrid
 * - Return success/failure
 * 
 * Environment variable:
 * VITE_EMAIL_API_URL - URL of your backend email endpoint
 * 
 * Server-side (NOT in frontend):
 * RESEND_API_KEY or SENDGRID_API_KEY
 */

import { auth, isFirebaseConfigured } from './firebaseConfig';

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Check if email API is configured
export function isEmailConfigured(): boolean {
  return Boolean(import.meta.env.VITE_EMAIL_API_URL);
}

/**
 * Send a thank-you email after successful login
 * 
 * This function:
 * 1. Calls the secure backend endpoint
 * 2. Backend verifies the user is authenticated
 * 3. Backend sends the email via a provider (Resend, SendGrid, etc.)
 * 
 * If the email fails:
 * - The user is NOT logged out
 * - The user still has full access to the application
 * - A non-blocking notification is shown
 * - The error is logged securely on the server
 */
export async function sendLoginThankYouEmail(
  email: string,
  name: string
): Promise<EmailResult> {
  const apiUrl = import.meta.env.VITE_EMAIL_API_URL;
  
  if (!apiUrl) {
    // Email API not configured - this is OK
    // The user can still use the application
    console.info('Email API not configured. Thank-you email not sent.');
    return { success: false, error: 'Email service not configured.' };
  }

  try {
    // Get Firebase ID token for authentication verification
    // The backend will verify this token to ensure the request is legitimate
    let idToken = '';
    try {
      if (isFirebaseConfigured && auth?.currentUser) {
        idToken = await auth.currentUser.getIdToken();
      }
    } catch {
      // If we can't get a token, the backend will reject the request
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || 'Failed to send email.',
      };
    }

    return { success: true };
  } catch (error) {
    // Network error or other failure
    // Don't block the user - they're still logged in
    console.error('Email send failed:', error);
    return {
      success: false,
      error: 'Unable to send email right now.',
    };
  }
}

/**
 * Email content template (for reference/backend implementation)
 * 
 * Subject: "Welcome back to PROJECT VAULT"
 * 
 * Body:
 * Hi [USER NAME],
 * 
 * Thank you for logging in to PROJECT VAULT.
 * 
 * Your personal project archive is ready.
 * 
 * You can now access your projects, GitHub repositories,
 * live deployments, documentation and project details
 * from one place.
 * 
 * PROJECT VAULT
 * ALL MY PROJECTS. ONE PLACE.
 * 
 * See you inside.
 * — PROJECT VAULT
 */
