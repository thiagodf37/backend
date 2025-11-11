var express = require('express');
var logger = require('morgan');

var apidocsRouter = require('./routes/apidocsRouter');
var produtosRouter = require('./routes/produtosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', apidocsRouter);
app.use('/produtos', produtosRouter);

app.use(function (req, res, next) {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
});

module.exports = app;