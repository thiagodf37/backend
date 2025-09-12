import express from "express";
const app = express();


const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
];


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    console.log("passei aqui");
    next();
});



app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});


app.post("/tarefas", (req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        nome: req.body.nome,
        concluida: req.body.concluida || false
    };
    tarefas.push(novaTarefa);
    console.log("Tarefa criada:", novaTarefa);
    res.status(201).json(novaTarefa);
});


app.get("/tarefas/:id", (req, res, next) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id == id);
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    res.json(tarefa);
});


app.put("/tarefas/:id", (req, res, next) => {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id == id);
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    tarefa.nome = req.body.nome ?? tarefa.nome;
    tarefa.concluida = req.body.concluida ?? tarefa.concluida;
    console.log("Tarefa atualizada:", tarefa);
    res.json(tarefa);
});


app.delete("/tarefas/:id", (req, res, next) => {
    const { id } = req.params;
    const index = tarefas.findIndex(t => t.id == id);
    if (index === -1) return next(new Error("Tarefa não localizada"));
    tarefas.splice(index, 1);
    console.log(`Tarefa ${id} deletada`);
    res.status(204).end();
});


app.use((err, req, res, next) => {
    console.log("Erro:", err.message);
    res.status(400).json({ erro: err.message });
});


app.listen(3000, () => {
    console.log("app está on");
});

export default app;