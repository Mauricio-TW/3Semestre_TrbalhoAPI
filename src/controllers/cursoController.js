const cursoService = require('../services/cursoService');

// Função assíncrona para listar todos os cursos
async function listar(req, res, next) {
  try {
    const cursos = await cursoService.listarTodos(); // await espera o resultado da listagem de cursos antes de enviar a resposta
    res.status(200).json(cursos);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para buscar curso pelo ID
async function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);   
    const curso = await cursoService.buscarPorId(id); // await espera a busca do curso para garantir que o dado estará disponível
    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }    
    res.status(200).json(curso);// Envia o curso encontrado com status (OK)
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para criar um novo curso
async function criar(req, res, next) {
  try {
    const dadosCurso = req.body;   
    if (!dadosCurso.nome || !dadosCurso.duracao) {   
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }    
    const cursoCriado = await cursoService.criarCurso(dadosCurso);// await espera a criação do curso antes de enviar resposta com o novo curso criado
    res.status(201).json(cursoCriado);
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para atualizar um curso existente pelo ID
async function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;    
    const cursoAtualizado = await cursoService.atualizarCurso(id, dadosAtualizados); // await espera o resultado da atualização do curso
    if (!cursoAtualizado) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }    
    res.status(200).json(cursoAtualizado); // Retorna o curso atualizado com status (OK)
  } catch (error) {
    next(error);
  }
}

// Função assíncrona para deletar um curso pelo ID
async function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const cursoRemovido = await cursoService.removerCurso(id);    // await espera o resultado da remoção do curso
    if (!cursoRemovido) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }   
    res.status(200).json({ message: 'Curso removido' }); // Retorna mensagem de sucesso após remoção
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