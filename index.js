// This is the main entry point for the application.

const express = require("express");
const app = express();

const persons = require("./data/persons");
const homepage = require("./data/homepage");
const generateId = require("./helpers/generateId");
const getInfo = require("./helpers/getInfo");
const PORT = 3001;

// Middleware for parsing JSON
app.use(express.json());

/******************************************************** */
// Endpoint for home page
// GET /
app.get("/", (req, res) => {
  res.send(homepage);
});

// Endpoint for getting all persons
// GET /api/persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Endpoint for getting information about the Phonebook
// GET /info
app.get("/info", (req, res) => {
  res.send(getInfo(persons.length, new Date()));
});

// Asign the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:3001");
});
