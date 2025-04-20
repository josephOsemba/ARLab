import express from 'express';
import {
  getExperimentConfig,
  getExperimentList,
} from '../controllers/experimentController.js';

const router = express.Router();

// Get configuration for a specific experiment
router.get('/:experimentId', getExperimentConfig);

// Get list of all available experiments
router.get('/', getExperimentList);

export default router;
