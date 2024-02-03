const getRandomIntInclusive = (min, max) => {
  if (min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  console.log('соррян, это не то');
};

console.log(getRandomIntInclusive(0, 100));

const getRandomArbitraryInclusive = (min, max, fix) => {
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(fix);
};

console.log(getRandomArbitraryInclusive(3, 25, 5));
