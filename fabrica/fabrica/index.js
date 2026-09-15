import express from "express";
import knex from "knex";

const mysql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user:"root",
        password: "1234",
        database: "fabrica"
    }
});
async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

const app = new express();

app.use(express.json());


app.get("/listar", async(req, res)=>{

    const pedidos = await mysql.select("*").from("pedido");

    res.send(pedidos);
});

app.get("/listar/:id", async(req, res)=>{

    const { id } = req.params;

    const pedidos = await mysql.select("*")
    .from("pedido")
    .where({id: id});

    res.send(pedidos)
});


app.post("/cadastrar", async (req, res) => {
    const { nome, cpf, produto, quantidade, valor } = req.body;

    const pedido = await mysql.insert({
        nome,
        cpf,
        produto,
        quantidade,
        valor
    }).into("pedido");

    res.send(`Pedido cadastrado: ${nome}`);
});

app.put("/atualizar", async (req, res) => {
    const { id, nome, cpf, produto, quantidade, valor } = req.body;

    const pedidoAtualizado = await mysql("pedido")
        .where({ id })
        .update({
            nome,
            cpf,
            produto,
            quantidade,
            valor
        });

    if (pedidoAtualizado == 1) {
        const pedido = await mysql.select("*")
            .from("pedido")
            .where({ id });

        res.send(pedido);
    } else {
        res.send({ msg: "Não foi possível atualizar o pedido!" });
    }
});

app.delete("/excluir/:id", async (req, res) => {
    const { id } = req.params;

    const pedidoExcluido = await mysql("pedido")
        .where({ id })
        .del();

    if (pedidoExcluido == 1) {
        res.send({ msg: "Pedido excluído com sucesso!" });
    } else {
        res.send({ msg: "Não foi possível excluir o pedido!" });
    }
});

app.listen(8080, () => {
    console.log("O servidor está rodanddo na porta 8080");
});