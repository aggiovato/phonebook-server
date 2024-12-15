// EXTERNAL MODULES
const express = require("express");

// MODELS
const Person = require("../models/person");

// STORES
const { setTotal, addOneTotal, deleteOneTotal } = require("../data/totalStore");

/******************************************************** */

// CREATE THE ROUTER
const router = express.Router();

/******************************************************** */

// ROUTES CONTROLLERS
// GET /persons
router.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
    setTotal(persons.length);
  });
});

// GET /api/persons/:id
router.route("/:id").get((req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

// POST /api/persons
router.post("/", (req, res) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });

  person.save().then((person) => {
    res.status(201).json(person); // created
    addOneTotal();
  });
});

// DELETE /api/persons/:id
router.route("/:id").delete((req, res) => {
  const { person } = req;
  deletePerson(person.id);
  res.status(200).json({ message: "Person deleted" }); // ok
});

/******************************************************** */

// EXPORT THE ROUTER
module.exports = router;
