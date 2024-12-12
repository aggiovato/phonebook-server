// Routes for the Phonebook API homepage and info endpoints

const express = require("express");
const router = express.Router();

// MIDDLEWARES
router.use("/static", express.static("public"));

// GET /
router.get("/", (req, res) => {
  res.render("api");
});

module.exports = router;
