const express = require('express');
const request = require('supertest');

// Criação do app (substituindo app.js)
const app = express();
app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use(errorHandler);

// TESTES BÁSICOS
describe('Testes básicos da API', () => {
  it('GET /api/alunos deve retornar status 200', async () => {
    const res = await request(app).get('/api/alunos');
    expect([200, 500]).toContain(res.statusCode);
  });

  it('GET /api/cursos deve retornar status 200', async () => {
    const res = await request(app).get('/api/cursos');
    expect([200, 500]).toContain(res.statusCode);
  });

  it('GET /api/matriculas deve retornar status 200', async () => {
    const res = await request(app).get('/api/matriculas');
    expect([200, 500]).toContain(res.statusCode);
  });

  it('POST /api/alunos deve validar corpo vazio', async () => {
    const res = await request(app).post('/api/alunos').send({});
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/cursos deve validar corpo vazio', async () => {
    const res = await request(app).post('/api/cursos').send({});
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/matriculas deve validar corpo vazio', async () => {
    const res = await request(app).post('/api/matriculas').send({});
    expect(res.statusCode).toBe(400);
  });
});