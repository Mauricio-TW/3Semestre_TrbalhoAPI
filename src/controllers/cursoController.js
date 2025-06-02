const cursoService = require('../services/cursoService');

// Listar os cursos
function listar(req, res, next) {
  try {
    const cursos = cursoService.listarTodos();
    res.status(200).json(cursos);
  } catch (error) {
    next(error);
  }
}

// Buscar curso pelo ID
function buscarPorId(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const curso = cursoService.buscarPorId(id);
    res.status(200).json(curso);
  } catch (error) {
    next(error);
  }
}

// Criar novo curso
function criar(req, res, next) {
  try {
    const dadosCurso = req.body;
    const cursoCriado = cursoService.criarCurso(dadosCurso);
    res.status(201).json(cursoCriado);
  } catch (error) {
    next(error);
  }
}

// Atualizar curso existente
function atualizar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    const cursoAtualizado = cursoService.atualizarCurso(id, dadosAtualizados);
    res.status(200).json(cursoAtualizado);
  } catch (error) {
    next(error);
  }
}

// Remover um curso
function deletar(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const cursoRemovido = cursoService.removerCurso(id);

    if (!cursoRemovido) {
      const erro = new Error('Curso não encontrado');
      erro.status = 404;
      throw erro;
    }

    res.status(200).json({ message: 'Curso removido' });
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