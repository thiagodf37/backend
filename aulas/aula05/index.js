// importa o framework
const express = require("express");

//importa middlware de terceiros
const cors = require("cors");

//importa middlware de rota
const router = require('./routertarefa');

//criar uma instancia da aplicação
const app = express();


//middlware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({extended: false})); //?psrsm1=valor&

//middlware de terceiros
app.use(cors());

//middlware de aplicação
app.use((req, res, next) => {
    console.log("passei aqui");
    next();
});

app.use("/tarefas", router);

//middlware de erro
app.use((err, req, res, next) =>{
    console.log(err.message);
    res.status(500).send("Algo de errado não esta certo!");
});

//inicia a aplicação
app.listen(3000, () => {
    console.log("app está on");
});

