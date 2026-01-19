import express from 'express';
import {
  getAllServices,
  getEnabledServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/enabled', getEnabledServices);
router.get('/', getAllServices);

// Protected admin routes
router.get('/:id', protect, adminOnly, getServiceById);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;
