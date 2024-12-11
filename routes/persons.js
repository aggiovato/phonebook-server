// Routes for persons endpoints

const express = require("express");
const router = express.Router();

const { validateGET, validatePOST } = require("../middlewares/validators");
const { getPersons, addPerson, deletePerson } = require("../data/personsStore");

// MIDDLEWARES
router.param("id", validateGET);

// GET /persons
router.get("/", (req, res) => res.json(getPersons()));

// POST /api/persons
router.post("/", validatePOST, (req, res) => {
  const { person } = req;
  addPerson(person);
  res.status(201).json(person); // created
});

// GET /api/persons/:id
router.route("/:id").get((req, res) => res.json(req.person));

// DELETE /api/persons/:id
router.route("/:id").delete((req, res) => {
  const { person } = req;
  deletePerson(person.id);
  res.status(200).json({ message: "Person deleted" }); // ok
});

module.exports = router;
