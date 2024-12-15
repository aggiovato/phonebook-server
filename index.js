// This is the main entry point for the application.

// EXTERNAL MODULES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");

// IMPORT MIDDLEWARES
const morganLogger = require("./middlewares/morganLogger");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const errorHandler = require("./middlewares/errorHandler");

// IMPORT ROUTERS
const homeRouter = require("./routes/home");
const apiRouter = require("./routes/api");
const personsRouter = require("./routes/persons");

// CREATE THE APP
const app = express();
const PORT = process.env.PORT;

/******************************************************** */

// MIDDLEWARES
app.use(express.static("dist")); // serve static FRONTEND files
app.use("/", express.static("public"));

app.use(express.json()); // parse JSON
app.use(morganLogger); // log requests
app.use(expressLayouts); // enable layouts

app.set("view engine", "ejs"); // set the view engine
app.set("json spaces", 2); // set JSON spaces

app.use("/", homeRouter); // mount the home router
app.use("/api", apiRouter); // mount the API router
app.use("/api/persons", personsRouter); // mount the persons router

/******************************************************** */

// FINAL MIDDLEWARES
app.use(unknownEndpoint); // unknown endpoint
app.use(errorHandler); // error handler

/******************************************************** */

// PORT ASIGMENT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
