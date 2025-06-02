const request = require('supertest');
const app = require('../src/app');

describe('Testes de integração da rota /api/cursos', () => {
  it('GET /api/cursos - deve retornar lista de cursos', async () => {
    const res = await request(app)
      .get('/api/cursos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/cursos - deve criar um novo curso', async () => {
    const novoCurso = { nome: 'Curso Teste', duracao: 40 };

    const res = await request(app)
      .post('/api/cursos')
      .send(novoCurso)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe(novoCurso.nome);
    expect(res.body.duracao).toBe(novoCurso.duracao);
  });

  it('GET /api/cursos/:id - deve retornar curso pelo id', async () => {
   
    const novoCurso = { nome: 'Curso Teste 2', duracao: 30 };
    const createRes = await request(app).post('/api/cursos').send(novoCurso);

    const id = createRes.body.id;

    const res = await request(app)
      .get(`/api/cursos/${id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.id).toBe(id);
    expect(res.body.nome).toBe(novoCurso.nome);
  });
});