import { FolderOpen, Globe, Github, Heart } from 'lucide-react';

interface StatsProps {
  totalProjects: number;
  liveProjects: number;
  githubRepos: number;
  favorites: number;
}

export default function Stats({ totalProjects, liveProjects, githubRepos, favorites }: StatsProps) {
  const stats = [
    { label: 'TOTAL PROJECTS', value: totalProjects, icon: FolderOpen, color: 'bg-[#DBEAFE]' },
    { label: 'LIVE PROJECTS', value: liveProjects, icon: Globe, color: 'bg-[#DCFCE7]' },
    { label: 'GITHUB REPOS', value: githubRepos, icon: Github, color: 'bg-[#F3E8FF]' },
    { label: 'FAVORITES', value: favorites, icon: Heart, color: 'bg-[#FEF3C7]' },
  ];

  return (
    <section className="bg-[#F7F8FC] border-y-2 border-[#111]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.color} border-2 border-[#111] p-4 lg:p-6 shadow-[3px_3px_0px_#111]`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-[#555]" />
                  <span className="text-[10px] lg:text-xs font-bold tracking-wider text-[#555] font-mono">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
                  {String(stat.value).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
