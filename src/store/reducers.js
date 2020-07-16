import {combineReducers} from 'redux';
import addressBookReducers from './addressBook/addressBookReducers';
import settingsReducers from './settings/settingsReducers';
import appBarReducers from './appBar/appBarReducers';

const rootReducer = combineReducers({
    appBar: appBarReducers,
    addressBook: addressBookReducers,
    settings: settingsReducers
});

export default rootReducer;
