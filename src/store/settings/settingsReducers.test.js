import {SET_NATIONALITIES} from './settingsActions';
import settingsReducers from './settingsReducers';

describe('settingsReducers', () => {
    test('should return the initial state with preset nationalities', () => {
        expect(
            settingsReducers(undefined, {})
        ).toEqual(
            {
                nationalities: ['CH', 'ES', 'FR', 'GB']
            }
        );
    });

    describe('SET_NATIONALITIES', () => {
        test('should set the nationalities property', () => {
            const nationalites = ['CH', 'FR'];

            expect(
                settingsReducers({}, {
                    type: SET_NATIONALITIES,
                    values: nationalites
                })
            ).toEqual(
                {
                    nationalities: nationalites
                }
            );
        });
    });
});

