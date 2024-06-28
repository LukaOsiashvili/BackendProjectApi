const express = require('express');
const router = express.Router();

const branchesService = require('../services/branchesService');
const APISecurity = require('../middleware/APISecurity');

router.get('/all', APISecurity.requireLogin, branchesService.getAll);
router.get('/:id', APISecurity.requireLogin, branchesService.getOne);
router.post('/add', APISecurity.requirePermits('manage_aux_records'), branchesService.add);
router.put('/update/:id', APISecurity.requirePermits('manage_aux_records'), branchesService.update);
router.delete('/delete/:id', APISecurity.requirePermits('manage_aux_records'), branchesService.delete);

module.exports = router;