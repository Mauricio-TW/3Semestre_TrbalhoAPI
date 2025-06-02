const cursoModel = require('../models/curso');

// Listar os cursos
function listarTodos() {
  return cursoModel.listarCursos();
}

// Buscar curso por ID
function buscarPorId(id) {
  const curso = cursoModel.buscarCursoPorId(id);
  if (!curso) {
    throw { status: 404, message: 'Curso não encontrado' };
  }
  return curso;
}

// Criar novo curso
function criarCurso(dados) {
  if (!dados.nome) {
    throw { status: 400, message: 'Nome do curso é obrigatório' };
  }
  return cursoModel.adicionarCurso(dados);
}

// Atualizar curso existente
function atualizarCurso(id, dados) {
  const cursoAtualizado = cursoModel.atualizarCurso(id, dados);
  if (!cursoAtualizado) {
    throw { status: 404, message: 'Curso não encontrado para atualização' };
  }
  return cursoAtualizado;
}

// Remover curso
function removerCurso(id) {
  const cursoRemovido = cursoModel.removerCurso(id);
  if (!cursoRemovido) {
    throw { status: 404, message: 'Curso não encontrado para exclusão' };
  }
  return cursoRemovido;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criarCurso,
  atualizarCurso,
  removerCurso,
};