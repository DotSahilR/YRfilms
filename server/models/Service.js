import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  includes: [{
    type: String,
    trim: true,
  }],
  popular: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

serviceSchema.index({ enabled: 1, popular: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
