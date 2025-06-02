const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

// Rota para listar os cursos
router.get('/', cursoController.listar);

// Rota para buscar um curso pelo ID
router.get('/:id', cursoController.buscarPorId);

// Rota para criar novo curso
router.post('/', cursoController.criar);

// Rota para atualizar curso existente
router.put('/:id', cursoController.atualizar);

// Rota para deletar curso
router.delete('/:id', cursoController.deletar);

module.exports = router;