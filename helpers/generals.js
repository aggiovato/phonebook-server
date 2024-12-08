// New err class
class ValidationError extends Error {
  constructor(message, code) {
    super(message || "Internal server error");
    this.code = code || 500;
  }
}

// This function generates a ID for a new person
const generateId = (arr, max = 1000) => {
  const arrIds = new Set(arr.map((x) => parseInt(x.id)));

  for (let i = 0; i < max; i++) {
    const id = Math.floor(Math.random() * max) + 1;
    if (!arrIds.has(id)) {
      return id;
    }
  }

  throw new ValidationError("Could not generate a unique ID", 500); // internal server error
};

const validateName = (name, arr) => {
  if (!name) {
    throw new ValidationError("Name is required", 400); // bad request
  } else if (arr.find((x) => x.name === name)) {
    throw new ValidationError("Name must be unique", 409); // conflict
  } else {
    return true;
  }
};

const validateNumber = (number) => {
  if (!number) {
    throw new ValidationError("Number is required", 400); // bad request
  } else {
    return true;
  }
};

module.exports = { ValidationError, generateId, validateName, validateNumber };
