const matriculaService = require('../services/matriculaService');

// Listar todas as matrículas
function listar(req, res, next) {
  try {
    const matriculas = matriculaService.listarTodos();
    res.status(200).json(matriculas);
  } catch (error) {
    next(error);
  }
}

// Buscar matrícula pelo ID
function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const matricula = matriculaService.buscarPorId(id);
    res.status(200).json(matricula);
  } catch (error) {
    next(error);
  }
}

// Criar nova matrícula
function criar(req, res, next) {
  try {
    const dadosMatricula = req.body;
    const matriculaCriada = matriculaService.criarMatricula(dadosMatricula);
    res.status(201).json(matriculaCriada);
  } catch (error) {
    next(error);
  }
}

// Atualizar matrícula existente
function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    const matriculaAtualizada = matriculaService.atualizarMatricula(id, dadosAtualizados);
    res.status(200).json(matriculaAtualizada);
  } catch (error) {
    next(error);
  }
}

// Remover matrícula
function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const matriculaRemovida = matriculaService.removerMatricula(id);
    res.status(200).json(matriculaRemovida);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};