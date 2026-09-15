import express from "express";
import knex from "knex";

const mysql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user:"root",
        password: "1234",
        database: "mercado"
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

app.use(express.json()); //cerealisação

app.get("/listar", async(req, res)=>{

    const produtos = await mysql.select("*").from("produto");

    res.send(produtos);
});

app.get("/listar/:id", async(req, res)=>{

    const { id } = req.params;

    const produto = await mysql.select("*")
    .from("produto")
    .where({id: id});

    res.send(produto)
});

app.post("/cadastrar", async (req, res) => {
    const { nome, preco, qtd_estoque } = req.body;

    const produto = await mysql.insert({
        nome,
        preco,
        qtd_estoque
    }).into("produto");

    res.send(`Produto cadastrado: ${nome}`);
});

app.put("/atualizar", async (req, res) => {
    const { id, nome, preco, qtd_estoque } = req.body;

    const produtoAtualizado = await mysql("produto")
        .where({ id })
        .update({
            nome,
            preco,
            qtd_estoque
        });

    if (produtoAtualizado == 1) {
        const produto = await mysql.select("*")
            .from("produto")
            .where({ id });

        res.send(produto);
    } else {
        res.send({ msg: "Não foi possível atualizar o produto!" });
    }
});
   

app.listen(8080, () => {
    console.log("O servidor está rodanddo na porta 8080");

});

app.delete("/excluir/:id", async (req, res) => {
    const { id } = req.params;

    const produtoExcluido = await mysql("produto")
        .where({ id })
        .del();

    if (produtoExcluido == 1) {
        res.send({ msg: "Produto excluído com sucesso!" });
    } else {
        res.send({ msg: "Não foi possível excluir o produto!" });
    }
});