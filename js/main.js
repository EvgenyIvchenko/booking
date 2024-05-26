import {createAnnouncements} from './modules/data.js';
import {validateForm} from './modules/user-form.js';
import {disableState} from './modules/state.js';
import {initMap} from './modules/map.js';

const ANNOUNCEMENTS_COUNT = 10;
const announcements = createAnnouncements(ANNOUNCEMENTS_COUNT);

validateForm();
disableState();
initMap(announcements);
