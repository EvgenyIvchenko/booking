import {createCards} from './modules/card.js';
import { disableState, enableState } from './modules/state.js';
import './modules/user-form.js';

const ANNOUNCEMENTS_COUNT = 1;

createCards(ANNOUNCEMENTS_COUNT);

disableState();
enableState();
