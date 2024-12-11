// Store to manipulate the persons array

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

// GETTER
const getPersons = () => persons;

// ADDER
const addPerson = (person) => {
  persons = persons.concat(person);
};

// DELETER
const deletePerson = (id) => {
  persons = persons.filter((p) => p.id !== id);
};

module.exports = {
  getPersons,
  addPerson,
  deletePerson,
};
