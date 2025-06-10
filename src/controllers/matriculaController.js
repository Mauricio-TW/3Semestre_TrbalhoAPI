const matriculaService = require('../services/matriculaService');

// Função assíncrona para listar todas as matrículas
async function listar(req, res, next) {
  try {
    const matriculas = await matriculaService.listarTodos(); // await espera o resultado da listagem de matrículas antes de enviar a resposta
    res.status(200).json(matriculas); // Retorna a lista de matrículas com status (OK)
  } catch (error) {
    next(error); // Encaminha o erro para o middleware de tratamento
  }
}

// Função assíncrona para buscar matrícula pelo ID
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id); // Converte o parâmetro de rota para inteiro
    const matricula = await matriculaService.buscarPorId(id); // await espera a busca da matrícula
    if (!matricula) {
      return res.status(404).json({ message: 'Matrícula não encontrada' })
    }
    res.status(200).json(matricula)
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para criar uma nova matrícula
async function criar(req, res, next) {
  console.log('req.body:', req.body); // Log para depuração do corpo da requisição
  try {
    const dadosMatricula = req.body; // Obtém os dados da matrícula do corpo da requisição
    if (!dadosMatricula.alunoId || !dadosMatricula.cursoId) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }
    const matriculaCriada = await matriculaService.criarMatricula(dadosMatricula); // await espera a criação da matrícula
    res.status(201).json(matriculaCriada);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para atualizar uma matrícula existente pelo ID
async function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id); 
    const dadosAtualizados = req.body; // Obtém os novos dados do corpo da requisição
    const matriculaAtualizada = await matriculaService.atualizarMatricula(id, dadosAtualizados); // await espera a atualização da matrícula
    if (!matriculaAtualizada) {
      return res.status(404).json({ message: 'Matrícula não encontrada' });
    }
    res.status(200).json(matriculaAtualizada);
  } catch (error) {
    next(error); 
  }
}

// Função assíncrona para deletar uma matrícula pelo ID
async function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const matriculaRemovida = await matriculaService.removerMatricula(id); // await espera a remoção da matrícula
    if (!matriculaRemovida) {
      return res.status(404).json({ message: 'Matrícula não encontrada' });
    }
    res.status(200).json({ message: 'Matrícula removida' });
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