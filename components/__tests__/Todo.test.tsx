import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Todo';

describe('Todo', () => {
    const props = {
        id: '1',
        description: 'workout',
        isCompleted: false,
    };
    it('should render a todo', () => {
        render(<Todo {...props} />);
        const checkbox = screen.getByRole('checkbox');
        const todo = screen.getByPlaceholderText(props.description);
        const trashIcon = screen.getByRole('button');

        expect(checkbox).toBeInTheDocument();
        expect(todo).toBeInTheDocument();
        expect(todo).toHaveProperty('disabled', false);
        expect(trashIcon).toBeInTheDocument();
    });

    it('should update the description of a todo', async () => {
        const updatedDescription = 'should rest';
        render(<Todo {...props} />);

        const todo = screen.getByPlaceholderText(props.description);
        await userEvent.click(todo);
        await userEvent.clear(todo);
        await userEvent.type(todo, updatedDescription);

        expect(
            screen.getByPlaceholderText(updatedDescription),
        ).toBeInTheDocument();
        // check when calling dispatch
    });

    it('should mark the the todo as completed', async () => {
        render(<Todo {...props} />);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        const todo = screen.getByPlaceholderText(props.description);
        expect(todo).toHaveProperty('disabled', true);
        // check when calling dispatch
    });

    it('should remove a todo from the list', async () => {
        render(<Todo {...props} />);

        const trashIcon = screen.getByRole('button');
        await userEvent.click(trashIcon);
        // use Query since it is expected to be null
        const todo = screen.queryByPlaceholderText(props.description);
        expect(todo).toBeNull();
        // check when calling dispatch
    });
});
