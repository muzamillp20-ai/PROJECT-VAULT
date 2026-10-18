# PROJECT VAULT

**ALL MY PROJECTS. ONE PLACE.**

A premium personal project archive web application built with React, TypeScript, Vite, and Tailwind CSS. Store, organize and instantly launch every project you've built — with search, filtering, and data management.

![Project Vault](https://img.shields.io/badge/PROJECT-VAULT-2563EB?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=flat-square&logo=github)

**Live Demo**: https://muzamillp20-ai.github.io/PROJECT-VAULT/

---

## ✨ Features

### Authentication
- **Simple Login System**: Email/password authentication
- **User Registration**: Create new accounts
- **Protected Routes**: All pages require authentication
- **Persistent Sessions**: Stay logged in across browser sessions
- **User Profile**: Display user info in navbar
- **Logout**: Secure sign out

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

### Installation

```bash
# Clone the repository
git clone https://github.com/muzamillp20-ai/PROJECT-VAULT.git
cd PROJECT-VAULT

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### First Time Setup

1. You'll be redirected to the login page
2. Click "Sign up" to create a new account
3. Enter your name, email, and password (minimum 6 characters)
4. You'll be automatically logged in and redirected to the dashboard
5. Start adding your projects!

**Note**: All data is stored in your browser's localStorage. Make sure to use the Export feature regularly to backup your projects.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 6 (HashRouter for GitHub Pages)
- **Icons**: Lucide React
- **QR Codes**: qrcode library
- **Authentication**: Client-side localStorage
- **Data Storage**: Browser localStorage

## 💾 Data Storage

**Important**: All project data and user accounts are stored in your browser's localStorage. This means:

- Data is **device-specific** and **browser-specific**
- Data is **not synchronized** across devices
- Clearing browser data will **delete all projects and accounts**
- Use the **Export** feature regularly to backup your projects
- Use the **Import** feature to restore from backups

For multi-device sync, consider integrating Firebase, Supabase, or another backend service.

## 📁 Project Structure

```
src/
├── components/
│   ├── EmptyState.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Modals.tsx              # QR, Delete, Import modals
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectForm.tsx
│   ├── SearchFilter.tsx
│   └── Stats.tsx
├── hooks/
│   └── useProjects.ts          # Project data hook
├── pages/
│   ├── AddProject.tsx
│   ├── Categories.tsx
│   ├── EditProject.tsx
│   ├── Favorites.tsx
│   ├── Home.tsx
│   ├── Manage.tsx
│   ├── ProjectDetails.tsx
│   └── Projects.tsx
├── services/
│   └── projectService.ts       # Project CRUD + localStorage
├── utils/
│   ├── urlHelpers.ts           # URL utilities
│   └── validation.ts           # Project form validation
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

## 🔐 Authentication

The app uses a simple client-side authentication system:

- **No external services required**: Everything runs in your browser
- **LocalStorage based**: User accounts are stored locally
- **Password protection**: Minimum 6 characters
- **Session persistence**: Stay logged in until you explicitly logout

### How It Works

1. **Registration**: Create an account with name, email, and password
2. **Login**: Sign in with your email and password
3. **Sessions**: Your login state is saved in localStorage
4. **Logout**: Click the logout button in the navbar

### Important Notes

- User data is stored in your browser only
- Clearing browser data will remove all accounts
- Use the Export feature to backup your projects regularly
- For production use with multiple devices, consider integrating Firebase or Supabase

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
4. Deploy

### GitHub Pages (Automatic)

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

**Setup Steps:**

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**, select **Source: GitHub Actions**
4. Push to the `main` branch - the workflow will automatically build and deploy

**Manual Deployment:**

```bash
# Build the project
npm run build

# The dist folder contains the production build
# Deploy this folder to GitHub Pages
```

**Live Demo:** https://muzamillp20-ai.github.io/PROJECT-VAULT/

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

## 🚀 Deployment Status

**Repository**: https://github.com/muzamillp20-ai/PROJECT-VAULT  
**Live Website**: https://muzamillp20-ai.github.io/PROJECT-VAULT/  
**Branch**: `main`  
**Build Status**: ✅ Production build successful  
**Deployment**: GitHub Pages via GitHub Actions

### Manual Steps Required

After pushing to GitHub, you need to:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Build and deployment", select Source: **GitHub Actions**

2. **Verify Deployment**:
   - Push to `main` branch
   - Check Actions tab for workflow run
   - Wait for deployment to complete (~2-3 minutes)
   - Visit https://muzamillp20-ai.github.io/PROJECT-VAULT/

3. **Custom Domain** (Optional):
   - Add a `CNAME` file with your domain
   - Update DNS records
   - Enable HTTPS in repository settings

---

## 🙏 Acknowledgments

- **Lucide React** for icons
- **Google Fonts** for typography
- **Tailwind CSS** for styling

---

**Built with ❤️ for developers who build things.**

**PROJECT VAULT — ALL MY PROJECTS. ONE PLACE.**
