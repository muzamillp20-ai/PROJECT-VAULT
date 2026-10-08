import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { validateLoginForm } from '../../utils/authValidation';

export default function LoginForm() {
  const { signIn, signInWithGoogle, isConfigured } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Get the page the user was trying to access
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLoginForm({ email, password });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error || 'Sign in failed.' });
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const result = await signInWithGoogle();
    setGoogleLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error || 'Google sign in failed.' });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          WELCOME BACK.
        </h1>
        <p className="mt-2 text-[#555]">
          Sign in to access your personal project archive.
        </p>
      </div>

      {/* Not configured warning */}
      {!isConfigured && (
        <div className="mb-6 p-4 border-2 border-[#F59E0B] bg-[#FFFBEB]">
          <p className="text-sm font-semibold text-[#92400E]">
            ⚠ Authentication not configured
          </p>
          <p className="mt-1 text-xs text-[#92400E]">
            Firebase credentials are not set. Please configure environment variables to enable authentication.
          </p>
        </div>
      )}

      {/* General error */}
      {errors.general && (
        <div className="mb-4 p-3 border-2 border-[#DC2626] bg-[#FEF2F2] animate-fade-in">
          <p className="text-sm text-[#DC2626] font-semibold">{errors.general}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold tracking-wider mb-1.5">
            EMAIL ADDRESS
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => { const n = {...prev}; delete n.email; return n; }); }}
            className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
          />
          {errors.email && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-bold tracking-wider mb-1.5">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors(prev => { const n = {...prev}; delete n.password; return n; }); }}
            className={`w-full px-4 py-3 border-2 ${errors.password ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={loading}
          />
          {errors.password && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.password}</p>}
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 border-2 border-[#111] accent-[#2563EB]"
            />
            <span className="text-xs font-semibold">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !isConfigured}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#111]"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              SIGNING IN...
            </>
          ) : (
            <>
              SIGN IN
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D1D5DB]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-[#555] font-mono">OR</span>
        </div>
      </div>

      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading || !isConfigured}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-[#111] text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        CONTINUE WITH GOOGLE
      </button>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-[#555]">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-[#2563EB] hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
