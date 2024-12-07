const renderInfo = (numPeople, date) => {
  return `
    <p>Phonebook has info for ${numPeople} people</p>
    <p>Last request: ${date}</p>
    `;
};

module.exports = renderInfo;
