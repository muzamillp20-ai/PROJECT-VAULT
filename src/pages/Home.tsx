import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';
import { DeleteModal, QRModal } from '../components/Modals';

export default function Home() {
  const {
    projects, totalProjects, liveProjects, githubRepos, favorites,
    featuredProject, toggleFav, toggleFeat, remove, techStats, categories, statusCounts
  } = useProjects();

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const topTechs = Object.entries(techStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const handleDelete = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) setDeleteTarget(project);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      remove(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Stats */}
      <Stats
        totalProjects={totalProjects}
        liveProjects={liveProjects}
        githubRepos={githubRepos}
        favorites={favorites}
      />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured Project */}
            {featuredProject && (
              <section className="mb-12 lg:mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <Star size={18} className="text-[#F59E0B]" fill="currentColor" />
                  <h2 className="text-xs font-bold tracking-widest font-mono text-[#555]">FEATURED PROJECT</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-0 border-2 border-[#111] shadow-[6px_6px_0px_#111] bg-white overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 lg:h-auto min-h-[240px] border-b-2 lg:border-b-0 lg:border-r-2 border-[#111] bg-[#F7F8FC]">
                    {featuredProject.image ? (
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center opacity-20">
                          <div className="text-5xl font-bold font-mono">PV</div>
                          <div className="text-sm font-mono tracking-wider">FEATURED</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      {String(featuredProject.projectNumber).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] tracking-tight mt-2">
                      {featuredProject.name}
                    </h3>
                    <p className="mt-3 text-[#555] leading-relaxed">
                      {featuredProject.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {featuredProject.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#DBEAFE] text-[#2563EB] text-[10px] font-mono font-bold tracking-wider">
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-xs font-mono text-[#555]">
                      {featuredProject.technologies.join(' • ')}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className={`w-2 h-2 rounded-full ${
                        featuredProject.status === 'LIVE' ? 'bg-[#16A34A]' :
                        featuredProject.status === 'COMPLETED' ? 'bg-[#2563EB]' :
                        featuredProject.status === 'IN DEVELOPMENT' ? 'bg-[#F59E0B]' : 'bg-[#555]'
                      }`}></div>
                      <span className="text-xs font-mono font-bold">{featuredProject.status}</span>
                    </div>
                    <div className="flex gap-3 mt-6">
                      {featuredProject.liveUrl && (
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
                        >
                          OPEN LIVE <ExternalLink size={14} />
                        </a>
                      )}
                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
                        >
                          VIEW CODE <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Recently Added */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold tracking-widest font-mono text-[#555]">RECENTLY ADDED</h2>
                <Link to="/projects" className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline">
                  VIEW ALL <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onToggleFavorite={toggleFav}
                    onToggleFeatured={toggleFeat}
                    onDelete={handleDelete}
                    onShowQR={setQrUrl}
                  />
                ))}
              </div>
            </section>

            {/* Dashboard Stats */}
            <section className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-6">
              {/* Most Used Technologies */}
              <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5">
                <h3 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-4">MOST USED TECHNOLOGIES</h3>
                {topTechs.length > 0 ? (
                  <div className="space-y-2.5">
                    {topTechs.map(([tech, count]) => (
                      <div key={tech} className="flex items-center gap-3">
                        <span className="text-sm font-semibold w-28 truncate">{tech}</span>
                        <div className="flex-1 h-3 bg-[#F7F8FC] border border-[#D1D5DB] relative overflow-hidden">
                          <div
                            className="h-full bg-[#2563EB] transition-all"
                            style={{ width: `${(count / (topTechs[0]?.[1] || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#555] w-6 text-right">
                          {String(count).padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#555]">No technologies recorded yet.</p>
                )}
              </div>

              {/* Categories */}
              <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5">
                <h3 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-4">CATEGORIES</h3>
                {Object.keys(categories).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categories).map(([cat, count]) => (
                      <div key={cat} className="flex items-center justify-between px-3 py-2 bg-[#F7F8FC] border border-[#D1D5DB]">
                        <span className="text-xs font-bold tracking-wider">{cat}</span>
                        <span className="text-xs font-mono font-bold text-[#2563EB]">{String(count).padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#555]">No categories yet.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Modals */}
      {deleteTarget && (
        <DeleteModal
          projectName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {qrUrl && (
        <QRModal url={qrUrl} onClose={() => setQrUrl(null)} />
      )}
    </div>
  );
}
