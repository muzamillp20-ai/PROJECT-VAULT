import { useState, useEffect, useCallback } from 'react';
import { Project, getProjects, getProjectById, addProject, updateProject, deleteProject, toggleFavorite, toggleFeatured, exportProjects, importProjects, getCategories, getTechnologyStats, getStatusCounts } from '../services/projectService';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    const data = getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback((projectData: Partial<Project>) => {
    const result = addProject(projectData);
    refresh();
    return result;
  }, [refresh]);

  const update = useCallback((id: string, projectData: Partial<Project>) => {
    const result = updateProject(id, projectData);
    refresh();
    return result;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = deleteProject(id);
    refresh();
    return result;
  }, [refresh]);

  const toggleFav = useCallback((id: string) => {
    const result = toggleFavorite(id);
    refresh();
    return result;
  }, [refresh]);

  const toggleFeat = useCallback((id: string) => {
    const result = toggleFeatured(id);
    refresh();
    return result;
  }, [refresh]);

  const exportData = useCallback(() => {
    return exportProjects();
  }, []);

  const importData = useCallback((json: string) => {
    const result = importProjects(json);
    refresh();
    return result;
  }, [refresh]);

  const getById = useCallback((id: string) => {
    return getProjectById(id);
  }, []);

  const categories = getCategories();
  const techStats = getTechnologyStats();
  const statusCounts = getStatusCounts();

  const totalProjects = projects.length;
  const liveProjects = projects.filter(p => p.status === 'LIVE').length;
  const githubRepos = projects.filter(p => p.githubUrl).length;
  const favorites = projects.filter(p => p.favorite).length;
  const featuredProject = projects.find(p => p.featured);

  return {
    projects,
    loading,
    refresh,
    add,
    update,
    remove,
    toggleFav,
    toggleFeat,
    exportData,
    importData,
    getById,
    categories,
    techStats,
    statusCounts,
    totalProjects,
    liveProjects,
    githubRepos,
    favorites,
    featuredProject,
  };
}
