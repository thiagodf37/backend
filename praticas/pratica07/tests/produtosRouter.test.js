const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let produtoId; // Guardar ID criado

describe('Testes do recurso /produtos', () => {
  test('POST /produtos deve retornar 201 e criar um produto', async () => {
    const res = await request.post('/produtos').send({ nome: "Laranja", preco: 10.0 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe("Laranja");
    expect(res.body.preco).toBe(10.0);
    produtoId = res.body._id;
  });

  test('POST /produtos sem JSON deve retornar 422', async () => {
    const res = await request.post('/produtos').send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });

  test('GET /produtos deve retornar lista de produtos', async () => {
    const res = await request.get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /produtos/:id deve retornar o produto correto', async () => {
    const res = await request.get(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(produtoId);
    expect(res.body.nome).toBe("Laranja");
  });

  test('GET /produtos/0 deve retornar 400', async () => {
    const res = await request.get('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Parâmetro inválido");
  });

  test('GET /produtos/000000000000000000000000 deve retornar 404', async () => {
    const res = await request.get('/produtos/000000000000000000000000'); // ObjectId válido mas não existente
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Produto não encontrado");
  });

  test('PUT /produtos/:id deve atualizar o produto', async () => {
    const res = await request.put(`/produtos/${produtoId}`).send({ nome: "Laranja Pera", preco: 18.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Laranja Pera");
    expect(res.body.preco).toBe(18.0);
  });

  test('DELETE /produtos/:id deve remover o produto', async () => {
    const res = await request.delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(204);
  });
});