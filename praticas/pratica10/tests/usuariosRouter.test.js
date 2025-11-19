const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let usuarioId;
let token;

describe('Recurso /usuarios', () => {
  it('POST /usuarios deve retornar 201 e criar um usuário', async () => {
    const res = await request.post('/usuarios').send({ email: 'usuario@email.com', senha: 'abcd1234' });
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('usuario@email.com');
    usuarioId = res.body._id;
  });

  it('POST /usuarios sem body deve retornar 422', async () => {
    const res = await request.post('/usuarios').send({});
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('msg');
  });

  it('POST /usuarios/login deve retornar 200 e token', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: 'usuario@email.com', senha: 'abcd1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /usuarios/login sem body deve retornar 401', async () => {
    const res = await request.post('/usuarios/login').send({});
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('msg');
  });

  it('POST /usuarios/renovar com token válido retorna 200 e novo token', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', `Bearer ${token}`).send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /usuarios/renovar com token inválido retorna 401', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789').send();
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('msg');
  });

  it('DELETE /usuarios com token válido retorna 204', async () => {
    const res = await request.delete('/usuarios').set('authorization', `Bearer ${token}`).send({ usuario: 'usuario@email.com' });
    expect(res.statusCode).toBe(204);
  });
});