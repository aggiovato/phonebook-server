// This is the main entry point for the application.

const express = require("express");
const app = express();

const morgan = require("morgan");
// const reqLogger = require("./middlewares/reqLogger");
// const unknownEndpoint = require("./middlewares/unknownEndpoint");

let persons = require("./data/persons");
const renderHomepage = require("./helpers/renderHomepage");
const renderInfo = require("./helpers/renderInfo");
const {
  ValidationError,
  generateId,
  validateName,
  validateNumber,
} = require("./helpers/generals");

const PORT = 3001;

// Middleware for parsing JSON
app.use(express.json());

morgan.token("body", (req, res) => {
  return req.method === "POST" ? `> ${JSON.stringify(req.body)}` : "";
});
app.use(
  morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      `- ${tokens["response-time"](req, res)} ms`,
    ];

    const body = tokens.body(req, res);
    if (body) log.push(body);

    return log.join(" ");
  })
);

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
    res.status(404).json({ error: "Person not found" }); // not found
  }
});

// Endpoint for deleting a person by ID
// DELETE /api/persons/:id
app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" }); // bad request
    return;
  }

  const person = persons.find((p) => p.id === id);

  if (person) {
    persons = persons.filter((p) => p.id !== id);
    res.status(200).json({ message: "Person deleted" }); // ok
  } else {
    res.status(404).json({ error: "Person not found" }); // not found
  }
});

// Endpoint for creating a new person
// POST /api/persons
app.post("/api/persons", (req, res) => {
  try {
    const id = generateId(persons);
    const { name, number } = req.body;

    validateName(name, persons);
    validateNumber(number);

    const person = { id, name, number };
    persons = persons.concat(person);
    res.status(201).json(person); // created
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.code).json({ error: error.message }); // bad request
    } else {
      res.status(500).json({ error: "Internal server error" }); // Something went wrong!
    }
  }
});

// Unknown endpoint
// app.use(unknownEndpoint);

// Asign the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:3001");
});
