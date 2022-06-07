import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTodo from '../FormTodo';
import TodoContext from '../../context/TodoContext';

function render(ui: JSX.Element, store = {}) {
    return rtlRender(
        <TodoContext.Provider value={store}>{ui}</TodoContext.Provider>,
    );
}

describe('FormTodo', () => {
    const store = {
        create: jest.fn(),
        remove: jest.fn(),
        update: jest.fn(),
        todos: {},
    };

    it('should render a form with disabled add button', () => {
        render(<FormTodo />);

        const form = screen.getByRole('form');
        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        const button = screen.getByRole('button', { name: /add/i });

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveProperty('disabled', true);
    });

    it('should enabled add button', async () => {
        render(<FormTodo />);

        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        await userEvent.type(input, 'must work out');

        expect(screen.getByRole('button', { name: /add/i })).toHaveProperty(
            'disabled',
            false,
        );
    });

    it('should submit form', async () => {
        const output = {
            uid: '1',
            description: 'must work out',
            isCompleted: false,
        };

        render(<FormTodo />, store);

        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        await userEvent.type(input, output.description);

        const button = screen.getByRole('button', { name: /add/i });
        await userEvent.click(button);
        expect(store.create).toHaveBeenCalledTimes(1);
        expect(store.create).toHaveBeenCalledWith(output.description);
    });
});
