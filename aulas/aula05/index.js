// importa o framework
const express = require("express");

//criar uma instancia da aplicação
const app = express();

//middlware de aplicação
app.use((req, res, next) => {
    console.log("passei aqui");
    next();
});

//middlware de rota
const router = express.Router();

router.get("/",(req, res) => {
    res.send("chegou aqui");
});

router.post("/", (req, res) => {
    res.status(201).send("inserido com sucesso");
})

router.get("/:id", (req, res)=>{
    const {id} = req.params; // {id:1, param2: 5, param3: 6}
    if(id == 1) return res.send("achei")
    throw Error("Não achei")
})

app.use("/tarefas", router);

//middlware de erro
app.use((err, req, res, next) =>{
    console.log(err.message);
    res.status(500).send("Algo de errado não esta certo!");
});

//inicia a aplicação
app.listen(3000, ()=>{
    console.log("app está on");
});

