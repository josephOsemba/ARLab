import path from 'path';
import { fileURLToPath } from 'url';
import { list3DModels } from '../utils/modelUtils.js';
import Scene from '../models/Scene.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to get all available scenes from the database
export const getAvailableScenes = async (req, res) => {
  try {
    const scenes = await Scene.find();
    if (scenes.length === 0) {
      return res.status(404).json({ message: 'No scenes available' });
    }
    res.json(scenes);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching scenes: ${error.message}` });
  }
};

// Save a new scene configuration
export const saveScene = async (req, res) => {
  try {
    const { name, description, objects, experimentId } = req.body;
    const newScene = new Scene({ name, description, objects, experimentId });
    await newScene.save();
    res.status(201).json(newScene);
  } catch (error) {
    res.status(400).json({ message: `Error saving scene: ${error.message}` });
  }
};

// Load a specific scene by its ID
export const loadScene = async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.sceneId);
    if (!scene) {
      return res.status(404).json({ message: 'Scene not found' });
    }
    res.json(scene);
  } catch (error) {
    res.status(500).json({ message: `Error loading scene: ${error.message}` });
  }
};
export const getAll3DModels = async (req, res) => {
  try {
    const modelsBasePath = path.join(__dirname, '..', 'public', 'models');

    // Cache control headers
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache

    const modelFiles = [
      'common/meter_rule.glb',
      'common/protractor.glb',
      'common/stopwatch.glb',
      'pendulum/bob.glb',
      'pendulum/stand.glb',
      'pendulum/string_2m.glb',
    ];

    const models = modelFiles
      .map((filePath) => {
        const fullPath = path.join(modelsBasePath, filePath);
        return {
          name: path.basename(filePath, path.extname(filePath)),
          path: `/models/${filePath}`,
          type: path.extname(filePath).substring(1).toLowerCase(),
          category: filePath.split('/')[0],
          lastModified: fs.existsSync(fullPath)
            ? fs.statSync(fullPath).mtime.toISOString()
            : null,
        };
      })
      .filter((model) => model.lastModified); // Only include existing files

    res.json({
      success: true,
      lastUpdated: new Date().toISOString(),
      count: models.length,
      models,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
