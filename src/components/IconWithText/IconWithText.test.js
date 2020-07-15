import React from 'react';
import {render} from '../../test/testUtils';
import PersonIcon from '@material-ui/icons/Person';
import IconWithText from './index';

const containerId = 'icon-with-text';
const textAndChildrenId = 'text-and-children';

describe('<IconWithText/>', () => {

    test('it should mount', () => {
        const {getByTestId} = render(
            <IconWithText
                data-testid={containerId}
                icon={<PersonIcon/>}
            />
        );

        const containerElement = getByTestId(containerId);

        expect(containerElement).toBeInTheDocument();
    });

    test('it should show text', () => {
        const {getByTestId} = render(
            <IconWithText
                icon={<PersonIcon/>}
                text={'Sample text'}
            />
        );

        const text = getByTestId(textAndChildrenId);

        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent('Sample text');
    });

    test('it should show children', () => {
        const {getByTestId} = render(
            <IconWithText
                icon={<PersonIcon/>}
            >
                <div>
                    <div data-testid="child-1">CHILD 1</div>
                    <div data-testid="child-2">CHILD 2</div>
                </div>
            </IconWithText>
        );

        const overallChildrenText = getByTestId(textAndChildrenId);
        const child1 = getByTestId('child-1');
        const child2 = getByTestId('child-2');

        expect(overallChildrenText).toBeInTheDocument();
        expect(child1).toBeInTheDocument();
        expect(child2).toBeInTheDocument();
        expect(overallChildrenText).toHaveTextContent('CHILD 1CHILD 2');
        expect(child1).toHaveTextContent('CHILD 1');
        expect(child2).toHaveTextContent('CHILD 2');
    });

});
