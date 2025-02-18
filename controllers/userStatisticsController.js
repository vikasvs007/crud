// controllers/userStatisticsController.js
const UserStatistics = require('../models/UserStatistics');
const User = require('../models/User');
const ActiveUser = require('../models/ActiveUser');

const mockUserStatistics = {
  totalUsers: 1250,
  newUsersToday: 48,
  activeUsers: 125,
  userGrowth: 15.7,
  avgSessionDuration: 2400, // 40 minutes in seconds
  lastUpdated: new Date()
};

const userStatisticsController = {
  // Get all user statistics
  async getAllStatistics(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const query = { is_deleted: false };

      const statistics = await UserStatistics.find(query)
        .populate('user_id', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 });

      const total = await UserStatistics.countDocuments(query);

      res.json({
        statistics,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get statistics for a specific user
  async getUserStatistics(req, res) {
    try {
      // Simulate small random variations in the data
      const randomVariation = () => (Math.random() - 0.5) * 10;
      
      const stats = {
        totalUsers: Math.max(0, Math.round(mockUserStatistics.totalUsers + randomVariation())),
        newUsersToday: Math.max(0, Math.round(mockUserStatistics.newUsersToday + randomVariation() * 0.5)),
        activeUsers: Math.max(0, Math.round(mockUserStatistics.activeUsers + randomVariation())),
        userGrowth: Math.max(0, (mockUserStatistics.userGrowth + randomVariation() * 0.1).toFixed(1)),
        avgSessionDuration: Math.max(0, Math.round(mockUserStatistics.avgSessionDuration + randomVariation() * 60)),
        lastUpdated: new Date()
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create or update user statistics
  async createOrUpdateStatistics(req, res) {
    try {
      const { user_id, page_name, time_spent } = req.body;

      let statistics = await UserStatistics.findOne({
        user_id,
        is_deleted: false
      });

      if (statistics) {
        // Update existing statistics
        const pageIndex = statistics.pages_visited.findIndex(p => p.page_name === page_name);
        
        if (pageIndex > -1) {
          statistics.pages_visited[pageIndex].visit_count += 1;
        } else {
          statistics.pages_visited.push({
            page_name,
            visit_count: 1
          });
        }

        if (time_spent) {
          statistics.total_time_spent += time_spent;
        }
      } else {
        // Create new statistics
        statistics = new UserStatistics({
          user_id,
          pages_visited: [{
            page_name,
            visit_count: 1
          }],
          total_time_spent: time_spent || 0,
          is_deleted: false
        });
      }

      const savedStatistics = await statistics.save();
      res.status(201).json(savedStatistics);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete user statistics (soft delete)
  async deleteStatistics(req, res) {
    try {
      const statistics = await UserStatistics.findById(req.params.id);
      
      if (!statistics || statistics.is_deleted) {
        return res.status(404).json({ message: 'Statistics not found' });
      }

      statistics.is_deleted = true;
      await statistics.save();
      res.json({ message: 'Statistics deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get overall statistics
  async getOverallStatistics(req, res) {
    try {
      const totalUsers = await UserStatistics.countDocuments({ is_deleted: false });
      
      const mostVisitedPages = await UserStatistics.aggregate([
        { $match: { is_deleted: false } },
        { $unwind: '$pages_visited' },
        { $group: {
          _id: '$pages_visited.page_name',
          totalVisits: { $sum: '$pages_visited.visit_count' }
        }},
        { $sort: { totalVisits: -1 } },
        { $limit: 5 }
      ]);

      const averageTimeSpent = await UserStatistics.aggregate([
        { $match: { is_deleted: false } },
        { $group: {
          _id: null,
          average: { $avg: '$total_time_spent' }
        }}
      ]);

      res.json({
        totalUsers,
        mostVisitedPages,
        averageTimeSpent: averageTimeSpent[0]?.average || 0
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userStatisticsController;
