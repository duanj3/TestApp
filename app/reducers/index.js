import { combineReducers } from 'redux';

import currencies from './currencies';
import nav from './nav';

export default combineReducers({
    currencies,
    nav,
});