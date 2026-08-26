const express = require("express");

const app = new express();

app.use(express.json());

var contador_id = 1;
var data = [{
    id : 1,
    nome: "Vanessa",
    cpf: "999.999.999-99",
    status: true
}];

app.get("/listar", (request, response) => {
    return response.send(data);
});

app.post("/cadastrar", (request, response) => {
    // const nome = request.body.nome;
    // const cpf = request.body.cpf;
    // const status = request.body.status;
    // esses comentados são exemplos que tbm faz...
    
    const {nome, cpf, status } = request.body;

    // console.log("Dados da passoa:");
    // console.log(nome);
    // console.log(cpf);
    // console.log(status);

    if(!cpf) {
        return response.send("O campo CPF é obrigatório!");
    }

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso!");
});

app.listen(8080, ()=>{
    console.log("Servidor está rodando na porta 8080!");
});

