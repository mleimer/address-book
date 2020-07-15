import {combineReducers} from 'redux';
import addressBookReducers from './addressBook/addressBookReducers';
import settingsReducers from './settings/settingsReducers';
import navBarReducers from './navBar/navBarReducers';

const rootReducer = combineReducers({
    navBar: navBarReducers,
    addressBook: addressBookReducers,
    settings: settingsReducers
});

export default rootReducer;
