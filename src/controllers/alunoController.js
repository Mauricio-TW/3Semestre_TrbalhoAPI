const alunoService = require('../services/alunoService');

// Lista alunos cadastrados
async function listar(req, res, next) {
  try {
    const alunos = await alunoService.listarTodos();
    res.json(alunos);
  } catch (error) {
    next(error);
  }
}

// Busca aluno pelo ID
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const aluno = await alunoService.buscarPorId(id);
    res.json(aluno);
  } catch (error) {
    next(error);
  }
}

// Cria novo aluno
async function criar(req, res, next) {
  try {
    const dados = req.body;
    const aluno = await alunoService.criarAluno(dados);
    res.status(201).json(aluno);
  } catch (error) {
    next(error);
  }
}

// Atualiza dados do aluno existente
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

// Remove um aluno pelo ID
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