const { conectarDb } = require('./database');
const { ObjectId } = require('mongodb');

class Tarefa {
  constructor(nome, concluida = false) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;

    
    this.db = conectarDb(); 
    this.collection = (async () => {
      const db = await this.db;
      return db.collection('tarefas');
    })();
  }

  async inserir() {
    const coll = await this.collection;
    const resultado = await coll.insertOne({ nome: this.nome, concluida: this.concluida });
    this.id = resultado.insertedId; 
    return resultado;
  }

  async alterar() {
    const coll = await this.collection;
    const filtro = this.id ? { _id: this.id } : { nome: this.nome };
    const update = { $set: { nome: this.nome, concluida: this.concluida } };
    const resultado = await coll.updateOne(filtro, update);
    return resultado;
  }

  async deletar() {
    const coll = await this.collection;
    const resultado = await coll.deleteOne({ nome: this.nome });
    return resultado;
  }

  async buscar() {
    const coll = await this.collection;
    const resultado = await coll.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }
    return resultado;
  }
}
module.exports = Tarefa;