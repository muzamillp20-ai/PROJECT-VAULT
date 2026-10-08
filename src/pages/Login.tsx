import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { useAuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { user } = useAuthContext();
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);

  // Show success message after registration
  useEffect(() => {
    const state = location.state as any;
    if (state?.message) {
      setMessage(state.message);
      // Clear the state
      window.history.replaceState({}, '');
    }
  }, [location]);

  // If already logged in, the ProtectedRoute will handle redirect
  // But we show a clean login page for unauthenticated users
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
