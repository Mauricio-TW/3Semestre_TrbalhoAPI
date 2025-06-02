let alunos = [];
let idAtual = 1;

// Função para listar alunos
function listarAlunos() {
  return alunos;
}

// Função para buscar um aluno por ID
function buscarAlunoPorId(id) {
  return alunos.find(aluno => aluno.id === id);
}

// Função para adicionar aluno
function adicionarAluno(aluno) {
  aluno.id = idAtual++;
  alunos.push(aluno);
  return aluno;
}

// Função para atualizar um aluno existente
function atualizarAluno(id, dadosAtualizados) {
  const index = alunos.findIndex(aluno => aluno.id === id);
  if (index !== -1) {
    alunos[index] = { ...alunos[index], ...dadosAtualizados };
    return alunos[index];
  }
  return null;
}

// Função para remover um aluno
function removerAluno(id) {
  const index = alunos.findIndex(aluno => aluno.id === id);
  if (index !== -1) {
    const removido = alunos.splice(index, 1);
    return removido[0];
  }
  return null;
}

// Exportar funções
module.exports = {
  listarAlunos,
  buscarAlunoPorId,
  adicionarAluno,
  atualizarAluno,
  removerAluno,
};