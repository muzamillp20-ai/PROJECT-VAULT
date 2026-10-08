import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-white grid-pattern overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[#111] bg-[#F7F8FC] text-xs font-mono font-semibold tracking-wider mb-6">
              <span className="text-[#2563EB]">✦</span>
              PERSONAL PROJECT ARCHIVE
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9] font-['Space_Grotesk']">
              EVERY PROJECT.
              <br />
              <span className="inline-block bg-[#2563EB] text-white px-3 lg:px-4 mt-2">
                ONE PLACE.
              </span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-[#555] max-w-lg leading-relaxed">
              Store, organize and instantly launch every project you've built.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#2563EB] hover:shadow-[6px_6px_0px_#2563EB] hover:-translate-y-0.5 transition-all btn-press"
              >
                EXPLORE PROJECTS
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/add"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#111] text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
              >
                <Plus size={16} />
                ADD PROJECT
              </Link>
            </div>
          </div>

          {/* Decorative Side */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="space-y-3">
              {['PROJECTS', 'LINKS', 'IDEAS', 'BUILDS'].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-3 border-2 border-[#111] ${
                    i % 2 === 0 ? 'bg-[#DBEAFE] ml-0' : 'bg-[#EDE9FE] ml-8'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="font-mono text-xs font-bold tracking-wider">{label}</span>
                  <span className="font-mono text-xs text-[#555]">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
