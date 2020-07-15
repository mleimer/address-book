import {SET_NATIONALITIES} from './settingsActions';
import {NATIONALITIES} from '../../common/nationalities';

const initialSettingsState = {
    nationalities: NATIONALITIES.map(n => n.key)
};

function settingsReducers(state = initialSettingsState, action) {
    switch (action.type) {
        case SET_NATIONALITIES: {
            return {
                ...state,
                nationalities: action.values
            };
        }
        default:
            return state;
    }
}

export default settingsReducers;
