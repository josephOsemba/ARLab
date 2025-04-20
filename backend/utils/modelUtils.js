import fs from 'fs';
import path from 'path';

export const list3DModels = (modelsDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(modelsDir, (err, files) => {
      if (err) {
        reject('Failed to list 3D models.');
      } else {
        const glbFiles = files.filter((file) => file.endsWith('.glb'));

        const models = glbFiles.map((filename, index) => ({
          id: index + 1,
          name: filename.replace('.glb', ''),
          filename,
          url: `/models/3D-Models/${filename}`,
        }));

        resolve(models);
      }
    });
  });
};
