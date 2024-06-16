import {disableState} from './modules/state.js';
import {validateForm} from './modules/user-form.js';
import {slider} from './modules/slider.js';
import {initMap} from './modules/map.js';

disableState();
validateForm();
slider();
initMap();
