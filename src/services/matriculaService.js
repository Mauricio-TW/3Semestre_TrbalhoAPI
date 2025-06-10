const matriculaModel = require('../models/matricula');
const alunoModel = require('../models/aluno');
const cursoModel = require('../models/curso');

// Função assíncrona para listar todas as matrículas
async function listarTodos() {
  return await matriculaModel.listarMatriculas();
}

// Função assíncrona para buscar uma matrícula pelo ID
async function buscarPorId(id) {
  const matricula = await matriculaModel.buscarMatriculaPorId(id);
  if (!matricula) {
    throw { status: 404, message: 'Matrícula não encontrada' };
  }
  return matricula;
}

// Função assíncrona para criar uma nova matrícula
async function criarMatricula(dados) {
  if (!dados.alunoId) {
    throw { status: 400, message: 'ID do aluno é obrigatório' };
  }
  if (!dados.cursoId) {
    throw { status: 400, message: 'ID do curso é obrigatório' };
  }

  const aluno = await alunoModel.buscarAlunoPorId(dados.alunoId);
  if (!aluno) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }

  const curso = await cursoModel.buscarCursoPorId(dados.cursoId);
  if (!curso) {
    throw { status: 404, message: 'Curso não encontrado' };
  }

  // Busca todas as matrículas atuais para evitar duplicatas
  const matriculasAtuais = await matriculaModel.listarMatriculas();

  // Verifica se já existe matrícula para esse aluno e curso
  const existe = matriculasAtuais.find(m => m.alunoId === dados.alunoId && m.cursoId === dados.cursoId);
  if (existe) {
    throw { status: 409, message: 'Matrícula já existe para esse aluno neste curso' };
  }

  // Cria a matrícula com data atual e retorna o resultado
  return await matriculaModel.adicionarMatricula({
    alunoId: dados.alunoId,
    cursoId: dados.cursoId,
    dataMatricula: new Date().toISOString(),
  });
}

// Função assíncrona para atualizar uma matrícula existente
async function atualizarMatricula(id, dados) {
  const matriculaExistente = await matriculaModel.buscarMatriculaPorId(id); // Verifica se matrícula existe
  if (!matriculaExistente) {
    throw { status: 404, message: 'Matrícula não encontrada para atualização' };
  }

  // Validação para verificar se aluno existe
  if (dados.alunoId && dados.alunoId !== matriculaExistente.alunoId) {
    const aluno = await alunoModel.buscarAlunoPorId(dados.alunoId);
    if (!aluno) {
      throw { status: 404, message: 'Aluno não encontrado' };
    }
  }

  // Validação para verificar se curso existe
  if (dados.cursoId && dados.cursoId !== matriculaExistente.cursoId) {
    const curso = await cursoModel.buscarCursoPorId(dados.cursoId);
    if (!curso) {
      throw { status: 404, message: 'Curso não encontrado' };
    }
  }
  
  // Verifica se já existe outra matrícula com os mesmos alunoId e cursoId para evitar duplicidade
  const matriculasAtuais = await matriculaModel.listarMatriculas();
  const existeDuplicada = matriculasAtuais.find(m =>
    m.id !== id &&
    (dados.alunoId ? m.alunoId === dados.alunoId : m.alunoId === matriculaExistente.alunoId) &&
    (dados.cursoId ? m.cursoId === dados.cursoId : m.cursoId === matriculaExistente.cursoId)
  );
  if (existeDuplicada) {
    throw { status: 409, message: 'Já existe matrícula para este aluno neste curso' };
  }

  // Atualiza a matrícula e retorna o resultado
  return await matriculaModel.atualizarMatricula(id, dados);
}

// Função assíncrona para remover uma matrícula pelo ID
async function removerMatricula(id) {
  const matriculaRemovida = await matriculaModel.removerMatricula(id); // Remove matrícula pelo ID
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