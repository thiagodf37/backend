const express = require('express');

const auth = require("../middleware/auth");


const router = express.Router();

router.post("/login", (req,res)=>{
  const { username, password} = req.body;

if(username ==="jose@iesb.br" &&
  password ==="abcd1234"){
    const payload ={
    email: username,
    nome: "jose",
    };
    try{
      return res.json({token:auth.gerarToken(payload) });
    }catch (err){
      return res.status(500).json({msg: err.message});
    }
return res.status(401).json({msg: "credenciais"})

  }

})


module.exports = router;
