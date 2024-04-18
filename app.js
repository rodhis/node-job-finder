const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O express está rodando na porta ${PORT}`);
});

//parser
app.use(bodyParser.urlencoded({ extended: false }));

//db connection
db.authenticate()
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados");
  })
  .catch((err) => {
    console.log("Erro na conexão com o banco de dados:", err);
  });

//routes

app.get("/", (req, res) => {
  res.send("Está funcionando siiimm");
});

//job routes
app.use("/jobs", require("./routes/jobs")); //todas as rotas job começarão com /jobs
