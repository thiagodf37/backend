const url="mongodb+srv://userTarefas:Th250102@cluster0.ukm5iqn.mongodb.net/"

const { MongoClient } = require('mongodb');

const client = new MongoClient(url);

async function conectarDb() {
  try {
    await client.connect();
    return client.db('agenda');
  } catch (err) {
    console.error('Erro conectando ao MongoDB:', err);
    throw err;
  }
}

module.exports = { conectarDb };