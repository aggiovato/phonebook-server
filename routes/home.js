// EXTERNAL MODULES
const express = require("express");

// MODELS
const Person = require("../models/person");

/******************************************************** */

// CREATE THE ROUTER
const router = express.Router();

/******************************************************** */

// MIDDLEWARES
router.use("/info/static", express.static("public"));

/******************************************************** */

// ROUTES CONTROLLERS
// GET /
router.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((numPeople) => {
      res.render("info", { numPeople });
    })
    .catch((err) => next(err));
});

/******************************************************** */

// EXPORT THE ROUTER
module.exports = router;
