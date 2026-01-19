import mongoose from 'mongoose';

const projectImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  publicId: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['weddings', 'portraits', 'events', 'corporate'],
    required: [true, 'Category is required'],
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  coverImagePublicId: {
    type: String,
  },
  images: [projectImageSchema],
  technologies: [{
    type: String,
    trim: true,
  }],
  githubLink: {
    type: String,
    default: '',
  },
  liveLink: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
}, {
  timestamps: true,
});

projectSchema.index({ category: 1, visible: 1 });
projectSchema.index({ featured: 1, visible: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
