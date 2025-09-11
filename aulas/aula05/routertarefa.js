const express = require('express')

//middlware de rota
const router = express.Router();

router.get("/",(req, res) => {
    res.send("chegou aqui");
});

router.post("/", (req, res) => {
    console.log(req.body);
    res.status(201).send("inserido com sucesso");
})

router.get("/:id", (req, res) => {
    const {id} = req.params; // {id:1, param2: 5, param3: 6}
    if(id == 1) return res.send("achei")
    throw Error("Não achei")
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    if(id == 1)return res.send("tarefa alteradas");
    res.status(404).send("tarefa nao encontrada");
})

router.delete("/:id", (req, res) => {
    res.status(204).end(); // sem corpo
})

module.exports = router;