const request = require('supertest');
const app = require('../src/app.test');

describe('Testes da API Cursos', () => {
  let cursoId;

  it('GET /api/cursos deve retornar lista de cursos', async () => {
    const response = await request(app).get('/api/cursos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/cursos deve criar um novo curso', async () => {
    const novoCurso = {
      nome: 'Engenharia de Software',
      duracao: 3600
    };

    const response = await request(app)
      .post('/api/cursos')
      .send(novoCurso);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoCurso.nome);

    cursoId = response.body.id;
  });

  it('GET /api/cursos/:id deve retornar o curso criado', async () => {
    const response = await request(app).get(`/api/cursos/${cursoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', cursoId);
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('duracao');
  });

  it('PUT /api/cursos/:id deve atualizar o curso', async () => {
    const atualizacao = {
      nome: 'Engenharia de Software Atualizada',
      duracao: 4000
    };

    const response = await request(app)
      .put(`/api/cursos/${cursoId}`)
      .send(atualizacao);

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe(atualizacao.nome);
    expect(response.body.duracao).toBe(atualizacao.duracao);
  });

  it('DELETE /api/cursos/:id deve remover o curso', async () => {
    const response = await request(app).delete(`/api/cursos/${cursoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Curso removido');
  });

  it('GET /api/cursos/:id para curso removido deve retornar 404', async () => {
    const response = await request(app).get(`/api/cursos/${cursoId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});