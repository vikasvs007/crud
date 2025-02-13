// controllers/enquiryController.js
const Enquiry = require('../models/Enquiry');

const enquiryController = {
  // Create a new enquiry
  async createEnquiry(req, res) {
    try {
      const enquiry = new Enquiry(req.body);
      await enquiry.save();
      res.status(201).json(enquiry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all enquiries
  async getEnquiries(req, res) {
    try {
      const enquiries = await Enquiry.find();
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single enquiry
  async getEnquiry(req, res) {
    try {
      const enquiry = await Enquiry.findById(req.params.id);
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.json(enquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an enquiry
  async updateEnquiry(req, res) {
    try {
      const enquiry = await Enquiry.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.json(enquiry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an enquiry
  async deleteEnquiry(req, res) {
    try {
      const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = enquiryController;
