import {SET_SEARCH} from './appBarActions';

const initialSettingsState = {
    search: ''
};

function appBarReducers(state = initialSettingsState, action) {
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

export default appBarReducers;
