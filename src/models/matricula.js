let matriculas = [];
let idAtual = 1;

// Listar as matrículas
function listarMatriculas() {
  return matriculas;
}

// Buscar matrícula por ID
function buscarMatriculaPorId(id) {
  return matriculas.find(m => m.id === id);
}

// Adicionar matrícula
function adicionarMatricula(matricula) {
  matricula.id = idAtual++;
  matriculas.push(matricula);
  return matricula;
}

// Atualizar matrícula
function atualizarMatricula(id, dadosAtualizados) {
  const index = matriculas.findIndex(m => m.id === id);
  if (index !== -1) {
    matriculas[index] = { ...matriculas[index], ...dadosAtualizados };
    return matriculas[index];
  }
  return null;
}

// Remover matrícula
function removerMatricula(id) {
  const index = matriculas.findIndex(m => m.id === id);
  if (index !== -1) {
    const removido = matriculas.splice(index, 1);
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