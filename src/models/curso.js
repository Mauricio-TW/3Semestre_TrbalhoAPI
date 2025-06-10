let cursos = [];
let idAtual = 1;

// Função para listar cursos
function listarCursos() {
  return cursos;
}

// Função para buscar um curso por ID
function buscarCursoPorId(id) {
  return cursos.find(curso => curso.id === Number(id));
}

// Função para adicionar curso
function adicionarCurso(curso) {
  curso.id = idAtual++;
  cursos.push(curso);
  return curso;
}

// Função para atualizar um curso existente
function atualizarCurso(id, dadosAtualizados) {
  const index = cursos.findIndex(curso => curso.id === Number(id)); // Procura o índice do curso com o ID correspondente
  if (index !== -1) {
    cursos[index] = { ...cursos[index], ...dadosAtualizados }; // Atualiza os dados mantendo os antigos que não foram modificados
    return cursos[index];
  }
  return null;
}

// Função para remover um curso
function removerCurso(id) {
  const index = cursos.findIndex(curso => curso.id === Number(id)); // Procura o índice do curso com o ID correspondente
  if (index !== -1) {
    const removido = cursos.splice(index, 1); // Remove o curso usando splice e retorna o elemento removido
    return removido[0];
  }
  return null;
}

module.exports = {
  listarCursos,
  buscarCursoPorId,
  adicionarCurso,
  atualizarCurso,
  removerCurso,
};