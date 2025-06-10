let matriculas = [];
let idAtual = 1;

// Função para listar as matrículas
function listarMatriculas() {
  return matriculas;
}

// Função para buscar uma matrícula por ID
function buscarMatriculaPorId(id) {
  return matriculas.find(m => m.id === Number(id)); // Retorna a matrícula com o ID correspondente
}

// Função para adicionar uma matrícula
function adicionarMatricula(matricula) {
  matricula.id = idAtual++;
  matriculas.push(matricula);
  return matricula;
}

// Função para atualizar uma matrícula existente
function atualizarMatricula(id, dadosAtualizados) {
  const index = matriculas.findIndex(m => m.id === Number(id)); // Procura o índice da matrícula com o ID correspondente
  if (index !== -1) {
    matriculas[index] = { ...matriculas[index], ...dadosAtualizados };
    return matriculas[index];
  }
  return null;
}

// Função para remover uma matrícula
function removerMatricula(id) {
  const index = matriculas.findIndex(m => m.id === Number(id));
  if (index !== -1) {
    const removido = matriculas.splice(index, 1); // Remove a matrícula usando splice e retorna o elemento removido
    return removido[0];
  }
  return null;
}

module.exports = {
  listarMatriculas,
  buscarMatriculaPorId,
  adicionarMatricula,
  atualizarMatricula,
  removerMatricula,
};