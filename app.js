const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");

const PORT = 3000;

console.log(handlebars);

app.listen(PORT, () => {
  console.log(`O express está rodando na porta ${PORT}`);
});

// body parser

app.use(bodyParser.urlencoded({ extended: false }));

// handlebars

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
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
  Job.findAll({ order: [["createdAt", "DESC"]] }).then((jobs) => {
    res.render("index", { jobs });
  });
});

//job routes
app.use("/jobs", require("./routes/jobs")); //todas as rotas job começarão com /jobs
