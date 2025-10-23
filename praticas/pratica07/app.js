require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');

const app = express();
app.use(express.json());


const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;
const connStr = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' Conectado ao MongoDB Atlas!'))
  .catch(err => console.error(' Erro na conexão com MongoDB:', err.message || err));

app.use('/produtos', produtosRouter);

app.use((req, res) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

module.exports = app;