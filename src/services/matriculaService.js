const matriculaModel = require('../models/matricula');
const alunoModel = require('../models/aluno');
const cursoModel = require('../models/curso');

// Listar as matrículas
function listarTodos() {
  return matriculaModel.listarMatriculas();
}

// Buscar matrícula por ID
function buscarPorId(id) {
  const matricula = matriculaModel.buscarMatriculaPorId(id);
  if (!matricula) {
    throw { status: 404, message: 'Matrícula não encontrada' };
  }
  return matricula;
}

// Criar nova matrícula
function criarMatricula(dados) {
  if (!dados.alunoId) {
    throw { status: 400, message: 'ID do aluno é obrigatório' };
  }
  if (!dados.cursoId) {
    throw { status: 400, message: 'ID do curso é obrigatório' };
  }

  const aluno = alunoModel.buscarAlunoPorId(dados.alunoId);
  if (!aluno) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }

  const curso = cursoModel.buscarCursoPorId(dados.cursoId);
  if (!curso) {
    throw { status: 404, message: 'Curso não encontrado' };
  }

  // Verifica se a matrícula já existe
  const matriculasAtuais = matriculaModel.listarMatriculas();
  const existe = matriculasAtuais.find(m => m.alunoId === dados.alunoId && m.cursoId === dados.cursoId);
  if (existe) {
    throw { status: 409, message: 'Matrícula já existe para esse aluno neste curso' };
  }

  return matriculaModel.adicionarMatricula({
    alunoId: dados.alunoId,
    cursoId: dados.cursoId,
    dataMatricula: new Date().toISOString(),
  });
}

// Atualizar matrícula
function atualizarMatricula(id, dados) {
  const matriculaExistente = matriculaModel.buscarMatriculaPorId(id);
  if (!matriculaExistente) {
    throw { status: 404, message: 'Matrícula não encontrada para atualização' };
  }

  if (dados.alunoId && dados.alunoId !== matriculaExistente.alunoId) {
    const aluno = alunoModel.buscarAlunoPorId(dados.alunoId);
    if (!aluno) {
      throw { status: 404, message: 'Aluno não encontrado' };
    }
  }

  if (dados.cursoId && dados.cursoId !== matriculaExistente.cursoId) {
    const curso = cursoModel.buscarCursoPorId(dados.cursoId);
    if (!curso) {
      throw { status: 404, message: 'Curso não encontrado' };
    }
  }
  
  const matriculasAtuais = matriculaModel.listarMatriculas();
  const existeDuplicada = matriculasAtuais.find(m =>
    m.id !== id &&
    (dados.alunoId ? m.alunoId === dados.alunoId : m.alunoId === matriculaExistente.alunoId) &&
    (dados.cursoId ? m.cursoId === dados.cursoId : m.cursoId === matriculaExistente.cursoId)
  );
  if (existeDuplicada) {
    throw { status: 409, message: 'Já existe matrícula para este aluno neste curso' };
  }

  return matriculaModel.atualizarMatricula(id, dados);
}

// Remover matrícula
function removerMatricula(id) {
  const matriculaRemovida = matriculaModel.removerMatricula(id);
  if (!matriculaRemovida) {
    throw { status: 404, message: 'Matrícula não encontrada para exclusão' };
  }
  return matriculaRemovida;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criarMatricula,
  atualizarMatricula,
  removerMatricula,
};