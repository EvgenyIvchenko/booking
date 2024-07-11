import {initMap} from './map.js';
import {getData, sendData} from './api.js';
import {initFilter} from './filter.js';
import {renderCard} from './card.js';
import {openLoaderError} from './util.js';
import {initForm} from './form.js';
import {validateForm} from './validation.js';
import {openModalSuccess, openModalError} from './modal.js';
import './preview.js';

const ANNOUNSEMENTS_PATH = 'https://25.javascript.htmlacademy.pro/keksobooking/data';
const ANNOUNSEMENTS_COUNT = 10;
const FORM_PATH = 'https://25.javascript.htmlacademy.pro/keksobooking';

initMap(
  getData,
  ANNOUNSEMENTS_PATH,
  initFilter,
  ANNOUNSEMENTS_COUNT,
  renderCard,
  openLoaderError,
);

initForm(
  validateForm,
  sendData,
  FORM_PATH,
  openModalSuccess,
  openModalError,
);
