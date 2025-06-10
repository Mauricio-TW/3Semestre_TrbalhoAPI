const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Importar rotas
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');

app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/matriculas', matriculaRoutes);

// Middleware de erro
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Subir servidor aqui:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = app;