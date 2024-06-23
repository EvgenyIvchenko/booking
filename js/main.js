import { state } from './modules/state.js';
import { initMap } from './modules/init-map.js';
import { initForm } from './modules/init-form.js';
import { initSlider } from './modules/init-slider.js';

state.disableState();
initSlider();
initForm();
initMap();
