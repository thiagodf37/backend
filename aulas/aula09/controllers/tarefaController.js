const Tarefa = require('../models/tarefaModel');

async function listar(req, res) {
  try{
  const tarefas = await Tarefa.find({});
  return res.json(tarefas);
  } catch(err){
  res.status(500).json({msg: "deu ruim" + err.message });
  }

}

async function criar(req, res) {
  const {nome} = req.params;
  const novaTarefa = await Tarefa.create({nome: req.body.nome,
    concluida: false,
});
  return res.status(201).json(novaTarefa);
}

async function buscar(req, res, next) {
  const { id } = req.params;
  const tarefaEncontrada = await Tarefa.findOne({_id: id});
  if(tarefaEncontrada) {
    return next();
  }
return res.status(404).json({msg:"Tarefa não encontrada"});
}

function exibir(req, res) {
  return res.json(req.tarefa);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const tarefaAtualizada = await Tarefa.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (tarefaAtualizada) {
    return res.json(tarefaAtualizada);
  }

  return res.status(404).json({ msg: "Tarefa não encontrada" });
}

function remover(req, res) {
  return res.status(204).end();
}

module.exports = { listar, criar, buscar, exibir, atualizar, remover };
