import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SearchModal } from './components/SearchFilter';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth pages (public)
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Protected pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Favorites from './pages/Favorites';
import Manage from './pages/Manage';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Categories from './pages/Categories';
import Settings from './pages/Settings';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          {/* Public auth routes - no Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-white">
                <Navbar onSearchOpen={() => setSearchOpen(true)} />
                
                <main className="flex-1 pb-20 lg:pb-0">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/manage" element={<Manage />} />
                    <Route path="/add" element={<AddProject />} />
                    <Route path="/edit/:id" element={<EditProject />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>

                <Footer />

                {/* Global Search Modal */}
                <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
