const request = require("supertest");
const app = require("../app");

describe("Testes da API de Tarefas", () => {
  let tarefaId;

  it("GET /tarefas deve retornar 200 e JSON", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toEqual([]);
  });

  it("POST /tarefas deve criar tarefa", async () => {
    const res = await request(app)
      .post("/tarefas")
      .send({ nome: "Estudar Node", concluida: false });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    tarefaId = res.body.id;
  });

  it("GET /tarefas/:id deve retornar 200 se existir", async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", tarefaId);
  });

  it("GET /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).get("/tarefas/1");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  it("PUT /tarefas/:id deve atualizar tarefa", async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Estudar Node e Express");
  });

  it("DELETE /tarefas/:id deve remover tarefa", async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(204);
  });
});