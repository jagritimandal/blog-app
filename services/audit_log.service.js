const audit_log = require('../models/audit_log.model');

const audit_logService ={
    createAuditLog: async (action, targetId, targetType, performedBy, status = 'success', details = '', reason = '', metadata = {}) => {
        try {
            const auditLog = new audit_log({
                action,
                targetId,
                targetType,
                performedBy,
                status,
                details,
                reason,
                metadata
            });
            return await auditLog.save();
        } catch (error) {
            console.error('Error creating audit log:', error);
            throw error;
        }
    },
    // Additional methods for retrieving, updating, or deleting audit logs can be added here
    getAuditLogs: async (filter = {}, options = {}) => {
        try {
            return await audit_log.find(filter, null, options).sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error retrieving audit logs:', error);
            throw error;
        }
    },
    getAuditLogById: async (id) => {
        try {
            return await audit_log.findById(id);
        } catch (error) {
            console.error('Error retrieving audit log by ID:', error);
            throw error;
        }
    },
    updateAuditLog: async (id, updateData) => {
        try {
            return await audit_log.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            console.error('Error updating audit log:', error);
            throw error;
        }
    },
    deleteAuditLog: async (id) => {
        try {
            return await audit_log.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting audit log:', error);
            throw error;
        }
    },
    countAuditLogs: async (filter = {}) => {
        try {
            return await audit_log.countDocuments(filter);
        } catch (error) {
            console.error('Error counting audit logs:', error);
            throw error;
        }
    },
    clearAuditLogs: async () => {
        try {
            return await audit_log.deleteMany({});
        } catch (error) {
            console.error('Error clearing audit logs:', error);
            throw error;
        }
    },
    // Additional utility methods can be added as needed
    getAuditLogsByUser: async (userId, options = {}) => {
        try {
            return await audit_log.find({ performedBy: userId }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error retrieving audit logs by user:', error);
            throw error;
        }
    }
}

module.exports = audit_logService;