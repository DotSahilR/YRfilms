import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  src: {
    type: String,
    required: [true, 'Image source is required'],
  },
  alt: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['weddings', 'portraits', 'events', 'corporate'],
    required: [true, 'Category is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  publicId: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

gallerySchema.index({ category: 1, visible: 1 });
gallerySchema.index({ featured: 1, visible: 1 });
gallerySchema.index({ order: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
