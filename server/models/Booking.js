import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true,
  },
  preferredDate: {
    type: String,
    required: [true, 'Preferred date is required'],
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'booked', 'archived'],
    default: 'new',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ email: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
