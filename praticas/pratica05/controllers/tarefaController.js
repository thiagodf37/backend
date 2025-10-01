const tarefaModel = require("../models/tarefaModel");

const listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

const buscarPeloId = (req, res) => {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
};

const criar = (req, res) => {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  res.status(201).json(resultado);
};

const atualizar = (req, res) => {
  const { tarefaId } = req.params;
  const dados = { ...req.body, id: tarefaId };
  const resultado = tarefaModel.atualizar(dados);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
};

const remover = (req, res) => {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.remover(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.status(204).send();
};

module.exports = { listar, buscarPeloId, criar, atualizar, remover };