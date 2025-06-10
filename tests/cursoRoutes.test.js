it('POST /api/cursos - deve criar um novo curso', async () => {
  const novoCurso = {
    nome: 'Curso Teste',
    descricao: 'Descrição do curso de teste',
    cargaHoraria: 40
  };

  const res = await request(app)
    .post('/api/cursos')
    .send(novoCurso)
    .expect('Content-Type', /json/)
    .expect(201);

  expect(res.body).toHaveProperty('id');
  expect(res.body.nome).toBe(novoCurso.nome);
  expect(res.body.descricao).toBe(novoCurso.descricao);
  expect(res.body.cargaHoraria).toBe(novoCurso.cargaHoraria);

  cursoId = res.body.id;
});

it('GET /api/cursos/:id - deve retornar curso pelo id', async () => {
  if (!cursoId) {
    throw new Error('Curso ID não definido no teste anterior');
  }

  const res = await request(app)
    .get(`/api/cursos/${cursoId}`)
    .expect('Content-Type', /json/)
    .expect(200);

  expect(res.body.id).toBe(cursoId);
  expect(res.body).toHaveProperty('nome');
  expect(res.body).toHaveProperty('descricao'); // adicionado
  expect(res.body).toHaveProperty('cargaHoraria');
});