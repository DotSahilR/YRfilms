import express from 'express';
import {
  getAllGallery,
  getVisibleGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getVisibleGallery);

// Protected admin routes
router.get('/all', protect, adminOnly, getAllGallery);
router.get('/:id', protect, adminOnly, getGalleryById);
router.post('/', protect, adminOnly, upload.single('image'), handleMulterError, createGallery);
router.put('/:id', protect, adminOnly, upload.single('image'), handleMulterError, updateGallery);
router.delete('/:id', protect, adminOnly, deleteGallery);

export default router;
