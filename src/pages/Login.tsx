import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SetupWizard from '../components/auth/SetupWizard';
import { useAuthContext } from '../contexts/AuthContext';
import { isFirebaseConfigured } from '../firebase';

export default function Login() {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(!isFirebaseConfigured());

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, location, navigate]);

  // Show success message after registration
  useEffect(() => {
    const state = location.state as any;
    if (state?.message) {
      setMessage(state.message);
      window.history.replaceState({}, '');
    }
  }, [location]);

  const handleSetupComplete = () => {
    setShowSetup(false);
    // Reload to reinitialize auth
    window.location.reload();
  };

  // If Firebase is not configured, show the Setup Wizard
  if (showSetup) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  // If already logged in, don't render anything (redirect handled above)
  if (user) return null;

  return (
    <AuthLayout>
      {message && (
        <div className="mb-4 p-3 border-2 border-[#16A34A] bg-[#DCFCE7] animate-fade-in">
          <p className="text-sm text-[#16A34A] font-semibold">{message}</p>
        </div>
      )}
      <LoginForm />
    </AuthLayout>
  );
}
