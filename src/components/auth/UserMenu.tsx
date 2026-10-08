import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, FolderOpen, Heart, ChevronDown } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function UserMenu() {
  const { user, signOut } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    const result = await signOut();
    setOpen(false);
    if (result.success) {
      setToast('Signed out successfully.');
      setTimeout(() => setToast(null), 3000);
      navigate('/login');
    }
  };

  const displayName = user.displayName || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F7F8FC] transition-colors border-2 border-transparent hover:border-[#111]"
          aria-label="User menu"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-8 h-8 rounded-full border-2 border-[#111] object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold font-mono border-2 border-[#111]">
              {initials || <User size={14} />}
            </div>
          )}
          <span className="hidden sm:block text-xs font-bold tracking-wider max-w-[100px] truncate">
            {displayName}
          </span>
          <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-1 bg-white border-2 border-[#111] shadow-[4px_4px_0px_#111] z-50 min-w-[180px] animate-scale-in">
              {/* User info */}
              <div className="px-4 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                <p className="text-[10px] font-mono text-[#555] truncate">{user.email}</p>
              </div>
              
              {/* Menu items */}
              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold hover:bg-[#F7F8FC] transition-colors"
                >
                  <Settings size={14} /> SETTINGS
                </Link>
                <Link
                  to="/projects"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold hover:bg-[#F7F8FC] transition-colors"
                >
                  <FolderOpen size={14} /> MY PROJECTS
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold hover:bg-[#F7F8FC] transition-colors"
                >
                  <Heart size={14} /> FAVORITES
                </Link>
              </div>
              
              {/* Logout */}
              <div className="border-t-2 border-[#111] py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                >
                  <LogOut size={14} /> LOG OUT
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <div className="px-4 py-3 bg-[#111] text-white text-sm font-semibold border-2 border-[#111] shadow-[3px_3px_0px_#2563EB]">
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
