// EXTERNAL MODULES
const express = require("express");

// MODELS
const Person = require("../models/person");

/******************************************************** */

// CREATE THE ROUTER
const router = express.Router();

/******************************************************** */

// ROUTES CONTROLLERS
// GET /persons
router.get("/", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        res.json(persons);
      } else {
        res.status(404).json({ error: "People not found" });
      }
    })
    .catch((err) => next(err));
});

// GET /api/persons/:id
router.route("/:id").get((req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((err) => next(err));
});

// POST /api/persons
router.post("/", (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });

  person
    .save()
    .then((person) => {
      res.status(201).json(person); // created
    })
    .catch((err) => next(err));
});

// PUT /api/persons/:id
router.route("/:id").put((req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedPerson) => {
      res.status(202).json(updatedPerson); // accepted
    })
    .catch((err) => next(err));
});

// DELETE /api/persons/:id
router.route("/:id").delete((req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).json({ message: "Person deleted" }); // no content
    })
    .catch((err) => next(err));
});

/******************************************************** */

// EXPORT THE ROUTER
module.exports = router;
