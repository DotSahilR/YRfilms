import express from 'express';
import {
  getAllProjects,
  getVisibleProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectImage,
  removeProjectImage,
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getVisibleProjects);
router.get('/all', protect, adminOnly, getAllProjects);
router.get('/:id', getProjectById);

router.post(
  '/',
  protect,
  adminOnly,
  upload.array('images', 10),
  handleMulterError,
  createProject
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.array('images', 10),
  handleMulterError,
  updateProject
);

router.delete('/:id', protect, adminOnly, deleteProject);

router.post(
  '/:id/images',
  protect,
  adminOnly,
  upload.single('image'),
  handleMulterError,
  addProjectImage
);

router.delete('/:id/images/:imageId', protect, adminOnly, removeProjectImage);

export default router;
