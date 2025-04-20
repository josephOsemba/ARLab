import express from 'express';
import {
  saveScene,
  loadScene,
  getAvailableScenes,
} from '../controllers/labSceneController.js';

const router = express.Router();

// Save current scene configuration
router.post('/save', saveScene);

// Load a specific scene configuration
router.get('/load/:sceneId', loadScene);

// Get all available scenes
router.get('/available', getAvailableScenes);

export default router;
