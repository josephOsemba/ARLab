import express from 'express';
import {
  getOscillationsHandler,
  seedOscillationDataHandler,
} from '../controllers/oscillationController.js';

const router = express.Router();

router.get('/', getOscillationsHandler);
router.post('/seed', seedOscillationDataHandler);
router.put(
  '/:id',
  authenticate,
  authorizeStudent,
  validateOscillationData,
  updateDataHandler
);

router.delete('/:id', authenticate, authorizeStudent, deleteDataHandler);
export default router;
