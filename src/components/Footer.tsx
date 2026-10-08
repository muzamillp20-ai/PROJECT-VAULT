import { Link } from 'react-router-dom';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F7F8FC] border-t-2 border-[#111] mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#111] text-white flex items-center justify-center font-bold text-xs font-mono">
              PV
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight font-['Space_Grotesk']">PROJECT VAULT</div>
              <div className="text-[10px] text-[#555] font-mono">ALL MY PROJECTS. ONE PLACE.</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/projects" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
              PROJECTS
            </Link>
            <Link to="/manage" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
              MANAGE
            </Link>
            <Link to="/add" className="text-xs font-semibold text-[#555] hover:text-[#111] transition-colors">
              ADD
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#555]">
            <span>Built with</span>
            <Heart size={12} className="text-[#DC2626]" fill="currentColor" />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#D1D5DB] text-center">
          <p className="text-[10px] font-mono text-[#555] tracking-wider">
            © {new Date().getFullYear()} PROJECT VAULT — PERSONAL PROJECT ARCHIVE
          </p>
        </div>
      </div>
    </footer>
  );
}
