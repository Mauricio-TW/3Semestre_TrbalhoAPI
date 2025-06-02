const request = require('supertest');
const app = require('../src/app');

describe('Testes da API Alunos', () => {
  let alunoId;

  it('GET /api/alunos deve retornar lista de alunos', async () => {
    const response = await request(app).get('/api/alunos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/alunos deve criar um novo aluno', async () => {
    const novoAluno = { nome: 'João Silva', email: 'joao@example.com' };
    const response = await request(app)
      .post('/api/alunos')
      .send(novoAluno);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoAluno.nome);

    alunoId = response.body.id; 
  });

  it('GET /api/alunos/:id deve retornar aluno criado', async () => {
    const response = await request(app).get(`/api/alunos/${alunoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', alunoId);
  });

  it('PUT /api/alunos/:id deve atualizar o aluno', async () => {
    const dadosAtualizados = { nome: 'João Atualizado' };
    const response = await request(app)
      .put(`/api/alunos/${alunoId}`)
      .send(dadosAtualizados);

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe(dadosAtualizados.nome);
  });

  it('DELETE /api/alunos/:id deve remover o aluno', async () => {
    const response = await request(app).delete(`/api/alunos/${alunoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', alunoId);
  });

  it('GET /api/alunos/:id para aluno removido deve retornar 404', async () => {
    const response = await request(app).get(`/api/alunos/${alunoId}`);

    expect(response.statusCode).toBe(404);
  });
});