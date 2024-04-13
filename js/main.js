import {createCards} from './modules/card.js';
import {
  disableState,
  // enableState,
  // enableState,
} from './modules/state.js';

const ANNOUNCEMENTS_COUNT = 0;

createCards(ANNOUNCEMENTS_COUNT);

disableState();
