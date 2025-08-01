const { create } = require('../models/audit_log.model');
const auditLogService = require('../services/audit_log.service');
const validation  = require('../validation/audit_log.validate');

const auditLogController = {
    createAuditLog: async (req, res) => {
        try {
            const { error } = validation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { action, targetId, targetType, performedBy, status, details, reason, metadata } = req.body;
            const auditLog = await auditLogService.createAuditLog(action, targetId, targetType, performedBy, status, details, reason, metadata);
            return res.status(201).json(auditLog);
        } catch (error) {
            console.error('Error creating audit log:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAuditLogs: async (req, res) => {
        try {
            const auditLogs = await auditLogService.getAuditLogs();
            return res.status(200).json(auditLogs);
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAuditLogById: async (req, res) => {
        try {
            const auditLog = await auditLogService.getAuditLogById(req.params.id);
            if (!auditLog) {
                return res.status(404).json({ message: 'Audit log not found' });
            }
            return res.status(200).json(auditLog);
        } catch (error) {
            console.error('Error fetching audit log by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateAuditLog: async (req, res) => {
        try {
            const auditLog = await auditLogService.updateAuditLog(req.params.id, req.body);
            if (!auditLog) {
                return res.status(404).json({ message: 'Audit log not found' });
            }
            return res.status(200).json(auditLog);
        } catch (error) {
            console.error('Error updating audit log:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteAuditLog: async (req, res) => {
        try {
            const auditLog = await auditLogService.deleteAuditLog(req.params.id);
            if (!auditLog) {
                return res.status(404).json({ message: 'Audit log not found' });
            }
            return res.status(204).send();
        } catch (error) {
            console.error('Error deleting audit log:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    countAuditLogs: async (req, res) => {
        try {
            const count = await auditLogService.countAuditLogs(req.query);
            return res.status(200).json({ count });
        } catch (error) {
            console.error('Error counting audit logs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    clearAuditLogs: async (req, res) => {
        try {
            await auditLogService.clearAuditLogs();
            return res.status(204).send();
        } catch (error) {
            console.error('Error clearing audit logs:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAuditLogById : async (req, res) => {
        try {
            const auditLog = await auditLogService.getAuditLogById(req.params.id);
            if (!auditLog) {
                return res.status(404).json({ message: 'Audit log not found' });
            }
            return res.status(200).json(auditLog);
        } catch (error) {
            console.error('Error fetching audit log by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = auditLogController;