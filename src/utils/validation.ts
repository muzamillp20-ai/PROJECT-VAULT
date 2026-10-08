import { isValidUrl } from './urlHelpers';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateProjectForm(data: {
  name: string;
  githubUrl: string;
  liveUrl: string;
  documentationUrl: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Project name is required.';
  }

  if (data.githubUrl && !isValidUrl(data.githubUrl)) {
    errors.githubUrl = 'Please enter a valid GitHub URL.';
  }

  if (data.liveUrl && !isValidUrl(data.liveUrl)) {
    errors.liveUrl = 'Please enter a valid Live URL.';
  }

  if (data.documentationUrl && !isValidUrl(data.documentationUrl)) {
    errors.documentationUrl = 'Please enter a valid Documentation URL.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
