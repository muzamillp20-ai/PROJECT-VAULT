import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { user } = useAuthContext();

  if (user) return null;

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
