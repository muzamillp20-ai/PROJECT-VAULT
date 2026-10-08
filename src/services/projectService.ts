import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  projectNumber: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  githubUrl: string;
  liveUrl: string;
  documentationUrl: string;
  image: string;
  icon: string;
  category: string;
  type: string;
  tags: string[];
  technologies: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  favorite: boolean;
  features: string[];
}

const STORAGE_KEY = 'project-vault-data';

function generateProjectNumber(projects: Project[]): number {
  if (projects.length === 0) return 1;
  return Math.max(...projects.map(p => p.projectNumber)) + 1;
}

function getStoredProjects(): Project[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function getProjects(): Project[] {
  return getStoredProjects();
}

export function getProjectById(id: string): Project | undefined {
  const projects = getStoredProjects();
  return projects.find(p => p.id === id);
}

export function addProject(projectData: Partial<Project>): Project {
  const projects = getStoredProjects();
  const now = new Date().toISOString();
  const newProject: Project = {
    id: uuidv4(),
    projectNumber: generateProjectNumber(projects),
    name: projectData.name || '',
    shortDescription: projectData.shortDescription || '',
    fullDescription: projectData.fullDescription || '',
    githubUrl: projectData.githubUrl || '',
    liveUrl: projectData.liveUrl || '',
    documentationUrl: projectData.documentationUrl || '',
    image: projectData.image || '',
    icon: projectData.icon || '',
    category: projectData.category || 'OTHER',
    type: projectData.type || 'OTHER',
    tags: projectData.tags || [],
    technologies: projectData.technologies || [],
    status: projectData.status || 'IN DEVELOPMENT',
    createdAt: now,
    updatedAt: now,
    featured: projectData.featured || false,
    favorite: projectData.favorite || false,
    features: projectData.features || [],
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, projectData: Partial<Project>): Project | null {
  const projects = getStoredProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  projects[index] = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getStoredProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  // Re-number projects
  filtered.forEach((p, i) => {
    p.projectNumber = i + 1;
  });
  saveProjects(filtered);
  return true;
}

export function toggleFavorite(id: string): Project | null {
  const projects = getStoredProjects();
  const project = projects.find(p => p.id === id);
  if (!project) return null;
  project.favorite = !project.favorite;
  project.updatedAt = new Date().toISOString();
  saveProjects(projects);
  return project;
}

export function toggleFeatured(id: string): Project | null {
  const projects = getStoredProjects();
  // Unset all other featured
  projects.forEach(p => { p.featured = false; });
  const project = projects.find(p => p.id === id);
  if (!project) return null;
  project.featured = true;
  project.updatedAt = new Date().toISOString();
  saveProjects(projects);
  return project;
}

export function clearProjects(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportProjects(): string {
  const projects = getStoredProjects();
  return JSON.stringify(projects, null, 2);
}

export function importProjects(jsonData: string): { success: boolean; count: number; error?: string } {
  try {
    const data = JSON.parse(jsonData);
    if (!Array.isArray(data)) {
      return { success: false, count: 0, error: 'Invalid format: expected an array of projects.' };
    }
    // Validate each project has required fields
    const valid = data.every((item: any) => item.name && typeof item.name === 'string');
    if (!valid) {
      return { success: false, count: 0, error: 'Invalid project data: each project must have a name.' };
    }
    // Normalize projects
    const existingProjects = getStoredProjects();
    const maxNumber = existingProjects.length > 0 ? Math.max(...existingProjects.map(p => p.projectNumber)) : 0;
    
    const newProjects: Project[] = data.map((item: any, index: number) => ({
      id: item.id || uuidv4(),
      projectNumber: maxNumber + index + 1,
      name: item.name || '',
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      documentationUrl: item.documentationUrl || '',
      image: item.image || '',
      icon: item.icon || '',
      category: item.category || 'OTHER',
      type: item.type || 'OTHER',
      tags: Array.isArray(item.tags) ? item.tags : [],
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
      status: item.status || 'IN DEVELOPMENT',
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      featured: item.featured || false,
      favorite: item.favorite || false,
      features: Array.isArray(item.features) ? item.features : [],
    }));

    const merged = [...existingProjects, ...newProjects];
    // Re-number all
    merged.forEach((p, i) => { p.projectNumber = i + 1; });
    saveProjects(merged);
    return { success: true, count: newProjects.length };
  } catch (e) {
    return { success: false, count: 0, error: 'Failed to parse JSON file.' };
  }
}

export function checkDuplicateGithubUrl(githubUrl: string, excludeId?: string): boolean {
  if (!githubUrl) return false;
  const projects = getStoredProjects();
  return projects.some(p => p.githubUrl === githubUrl && p.id !== excludeId);
}

export function getCategories(): Record<string, number> {
  const projects = getStoredProjects();
  const cats: Record<string, number> = {};
  projects.forEach(p => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });
  return cats;
}

export function getTechnologyStats(): Record<string, number> {
  const projects = getStoredProjects();
  const techs: Record<string, number> = {};
  projects.forEach(p => {
    p.technologies.forEach(t => {
      const normalized = t.trim();
      if (normalized) techs[normalized] = (techs[normalized] || 0) + 1;
    });
  });
  return techs;
}

export function getStatusCounts(): Record<string, number> {
  const projects = getStoredProjects();
  const statuses: Record<string, number> = {};
  projects.forEach(p => {
    statuses[p.status] = (statuses[p.status] || 0) + 1;
  });
  return statuses;
}
