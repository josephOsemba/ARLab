import { projects } from '../config/projects.config.js';

export const getProjectComponents = (projectId) => {
  if (!projects[projectId]) {
    throw new Error('Project not found');
  }
  return Promise.resolve(projects[projectId].components);
};
