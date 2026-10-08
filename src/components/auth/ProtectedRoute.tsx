import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { isFirebaseConfigured } from '../../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  // If Firebase is not configured, redirect to login (which shows Setup Wizard)
  if (!isFirebaseConfigured()) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    // Show a brief loading state while checking auth
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-[#111] text-white flex items-center justify-center font-bold text-xl font-mono mx-auto mb-6 shadow-[4px_4px_0px_#2563EB]">
            PV
          </div>
          <h1 className="text-lg font-bold font-['Space_Grotesk'] tracking-tight">
            CHECKING YOUR VAULT...
          </h1>
          <div className="mt-6 flex justify-center">
            <div className="w-6 h-6 border-2 border-[#D1D5DB] border-t-[#2563EB] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
