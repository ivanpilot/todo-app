import { MockedProvider } from '@apollo/react-testing';
import Todos from '../Todos';
import { create, act } from 'react-test-renderer';
import wait from 'waait';

import { GET_TODOS } from '../../graphql/queries';

function render(ui: JSX.Element, mocks = []) {
    return create(
        <MockedProvider mocks={mocks} addTypename={false}>
            {ui}
        </MockedProvider>,
    );
}

describe('Todo', () => {
    it('should render a loading state when no todos yet', () => {
        let component;
        act(() => {
            component = render(<Todos />);
        });
        const tree = component.toJSON();
        expect(tree.children).toContain('Loading...');
    });

    it('should display an error on the UI', async () => {
        const mock = {
            request: {
                query: GET_TODOS,
            },
            error: new Error(),
        };

        let component;
        act(() => {
            component = render(<Todos />, [mock]);
        });

        await wait(0);
        const tree = component.toJSON();
        expect(tree.children).toContain('Oops, something is broken');
    });
});
