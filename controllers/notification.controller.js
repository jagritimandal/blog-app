const NotificationService = require('../services/notification.service');
const validation = require('../validation/notification.validation');

const NotificationController = {
    sendNotification: async (req, res) => {
        try {
            const { error } = validation.sendNotificationValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newNotification = await NotificationService.sendNotification(req.user.id, req.body);
            return res.status(201).json(newNotification);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getNotificationsByUserId: async (req, res) => {
        try {
            const notifications = await NotificationService.getNotificationsByUserId(req.user.id);
            return res.status(200).json(notifications);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    markAsRead: async (req, res) => {
        try {
            const notificationId = req.params.id;
            const updatedNotification = await NotificationService.markAsRead(notificationId);
            return res.status(200).json(updatedNotification);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteNotification: async (req, res) => {
        try {
            const notificationId = req.params.id;
            const deletedNotification = await NotificationService.deleteNotification(notificationId);
            return res.status(200).json(deletedNotification);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteAllNotifications: async (req, res) => {
        try {
            const deletedNotifications = await NotificationService.deleteAllNotifications(req.user.id);
            return res.status(200).json(deletedNotifications);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUnreadCount: async (req, res) => {
        try {
            const count = await NotificationService.getUnreadCount(req.user.id);
            return res.status(200).json({ unreadCount: count });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateNotification : async (req, res) => {
        try {
            const notificationId = req.params.id;
            const { error } = validation.updateNotificationValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedNotification = await NotificationService.updateNotification(notificationId, req.body);
            return res.status(200).json(updatedNotification);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};
module.exports = NotificationController;