export const data = {
  form: {
    titleCount: {
      min: 30,
      max: 100,
    },
    PRICE_MAX: 100000,
    roomsCapacity: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0'],
    },
    houseType: {
      'bungalow' : '0',
      'flat' : '1000',
      'hotel' : '3000',
      'house' : '5000',
      'palace': '10000',
    },
  },
  card: {
    photo: {
      width: '40',
      height: '40',
      alt: 'Фотография жилья',
    },
    PopupType: {
      FLAT: 'Квартира',
      BUNGALOW: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец',
      HOTEL: 'Отель',
    },
  },
  filter: {
    OFFER_COUNT: '10',
    PRICE: {
      LOW: 10000,
      HIGH: 50000,
    },
  },
  RequestPath: {
    ANNOUNSEMENTS: 'https://25.javascript.htmlacademy.pro/keksobooking/data',
    AD_FORM: 'https://25.javascript.htmlacademy.pro/keksobooking',
  },
  map: {
    zoom: 12,
    mainPin: {
      lat: 35.68948,
      lng: 139.69170,
      iconUrl: '../../img/avatars/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    },
    pin: {
      iconUrl: '../../img/avatars/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
    tileLayer: {
      template: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  },
};
