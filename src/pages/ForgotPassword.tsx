import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { useAuthContext } from '../contexts/AuthContext';
import { isFirebaseConfigured } from '../firebase';

export default function ForgotPassword() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // If Firebase is not configured, redirect to login (which shows Setup Wizard)
  if (!isFirebaseConfigured()) {
    navigate('/login', { replace: true });
    return null;
  }

  if (user) return null;

  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
