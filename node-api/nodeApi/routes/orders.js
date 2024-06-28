const express = require('express');
const router = express.Router();

const ordersService = require('../services/ordersService');
const APISecurity = require("../middleware/APISecurity");

router.get('/all', APISecurity.requirePermits(['manage_important_records_admin', 'view-orders']), ordersService.getAll);
router.get('/:id', APISecurity.requirePermits(['manage_important_records_admin', 'view-orders']), ordersService.getOne);
router.post('/add', APISecurity.requirePermits(['manage_important_records_admin', 'place-orders']), ordersService.add);
router.put('/update/:id', APISecurity.requirePermits(['manage_important_records_admin', 'update-orders']), ordersService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_important_records_admin'), ordersService.delete);

module.exports = router;