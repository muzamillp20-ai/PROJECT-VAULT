# PROJECT VAULT

**ALL MY PROJECTS. ONE PLACE.**

A premium personal project archive web application built with React, TypeScript, Vite, and Tailwind CSS. Store, organize and instantly launch every project you've built — with full authentication, search, filtering, and data management.

![Project Vault](https://img.shields.io/badge/PROJECT-VAULT-2563EB?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### Project Management
- **Full CRUD**: Add, edit, delete projects with form validation
- **Rich Metadata**: Store GitHub URLs, live URLs, documentation links, screenshots, tags, technologies
- **Smart Organization**: Categories, types, statuses, and tags
- **Favorites & Featured**: Mark projects as favorites or featured
- **Auto-numbering**: Projects are automatically numbered

### Search & Discovery
- **Instant Search**: Search across names, descriptions, tags, technologies, and URLs
- **Category Filters**: Web, AI, Cybersecurity, Hackathon, College, Mobile, Tools
- **Status Filters**: Live, Completed, In Development, Archived
- **Sorting**: Newest, Oldest, A-Z, Z-A, Recently Updated, Favorites, Featured

### Authentication (Firebase)
- **Email/Password**: Secure sign up and sign in
- **Google Sign-In**: One-click authentication
- **Password Reset**: Email-based password recovery
- **Protected Routes**: All vault content requires authentication
- **Persistent Sessions**: Stay logged in across browser sessions
- **Thank-You Email**: Automatic welcome email after login (via secure backend)

### Data Management
- **Export**: Download all projects as JSON backup
- **Import**: Restore projects from JSON backup
- **LocalStorage**: Data persists across browser sessions
- **Duplicate Detection**: Prevents adding the same GitHub repo twice

### Developer Experience
- **QR Codes**: Generate QR codes for project URLs
- **Copy Links**: One-click copy for any URL
- **Share**: Native Web Share API support
- **External Links**: Open live projects and GitHub repos directly

### Design
- **Neo-Brutalist UI**: Bold borders, offset shadows, strong typography
- **White Background**: Clean, professional aesthetic
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Accessible**: Keyboard navigation, ARIA labels, semantic HTML
- **Premium Feel**: Custom fonts (Space Grotesk, Inter, JetBrains Mono)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/project-vault.git
cd project-vault

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Setup

Edit `.env` and add your Firebase configuration:

```env
# Firebase Authentication (get from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Email API (optional - for thank-you emails)
VITE_EMAIL_API_URL=https://your-backend.com/api/send-login-thank-you
```

---

## 🔐 Authentication Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard
4. Enable **Authentication** in the left sidebar
5. Enable **Email/Password** provider
6. Enable **Google** provider (optional)

### 2. Get Firebase Config

1. In Firebase Console, go to **Project Settings** → **General**
2. Scroll to **Your apps** section
3. Click the web icon (</>) to register a web app
4. Copy the configuration object
5. Paste values into your `.env` file

### 3. Configure Authorized Domains

1. In Firebase Console → **Authentication** → **Settings**
2. Go to **Authorized domains**
3. Add your deployment domain (e.g., `yourusername.github.io`)

### 4. (Optional) Setup Thank-You Email

The thank-you email requires a secure backend endpoint. See `src/backend/emailFunction.example.ts` for implementation examples using:
- Vercel Serverless Functions + Resend
- Firebase Cloud Functions + Resend
- Any Node.js backend + email provider

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx      # Login page layout
│   │   ├── AuthLoading.tsx     # Auth loading screen
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── ProtectedRoute.tsx  # Route guard
│   │   ├── RegisterForm.tsx
│   │   └── UserMenu.tsx        # User dropdown
│   ├── EmptyState.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Modals.tsx              # QR, Delete, Import modals
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectForm.tsx
│   ├── SearchFilter.tsx
│   └── Stats.tsx
├── contexts/
│   └── AuthContext.tsx         # Auth state provider
├── hooks/
│   ├── useAuth.ts              # Auth logic hook
│   └── useProjects.ts          # Project data hook
├── pages/
│   ├── AddProject.tsx
│   ├── Categories.tsx
│   ├── EditProject.tsx
│   ├── Favorites.tsx
│   ├── ForgotPassword.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Manage.tsx
│   ├── ProjectDetails.tsx
│   ├── Projects.tsx
│   ├── Register.tsx
│   └── Settings.tsx
├── services/
│   ├── authService.ts          # Firebase auth operations
│   ├── emailService.ts         # Email API integration
│   ├── firebaseConfig.ts       # Firebase initialization
│   └── projectService.ts       # Project CRUD + localStorage
├── utils/
│   ├── authValidation.ts       # Form validation
│   ├── urlHelpers.ts           # URL utilities
│   └── validation.ts           # Project form validation
├── backend/
│   └── emailFunction.example.ts  # Backend email example
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Deployment

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages

3. The app uses `HashRouter` for SPA routing compatibility

### Vercel / Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in dashboard

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

---

## 🔒 Security

### What's Safe in Frontend
- Firebase client config (API key, project ID, etc.)
- These identify your project but cannot access data

### What Must Stay Server-Side
- Firebase Admin SDK credentials
- Email provider API keys (Resend, SendGrid)
- Service account JSON files
- Any secret prefixed with `RESEND_`, `ADMIN_`, etc.

### Authentication Flow
```
User enters credentials
    ↓
Firebase Authentication (client SDK)
    ↓
Firebase returns ID token
    ↓
Frontend sends token to backend
    ↓
Backend verifies token with Firebase Admin
    ↓
Backend performs action (send email, etc.)
```

---

## 📧 Email Service

The thank-you email after login requires a secure backend:

1. Deploy the example function from `src/backend/emailFunction.example.ts`
2. Set `VITE_EMAIL_API_URL` in your `.env`
3. The backend verifies the user's Firebase ID token
4. Email is sent via Resend/SendGrid

**If email is not configured:**
- Users can still log in and use the app
- No error is shown
- Only the welcome email is skipped

---

## 🎨 Design System

### Colors
- **Primary**: `#2563EB` (Blue)
- **Secondary**: `#7C3AED` (Purple)
- **Background**: `#FFFFFF` (White)
- **Text**: `#111111` (Black)
- **Success**: `#16A34A` (Green)
- **Danger**: `#DC2626` (Red)

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Mono**: JetBrains Mono

### Components
- 2px black borders
- 4px offset shadows
- Sharp/medium rounded corners
- Bold uppercase labels
- Monospace metadata

---

## 🧪 Testing the App

### Without Firebase Configured
The app will show a warning message on login/register pages:
> ⚠ Authentication not configured

Users cannot log in but can see the UI.

### With Firebase Configured
1. Go to `/register`
2. Create an account
3. Verify email (if enabled in Firebase)
4. Log in at `/login`
5. Access your vault

---

## 📝 Adding Projects

1. Click **+ ADD PROJECT** in the navbar
2. Fill in project details:
   - Name, description
   - GitHub URL, live URL
   - Category, type, status
   - Tags, technologies
3. Click **SAVE PROJECT**
4. Project appears in your vault

---

## 🔄 Import/Export

### Export
1. Go to **MANAGE** page
2. Click **EXPORT**
3. JSON file downloads: `project-vault-backup.json`

### Import
1. Go to **MANAGE** page
2. Click **IMPORT**
3. Select your JSON backup file
4. Confirm import
5. Projects are added to your vault

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this for your own project vault!

---

## 🙏 Acknowledgments

- **Firebase** for authentication
- **Lucide React** for icons
- **Google Fonts** for typography
- **Tailwind CSS** for styling

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check the Firebase documentation
- Review the code comments

---

**Built with ❤️ for developers who build things.**

**PROJECT VAULT — ALL MY PROJECTS. ONE PLACE.**
