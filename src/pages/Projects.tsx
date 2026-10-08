import { useState, useMemo } from 'react';
import SearchFilter from '../components/SearchFilter';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';
import { DeleteModal, QRModal } from '../components/Modals';

export default function Projects() {
  const { projects, toggleFav, toggleFeat, remove } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.fullDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.technologies.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.githubUrl.toLowerCase().includes(q) ||
        p.liveUrl.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'ALL') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Status filter
    if (activeStatus !== 'ALL') {
      result = result.filter(p => p.status === activeStatus);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'updated':
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'favorites':
        result.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [projects, searchQuery, activeCategory, activeStatus, sortBy]);

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

  // Determine card layout for editorial grid
  const getVariant = (index: number): 'default' | 'featured' | 'wide' => {
    if (filteredProjects.length <= 1) return 'default';
    if (index === 0 && filteredProjects.length > 2) return 'featured';
    if (index === 3 && filteredProjects.length > 4) return 'wide';
    return 'default';
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
          ALL PROJECTS
        </h1>
        <p className="mt-2 text-sm text-[#555] font-mono">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          message="NO PROJECTS FOUND."
          subMessage="Try another search or filter."
          showAddButton={false}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleFavorite={toggleFav}
              onToggleFeatured={toggleFeat}
              onDelete={handleDelete}
              onShowQR={setQrUrl}
              variant={getVariant(index)}
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
