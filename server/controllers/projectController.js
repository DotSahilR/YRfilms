import Project from '../models/Project.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const getAllProjects = async (req, res) => {
  try {
    const { category, featured, visible } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (visible === 'true') filter.visible = true;
    if (visible === 'false') filter.visible = false;
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching projects',
    });
  }
};

export const getVisibleProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { visible: true };
    
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching projects',
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching project',
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, githubLink, liveLink, featured, visible, date } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one image is required',
      });
    }
    
    const uploadedImages = [];
    let coverImage = '';
    let coverImagePublicId = '';
    
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const result = await uploadToCloudinary(file.buffer, 'yrfilms/projects');
      
      if (i === 0) {
        coverImage = result.secure_url;
        coverImagePublicId = result.public_id;
      }
      
      uploadedImages.push({
        src: result.secure_url,
        alt: `${title} - Image ${i + 1}`,
        publicId: result.public_id,
        order: i,
      });
    }
    
    const project = await Project.create({
      title,
      description,
      category,
      coverImage,
      coverImagePublicId,
      images: uploadedImages,
      technologies: technologies ? JSON.parse(technologies) : [],
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      featured: featured === 'true',
      visible: visible !== 'false',
      date: date || new Date().toISOString().split('T')[0],
    });
    
    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating project',
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    const { title, description, category, technologies, githubLink, liveLink, featured, visible, date } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;
    if (technologies) updateData.technologies = JSON.parse(technologies);
    if (githubLink !== undefined) updateData.githubLink = githubLink;
    if (liveLink !== undefined) updateData.liveLink = liveLink;
    if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;
    if (visible !== undefined) updateData.visible = visible === 'true' || visible === true;
    if (date) updateData.date = date;
    
    if (req.files && req.files.length > 0) {
      if (project.coverImagePublicId) {
        await deleteFromCloudinary(project.coverImagePublicId);
      }
      for (const img of project.images) {
        if (img.publicId) {
          await deleteFromCloudinary(img.publicId);
        }
      }
      
      const uploadedImages = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await uploadToCloudinary(file.buffer, 'yrfilms/projects');
        
        if (i === 0) {
          updateData.coverImage = result.secure_url;
          updateData.coverImagePublicId = result.public_id;
        }
        
        uploadedImages.push({
          src: result.secure_url,
          alt: `${title || project.title} - Image ${i + 1}`,
          publicId: result.public_id,
          order: i,
        });
      }
      updateData.images = uploadedImages;
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error updating project',
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    if (project.coverImagePublicId) {
      await deleteFromCloudinary(project.coverImagePublicId);
    }
    
    for (const img of project.images) {
      if (img.publicId) {
        await deleteFromCloudinary(img.publicId);
      }
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting project',
    });
  }
};

export const addProjectImage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Image is required',
      });
    }
    
    const result = await uploadToCloudinary(req.file.buffer, 'yrfilms/projects');
    
    const newImage = {
      src: result.secure_url,
      alt: req.body.alt || `${project.title} - Image ${project.images.length + 1}`,
      publicId: result.public_id,
      order: project.images.length,
    };
    
    project.images.push(newImage);
    await project.save();
    
    res.status(200).json({
      success: true,
      image: newImage,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error adding image',
    });
  }
};

export const removeProjectImage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    const imageIndex = project.images.findIndex(
      img => img._id.toString() === req.params.imageId
    );
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Image not found',
      });
    }
    
    const image = project.images[imageIndex];
    if (image.publicId) {
      await deleteFromCloudinary(image.publicId);
    }
    
    project.images.splice(imageIndex, 1);
    
    if (project.images.length > 0 && image.src === project.coverImage) {
      project.coverImage = project.images[0].src;
      project.coverImagePublicId = project.images[0].publicId;
    }
    
    await project.save();
    
    res.status(200).json({
      success: true,
      message: 'Image removed successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error removing image',
    });
  }
};
