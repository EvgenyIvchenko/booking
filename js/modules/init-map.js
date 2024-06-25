import { data } from './data.js';
import { state } from './state.js';
import { createCard } from './create-card.js';
import { createLoader } from './create-loader.js';
import { createLoaderError } from './util.js';

const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');

export const initMap = () => {
  const map = L.map('map-canvas').on('load', () => {
    state.enableState();
    addressElement.value = `${data.map.mainPin.lat}, ${data.map.mainPin.lng}`;
  }).setView({
    lat: data.map.mainPin.lat,
    lng: data.map.mainPin.lng,
  }, data.map.zoom);

  L.tileLayer(data.map.tileLayer.template, { attribution: data.map.tileLayer.attribution }).addTo(map);

  const mainPinIcon = L.icon ({
    iconUrl: data.map.mainPin.iconUrl,
    iconSize: data.map.mainPin.iconSize,
    iconAnchor: data.map.mainPin.iconAnchor,
  });

  const pinIcon = L.icon ({
    iconUrl: data.map.pin.iconUrl,
    iconSize: data.map.pin.iconSize,
    iconAnchor: data.map.pin.iconAnchor,
  });

  const mainPinMarker = L.marker(
    { lat: data.map.mainPin.lat, lng: data.map.mainPin.lng },
    { draggable: true, icon: mainPinIcon },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (e) => {
    addressElement.value = `${e.target.getLatLng().lat.toFixed(5)}, ${e.target.getLatLng().lng.toFixed(5)}`;
  });

  resetElement.addEventListener('click', (e) => {
    e.preventDefault();
    addressElement.value = `${data.map.mainPin.lat}, ${data.map.mainPin.lng}`;
    map.setView({ lat: data.map.mainPin.lat, lng: data.map.mainPin.lng }, data.map.zoom);
    mainPinMarker.setLatLng({ lat: data.map.mainPin.lat, lng: data.map.mainPin.lng });
    map.closePopup();
  });

  const createAnnouncements = (announcements) => {
    announcements.forEach((announcement) => {
      const {lat, lng} = announcement.location;
      const marker = L.marker({ lat, lng }, { icon: pinIcon });

      marker.addTo(map).bindPopup(createCard(announcement));
    });
  };

  const loadAnnouncements = createLoader(
    data.RequestPath.ANNOUNSEMENTS,
    createAnnouncements,
    createLoaderError,
  );

  loadAnnouncements();
};
