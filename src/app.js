const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Importar rotas
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

// Usar as rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);

// Middleware de tratamento de erro
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;