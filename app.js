const express = require("express");
const expHandleBars = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O express está rodando na porta ${PORT}`);
});

// body parser

app.use(bodyParser.urlencoded({ extended: false }));

// handlebars

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", expHandleBars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static folder

app.use(express.static(path.join(__dirname, "public")));

// db connection

db.authenticate()
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados");
  })
  .catch((err) => {
    console.log("Erro na conexão com o banco de dados:", err);
  });

//routes

app.get("/", (req, res) => {
  res.render("index");
});

//job routes
app.use("/jobs", require("./routes/jobs")); //todas as rotas job começarão com /jobs
