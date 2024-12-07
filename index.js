// This is the main entry point for the application.

const express = require("express");
const app = express();

const persons = require("./data/persons");
const renderHomepage = require("./helpers/renderHomepage");
const renderInfo = require("./helpers/renderInfo");
const generateId = require("./helpers/generateId");

const PORT = 3001;

// Middleware for parsing JSON
app.use(express.json());

/******************************************************** */
// Endpoint for home page
// GET /
app.get("/", (req, res) => {
  res.send(renderHomepage(persons));
});

// Endpoint for getting all persons
// GET /api/persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Endpoint for getting information about the Phonebook
// GET /info
app.get("/info", (req, res) => {
  res.send(renderInfo(persons.length, new Date()));
});

// Endpoint for getting a person by ID
// GET /api/persons/:id
app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// Asign the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:3001");
});
