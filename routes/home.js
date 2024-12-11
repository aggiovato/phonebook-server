// Routes for additional endpoints

const express = require("express");
const router = express.Router();

const { getPersons } = require("../data/personsStore");

// MIDDLEWARES
router.use("/info/static", express.static("public"));

// GET /
router.get("/info", (req, res) => {
  res.render("info", {
    numPeople: getPersons().length,
  });
});

module.exports = router;
