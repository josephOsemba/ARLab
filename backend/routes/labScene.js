import express from 'express';
import {
  saveScene,
  loadScene,
  getAvailableScenes,
  getAll3DModels,
} from '../controllers/labSceneController.js';

const router = express.Router();

router.post('/save', saveScene);
router.get('/load/:sceneId', loadScene);
router.get('/models', getAvailableScenes);

// Modular route to get models
router.get('/3d-models', getAll3DModels);

export default router;
