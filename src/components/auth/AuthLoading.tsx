export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#111] text-white flex items-center justify-center font-bold text-xl font-mono mx-auto mb-6 shadow-[4px_4px_0px_#2563EB]">
          PV
        </div>
        
        {/* Loading text */}
        <h1 className="text-lg font-bold font-['Space_Grotesk'] tracking-tight">
          CHECKING YOUR VAULT...
        </h1>
        
        {/* Spinner */}
        <div className="mt-6 flex justify-center">
          <div className="w-6 h-6 border-2 border-[#D1D5DB] border-t-[#2563EB] rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
