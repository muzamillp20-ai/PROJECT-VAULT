import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Github, FileText, Heart, Star, Edit, Trash2, Globe, Copy, Check, Share2, QrCode } from 'lucide-react';
import { Project } from '../services/projectService';
import { useProjects } from '../hooks/useProjects';
import { formatUrl, copyToClipboard, openExternal, shareUrl } from '../utils/urlHelpers';
import { DeleteModal, QRModal } from '../components/Modals';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, toggleFav, toggleFeat, remove } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const p = getById(id);
      if (p) setProject(p);
      else navigate('/projects');
    }
  }, [id, getById, navigate]);

  if (!project) return null;

  const handleCopy = async (url: string, field: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleDelete = () => {
    remove(project.id);
    navigate('/projects');
  };

  const statusColor = {
    'LIVE': 'text-[#16A34A]',
    'COMPLETED': 'text-[#2563EB]',
    'IN DEVELOPMENT': 'text-[#F59E0B]',
    'ARCHIVED': 'text-[#555]',
  }[project.status] || 'text-[#555]';

  const statusDot = {
    'LIVE': 'bg-[#16A34A]',
    'COMPLETED': 'bg-[#2563EB]',
    'IN DEVELOPMENT': 'bg-[#F59E0B]',
    'ARCHIVED': 'bg-[#555]',
  }[project.status] || 'bg-[#555]';

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Back */}
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#555] hover:text-[#111] mb-6 transition-colors">
        <ArrowLeft size={16} />
        BACK TO PROJECTS
      </Link>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6 lg:p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-[#2563EB]">
                  {String(project.projectNumber).padStart(2, '0')}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] tracking-tight mt-2">
                  {project.name}
                </h1>
                <p className="mt-3 text-[#555] leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFav(project.id)}
                  className={`p-2 border-2 border-[#111] transition-colors ${project.favorite ? 'bg-[#DC2626] text-white' : 'bg-white hover:bg-[#FEF2F2]'}`}
                  aria-label="Toggle favorite"
                >
                  <Heart size={16} fill={project.favorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => toggleFeat(project.id)}
                  className={`p-2 border-2 border-[#111] transition-colors ${project.featured ? 'bg-[#F59E0B] text-white' : 'bg-white hover:bg-[#FFFBEB]'}`}
                  aria-label="Toggle featured"
                >
                  <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mt-4">
              <div className={`w-2.5 h-2.5 rounded-full ${statusDot}`}></div>
              <span className={`text-sm font-mono font-bold ${statusColor}`}>{project.status}</span>
              <span className="text-xs text-[#555] font-mono ml-2">{project.category} • {project.type}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
                >
                  OPEN LIVE <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
                >
                  VIEW CODE <Github size={14} />
                </a>
              )}
              {project.documentationUrl && (
                <a
                  href={project.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
                >
                  DOCUMENTATION <FileText size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Image */}
          {project.image && (
            <div className="border-2 border-[#111] shadow-[4px_4px_0px_#111] overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-64 lg:h-80 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
              />
            </div>
          )}

          {/* About */}
          {project.fullDescription && (
            <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6">
              <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">ABOUT</h2>
              <p className="text-[#555] leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
            </div>
          )}

          {/* Features */}
          {project.features.length > 0 && (
            <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-6">
              <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">FEATURES</h2>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#555]">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5">
              <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">TECHNOLOGY</h2>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-[#EDE9FE] text-[#7C3AED] text-xs font-mono font-bold border border-[#7C3AED]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5">
              <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">TAGS</h2>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-[#DBEAFE] text-[#2563EB] text-xs font-mono font-bold border border-[#2563EB]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5">
            <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">LINKS</h2>
            <div className="space-y-3">
              {project.liveUrl && (
                <div className="flex items-center gap-2 p-2 bg-[#F7F8FC] border border-[#D1D5DB]">
                  <Globe size={12} className="text-[#16A34A] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono font-bold text-[#555]">LIVE</div>
                    <div className="text-xs font-mono text-[#111] truncate">{formatUrl(project.liveUrl)}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(project.liveUrl, 'live')}
                    className="p-1.5 hover:bg-[#DBEAFE] transition-colors shrink-0"
                    aria-label="Copy live URL"
                  >
                    {copiedField === 'live' ? <Check size={12} className="text-[#16A34A]" /> : <Copy size={12} />}
                  </button>
                </div>
              )}
              {project.githubUrl && (
                <div className="flex items-center gap-2 p-2 bg-[#F7F8FC] border border-[#D1D5DB]">
                  <Github size={12} className="text-[#111] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono font-bold text-[#555]">GITHUB</div>
                    <div className="text-xs font-mono text-[#111] truncate">{formatUrl(project.githubUrl)}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(project.githubUrl, 'github')}
                    className="p-1.5 hover:bg-[#DBEAFE] transition-colors shrink-0"
                    aria-label="Copy GitHub URL"
                  >
                    {copiedField === 'github' ? <Check size={12} className="text-[#16A34A]" /> : <Copy size={12} />}
                  </button>
                </div>
              )}
              {project.documentationUrl && (
                <div className="flex items-center gap-2 p-2 bg-[#F7F8FC] border border-[#D1D5DB]">
                  <FileText size={12} className="text-[#7C3AED] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono font-bold text-[#555]">DOCS</div>
                    <div className="text-xs font-mono text-[#111] truncate">{formatUrl(project.documentationUrl)}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(project.documentationUrl, 'docs')}
                    className="p-1.5 hover:bg-[#DBEAFE] transition-colors shrink-0"
                    aria-label="Copy documentation URL"
                  >
                    {copiedField === 'docs' ? <Check size={12} className="text-[#16A34A]" /> : <Copy size={12} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111] p-5 space-y-2">
            <Link
              to={`/edit/${project.id}`}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold tracking-wider border-2 border-[#111] bg-white hover:bg-[#F7F8FC] transition-colors"
            >
              <Edit size={14} /> EDIT PROJECT
            </Link>
            {project.liveUrl && (
              <button
                onClick={() => setQrUrl(project.liveUrl)}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold tracking-wider border-2 border-[#111] bg-white hover:bg-[#F7F8FC] transition-colors"
              >
                <QrCode size={14} /> QR CODE
              </button>
            )}
            <button
              onClick={() => {
                const url = project.liveUrl || project.githubUrl;
                if (url) shareUrl(url, project.name);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold tracking-wider border-2 border-[#111] bg-white hover:bg-[#F7F8FC] transition-colors"
            >
              <Share2 size={14} /> SHARE
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-bold tracking-wider text-[#DC2626] border-2 border-[#DC2626] bg-white hover:bg-[#FEF2F2] transition-colors"
            >
              <Trash2 size={14} /> DELETE PROJECT
            </button>
          </div>

          {/* Metadata */}
          <div className="border-2 border-[#111] bg-[#F7F8FC] p-5">
            <h2 className="text-xs font-bold tracking-widest font-mono text-[#555] mb-3">METADATA</h2>
            <div className="space-y-2 text-xs font-mono text-[#555]">
              <div className="flex justify-between">
                <span>Created</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated</span>
                <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ID</span>
                <span className="truncate ml-2">{project.id.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDelete && (
        <DeleteModal
          projectName={project.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      {qrUrl && (
        <QRModal url={qrUrl} projectName={project.name} onClose={() => setQrUrl(null)} />
      )}
    </div>
  );
}
