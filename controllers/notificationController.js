// controllers/notificationController.js
const Notification = require('../models/Notification');

const notificationController = {
  // Get all notifications
  async getNotifications(req, res) {
    try {
      const { page = 1, limit = 10, user_id, is_read } = req.query;
      const query = { is_deleted: false };

      if (user_id) query.user_id = user_id;
      if (is_read !== undefined) query.is_read = is_read === 'true';

      const notifications = await Notification.find(query)
        .populate('user_id', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ created_at: -1 });

      const total = await Notification.countDocuments(query);

      res.json({
        notifications,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new notification
  async createNotification(req, res) {
    try {
      const notification = new Notification({
        user_id: req.body.user_id,
        message: req.body.message,
        is_read: false,
        is_deleted: false
      });

      const savedNotification = await notification.save();
      res.status(201).json(savedNotification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification || notification.is_deleted) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      notification.is_read = true;
      const updatedNotification = await notification.save();
      res.json(updatedNotification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a notification (soft delete)
  async deleteNotification(req, res) {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification || notification.is_deleted) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      notification.is_deleted = true;
      await notification.save();
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = notificationController;
