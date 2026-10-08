import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-8 lg:p-12 border-r-2 border-[#111] bg-[#F7F8FC] grid-pattern relative overflow-hidden">
        {/* Top branding */}
        <div>
          <Link to="/login" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#111] text-white flex items-center justify-center font-bold text-sm font-mono group-hover:bg-[#2563EB] transition-colors shadow-[3px_3px_0px_#2563EB]">
              PV
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight font-['Space_Grotesk']">PROJECT VAULT</div>
              <div className="text-[10px] text-[#555] tracking-wider font-mono">ALL MY PROJECTS. ONE PLACE.</div>
            </div>
          </Link>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <h1 className="text-4xl xl:text-5xl font-bold font-['Space_Grotesk'] tracking-tight leading-[0.95]">
            YOUR PROJECTS.
            <br />
            <span className="inline-block bg-[#2563EB] text-white px-3 mt-2">YOUR VAULT.</span>
          </h1>
          
          <p className="mt-6 text-[#555] text-lg max-w-md leading-relaxed">
            Store, organize and instantly launch every project you've built.
          </p>

          {/* Visual panel */}
          <div className="mt-10 space-y-2">
            {[
              { label: 'YOUR VAULT', value: '∞' },
              { label: 'YOUR LINKS', value: '↗' },
              { label: 'YOUR BUILDS', value: '⌘' },
              { label: 'YOUR WORK', value: '✦' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-4 py-3 border-2 border-[#111] ${
                  i % 2 === 0 ? 'bg-white ml-0' : 'bg-[#EDE9FE] ml-8'
                }`}
              >
                <span className="text-xs font-bold tracking-wider font-mono">{item.label}</span>
                <span className="text-lg font-bold font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-[10px] font-mono text-[#555] tracking-wider">
          © {new Date().getFullYear()} PROJECT VAULT
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link to="/login" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111] text-white flex items-center justify-center font-bold text-sm font-mono shadow-[3px_3px_0px_#2563EB]">
              PV
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight font-['Space_Grotesk']">PROJECT VAULT</div>
              <div className="text-[10px] text-[#555] tracking-wider font-mono">ALL MY PROJECTS. ONE PLACE.</div>
            </div>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
