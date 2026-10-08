import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, AlertTriangle, LogOut } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Settings() {
  const { user, signOut, isConfigured } = useAuthContext();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      setToast('Signed out successfully.');
      setTimeout(() => navigate('/login'), 1000);
    }
  };

  const handleDeleteAccount = () => {
    // In a real implementation, this would call a backend API
    // to delete the user account from Firebase
    setToast('Account deletion requires backend implementation.');
    setShowDeleteConfirm(false);
    setTimeout(() => setToast(null), 3000);
  };

  const displayName = user.displayName || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          SETTINGS
        </h1>
        <p className="mt-2 text-sm text-[#555] font-mono">
          Manage your account
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h2 className="text-sm font-bold tracking-wider font-mono flex items-center gap-2">
              <User size={16} />
              PROFILE
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-16 h-16 rounded-full border-2 border-[#111] object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-[#2563EB] text-white flex items-center justify-center text-xl font-bold font-mono border-2 border-[#111]">
                  {initials}
                </div>
              )}
              <div>
                <p className="text-lg font-bold font-['Space_Grotesk']">{displayName}</p>
                <p className="text-sm text-[#555] font-mono">{user.email}</p>
              </div>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-[#D1D5DB] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Authentication Provider</span>
                <span className="font-mono font-semibold">Firebase</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">User ID</span>
                <span className="font-mono text-xs text-[#555]">{user.uid.slice(0, 12)}...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h2 className="text-sm font-bold tracking-wider font-mono flex items-center gap-2">
              <Shield size={16} />
              ACCOUNT
            </h2>
          </div>
          <div className="p-5 space-y-3">
            <button
              onClick={() => {
                setToast('Password change requires Firebase Authentication console.');
                setTimeout(() => setToast(null), 3000);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold border-2 border-[#111] bg-white hover:bg-[#F7F8FC] transition-colors"
            >
              <span>Change Password</span>
              <span className="text-xs text-[#555]">Via Firebase</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#DC2626] border-2 border-[#DC2626] bg-white hover:bg-[#FEF2F2] transition-colors"
            >
              <LogOut size={16} />
              LOG OUT
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-2 border-[#DC2626] bg-white shadow-[4px_4px_0px_#DC2626]">
          <div className="px-5 py-3 border-b-2 border-[#DC2626] bg-[#FEF2F2]">
            <h2 className="text-sm font-bold tracking-wider font-mono flex items-center gap-2 text-[#DC2626]">
              <AlertTriangle size={16} />
              DANGER ZONE
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-[#555] mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2.5 text-xs font-bold tracking-wider text-white bg-[#DC2626] border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-white border-2 border-[#DC2626] shadow-[6px_6px_0px_#DC2626] p-6 max-w-md w-full animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#DC2626]">DELETE ACCOUNT?</h3>
            <p className="mt-2 text-sm text-[#555]">
              This will permanently delete your account and all your projects. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 bg-[#DC2626] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111]"
              >
                DELETE PERMANENTLY
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111]"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <div className="px-4 py-3 bg-[#111] text-white text-sm font-semibold border-2 border-[#111] shadow-[3px_3px_0px_#2563EB]">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
