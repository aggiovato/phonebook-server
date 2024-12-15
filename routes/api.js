// EXTERNAL MODULES
const express = require("express");

/******************************************************** */

// CREATE THE ROUTER
const router = express.Router();

/******************************************************** */

// MIDDLEWARES
router.use("/static", express.static("public"));

/******************************************************** */

// ROUTES CONTROLLERS
// GET /
router.get("/", (req, res) => {
  res.render("api");
});

/******************************************************** */
// EXPORT THE ROUTER
module.exports = router;
