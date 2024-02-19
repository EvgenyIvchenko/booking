const ADS_TITLES = [
  'Сдам однушку',
  'Продам двушку',
  'Обменяю трёхкомнатную',
  'Сдам евро-двушку',
  'Евро-трёшка в аренду',
  'Продаётся дом',
  'Аренда пентхауса',
  'Сдаётся вилла',
  'Продам дворец',
  'Замок в аренду',
];

const ADS_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ADS_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const ADS_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const ADS_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const ADS_DESCRIPTION = [
  'Прекрасное помещение',
  'Просторные комнаты',
  'Естесственное освещение',
  'Большая кухня',
  'Французский стеклопакет',
  'Добрая консьержка',
  'Злые соседи',
  'Высокие потолки',
  'Свежий ремонт',
  'Вместительный гардероб',
];

const ADS_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ADS_COUNT = 10;

const Avatar = {
  Min: 1,
  Max: 10,
};

const Location = {
  LatMin: 35.65000,
  LatMax: 35.70000,
  LngMin: 139.70000,
  LngMax: 139.80000,
  Float: 5,
};

const Price = {
  Min: 10000,
  Max: 1000000,
};

const Rooms = {
  Min: 1,
  Max: 5,
};

const Guests = {
  Min: 1,
  Max: 5,
};

// функция для сортировки массива
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

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

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

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

const uniqueAvatarNumber = createUniqueNumber(Avatar.Min, Avatar.Max);

const createAvatar = () => {
  const number = uniqueAvatarNumber();
  return number < 10 ? `img/avatars/user0${number}.png` : `img/avatars/user${number}.png`;
};

const createLat = () => getRandomFractional(Location.LatMin, Location.LatMax, Location.Float);
const createLng = () => getRandomFractional(Location.LngMin, Location.LngMax, Location.Float);

const createFeatures = () => shuffle(Array.from(ADS_FEATURES)).slice(0, getRandomInteger(1, ADS_FEATURES.length));
const createPhotos = () => shuffle(Array.from(ADS_PHOTOS)).slice(0, getRandomInteger(1, ADS_PHOTOS.length));

const createAnnouncement = () => ({
  author: {
    avatar: createAvatar(),
  },
  offer: {
    title: getRandomArrayElement(ADS_TITLES),
    address: `${createLat()}, ${createLng()}`,
    price: getRandomInteger(Price.Min, Price.Max),
    type: getRandomArrayElement(ADS_TYPE),
    rooms: getRandomInteger(Rooms.Min, Rooms.Max),
    guests: getRandomInteger(Guests.Min, Guests.Max),
    checkin: getRandomArrayElement(ADS_CHECKIN),
    checkout: getRandomArrayElement(ADS_CHECKOUT),
    features: createFeatures(),
    description: getRandomArrayElement(ADS_DESCRIPTION),
    photos: createPhotos(ADS_PHOTOS),
  },
  location: {
    lat: createLat(),
    lng: createLng(),
  },
});

const createAnnouncements = () => Array.from({length: ADS_COUNT}, createAnnouncement);

console.log(createAnnouncements());
