// import {createCards} from './modules/card.js';
import {disableState} from './modules/state.js';
import {loadMap} from './modules/map.js';
import {validateForm} from './modules/user-form.js';

// const ANNOUNCEMENTS_COUNT = 1;
// createCards(ANNOUNCEMENTS_COUNT);

disableState();
loadMap();
validateForm();
