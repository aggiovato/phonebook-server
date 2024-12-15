// Routes for persons endpoints

const express = require("express");
const router = express.Router();

const { validatePOST } = require("../middlewares/validators");
const { addPerson, deletePerson } = require("../data/personsStore");

const Person = require("../models/person");

// MIDDLEWARES
// router.param("id", validateGET);

// GET /persons
router.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
    // console.log(persons);
  });
});

// POST /api/persons
router.post("/", validatePOST, (req, res) => {
  const { person } = req;
  addPerson(person);
  res.status(201).json(person); // created
});

// GET /api/persons/:id
router.route("/:id").get((req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
    // console.log(person);
  });
});

// DELETE /api/persons/:id
router.route("/:id").delete((req, res) => {
  const { person } = req;
  deletePerson(person.id);
  res.status(200).json({ message: "Person deleted" }); // ok
});

module.exports = router;
