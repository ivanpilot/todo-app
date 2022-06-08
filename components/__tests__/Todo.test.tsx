import { MockedProvider } from '@apollo/react-testing';
import { create, act } from 'react-test-renderer';
import { render as renderui, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todo';
import wait from 'waait';
import { UPDATE_TODO } from '../../graphql/mutations';

function rendered(ui: JSX.Element, mocks = []) {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            {ui}
        </MockedProvider>
    );
}

describe('Todo', () => {
    let props;

    beforeEach(() => {
        props = {
            sic: '1',
            description: 'workout',
            isCompleted: false,
        };
    });

    it('should render a todo', () => {
        renderui(rendered(<Todo {...props} />));
        const checkbox = screen.getByRole('checkbox');
        const input = screen.getByRole('input');
        const trashIcon = screen.getByRole('button');

        expect(checkbox).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveProperty('disabled', false);
        expect(trashIcon).toBeInTheDocument();
    });

    it('should update the description of a todo', async () => {
        const updatedDescription = 'should rest';
        renderui(rendered(<Todo {...props} />));

        const input = screen.getByRole('input');
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.type(input, updatedDescription);

        expect(
            screen.getByDisplayValue(updatedDescription),
        ).toBeInTheDocument();
    });

    it.skip('should mark the the todo as completed by clicking on the checkbox', async () => {
        let updateMutationCalled = false;
        const todo = {
            id: 1,
            description: 'first todo',
            isCompleted: true,
        };

        const mock = {
            request: {
                query: UPDATE_TODO,
                variables: todo,
            },
            result: () => {
                updateMutationCalled = true;
                return { data: { ...todo, isCompleted: false } };
            },
        };

        let component;
        act(() => {
            component = create(rendered(<Todo {...props} />, [mock]));
        });
        const checkbox = component.root.findByProps({ id: 'check' });
        checkbox.props.onClick();

        await wait(0);
        expect(updateMutationCalled).toBe(true);
    });
});
