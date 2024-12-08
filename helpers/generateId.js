// This function generates a ID for a new person

const generateId = (arr, max = 1000) => {
  const arrIds = new Set(arr.map((x) => parseInt(x.id)));

  for (let i = 0; i < max; i++) {
    const id = Math.floor(Math.random() * max) + 1;
    if (!arrIds.has(id)) {
      return id;
    }
  }

  throw new Error("Could not generate a unique ID");
};

module.exports = generateId;
