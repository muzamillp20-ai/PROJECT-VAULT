import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Heart, Star, Copy, Check, MoreHorizontal, Globe, FileText, Share2, QrCode } from 'lucide-react';
import { Project } from '../services/projectService';
import { formatUrl, copyToClipboard, openExternal, shareUrl } from '../utils/urlHelpers';

interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onDelete: (id: string) => void;
  onShowQR: (url: string) => void;
  variant?: 'default' | 'featured' | 'wide';
}

export default function ProjectCard({ project, onToggleFavorite, onToggleFeatured, onDelete, onShowQR, variant = 'default' }: ProjectCardProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleCopy = async (url: string, type: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(type);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const handleShare = () => {
    const url = project.liveUrl || project.githubUrl;
    if (url) {
      shareUrl(url, project.name);
    }
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

  const isFeatured = variant === 'featured';
  const isWide = variant === 'wide';

  return (
    <div
      className={`group relative bg-white border-2 border-[#111] shadow-[4px_4px_0px_#111] card-hover overflow-hidden ${
        isFeatured ? 'lg:col-span-2' : ''
      } ${isWide ? 'lg:col-span-2' : ''}`}
    >
      {/* Image Section */}
      {project.image ? (
        <div className="relative h-40 lg:h-48 overflow-hidden border-b-2 border-[#111] bg-[#F7F8FC]">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center bg-[#F7F8FC]">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-[#D1D5DB]">PV</div>
              <div className="text-xs font-mono text-[#D1D5DB]">PROJECT</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-32 lg:h-36 border-b-2 border-[#111] bg-[#F7F8FC] flex items-center justify-center">
          <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
            <div className="text-3xl font-bold font-mono text-[#111]">PV</div>
            <div className="text-xs font-mono text-[#111] tracking-wider">PROJECT</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 lg:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-xs font-bold text-[#2563EB]">
            {String(project.projectNumber).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(project.id)}
              className={`p-1.5 transition-colors ${project.favorite ? 'text-[#DC2626]' : 'text-[#D1D5DB] hover:text-[#DC2626]'}`}
              aria-label={project.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={project.favorite ? 'currentColor' : 'none'} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 text-[#D1D5DB] hover:text-[#111] transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal size={16} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white border-2 border-[#111] shadow-[3px_3px_0px_#111] z-20 min-w-[140px] animate-scale-in">
                  <button
                    onClick={() => { onToggleFeatured(project.id); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold hover:bg-[#F7F8FC] text-left"
                  >
                    <Star size={12} /> {project.featured ? 'UNFEATURE' : 'FEATURE'}
                  </button>
                  {project.liveUrl && (
                    <button
                      onClick={() => { onShowQR(project.liveUrl); setShowMenu(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold hover:bg-[#F7F8FC] text-left"
                    >
                      <QrCode size={12} /> QR CODE
                    </button>
                  )}
                  <button
                    onClick={() => { handleShare(); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold hover:bg-[#F7F8FC] text-left"
                  >
                    <Share2 size={12} /> SHARE
                  </button>
                  <button
                    onClick={() => { onDelete(project.id); setShowMenu(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] text-left"
                  >
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <Link to={`/project/${project.id}`} className="block">
          <h3 className="text-lg lg:text-xl font-bold font-['Space_Grotesk'] tracking-tight hover:text-[#2563EB] transition-colors">
            {project.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-sm text-[#555] line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-[#DBEAFE] text-[#2563EB] text-[10px] font-mono font-bold tracking-wider border border-[#2563EB]/20">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Technologies */}
        <div className="mt-3 text-xs font-mono text-[#555]">
          {project.technologies.slice(0, 4).join(' • ')}
        </div>

        {/* URL Preview */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-3 pt-3 border-t border-[#D1D5DB] space-y-1.5">
            {project.liveUrl && (
              <div className="flex items-center gap-2">
                <Globe size={10} className="text-[#16A34A] shrink-0" />
                <span className="text-[10px] font-mono text-[#555] truncate flex-1">
                  {formatUrl(project.liveUrl)}
                </span>
                <button
                  onClick={() => handleCopy(project.liveUrl, 'live')}
                  className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline shrink-0"
                >
                  {copiedUrl === 'live' ? <Check size={10} /> : 'COPY'}
                </button>
              </div>
            )}
            {project.githubUrl && (
              <div className="flex items-center gap-2">
                <Github size={10} className="text-[#111] shrink-0" />
                <span className="text-[10px] font-mono text-[#555] truncate flex-1">
                  {formatUrl(project.githubUrl)}
                </span>
                <button
                  onClick={() => handleCopy(project.githubUrl, 'github')}
                  className="text-[10px] font-mono font-bold text-[#2563EB] hover:underline shrink-0"
                >
                  {copiedUrl === 'github' ? <Check size={10} /> : 'COPY'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status */}
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${statusDot}`}></div>
          <span className={`text-xs font-mono font-bold ${statusColor}`}>
            {project.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
            >
              OPEN LIVE
              <ExternalLink size={12} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
            >
              VIEW CODE
              <Github size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
