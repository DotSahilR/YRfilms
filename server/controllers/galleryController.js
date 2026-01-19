import Gallery from '../models/Gallery.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const getAllGallery = async (req, res) => {
  try {
    const { category, featured, visible } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (visible === 'true') filter.visible = true;
    if (visible === 'false') filter.visible = false;
    
    const galleries = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleries.length,
      galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching gallery',
    });
  }
};

export const getVisibleGallery = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { visible: true };
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    const galleries = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleries.length,
      galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching gallery',
    });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        error: 'Gallery image not found',
      });
    }
    
    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching gallery image',
    });
  }
};

export const createGallery = async (req, res) => {
  try {
    const { alt, category, featured, visible, order, projectId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Image is required',
      });
    }
    
    const result = await uploadToCloudinary(req.file.buffer, 'yrfilms/gallery');
    
    const gallery = await Gallery.create({
      src: result.secure_url,
      alt: alt || 'Gallery image',
      category,
      featured: featured === 'true' || featured === true,
      visible: visible !== 'false',
      order: order || 0,
      publicId: result.public_id,
      projectId: projectId || null,
    });
    
    res.status(201).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating gallery image',
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        error: 'Gallery image not found',
      });
    }
    
    const { alt, category, featured, visible, order, projectId } = req.body;
    
    const updateData = {};
    if (alt !== undefined) updateData.alt = alt;
    if (category) updateData.category = category;
    if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;
    if (visible !== undefined) updateData.visible = visible === 'true' || visible === true;
    if (order !== undefined) updateData.order = parseInt(order);
    if (projectId !== undefined) updateData.projectId = projectId || null;
    
    if (req.file) {
      if (gallery.publicId) {
        await deleteFromCloudinary(gallery.publicId);
      }
      const result = await uploadToCloudinary(req.file.buffer, 'yrfilms/gallery');
      updateData.src = result.secure_url;
      updateData.publicId = result.public_id;
    }
    
    gallery = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error updating gallery image',
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({
        success: false,
        error: 'Gallery image not found',
      });
    }
    
    if (gallery.publicId) {
      await deleteFromCloudinary(gallery.publicId);
    }
    
    await Gallery.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting gallery image',
    });
  }
};
