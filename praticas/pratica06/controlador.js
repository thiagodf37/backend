const Tarefa = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.inserir();
  return tarefa;
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  const encontrado = await tarefa.buscar();
  if (encontrado) {
    tarefa.concluida = concluida;
    await tarefa.alterar();
    return tarefa;
  } else {
    return null;
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  const encontrado = await tarefa.buscar();
  if (encontrado) {
    await tarefa.deletar();
    return true;
  }
  return false;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};