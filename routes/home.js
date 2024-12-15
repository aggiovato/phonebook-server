// EXTERNAL MODULES
const express = require("express");

// STORES
const { getTotal } = require("../data/totalStore");

/******************************************************** */

// CREATE THE ROUTER
const router = express.Router();

/******************************************************** */

// MIDDLEWARES
router.use("/info/static", express.static("public"));

/******************************************************** */

// ROUTES CONTROLLERS
// GET /
router.get("/info", (req, res) => {
  res.render("info", {
    numPeople: getTotal(),
  });
});

/******************************************************** */

// EXPORT THE ROUTER
module.exports = router;
