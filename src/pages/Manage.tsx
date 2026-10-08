import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ExternalLink, Download, Upload, Settings } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/projectService';
import { DeleteModal, ImportModal } from '../components/Modals';

export default function Manage() {
  const { projects, remove, exportData, importData } = useProjects();
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [importData_, setImportData_] = useState<{ count: number; data: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-vault-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Projects exported successfully!');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const parsed = JSON.parse(content);
        if (!Array.isArray(parsed)) {
          showToast('Invalid file format.');
          return;
        }
        setImportData_({ count: parsed.length, data: content });
      } catch {
        showToast('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImportConfirm = () => {
    if (importData_) {
      const result = importData(importData_.data);
      if (result.success) {
        showToast(`Imported ${result.count} project${result.count !== 1 ? 's' : ''} successfully!`);
      } else {
        showToast(result.error || 'Import failed.');
      }
      setImportData_(null);
    }
  };

  const handleDelete = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) setDeleteTarget(project);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      remove(deleteTarget.id);
      setDeleteTarget(null);
      showToast('Project deleted.');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight">
            MANAGE YOUR VAULT
          </h1>
          <p className="mt-1 text-sm text-[#555] font-mono">
            {projects.length} project{projects.length !== 1 ? 's' : ''} in vault
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/add"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <Plus size={14} /> ADD PROJECT
          </Link>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <Download size={14} /> EXPORT
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <Upload size={14} /> IMPORT
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-12 text-center">
          <Settings size={32} className="mx-auto text-[#D1D5DB] mb-4" />
          <p className="text-lg font-bold font-['Space_Grotesk']">NO PROJECTS TO MANAGE</p>
          <p className="mt-2 text-sm text-[#555]">Add your first project to get started.</p>
          <Link
            to="/add"
            className="inline-flex items-center gap-2 mt-4 px-5 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111]"
          >
            <Plus size={14} /> ADD PROJECT
          </Link>
        </div>
      ) : (
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#111] bg-[#F7F8FC]">
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest font-mono text-[#555]">#</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest font-mono text-[#555]">PROJECT</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest font-mono text-[#555]">CATEGORY</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest font-mono text-[#555]">STATUS</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest font-mono text-[#555]">UPDATED</th>
                  <th className="px-4 py-3 text-right text-[10px] font-bold tracking-widest font-mono text-[#555]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-b border-[#D1D5DB] last:border-b-0 hover:bg-[#F7F8FC] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#2563EB]">
                      {String(project.projectNumber).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/project/${project.id}`} className="text-sm font-semibold hover:text-[#2563EB] transition-colors">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-[#DBEAFE] text-[#2563EB] text-[10px] font-mono font-bold">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono font-bold ${
                        project.status === 'LIVE' ? 'text-[#16A34A]' :
                        project.status === 'COMPLETED' ? 'text-[#2563EB]' :
                        project.status === 'IN DEVELOPMENT' ? 'text-[#F59E0B]' : 'text-[#555]'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-[#555]">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/edit/${project.id}`}
                          className="p-1.5 hover:bg-[#DBEAFE] transition-colors"
                          aria-label="Edit project"
                        >
                          <Edit size={14} className="text-[#555]" />
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-[#DCFCE7] transition-colors"
                            aria-label="Open live"
                          >
                            <ExternalLink size={14} className="text-[#555]" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 hover:bg-[#FEF2F2] transition-colors"
                          aria-label="Delete project"
                        >
                          <Trash2 size={14} className="text-[#DC2626]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[#D1D5DB]">
            {projects.map(project => (
              <div key={project.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      {String(project.projectNumber).padStart(2, '0')}
                    </span>
                    <Link to={`/project/${project.id}`} className="block text-sm font-semibold mt-1 hover:text-[#2563EB]">
                      {project.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 bg-[#DBEAFE] text-[#2563EB] text-[9px] font-mono font-bold">
                        {project.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${
                        project.status === 'LIVE' ? 'text-[#16A34A]' :
                        project.status === 'COMPLETED' ? 'text-[#2563EB]' :
                        project.status === 'IN DEVELOPMENT' ? 'text-[#F59E0B]' : 'text-[#555]'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/edit/${project.id}`}
                      className="p-2 border border-[#D1D5DB] hover:bg-[#DBEAFE] transition-colors"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 border border-[#D1D5DB] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <Trash2 size={14} className="text-[#DC2626]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      {importData_ && (
        <ImportModal
          count={importData_.count}
          onConfirm={handleImportConfirm}
          onCancel={() => setImportData_(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <div className="px-4 py-3 bg-[#111] text-white text-sm font-semibold border-2 border-[#111] shadow-[3px_3px_0px_#2563EB]">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
