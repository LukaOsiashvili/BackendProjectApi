const express = require('express');
const router = express.Router();

const permissionsService = require('../services/permissionsService');
const APISecurity = require('../middleware/APISecurity');

router.get('/all', APISecurity.requirePermits('manage_important_records_admin'), permissionsService.getAll);
router.get('/:id', APISecurity.requirePermits('manage_important_records_admin'), permissionsService.getOne);
router.post('/add', APISecurity.requirePermits('manage_important_records_admin'), permissionsService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_important_records_admin'), permissionsService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_important_records_admin'), permissionsService.delete);

module.exports = router;