import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Plus, Home, FolderOpen, Heart, Settings, Code } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/projects', label: 'PROJECTS', icon: FolderOpen },
    { path: '/categories', label: 'CATEGORIES', icon: Code },
    { path: '/favorites', label: 'FAVORITES', icon: Heart },
    { path: '/manage', label: 'MANAGE', icon: Settings },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white border-b-2 border-[#111] transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#111] text-white flex items-center justify-center font-bold text-sm font-mono tracking-tight group-hover:bg-[#2563EB] transition-colors">
                PV
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-sm tracking-tight font-['Space_Grotesk']">PROJECT VAULT</div>
                <div className="text-[10px] text-[#555] tracking-wider font-mono">ALL MY PROJECTS. ONE PLACE.</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#2563EB] bg-[#DBEAFE]'
                      : 'text-[#555] hover:text-[#111] hover:bg-[#F7F8FC]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={onSearchOpen}
                className="p-2.5 border-2 border-[#111] hover:bg-[#F7F8FC] transition-colors"
                aria-label="Search projects"
              >
                <Search size={16} />
              </button>
              <Link
                to="/add"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
              >
                <Plus size={14} />
                ADD PROJECT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 border-2 border-[#111]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#111] bg-white animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wider ${
                      location.pathname === link.path
                        ? 'text-[#2563EB] bg-[#DBEAFE]'
                        : 'text-[#555] hover:text-[#111] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={onSearchOpen}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wider text-[#555] hover:text-[#111] hover:bg-[#F7F8FC] w-full"
              >
                <Search size={16} />
                SEARCH
              </button>
              <Link
                to="/add"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] text-white text-sm font-bold tracking-wider mt-3"
              >
                <Plus size={16} />
                ADD PROJECT
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#111]">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { path: '/', label: 'HOME', icon: Home },
            { path: '/projects', label: 'PROJECTS', icon: FolderOpen },
            { path: '/add', label: '+', icon: Plus, special: true },
            { path: '/favorites', label: 'FAVS', icon: Heart },
            { path: '/manage', label: 'MANAGE', icon: Settings },
          ].map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            if (item.special) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="w-12 h-12 bg-[#2563EB] text-white flex items-center justify-center border-2 border-[#111] shadow-[2px_2px_0px_#111] -mt-4"
                >
                  <Icon size={20} />
                </Link>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[44px] min-h-[44px] ${
                  isActive ? 'text-[#2563EB]' : 'text-[#555]'
                }`}
              >
                <Icon size={18} />
                <span className="text-[9px] font-bold tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
