import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
import ProjectForm from '../components/ProjectForm';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, update } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const p = getById(id);
      if (p) setProject(p);
      else navigate('/projects');
    }
  }, [id, getById, navigate]);

  if (!project) return null;

  const handleSubmit = (data: Partial<Project>) => {
    update(project.id, data);
    setToast('Project updated successfully.');
    setTimeout(() => {
      navigate(`/project/${project.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#7C3AED] text-white flex items-center justify-center border-2 border-[#111] shadow-[3px_3px_0px_#111]">
          <Edit size={20} />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
            EDIT PROJECT
          </h1>
          <p className="mt-1 text-sm text-[#555] font-mono">
            Editing: {project.name}
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/project/${project.id}`)}
        isEdit
      />

      {/* Toast */}
      {toast && (
        <div className="toast">
          <div className="px-4 py-3 bg-[#16A34A] text-white text-sm font-semibold border-2 border-[#111] shadow-[3px_3px_0px_#111]">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
