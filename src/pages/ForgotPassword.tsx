import AuthLayout from '../components/auth/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { useAuthContext } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const { user } = useAuthContext();

  if (user) return null;

  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
