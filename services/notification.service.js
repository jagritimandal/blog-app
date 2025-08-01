const { send } = require('process');
const notification = require('../models/notification.model');

const NotificationService = {
    sendNotification: async (userId, notificationData) => {
        try {
            const newNotification = new notification({
                user: userId,
                ...notificationData
            });
            await newNotification.save();
            return newNotification;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getNotificationsByUserId: async (userId) => {
        try {
            const notifications = await notification.find({ user: userId }).sort({ createdAt: -1 });
            return notifications;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    markAsRead: async (notificationId) => {
        try {
            const notificationItem = await notification.findById(notificationId);
            if (!notificationItem) {
                throw new Error('Notification not found');
            }
            notificationItem.read = true;
            await notificationItem.save();
            return notificationItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    deleteNotification: async (notificationId) => {
        try {
            const notificationItem = await notification.findById(notificationId);
            if (!notificationItem) {
                throw new Error('Notification not found');
            }
            await notification.deleteOne({ _id: notificationId });
            return { message: 'Notification deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    deleteAllNotifications: async (userId) => {
        try {
            await notification.deleteMany({ user: userId });
            return { message: 'All notifications deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getUnreadCount: async (userId) => {
        try {
            const count = await notification.countDocuments({ user: userId, read: false });
            return count;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    updateNotification: async (notificationId, updateData) => {
        try {
            const updatedNotification = await notification.findByIdAndUpdate(notificationId, updateData, { new: true });
            if (!updatedNotification) {
                throw new Error('Notification not found');
            }
            return updatedNotification;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

module.exports = NotificationService;
