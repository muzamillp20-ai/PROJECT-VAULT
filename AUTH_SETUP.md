# 🔐 Authentication Setup Guide

This guide will help you set up Firebase Authentication for PROJECT VAULT.

## Quick Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `project-vault` (or your choice)
4. Disable Google Analytics (optional)
5. Click **Create project**

### Step 2: Enable Authentication

1. In Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. (Optional) Enable **Google** provider for one-click login

### Step 3: Register Web App

1. In Firebase Console, click the **⚙️ gear icon** → **Project settings**
2. Scroll to **Your apps** section
3. Click the **web icon** (`</>`)
4. Enter app nickname: `Project Vault Web`
5. Check **Also set up Firebase Hosting** (optional)
6. Click **Register app**
7. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123..."
};
```

### Step 4: Add to Environment Variables

1. Open your project's `.env` file (create from `.env.example` if needed)
2. Paste the values:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123...
```

3. Save the file

### Step 5: Add Authorized Domain

1. In Firebase Console → **Authentication** → **Settings**
2. Go to **Authorized domains** section
3. Click **Add domain**
4. Add your deployment domain:
   - For local development: `localhost`
   - For GitHub Pages: `yourusername.github.io`
   - For custom domain: `yourdomain.com`

### Step 6: Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:5173`

3. You should see the login page

4. Click **"Create one"** to register a new account

5. Enter your email and password

6. After registration, you'll be redirected to login

7. Log in with your credentials

8. You should now see your PROJECT VAULT dashboard!

---

## Troubleshooting

### "Authentication not configured" warning

**Problem**: You see a yellow warning on the login page.

**Solution**: 
- Check that your `.env` file exists
- Verify all `VITE_FIREBASE_*` variables are set
- Restart the development server after adding env variables

### "Email or password is incorrect"

**Problem**: Login fails even with correct credentials.

**Solution**:
- Make sure you registered an account first
- Check that email/password providers are enabled in Firebase
- Verify the authorized domain includes `localhost`

### "Sign-in popup was blocked"

**Problem**: Google sign-in doesn't work.

**Solution**:
- Allow popups for your site in browser settings
- Or use email/password authentication instead

### "Permission denied" errors

**Problem**: Can't access certain features.

**Solution**:
- Make sure you're logged in
- Check Firebase Authentication rules (should allow authenticated users)

---

## Production Deployment

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Add your GitHub Pages domain to Firebase authorized domains:
   - `yourusername.github.io`

3. Deploy the `dist` folder to GitHub Pages

### Vercel / Netlify

1. Connect your repository
2. Add environment variables in the dashboard:
   - All `VITE_FIREBASE_*` variables
3. Deploy

### Custom Domain

1. Add your custom domain to Firebase authorized domains
2. Update DNS settings
3. Deploy to your hosting provider

---

## Security Best Practices

### ✅ DO

- Use environment variables for Firebase config
- Enable email verification in Firebase (optional)
- Add all deployment domains to authorized domains
- Use strong passwords
- Enable 2FA on your Firebase account

### ❌ DON'T

- Commit `.env` file to Git (add to `.gitignore`)
- Share your Firebase Admin SDK credentials
- Use the same password for Firebase and other services
- Expose server-side secrets in frontend code

---

## Optional: Email Verification

To require email verification:

1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Expand **Email/Password** provider
3. Enable **Email verification** (if available)
4. Users will receive a verification email after registration

---

## Optional: Thank-You Email

To send a welcome email after login:

1. Deploy a backend function (see `src/backend/emailFunction.example.ts`)
2. Set `VITE_EMAIL_API_URL` in your `.env`
3. The app will automatically send emails after successful login

**Note**: This is optional. The app works fine without it.

---

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
- Open an issue on GitHub

---

**You're all set! Enjoy your PROJECT VAULT.** 🚀
