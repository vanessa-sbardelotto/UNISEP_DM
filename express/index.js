const express = require("express");

const app = new express();

app.get("/", (request, response)=>{
    response.send("Boa noite Pessoal, não vamos nos desesperar, pois programação é SIMPLES, nós que dificultamos as coisas!!!")
});

app.listen(8080, ()=>{
    console.log("O Servidor está rodando na porta 8080!🚀");
});
