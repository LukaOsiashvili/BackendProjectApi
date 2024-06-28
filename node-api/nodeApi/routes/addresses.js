const express = require('express');
const router = express.Router();

const addressesService = require('../services/addressesService');
const APISecurity = require('../middleware/APISecurity');

router.get('/all', APISecurity.requireLogin, addressesService.getAll);
router.get('/:id', APISecurity.requireLogin, addressesService.getOne);
router.post('/add', APISecurity.requirePermits('manage_aux_records'),  addressesService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_aux_records'), addressesService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_aux_records'), addressesService.delete);

module.exports = router;