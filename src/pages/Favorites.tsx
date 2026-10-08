import { useState } from 'react';
import { Heart } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';
import { DeleteModal, QRModal } from '../components/Modals';

export default function Favorites() {
  const { projects, toggleFav, toggleFeat, remove } = useProjects();
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const favoriteProjects = projects.filter(p => p.favorite);

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
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Heart size={24} className="text-[#DC2626]" fill="currentColor" />
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
            FAVORITES
          </h1>
          <p className="mt-1 text-sm text-[#555] font-mono">
            {favoriteProjects.length} favorite project{favoriteProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Projects */}
      {favoriteProjects.length === 0 ? (
        <EmptyState
          message="NO FAVORITES YET."
          subMessage="Mark projects as favorites to quickly access them here."
          showAddButton={false}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {favoriteProjects.map(project => (
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
      )}

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
