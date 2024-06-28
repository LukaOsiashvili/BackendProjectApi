const express = require('express');
const router = express.Router();

const productsService = require('../services/productsService');
const APISecurity = require("../middleware/APISecurity");

router.get('/all', productsService.getAll);
router.get('/:id', productsService.getOne);
router.post('/add', APISecurity.requirePermits('manage_important_records_admin'), productsService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_important_records_admin'), productsService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_important_records_admin'), productsService.delete);

module.exports = router;