import { useState } from 'react';
import { saveFirebaseConfig, reinitializeFirebase, getAuthInstance, FirebaseConfig } from '../../firebase';
import { ArrowRight, Check, ExternalLink, Copy, Loader2 } from 'lucide-react';

interface SetupWizardProps {
  onComplete: () => void;
}

export default function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<FirebaseConfig>({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });
  const [pastedJson, setPastedJson] = useState('');
  const [error, setError] = useState('');
  const [testing, setTesting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleParseJson = () => {
    try {
      // Try to parse the pasted JSON
      let parsed: any;
      
      // Handle different formats users might paste
      const trimmed = pastedJson.trim();
      
      // Try direct JSON parse
      try {
        parsed = JSON.parse(trimmed);
      } catch {
        // Try to extract JSON from a script tag or larger text
        const match = trimmed.match(/\{[\s\S]*apiKey[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error('Could not find valid JSON');
        }
      }

      // Extract Firebase config values
      const newConfig: FirebaseConfig = {
        apiKey: parsed.apiKey || '',
        authDomain: parsed.authDomain || '',
        projectId: parsed.projectId || '',
        storageBucket: parsed.storageBucket || '',
        messagingSenderId: parsed.messagingSenderId || '',
        appId: parsed.appId || '',
      };

      if (!newConfig.apiKey || !newConfig.authDomain || !newConfig.projectId) {
        setError('Missing required fields. Make sure you pasted the complete Firebase config.');
        return;
      }

      setConfig(newConfig);
      setError('');
      setStep(2);
    } catch (e) {
      setError('Could not parse the configuration. Please paste the complete Firebase config object.');
    }
  };

  const handleSaveAndTest = async () => {
    setTesting(true);
    setError('');

    // Save config
    saveFirebaseConfig(config);
    
    // Try to reinitialize Firebase
    const initialized = reinitializeFirebase();
    
    if (!initialized) {
      setError('Failed to initialize Firebase. Please check your credentials.');
      setTesting(false);
      return;
    }

    // Test by trying to use Firebase
    try {
      const auth = getAuthInstance();
      
      if (!auth) {
        setError('Firebase Auth is not available. Please check your configuration.');
        setTesting(false);
        return;
      }

      // If we got here, Firebase is configured correctly
      setSuccess(true);
      setTesting(false);
      
      // Auto-complete after 2 seconds
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (e: any) {
      setError(`Firebase initialization error: ${e.message}`);
      setTesting(false);
    }
  };

  const handleManualInput = (field: keyof FirebaseConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#111] text-white flex items-center justify-center font-bold text-xl font-mono mx-auto mb-4 shadow-[4px_4px_0px_#2563EB]">
            PV
          </div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">
            FIREBASE SETUP
          </h1>
          <p className="mt-2 text-[#555]">
            Connect your Firebase project to enable authentication
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-colors ${
                s <= step ? 'bg-[#2563EB]' : 'bg-[#D1D5DB]'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Instructions */}
        {step === 1 && (
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6 animate-fade-in">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] mb-4">
              Step 1: Get Your Firebase Config
            </h2>
            
            <div className="space-y-4 text-sm text-[#555]">
              <p>Follow these steps to get your Firebase configuration:</p>
              
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">1</span>
                  <span>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-semibold hover:underline inline-flex items-center gap-1">Firebase Console <ExternalLink size={12} /></a></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">2</span>
                  <span>Create a new project (or select existing)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">3</span>
                  <span>Go to <strong>Authentication</strong> → <strong>Sign-in method</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">4</span>
                  <span>Enable <strong>Email/Password</strong> and <strong>Google</strong> providers</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">5</span>
                  <span>Go to <strong>Project Settings</strong> → <strong>General</strong> → scroll to <strong>Your apps</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">6</span>
                  <span>Click the web icon <strong>(&lt;/&gt;)</strong> to register a web app</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full">7</span>
                  <span>Copy the <strong>firebaseConfig</strong> object</span>
                </li>
              </ol>

              <div className="mt-4 p-3 bg-[#F7F8FC] border border-[#D1D5DB]">
                <p className="text-xs font-mono text-[#555]">
                  It will look like this:
                </p>
                <pre className="mt-2 text-[10px] font-mono text-[#111] overflow-x-auto">
{`const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc..."
};`}
                </pre>
              </div>

              <div className="p-3 bg-[#DBEAFE] border border-[#2563EB]/20">
                <p className="text-xs text-[#2563EB] font-semibold">
                  🔒 Your Firebase config is PUBLIC by design. It's safe to store in your browser.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
            >
              I HAVE MY CONFIG
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Paste Config */}
        {step === 2 && (
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6 animate-fade-in">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] mb-4">
              Step 2: Paste Your Config
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider mb-1.5">
                  PASTE FIREBASE CONFIG (JSON)
                </label>
                <textarea
                  value={pastedJson}
                  onChange={(e) => { setPastedJson(e.target.value); setError(''); }}
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-[#111] bg-white text-xs font-mono focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                  placeholder={`{
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  ...
}`}
                />
              </div>

              {error && (
                <div className="p-3 border-2 border-[#DC2626] bg-[#FEF2F2]">
                  <p className="text-sm text-[#DC2626] font-semibold">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
                >
                  BACK
                </button>
                <button
                  onClick={handleParseJson}
                  disabled={!pastedJson.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press disabled:opacity-50"
                >
                  PARSE CONFIG
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(3)}
                  className="text-xs font-semibold text-[#555] hover:text-[#111] underline"
                >
                  Or enter values manually
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Manual Input or Review */}
        {step === 3 && (
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6 animate-fade-in">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] mb-4">
              {pastedJson ? 'Review Your Config' : 'Step 3: Enter Values Manually'}
            </h2>

            <div className="space-y-3">
              {(Object.keys(config) as (keyof FirebaseConfig)[]).map(field => (
                <div key={field}>
                  <label className="block text-[10px] font-bold tracking-wider mb-1 font-mono text-[#555]">
                    {field.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    value={config[field]}
                    onChange={(e) => handleManualInput(field, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[#111] bg-white text-xs font-mono focus:outline-none focus:border-[#2563EB] transition-colors"
                    placeholder={field}
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 border-2 border-[#DC2626] bg-[#FEF2F2]">
                <p className="text-sm text-[#DC2626] font-semibold">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 border-2 border-[#16A34A] bg-[#DCFCE7] animate-fade-in">
                <p className="text-sm text-[#16A34A] font-semibold flex items-center gap-2">
                  <Check size={16} />
                  Firebase connected successfully! Redirecting...
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
              >
                BACK
              </button>
              <button
                onClick={handleSaveAndTest}
                disabled={testing || success}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press disabled:opacity-50"
              >
                {testing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    TESTING...
                  </>
                ) : success ? (
                  <>
                    <Check size={14} />
                    CONNECTED!
                  </>
                ) : (
                  <>
                    SAVE & TEST
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#555] font-mono">
          Need help? Check{' '}
          <a
            href="https://firebase.google.com/docs/auth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] hover:underline"
          >
            Firebase Documentation
          </a>
        </p>
      </div>
    </div>
  );
}
