const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rota para listar os alunos
router.get('/', alunoController.listar);

// Rota para buscar um aluno pelo ID
router.get('/:id', alunoController.buscarPorId);

// Rota para criar novo aluno
router.post('/', alunoController.criar);

// Rota para atualizar aluno existente
router.put('/:id', alunoController.atualizar);

// Rota para deletar aluno
router.delete('/:id', alunoController.deletar);

module.exports = router;