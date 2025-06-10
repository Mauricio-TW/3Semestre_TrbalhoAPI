// Middleware de tratamento de erros centralizado
function errorHandler(err, req, res, next) {
  console.error(err); // Exibe o erro no console para depuração

  const status = err.status || 500;  // Define o status do erro
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: {
      message,     
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}

module.exports = errorHandler;