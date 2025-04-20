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

router.get('/pendulum-models', (req, res) => {
  try {
    res.json({
      bob: '/models/pendulum/bob.glb',
      string: '/models/pendulum/string_2m.glb',
      stand: '/models/pendulum/stand.glb',
      protractor: '/models/common/protractor.glb',
      meterRule: '/models/common/meter_rule.glb',
      stopwatch: '/models/common/stopwatch.glb',
    });
  } catch (error) {
    console.error('Error fetching pendulum models:', error);
    res.status(500).json({ error: 'Failed to load pendulum models' });
  }
});

// Modular route to get models
router.get('/3d-models', getAll3DModels);

export default router;
