import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
  try {
    const { enabled } = req.query;
    const filter = {};
    
    if (enabled === 'true') filter.enabled = true;
    if (enabled === 'false') filter.enabled = false;
    
    const services = await Service.find(filter).sort({ popular: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching services',
    });
  }
};

export const getEnabledServices = async (req, res) => {
  try {
    const services = await Service.find({ enabled: true }).sort({ popular: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching services',
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching service',
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, includes, popular, enabled } = req.body;
    
    const service = await Service.create({
      name,
      description,
      price: parseFloat(price),
      duration,
      includes: Array.isArray(includes) ? includes : JSON.parse(includes || '[]'),
      popular: popular === 'true' || popular === true,
      enabled: enabled !== 'false',
    });
    
    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating service',
    });
  }
};

export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    
    const { name, description, price, duration, includes, popular, enabled } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (duration) updateData.duration = duration;
    if (includes !== undefined) {
      updateData.includes = Array.isArray(includes) ? includes : JSON.parse(includes);
    }
    if (popular !== undefined) updateData.popular = popular === 'true' || popular === true;
    if (enabled !== undefined) updateData.enabled = enabled === 'true' || enabled === true;
    
    service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error updating service',
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    
    await Service.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting service',
    });
  }
};
