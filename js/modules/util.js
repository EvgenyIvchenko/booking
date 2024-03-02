export const getRandomInteger = (min, max) => {
  if (min < 0) {
    throw new Error('Минимальное число не может быть меньше 0');
  } else if (min > max) {
    throw new Error('Максимальное число не может быть меньше минимального');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFractional = (min, max, fix) => {
  if (min < 0) {
    throw new Error('Минимальное число не может быть меньше 0');
  } else if (min > max) {
    throw new Error('Максимальное число не может быть меньше минимального');
  } else if (fix < 0) {
    throw new Error('Значение не может быть ниже 0');
  }

  const randomNumber = Math.random() * (max - min) + min;
  return +randomNumber.toFixed(fix);
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const createUniqueNumber = (min, max) => {
  const array = [];

  return function() {
    if (array.length >= max) {
      throw new Error('Числа закончились');
    }

    let value = getRandomInteger(min, max);

    if (!array.includes(value)) {
      array.push(value);
    } else {
      while (array.includes(value)) {
        value = getRandomInteger(min, max);

        if (!array.includes(value)) {
          array.push(value);
          break;
        }
      }
    }

    return value;
  };
};
