const alunoModel = require('../models/aluno');

// Listar alunos
function listarTodos() {
  return alunoModel.listarAlunos();
}

// Buscar aluno por ID
function buscarPorId(id) {
  const aluno = alunoModel.buscarAlunoPorId(id);
  if (!aluno) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }
  return aluno;
}

// Criar novo aluno
function criarAluno(dados) {
  if (!dados.nome) {
    throw { status: 400, message: 'Nome é obrigatório' };
  }
  return alunoModel.adicionarAluno(dados);
}

// Atualizar aluno existente
function atualizarAluno(id, dados) {
  const alunoAtualizado = alunoModel.atualizarAluno(id, dados);
  if (!alunoAtualizado) {
    throw { status: 404, message: 'Aluno não encontrado para atualização' };
  }
  return alunoAtualizado;
}

// Remover aluno
function removerAluno(id) {
  const alunoRemovido = alunoModel.removerAluno(id);
  if (!alunoRemovido) {
    throw { status: 404, message: 'Aluno não encontrado para exclusão' };
  }
  return alunoRemovido;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
};