import {SET_NATIONALITIES, setNationalities} from './settingsActions';

describe('settings actions', () => {

    describe('setNationalities', () => {
        test('should dispatch SET_NATIONALITIES with nationalities as values', () => {
            const nationalities = ['ES', 'GB'];
            const expectedAction = {
                type: SET_NATIONALITIES,
                values: nationalities
            };
            expect(setNationalities(nationalities)).toEqual(expectedAction);
        });
    });

});
