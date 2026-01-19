import express from 'express';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - anyone can create a booking
router.post('/', createBooking);

// Protected admin routes
router.get('/', protect, adminOnly, getAllBookings);
router.get('/:id', protect, adminOnly, getBookingById);
router.put('/:id', protect, adminOnly, updateBooking);
router.delete('/:id', protect, adminOnly, deleteBooking);

export default router;
