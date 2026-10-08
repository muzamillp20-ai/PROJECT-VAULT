import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { Code, Globe, Shield, Trophy, GraduationCap, Smartphone, Wrench, FolderOpen } from 'lucide-react';

const categoryConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
  WEB: { icon: Globe, color: 'text-[#2563EB]', bgColor: 'bg-[#DBEAFE]' },
  AI: { icon: Code, color: 'text-[#7C3AED]', bgColor: 'bg-[#EDE9FE]' },
  CYBERSECURITY: { icon: Shield, color: 'text-[#DC2626]', bgColor: 'bg-[#FEF2F2]' },
  HACKATHON: { icon: Trophy, color: 'text-[#F59E0B]', bgColor: 'bg-[#FEF3C7]' },
  COLLEGE: { icon: GraduationCap, color: 'text-[#16A34A]', bgColor: 'bg-[#DCFCE7]' },
  MOBILE: { icon: Smartphone, color: 'text-[#2563EB]', bgColor: 'bg-[#DBEAFE]' },
  TOOLS: { icon: Wrench, color: 'text-[#555]', bgColor: 'bg-[#F7F8FC]' },
  OTHER: { icon: FolderOpen, color: 'text-[#555]', bgColor: 'bg-[#F7F8FC]' },
};

export default function Categories() {
  const { projects, categories } = useProjects();
  
  const allCategories = ['WEB', 'AI', 'CYBERSECURITY', 'HACKATHON', 'COLLEGE', 'MOBILE', 'TOOLS', 'OTHER'];

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          CATEGORIES
        </h1>
        <p className="mt-2 text-sm text-[#555] font-mono">
          Browse projects by category
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allCategories.map(cat => {
          const config = categoryConfig[cat] || categoryConfig.OTHER;
          const Icon = config.icon;
          const count = categories[cat] || 0;
          const categoryProjects = projects.filter(p => p.category === cat);

          return (
            <div
              key={cat}
              className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5 card-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${config.bgColor} border border-[#111]/10 flex items-center justify-center`}>
                  <Icon size={20} className={config.color} />
                </div>
                <span className="text-2xl font-bold font-['Space_Grotesk'] text-[#111]">
                  {String(count).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-sm font-bold tracking-wider">{cat}</h3>
              <p className="mt-1 text-xs text-[#555] font-mono">
                {count} project{count !== 1 ? 's' : ''}
              </p>
              
              {/* Show first few projects */}
              {categoryProjects.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#D1D5DB] space-y-1.5">
                  {categoryProjects.slice(0, 3).map(p => (
                    <Link
                      key={p.id}
                      to={`/project/${p.id}`}
                      className="flex items-center gap-2 text-xs text-[#555] hover:text-[#2563EB] transition-colors"
                    >
                      <span className="font-mono font-bold text-[#2563EB]">
                        {String(p.projectNumber).padStart(2, '0')}
                      </span>
                      <span className="truncate">{p.name}</span>
                    </Link>
                  ))}
                  {categoryProjects.length > 3 && (
                    <Link
                      to={`/projects?category=${cat}`}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      +{categoryProjects.length - 3} more
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
