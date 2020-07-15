import {combineReducers} from 'redux';
import addressBookReducers from './addressBook/addressBookReducers';
import settingsReducers from './settings/settingsReducers';

const rootReducer = combineReducers({
    addressBook: addressBookReducers,
    settings: settingsReducers
});

export default rootReducer;
