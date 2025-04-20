import Scene from '../models/Scene.js';

// Save scene configuration
export const saveScene = async (req, res) => {
  try {
    const { name, description, objects, experimentId } = req.body;
    const newScene = new Scene({ name, description, objects, experimentId });
    await newScene.save();
    res.status(201).json(newScene);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Load scene configuration
export const loadScene = async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.sceneId);
    if (!scene) return res.status(404).json({ message: 'Scene not found' });
    res.json(scene);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available scenes
export const getAvailableScenes = async (req, res) => {
  try {
    const scenes = await Scene.find();
    res.json(scenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
