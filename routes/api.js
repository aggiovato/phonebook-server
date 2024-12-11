// Routes for the Phonebook API homepage and info endpoints

const express = require("express");
const router = express.Router();
const buttons = require("../helpers/buttons");

// MIDDLEWARES
router.use("/static", express.static("public"));

// GET /
router.get("/", (req, res) => {
  res.render("api", { buttons });
});

module.exports = router;
