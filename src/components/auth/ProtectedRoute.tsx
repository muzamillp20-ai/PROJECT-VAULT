import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import AuthLoading from './AuthLoading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    // Redirect to login with the attempted page as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
