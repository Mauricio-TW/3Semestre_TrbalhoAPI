const alunoService = require('../services/alunoService');

//// Função assíncrona para listar alunos
async function listar(req, res, next) {
  try {
    const alunos = await alunoService.listarTodos();
    res.json(alunos);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para buscar aluno por ID
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const aluno = await alunoService.buscarPorId(id); // await pausa a execução até que listarTodos() retorne os dados
    res.json(aluno);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para criar um novo aluno
async function criar(req, res, next) {
  try {
    const dados = req.body;
    const aluno = await alunoService.criarAluno(dados);
    res.status(201).json(aluno);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para atualizar aluno existente
async function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const dados = req.body;
    const alunoAtualizado = await alunoService.atualizarAluno(id, dados);
    res.json(alunoAtualizado);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para deletar aluno pelo ID
async function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await alunoService.removerAluno(id);
    res.json({ id: id, message: 'Aluno removido' });
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