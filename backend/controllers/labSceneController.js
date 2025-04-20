import path from 'path';
import { fileURLToPath } from 'url';
import { list3DModels } from '../utils/modelUtils.js';
import Scene from '../models/Scene.js';

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

// Get all 3D models in the models directory
export const getAll3DModels = async (req, res) => {
  const modelsDir = path.join(__dirname, '../models/3D-Models');
  try {
    const models = await list3DModels(modelsDir);
    if (models.length === 0) {
      return res.status(404).json({ message: 'No 3D models found' });
    }
    res.json(models);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching 3D models: ${err.message}` });
  }
};
