const cursoModel = require('../models/curso');

// Função assincrona para listar todos os cursos
async function listarTodos() {
  return await cursoModel.listarCursos(); 
}

// Função assincrona para buscar um curso por ID
async function buscarPorId(id) {
  const curso = await cursoModel.buscarCursoPorId(id); // Busca o curso pelo ID
  if (!curso) {
    throw { status: 404, message: 'Curso não encontrado' };
  }
  return curso;
}

// Função assincrona criar um novo curso
async function criarCurso(dados) {
  if (!dados.nome) {
    throw { status: 400, message: 'Nome do curso é obrigatório' };
  }
  return await cursoModel.adicionarCurso(dados); // Adiciona o curso no model e retorna
}

// Função assincrona para atualizar um curso existente
async function atualizarCurso(id, dados) {
  const cursoAtualizado = await cursoModel.atualizarCurso(id, dados); // Tenta atualizar o curso pelo ID
  if (!cursoAtualizado) {
    throw { status: 404, message: 'Curso não encontrado para atualização' };
  }
  return cursoAtualizado;
}

// Função assincrona para remover um curso existente
async function removerCurso(id) {
  const cursoRemovido = await cursoModel.removerCurso(id); // Tenta remover o curso pelo ID
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