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
 */

import { getAuthInstance, isFirebaseConfigured } from '../firebase';

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
 */
export async function sendLoginThankYouEmail(
  email: string,
  name: string
): Promise<EmailResult> {
  const apiUrl = import.meta.env.VITE_EMAIL_API_URL;
  
  if (!apiUrl) {
    console.info('Email API not configured. Thank-you email not sent.');
    return { success: false, error: 'Email service not configured.' };
  }

  try {
    // Get Firebase ID token for authentication verification
    let idToken = '';
    try {
      const auth = getAuthInstance();
      if (auth?.currentUser) {
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
    console.error('Email send failed:', error);
    return {
      success: false,
      error: 'Unable to send email right now.',
    };
  }
}
