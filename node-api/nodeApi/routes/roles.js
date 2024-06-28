const express = require('express');
const router = express.Router();

const rolesService = require('../services/rolesService');
const APISecurity = require("../middleware/APISecurity");

router.get('/all', APISecurity.requirePermits('manage_important_records_admin'), rolesService.getAll);
router.get('/:id', APISecurity.requirePermits('manage_important_records_admin'), rolesService.getOne);
router.post('/add', APISecurity.requirePermits('manage_important_records_admin'), rolesService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_important_records_admin'), rolesService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_important_records_admin'), rolesService.delete);

module.exports = router;