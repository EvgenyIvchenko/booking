import { enableState } from './state.js';
import { createCard } from './card.js';
import { createLoader } from './load.js';
import { showAlert } from './util.js';

const address = document.querySelector('#address');

const announcementsData = {
  path: 'https://25.javascript.htmlacademy.pro/keksobooking/data',
  method: 'GET',
};

export const startCoordinates = {
  lat: 35.68948,
  lng: 139.69170,
};

export const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableState();
      address.value = `${startCoordinates.lat.toFixed(5)}, ${startCoordinates.lng.toFixed(5)}`;
    }).setView({
      lat: startCoordinates.lat,
      lng: startCoordinates.lng,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon ({
    iconUrl: '../../img/avatars/main-pin.svg',
    iconSize: [52,52],
    iconAnchor: [26,52],
  });

  const pinIcon = L.icon ({
    iconUrl: '../../img/avatars/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,40],
  });

  const mainPinMarker = L.marker(
    {
      lat: startCoordinates.lat,
      lng: startCoordinates.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  const createAnnouncements = (announcements) => {
    announcements.forEach((announcement) => {
      const {lat, lng} = announcement.location;

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: pinIcon,
        }
      );

      marker.addTo(map)
        .bindPopup(createCard(announcement));
    });
  };

  const loadAnnouncements = createLoader(announcementsData.path, announcementsData.method, createAnnouncements, showAlert);
  loadAnnouncements();
};
