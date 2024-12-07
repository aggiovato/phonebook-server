// This function generates a ID for a new person

const generateId = (arr) => {
  const maxId = arr.length > 0 ? Math.max(...arr.map((x) => x.id)) : 0;
  return maxId;
};

module.exports = generateId;
