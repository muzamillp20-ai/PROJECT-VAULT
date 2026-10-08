import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ProjectForm from '../components/ProjectForm';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';

export default function AddProject() {
  const navigate = useNavigate();
  const { add } = useProjects();

  const handleSubmit = (data: Partial<Project>) => {
    add(data);
    navigate('/projects');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#2563EB] text-white flex items-center justify-center border-2 border-[#111] shadow-[3px_3px_0px_#111]">
          <Plus size={20} />
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
            ADD PROJECT
          </h1>
          <p className="mt-1 text-sm text-[#555] font-mono">
            Add a new project to your vault
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/projects')}
      />
    </div>
  );
}
