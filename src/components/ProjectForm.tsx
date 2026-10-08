import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Project, checkDuplicateGithubUrl } from '../services/projectService';
import { validateProjectForm } from '../utils/validation';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Partial<Project>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const categories = ['WEB', 'AI', 'CYBERSECURITY', 'HACKATHON', 'COLLEGE', 'MOBILE', 'TOOLS', 'OTHER'];
const types = ['WEB APP', 'MOBILE APP', 'AI / ML', 'CYBERSECURITY', 'HACKATHON', 'COLLEGE', 'STREAMLIT', 'DESKTOP', 'UTILITY', 'OTHER'];
const statuses = ['LIVE', 'COMPLETED', 'IN DEVELOPMENT', 'ARCHIVED'];

export default function ProjectForm({ initialData, onSubmit, onCancel, isEdit = false }: ProjectFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    githubUrl: initialData?.githubUrl || '',
    liveUrl: initialData?.liveUrl || '',
    documentationUrl: initialData?.documentationUrl || '',
    image: initialData?.image || '',
    icon: initialData?.icon || '',
    category: initialData?.category || 'WEB',
    type: initialData?.type || 'WEB APP',
    status: initialData?.status || 'IN DEVELOPMENT',
    tags: initialData?.tags || [] as string[],
    technologies: initialData?.technologies || [] as string[],
    featured: initialData?.featured || false,
    favorite: initialData?.favorite || false,
    features: initialData?.features || [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [showDuplicateConfirm, setShowDuplicateConfirm] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toUpperCase();
    if (tag && !formData.tags.includes(tag)) {
      handleChange('tags', [...formData.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    handleChange('tags', formData.tags.filter(t => t !== tag));
  };

  const addTech = () => {
    const tech = techInput.trim();
    if (tech && !formData.technologies.includes(tech)) {
      handleChange('technologies', [...formData.technologies, tech]);
    }
    setTechInput('');
  };

  const removeTech = (tech: string) => {
    handleChange('technologies', formData.technologies.filter(t => t !== tech));
  };

  const addFeature = () => {
    const feature = featureInput.trim();
    if (feature && !formData.features.includes(feature)) {
      handleChange('features', [...formData.features, feature]);
    }
    setFeatureInput('');
  };

  const removeFeature = (feature: string) => {
    handleChange('features', formData.features.filter(f => f !== feature));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProjectForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Check for duplicate GitHub URL
    if (formData.githubUrl && !isEdit) {
      const isDuplicate = checkDuplicateGithubUrl(formData.githubUrl, initialData?.id);
      if (isDuplicate && !showDuplicateConfirm) {
        setDuplicateWarning(true);
        setShowDuplicateConfirm(true);
        return;
      }
    }

    onSubmit(formData);
  };

  const handleConfirmDuplicate = () => {
    setShowDuplicateConfirm(false);
    setDuplicateWarning(false);
    const validation = validateProjectForm(formData);
    if (validation.valid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h3 className="text-sm font-bold tracking-wider font-mono">BASIC INFORMATION</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">PROJECT NAME *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${errors.name ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm font-semibold focus:outline-none focus:border-[#2563EB] transition-colors`}
                placeholder="My Awesome Project"
              />
              {errors.name && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">SHORT DESCRIPTION</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#111] bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors"
                placeholder="A brief one-liner about your project"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">FULL DESCRIPTION</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => handleChange('fullDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-[#111] bg-white text-sm focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                placeholder="Detailed description of your project..."
              />
            </div>
          </div>
        </div>

        {/* URLs */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h3 className="text-sm font-bold tracking-wider font-mono">LINKS & URLS</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">GITHUB URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${errors.githubUrl ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors`}
                placeholder="https://github.com/user/repo"
              />
              {errors.githubUrl && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.githubUrl}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">LIVE URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleChange('liveUrl', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${errors.liveUrl ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors`}
                placeholder="https://my-project.com"
              />
              {errors.liveUrl && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.liveUrl}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">DOCUMENTATION URL</label>
              <input
                type="url"
                value={formData.documentationUrl}
                onChange={(e) => handleChange('documentationUrl', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${errors.documentationUrl ? 'border-[#DC2626]' : 'border-[#111]'} bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors`}
                placeholder="https://docs.my-project.com"
              />
              {errors.documentationUrl && <p className="mt-1 text-xs text-[#DC2626] font-mono">{errors.documentationUrl}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">IMAGE URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#111] bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors"
                placeholder="https://example.com/screenshot.png"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h3 className="text-sm font-bold tracking-wider font-mono">CLASSIFICATION</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-wider mb-1.5">CATEGORY</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#111] bg-white text-sm font-semibold focus:outline-none focus:border-[#2563EB] transition-colors"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider mb-1.5">TYPE</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#111] bg-white text-sm font-semibold focus:outline-none focus:border-[#2563EB] transition-colors"
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">STATUS</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleChange('status', s)}
                    className={`px-3 py-1.5 text-xs font-bold tracking-wider border-2 border-[#111] transition-all ${
                      formData.status === s ? 'bg-[#2563EB] text-white' : 'bg-white text-[#555] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-4 h-4 border-2 border-[#111] accent-[#2563EB]"
                />
                <span className="text-xs font-bold tracking-wider">FEATURED</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.favorite}
                  onChange={(e) => handleChange('favorite', e.target.checked)}
                  className="w-4 h-4 border-2 border-[#111] accent-[#DC2626]"
                />
                <span className="text-xs font-bold tracking-wider">FAVORITE</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tags & Technologies */}
        <div className="border-2 border-[#111] bg-white shadow-[4px_4px_0px_#111]">
          <div className="px-5 py-3 border-b-2 border-[#111] bg-[#F7F8FC]">
            <h3 className="text-sm font-bold tracking-wider font-mono">TAGS & TECHNOLOGIES</h3>
          </div>
          <div className="p-5 space-y-4">
            {/* Tags */}
            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">TAGS</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  className="flex-1 px-4 py-2 border-2 border-[#111] bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors"
                  placeholder="Add tag..."
                />
                <button type="button" onClick={addTag} className="px-3 py-2 border-2 border-[#111] bg-[#F7F8FC] hover:bg-[#DBEAFE] transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#DBEAFE] text-[#2563EB] text-[10px] font-mono font-bold border border-[#2563EB]/20">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-[#DC2626]"><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">TECHNOLOGIES</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                  className="flex-1 px-4 py-2 border-2 border-[#111] bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors"
                  placeholder="Add technology..."
                />
                <button type="button" onClick={addTech} className="px-3 py-2 border-2 border-[#111] bg-[#F7F8FC] hover:bg-[#DBEAFE] transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.technologies.map(tech => (
                  <span key={tech} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EDE9FE] text-[#7C3AED] text-[10px] font-mono font-bold border border-[#7C3AED]/20">
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)} className="hover:text-[#DC2626]"><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-bold tracking-wider mb-1.5">FEATURES</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                  className="flex-1 px-4 py-2 border-2 border-[#111] bg-white text-sm font-mono focus:outline-none focus:border-[#2563EB] transition-colors"
                  placeholder="Add feature..."
                />
                <button type="button" onClick={addFeature} className="px-3 py-2 border-2 border-[#111] bg-[#F7F8FC] hover:bg-[#DBEAFE] transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.features.map(feature => (
                  <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F7F8FC] text-[#555] text-[10px] font-mono font-bold border border-[#D1D5DB]">
                    {feature}
                    <button type="button" onClick={() => removeFeature(feature)} className="hover:text-[#DC2626]"><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Duplicate Warning */}
        {duplicateWarning && (
          <div className="border-2 border-[#F59E0B] bg-[#FFFBEB] p-4 animate-fade-in">
            <p className="text-sm font-semibold text-[#92400E]">
              ⚠ This project may already exist in your vault (same GitHub URL detected).
            </p>
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={handleConfirmDuplicate}
                className="px-4 py-2 text-xs font-bold bg-[#F59E0B] text-white border-2 border-[#111]"
              >
                ADD ANYWAY
              </button>
              <button
                type="button"
                onClick={() => { setDuplicateWarning(false); setShowDuplicateConfirm(false); }}
                className="px-4 py-2 text-xs font-bold bg-white text-[#111] border-2 border-[#111]"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <Save size={16} />
            {isEdit ? 'SAVE CHANGES' : 'SAVE PROJECT'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#111] text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
          >
            <X size={16} />
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
