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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const uniqueNumber = createUniqueNumber(Avatar.Min, Avatar.Max);

const createAvatarUrl = () => {
  let uniqueNumberFixed = uniqueNumber();

  if (uniqueNumberFixed < 10) {
    uniqueNumberFixed = `0${uniqueNumberFixed}`;
  }

  return `img/avatars/user${uniqueNumberFixed}.png`;
};

const getFeatures = () => {
  const premisesFeatures = [];
  const featuresAmount = getRandomInteger(1, 6);
  let featuresElement = getRandomArrayElement(ADS_FEATURES);

  for (let i = 0; i < featuresAmount; i++) {
    if (!premisesFeatures.includes(featuresElement)) {
      premisesFeatures.push(featuresElement);
    } else {
      while (premisesFeatures.includes(featuresElement)) {
        featuresElement = getRandomArrayElement(ADS_FEATURES);

        if (!premisesFeatures.includes(featuresElement)) {
          premisesFeatures.push(featuresElement);
          break;
        }
      }
    }
  }

  return premisesFeatures;
};

const getPhotos = () => {
  const premisesPhotos = [];
  const photosAmount = getRandomInteger(1, 3);
  let photosElement = getRandomArrayElement(ADS_PHOTOS);

  for (let i = 0; i < photosAmount; i++) {
    if (!premisesPhotos.includes(photosElement)) {
      premisesPhotos.push(photosElement);
    } else {
      while (premisesPhotos.includes(photosElement)) {
        photosElement = getRandomArrayElement(ADS_PHOTOS);

        if (!premisesPhotos.includes(photosElement)) {
          premisesPhotos.push(photosElement);
          break;
        }
      }
    }
  }

  return premisesPhotos;
};

const author = {
  avatar: createAvatarUrl(),
};

const locationAds = {
  lat: getRandomFractional(35.65000, 35.70000, 5),
  lng: getRandomFractional(139.7000, 139.80000, 5),
};

const offer = {
  title: getRandomArrayElement(ADS_TITLES),
  address: `${locationAds.lat}, ${locationAds.lng}`,
  price: getRandomInteger(10000, 100000),
  type: getRandomArrayElement(ADS_TYPE),
  rooms: getRandomInteger(1, 12),
  guests: getRandomInteger(1, 36),
  checkin: getRandomArrayElement(ADS_CHECKIN),
  checkout: getRandomArrayElement(ADS_CHECKOUT),
  features: getFeatures(),
  description: getRandomArrayElement(ADS_DESCRIPTION),
  photos: getPhotos(ADS_PHOTOS),
};

const getAds = () => {
  return {
    author,
    offer,
    locationAds,
  };
};

const ads = Array.from({length: ADS_COUNT}, getAds);

// console.log(ads);
