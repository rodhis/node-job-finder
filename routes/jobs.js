const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// job details
router.get("/view/:id", (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", {
        job,
      });
    })
    .catch((err) => console.log(err))
);

// job adding page
router.get("/add", (req, res) => {
  res.render("add");
});

// POST request route of job adding page
router.post("/add", (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body;

  //insert
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
