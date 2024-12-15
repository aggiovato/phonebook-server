// Store to manipulate the total

let total = 0;

// GETTER
const getTotal = () => total;

// SETTER
const setTotal = (newTotal) => {
  total = newTotal;
};

// ADDER
const addOneTotal = () => {
  total += 1;
};

// DELETER
const deleteOneTotal = () => {
  total -= 1;
};

module.exports = {
  getTotal,
  setTotal,
  addOneTotal,
  deleteOneTotal,
};
