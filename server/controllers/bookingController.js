import Booking from '../models/Booking.js';

export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching bookings',
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching booking',
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, preferredDate, message } = req.body;
    
    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      preferredDate,
      message: message || '',
      status: 'new',
      notes: '',
    });
    
    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating booking',
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    const { name, email, phone, service, preferredDate, message, status, notes } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (service) updateData.service = service;
    if (preferredDate) updateData.preferredDate = preferredDate;
    if (message !== undefined) updateData.message = message;
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    
    booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error updating booking',
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting booking',
    });
  }
};
