const express = require('express');
const knex = require('./conexao');

const app = express();

app.use(express.json());

//EXERCICIO 1

app.get('/medicamentos', async (req, res) => {
    const totalMedicamentos = await knex('farmacia')
        .count()

    return res.json(totalMedicamentos);
});

//EXERCICIO 2

app.get('/menoridade', async (req, res) => {
    const menorIdade = await knex('usuarios')
        .min('idade')

    return res.json(menorIdade);
});

//EXERCICIO 3

app.get('/notnull', async (req, res) => {

    const notnull = await knex('farmacia')
        .select('categoria')
        .sum('estoque')
        .whereNotNull('categoria')
        .groupBy('categoria')


    return res.json(notnull);
});

//EXERCICIO 4

app.get('/semcategoria', async (req, res) => {
    const semCategoria = await knex('farmacia')
        .whereNull('categoria')
        .count()
        .debug()

    return res.json(semCategoria);
});

//EXERCICIO 5

app.get('/quantidadecategoria', async (req, res) => {
    const quauntidadecategoria = await knex('farmacia')
        .select('categoria')
        .count()
        .whereNotNull('categoria')
        .groupBy('categoria')


    return res.json(quauntidadecategoria);
});

//EXERCICIO 6

app.get('/maioridade', async (req, res) => {
    const maiorIdade = await knex('usuarios')
        .select('idade')
        .count()
        .where('idade', '>=', 18)
        .groupBy('idade')
        .debug()


    return res.json(maiorIdade);
});


app.listen(3000);

