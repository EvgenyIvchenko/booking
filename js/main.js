const getRandomInteger = (min, max) => {
  if (min < 0) {
    throw new Error('Минимальное число не может быть меньше 0');
  } else if (min > max) {
    throw new Error('Максимальное число не может быть меньше минимального');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFractional = (min, max, fix) => {
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

const Avatar = {
  Min: 1,
  Max: 10,
};

const createUniqueNumber = (min, max) => {
  const array = [];

  return function() {
    if (array.length >= max) {
      throw new Error('Числа закончились');
    }

    let value = getRandomInteger(min, max);

    if (!array.includes(value)) {
      array.push(value);
    } else {
      while(array.includes(value)) {
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

const uniqueNumber = createUniqueNumber(Avatar.Min, Avatar.Max);


const createAvatarUrl = () => {
  let uniqueNumberFixed = uniqueNumber();

  if (uniqueNumberFixed < 10) {
    uniqueNumberFixed = `0${uniqueNumberFixed}`;
  }

  return `img/avatars/user${uniqueNumberFixed}.png`;
};

console.log(createAvatarAdress());
