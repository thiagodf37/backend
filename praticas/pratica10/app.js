require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();
app.use(express.json());


const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;
const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err.message));


app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

app.get('/', (req, res) => res.json({ msg: 'API Pratica10 OK' }));

module.exports = app;