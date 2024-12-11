const getInfo = () => {
  window.location.href = "/info";
};

const getAllPersons = () => {
  window.location.href = "/api/persons";
};

const getPersonById = () => {
  window.location.href = `/api/persons/1`;
};

const createPerson = () => {
  window.location.href = "/api/persons";
};

const deletePersonById = () => {
  window.location.href = `/api/persons/1`;
};

const updatePersonById = () => {
  window.location.href = `/api/persons/1`;
};

const buttons = {
  getInfo,
  getAllPersons,
  getPersonById,
  createPerson,
  deletePersonById,
  updatePersonById,
};
module.exports = buttons;
