const express = require('express')
const app = express()
const db = require('./db/connection')

const PORT = 3000

app.listen(PORT, () => {
    console.log(`O express está rodando na porta ${PORT}`);
})

//db connection
db.authenticate()
.then(() => {
    console.log('Conectado com sucesso ao banco de dados');
})
.catch(err => {
    console.log('Erro na conexão com o banco de dados:', err);
})


//routes

app.get('/', (req, res) => {
    res.send('Está funcionando siiimm')
})