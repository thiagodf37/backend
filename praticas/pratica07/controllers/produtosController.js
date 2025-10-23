const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

// Criar produto
async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

// Listar produtos
async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
}

// Buscar produto por ID
async function buscar(req, res, next) {
  const { id } = req.params;

  // Valida se o id é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  const produtoEncontrado = await Produto.findById(id);

  if (!produtoEncontrado) {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }

  req.produto = produtoEncontrado;
  next();
}

// Exibir produto encontrado
function exibir(req, res) {
  res.status(200).json(req.produto);
}

// Atualizar produto
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true, runValidators: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

// Remover produto
async function remover(req, res) {
  const { id } = req.params;
  await Produto.findByIdAndDelete(id);
  res.status(204).send();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover,
};