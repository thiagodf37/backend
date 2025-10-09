const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
  console.log('\n=== MENU ===');
  console.log('1 - Adicionar tarefa');
  console.log('2 - Buscar tarefa');
  console.log('3 - Atualizar tarefa');
  console.log('4 - Remover tarefa');
  console.log('5 - Sair');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1': {
      const nome = readline.question('Nome da tarefa: ');
      const tarefa = await controlador.adicionarTarefa(nome);
      console.log('Tarefa adicionada com id:', tarefa.id);
      break;
    }
    case '2': {
      const nome = readline.question('Nome da tarefa a buscar: ');
      const tarefa = await controlador.buscarTarefa(nome);
      if (tarefa && tarefa.id) {
        console.log('Tarefa encontrada:');
        console.log('id:', tarefa.id);
        console.log('nome:', tarefa.nome);
        console.log('concluida:', tarefa.concluida);
      } else {
        console.log('Tarefa não encontrada.');
      }
      break;
    }
    case '3': {
      const nome = readline.question('Nome da tarefa a atualizar: ');
      const concluidaResposta = readline.question('Concluída? (s/n): ');
      const concluida = (concluidaResposta.toLowerCase() === 's' || concluidaResposta.toLowerCase() === 'y');
      const tarefa = await controlador.atualizarTarefa(nome, concluida);
      if (tarefa) {
        console.log('Tarefa atualizada com sucesso.');
      } else {
        console.log('Tarefa não encontrada para atualizar.');
      }
      break;
    }
    case '4': {
      const nome = readline.question('Nome da tarefa a remover: ');
      const ok = await controlador.removerTarefa(nome);
      console.log(ok ? 'Tarefa removida.' : 'Tarefa não encontrada.');
      break;
    }
    case '5':
      console.log('Saindo...');
      process.exit(0);
    default:
      console.log('Opcao inválida. Tente novamente.');
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opcao: ');
    await escolherOpcao(opcao);
  }
}

main();