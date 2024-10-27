const getRandomInteger = function(a,b) {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

function makeUniqueId (array, index, count, a, b) {
  while (index < count) {
    const value = getRandomInteger(a, b);
    if (findDublicatesId(array, value) === 0) {
      array[index] = value;
      index++;
    }
  }
  return array;
}

function findDublicatesId(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return 1;
    }
  }
  return 0;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomArrayElement, makeUniqueId, getRandomInteger};
