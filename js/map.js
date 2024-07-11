import { switchInactiveState, switchActiveState } from './state.js';
import { debounce } from './util.js';

const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');
const ZOOM = 12;
const RERENDER_COUNT = 500;
const avatarPreview = document.querySelector('.ad-form-header__preview-pic');
const photoPreview = document.querySelector('.ad-form__photo');


const mainPin = {
  lat: 35.68948,
  lng: 139.69170,
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const pin = {
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const tileLayer = {
  template: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

switchInactiveState();

const map = L.map('map-canvas').on('load', () => {
  switchActiveState();
  addressElement.value = `${mainPin.lat}, ${mainPin.lng}`;
}).setView({
  lat: mainPin.lat,
  lng: mainPin.lng,
}, ZOOM);

L.tileLayer(tileLayer.template, {attribution: tileLayer.attribution}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainPin.iconUrl,
  iconSize: mainPin.iconSize,
  iconAnchor: mainPin.iconAnchor,
});

const pinIcon = L.icon({
  iconUrl: pin.iconUrl,
  iconSize: pin.iconSize,
  iconAnchor: pin.iconAnchor,
});

const mainPinMarker = L.marker(
  {lat: mainPin.lat, lng: mainPin.lng},
  {draggable: true, icon: mainPinIcon},
);

mainPinMarker.addTo(map);

function onMainPinMarkerMoveend(e) {
  const lat = e.target.getLatLng().lat.toFixed(5);
  const lng = e.target.getLatLng().lng.toFixed(5);
  addressElement.value = `${lat},${lng}`;
}

mainPinMarker.on('moveend', onMainPinMarkerMoveend);

const markersGroup = L.layerGroup().addTo(map);

function renderMarkers(announcements, announcementsCount, renderCard) {
  markersGroup.clearLayers();

  announcements.slice(0, announcementsCount).forEach((announcement) => {
    const {lat, lng} = announcement.location;
    const marker = L.marker({lat, lng}, {icon: pinIcon});

    marker.addTo(markersGroup).bindPopup(renderCard(announcement));
  });
}

function createAnnouncements(announcements, announcementsCount, renderCard) {
  renderMarkers(announcements, announcementsCount, renderCard);

  function onResetClick(e) {
    e.preventDefault();
    addressElement.value = `${mainPin.lat}, ${mainPin.lng}`;
    map.setView({lat: mainPin.lat, lng: mainPin.lng}, ZOOM);
    mainPinMarker.setLatLng({lat: mainPin.lat, lng: mainPin.lng});
    map.closePopup();
    renderMarkers(announcements, announcementsCount, renderCard);
    avatarPreview.src = 'img/muffin-grey.svg';
    photoPreview.style.backgroundImage = '';
  }

  resetElement.addEventListener('click', onResetClick);
}

function initMap(getData, path, initFilter, announcementsCount, renderCard, openLoaderError) {
  getData(
    path,
    (data) => {
      initFilter(data, (debounce((announcements) => renderMarkers(announcements, announcementsCount, renderCard), RERENDER_COUNT)));
      createAnnouncements(data, announcementsCount, renderCard);
    },
    openLoaderError
  );
}

export {initMap};
