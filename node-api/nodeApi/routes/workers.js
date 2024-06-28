const express = require('express');
const router = express.Router();

const workersService = require('../services/workersService');
const APISecurity = require("../middleware/APISecurity");

router.get('/all', APISecurity.requirePermits(['manage_important_records_admin', 'view-stats']), workersService.getAll);
router.get('/:id', APISecurity.requirePermits(['manage_important_records_admin', 'view-stats']), workersService.getOne);
router.post('/register', workersService.register);
router.post('/login', workersService.login);
router.put('/update/:id', APISecurity.requirePermits('manage_important_records_admin'), workersService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_important_records_admin'), workersService.delete);

module.exports = router;