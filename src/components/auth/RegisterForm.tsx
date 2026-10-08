import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { validateRegisterForm } from '../../utils/authValidation';

export default function RegisterForm() {
  const { signUp, isConfigured } = useAuthContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateRegisterForm({ name, email, password, confirmPassword });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await signUp(name, email, password);
    setLoading(false);

    if (result.success) {
      // Account created successfully - redirect to login or auto-sign in
      navigate('/login', { 
        replace: true,
        state: { message: 'Account created successfully. Please sign in.' }
      });
    } else {
      setErrors({ general: result.error || 'Registration failed.' });
    }
  };

  const clearError = (field: string) => {
    setErrors(prev => { const n = {...prev}; delete n[field]; return n; });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          CREATE ACCOUNT.
        </h1>
        <p className="mt-2 text-[#555]">
          Join PROJECT VAULT and start organizing your projects.
        </p>
      </div>

      {/* Not configured warning */}
      {!isConfigured && (
        <div className="mb-6 p-4 border-2 border-[#F59E0B] bg-[#FFFBEB]">
          <p className="text-sm font-semibold text-[#92400E]">
            ⚠ Authentication not configured
          </p>
          <p className="mt-1 text-xs text-[#92400E]">
            Firebase credentials are not set. Please configure environment variables.
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
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold tracking-wider mb-1.5">
            FULL NAME
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); clearError('name'); }}
            className={`w-full px-4 py-3 border-2 ${errors.name ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="John Doe"
            autoComplete="name"
            disabled={loading}
          />
          {errors.name && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="block text-xs font-bold tracking-wider mb-1.5">
            EMAIL ADDRESS
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
            className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
          />
          {errors.email && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="reg-password" className="block text-xs font-bold tracking-wider mb-1.5">
            PASSWORD
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
            className={`w-full px-4 py-3 border-2 ${errors.password ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            disabled={loading}
          />
          {errors.password && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className="block text-xs font-bold tracking-wider mb-1.5">
            CONFIRM PASSWORD
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
            className={`w-full px-4 py-3 border-2 ${errors.confirmPassword ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            disabled={loading}
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !isConfigured}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              CREATING ACCOUNT...
            </>
          ) : (
            <>
              CREATE ACCOUNT
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-[#555]">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#2563EB] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
