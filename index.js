// This is the main entry point for the application.

// EXTERNAL MODULES
const express = require("express");
const cors = require("cors");

// IMPORT MIDDLEWARES
const morganLogger = require("./middlewares/morganLogger");

// IMPORT ROUTERS
const homeRouter = require("./routes/home");
const apiRouter = require("./routes/api");
const personsRouter = require("./routes/persons");

// CREATE THE APP
const app = express();
const PORT = process.env.PORT || 3000;

/******************************************************** */

// MIDDLEWARES
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies (JIC)
app.use(express.static("dist")); // serve static FRONTEND files
app.use("/", express.static("public"));
app.use(morganLogger); // log requests
app.use(cors()); // enable CORS (JIC)

app.use("/", homeRouter); // mount the home router
app.use("/api", apiRouter); // mount the API router
app.use("/api/persons", personsRouter); // mount the persons router

app.set("view engine", "ejs"); // set the view engine
app.set("json spaces", 2); // set JSON spaces

/******************************************************** */

// PORT ASIGMENT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
