import express from 'express';
import {
  getOscillationsHandler,
  createOscillationHandler,
  updateDataHandler,
  deleteDataHandler,
} from '../controllers/oscillationController.js';

const router = express.Router();

// GET all oscillations
router.get('/', getOscillationsHandler);

// CREATE new oscillation
router.post('/', createOscillationHandler);

// UPDATE oscillation
router.put('/:id', updateDataHandler);

// DELETE oscillation
router.delete('/:id', deleteDataHandler);

export default router;
