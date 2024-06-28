const express = require('express');
const router = express.Router();

const citiesService = require('../services/citiesService');
const APISecurity = require('../middleware/APISecurity');

router.get('/all', APISecurity.requireLogin, citiesService.getAll);
router.get('/:id', APISecurity.requireLogin, citiesService.getOne);
router.post('/add', APISecurity.requirePermits('manage_aux_records'), citiesService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_aux_records'), citiesService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_aux_records'), citiesService.delete);

module.exports = router;