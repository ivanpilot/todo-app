import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todo';
import TodoContext from '../../context/TodoContext';

function render(ui: JSX.Element, store = {}) {
    return rtlRender(
        <TodoContext.Provider value={store}>{ui}</TodoContext.Provider>,
    );
}

describe('Todo', () => {
    const props = {
        sic: '1',
        description: 'workout',
        isCompleted: false,
    };

    const store = {
        create: jest.fn(),
        remove: jest.fn(),
        update: jest.fn(),
        todos: { [props.sic]: props },
    };

    it('should render a todo', () => {
        render(<Todo {...props} />);
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
        render(<Todo {...props} />, store);

        const input = screen.getByRole('input');
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.type(input, updatedDescription);

        expect(
            screen.getByDisplayValue(updatedDescription),
        ).toBeInTheDocument();
        //should test when user focus out
    });

    it('should mark the the todo as completed by clicking on the checkbox', async () => {
        render(<Todo {...props} />, store);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        const input = screen.getByRole('input');
        expect(input).toHaveProperty('disabled', true);
        expect(store.update).toHaveBeenCalledTimes(1);
        expect(store.update).toHaveBeenCalledWith(props);
    });

    it('should remove a todo from the list', async () => {
        render(<Todo {...props} />, store);

        const trashIcon = screen.getByRole('button');
        await userEvent.click(trashIcon);
        // testing the call to remove as should test the absence of the component from another component
        expect(store.remove).toHaveBeenCalledTimes(1);
        expect(store.remove).toHaveBeenCalledWith(props.sic);
    });
});
