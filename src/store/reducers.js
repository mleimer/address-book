import {combineReducers} from 'redux';
import addressBookReducers from './addressBook/addressBookReducers';

const rootReducer = combineReducers({
    addressBook: addressBookReducers
});

export default rootReducer;
