const express = require('express');
const router = express.Router();

const matriculaController = require('../controllers/matriculaController');

// Rota para listar todas as matrículas
router.get('/', matriculaController.listar);

// Rota para buscar matrícula pelo ID
router.get('/:id', matriculaController.buscarPorId);

// Rota para criar nova matrícula
router.post('/', matriculaController.criar);

// Rota para atualizar matrícula existente
router.put('/:id', matriculaController.atualizar);

// Rota para deletar matrícula pelo ID
router.delete('/:id', matriculaController.deletar);

module.exports = router;