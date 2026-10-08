import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { validateForgotPasswordForm } from '../../utils/authValidation';

export default function ForgotPasswordForm() {
  const { sendPasswordReset, isConfigured } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForgotPasswordForm({ email });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await sendPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setErrors({ general: result.error || 'Failed to send reset email.' });
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        {/* Success state */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#DCFCE7] border-2 border-[#16A34A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight">
            CHECK YOUR EMAIL.
          </h2>
          <p className="mt-3 text-[#555] leading-relaxed">
            Password reset instructions have been sent to your email.
          </p>
          <p className="mt-2 text-xs text-[#555] font-mono">
            {email}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <ArrowLeft size={16} />
            BACK TO LOGIN
          </Link>
          <button
            onClick={() => { setSuccess(false); setEmail(''); }}
            className="w-full text-xs font-semibold text-[#555] hover:text-[#111] transition-colors"
          >
            Didn't receive it? Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          RESET YOUR PASSWORD.
        </h1>
        <p className="mt-2 text-[#555]">
          Enter your email address and we'll send you a password reset link.
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
        {/* Email */}
        <div>
          <label htmlFor="reset-email" className="block text-xs font-bold tracking-wider mb-1.5">
            EMAIL ADDRESS
          </label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
            className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors`}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
          />
          {errors.email && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.email}</p>}
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
              SENDING...
            </>
          ) : (
            <>
              SEND RESET LINK
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <p className="mt-6 text-center">
        <Link to="/login" className="inline-flex items-center gap-1 text-sm font-semibold text-[#555] hover:text-[#111] transition-colors">
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </p>
    </div>
  );
}
