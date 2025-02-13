// controllers/visitorController.js
const Visitor = require('../models/Visitor');

const visitorController = {
  // Get all visitors
  async getVisitors(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const query = { is_deleted: false };

      const visitors = await Visitor.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ last_visited_at: -1 });

      const total = await Visitor.countDocuments(query);

      res.json({
        visitors,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get visitor by IP
  async getVisitorByIp(req, res) {
    try {
      const visitor = await Visitor.findOne({ 
        ip_address: req.params.ip,
        is_deleted: false 
      });

      if (!visitor) {
        return res.status(404).json({ message: 'Visitor not found' });
      }

      res.json(visitor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create or update visitor
  async createOrUpdateVisitor(req, res) {
    try {
      const { ip_address, location } = req.body;

      let visitor = await Visitor.findOne({ ip_address, is_deleted: false });

      if (visitor) {
        // Update existing visitor
        visitor.visit_count += 1;
        visitor.last_visited_at = new Date();
        if (location) {
          visitor.location = location;
        }
      } else {
        // Create new visitor
        visitor = new Visitor({
          ip_address,
          location,
          visit_count: 1,
          last_visited_at: new Date(),
          is_deleted: false
        });
      }

      const savedVisitor = await visitor.save();
      res.status(201).json(savedVisitor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete visitor (soft delete)
  async deleteVisitor(req, res) {
    try {
      const visitor = await Visitor.findById(req.params.id);
      
      if (!visitor || visitor.is_deleted) {
        return res.status(404).json({ message: 'Visitor not found' });
      }

      visitor.is_deleted = true;
      await visitor.save();
      res.json({ message: 'Visitor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get visitor statistics
  async getVisitorStats(req, res) {
    try {
      const totalVisitors = await Visitor.countDocuments({ is_deleted: false });
      
      const visitorsByCountry = await Visitor.aggregate([
        { $match: { is_deleted: false } },
        { $group: { 
          _id: '$location.country',
          count: { $sum: 1 },
          totalVisits: { $sum: '$visit_count' }
        }},
        { $sort: { count: -1 } }
      ]);

      const totalVisits = await Visitor.aggregate([
        { $match: { is_deleted: false } },
        { $group: { 
          _id: null,
          total: { $sum: '$visit_count' }
        }}
      ]);

      res.json({
        totalUniqueVisitors: totalVisitors,
        totalVisits: totalVisits[0]?.total || 0,
        visitorsByCountry
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = visitorController;
