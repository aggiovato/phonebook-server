// External modules
const { getPersons } = require("../data/personsStore");

// DEFINED ERROR CLASS
class ValidationError extends Error {
  constructor(message, code) {
    super(message || "Internal server error");
    this.code = code || 500;
  }
}

// HELPERS
const generateId = (arr, max = 1000) => {
  const arrIds = new Set(arr.map((x) => parseInt(x.id)));

  for (let i = 0; i < max; i++) {
    const id = Math.floor(Math.random() * max) + 1;
    if (!arrIds.has(id)) {
      return id;
    }
  }

  throw new ValidationError("Could not generate a unique ID", 500);
};

const validateId = (id) => {
  const idInt = parseInt(id);
  if (isNaN(idInt)) {
    throw new ValidationError("Invalid ID", 400);
  }
  return idInt;
};

const validateName = (name, arr) => {
  if (!name || typeof name !== "string") {
    throw new ValidationError("Name is required and must be a string", 400);
  }
  if (arr.find((x) => x.name === name)) {
    throw new ValidationError("Name must be unique", 409); // conflict
  }
};

const validateNumber = (number) => {
  if (!number) {
    throw new ValidationError("Number is required", 400); // bad request
  } else {
    return true;
  }
};

// MIDDLEWARES
const validateGET = (req, res, next, id) => {
  try {
    const persons = getPersons();
    const idInt = validateId(id);
    const person = persons.find((p) => p.id === idInt);

    if (person) {
      req.person = person;
      next();
    } else {
      return res.status(404).json({ error: "Person not found" }); // not found
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json({ error: error.message }); // bad request
    } else {
      return res.status(500).json({ error: "Internal server error" }); // Something went wrong!
    }
  }
};

const validatePOST = (req, res, next) => {
  try {
    const persons = getPersons();
    const { name, number } = req.body;

    validateName(name, persons);
    validateNumber(number);

    const id = generateId(persons);
    const person = { id, name, number };

    req.person = person;
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json({ error: error.message }); // bad request
    } else {
      return res.status(500).json({ error: "Internal server error" }); // Something went wrong!
    }
  }
};

module.exports = {
  validateGET,
  validatePOST,
};
