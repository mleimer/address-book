import {SET_SEARCH} from './navBarActions';

const initialSettingsState = {
    search: ''
};

function navBarReducers(state = initialSettingsState, action) {
    switch (action.type) {
        case SET_SEARCH: {
            return {
                ...state,
                search: action.value
            };
        }
        default:
            return state;
    }
}

export default navBarReducers;
