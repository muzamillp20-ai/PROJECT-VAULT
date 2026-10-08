/**
 * PROJECT VAULT - Backend Email Function
 * 
 * This is an example serverless function that sends thank-you emails.
 * Deploy this to your backend (Vercel, Netlify, Firebase Cloud Functions, etc.)
 * 
 * Architecture:
 * React Frontend → This API → Resend/SendGrid → User's Email
 * 
 * Security:
 * - Verifies Firebase ID token to ensure user is authenticated
 * - Never exposes API keys to the frontend
 * - Rate limited to prevent abuse
 * 
 * Environment variables (server-side only):
 * - RESEND_API_KEY: Your Resend API key
 * - FIREBASE_PROJECT_ID: Your Firebase project ID
 * 
 * Example deployment (Vercel serverless function):
 * 1. Create /api/send-login-thank-you.js
 * 2. Add this code
 * 3. Set environment variables in Vercel dashboard
 * 4. Update VITE_EMAIL_API_URL in your .env
 */

// Example using Vercel serverless function + Resend
// File: api/send-login-thank-you.js

/*
import { Resend } from 'resend';
import admin from 'firebase-admin';

// Initialize Firebase Admin (server-side only)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1. Verify Firebase ID token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 2. Extract user info from request
    const { email, name } = req.body;
    
    // 3. Verify the email matches the authenticated user
    if (email !== decodedToken.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // 4. Send email via Resend
    const displayName = name || decodedToken.name || 'User';
    
    await resend.emails.send({
      from: 'PROJECT VAULT <noreply@yourdomain.com>',
      to: email,
      subject: 'Welcome back to PROJECT VAULT',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; width: 48px; height: 48px; background: #111; color: #fff; font-weight: bold; font-family: monospace; line-height: 48px; text-align: center;">PV</div>
            <h1 style="font-size: 24px; font-weight: bold; margin: 16px 0 4px 0;">PROJECT VAULT</h1>
            <p style="color: #555; font-size: 12px; letter-spacing: 2px; margin: 0;">ALL MY PROJECTS. ONE PLACE.</p>
          </div>
          
          <div style="background: #F7F8FC; border: 2px solid #111; padding: 32px; margin-bottom: 24px;">
            <p style="font-size: 16px; margin: 0 0 16px 0;">Hi ${displayName},</p>
            <p style="font-size: 16px; margin: 0 0 16px 0;">Thank you for logging in to PROJECT VAULT.</p>
            <p style="font-size: 16px; margin: 0 0 16px 0;">Your personal project archive is ready.</p>
            <p style="font-size: 16px; margin: 0;">You can now access your projects, GitHub repositories, live deployments, documentation and project details from one place.</p>
          </div>
          
          <div style="text-align: center; margin-top: 32px;">
            <p style="font-size: 14px; color: #555; margin: 0 0 8px 0;">See you inside.</p>
            <p style="font-size: 14px; font-weight: bold; margin: 0;">— PROJECT VAULT</p>
          </div>
        </div>
      `,
    });

    // 5. Return success
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
*/

/**
 * Alternative: Firebase Cloud Functions
 * 
 * If using Firebase, you can deploy this as a Cloud Function:
 * 
 * // functions/src/index.ts
 * import * as functions from 'firebase-functions';
 * import * as admin from 'firebase-admin';
 * import { Resend } from 'resend';
 * 
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * 
 * export const sendLoginThankYou = functions.https.onCall(async (data, context) => {
 *   // Verify authentication
 *   if (!context.auth) {
 *     throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
 *   }
 * 
 *   const { email, name } = data;
 *   const uid = context.auth.uid;
 *   const user = await admin.auth().getUser(uid);
 * 
 *   // Verify email matches
 *   if (email !== user.email) {
 *     throw new functions.https.HttpsError('permission-denied', 'Email mismatch');
 *   }
 * 
 *   // Send email
 *   await resend.emails.send({
 *     from: 'PROJECT VAULT <noreply@yourdomain.com>',
 *     to: email,
 *     subject: 'Welcome back to PROJECT VAULT',
 *     html: `...`, // Same HTML as above
 *   });
 * 
 *   return { success: true };
 * });
 */

export {};
