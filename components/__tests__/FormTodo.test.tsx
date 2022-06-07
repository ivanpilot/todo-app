import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTodo from '../FormTodo';

describe('FormTodo', () => {
    it('should render a form with disabled add button', () => {
        const onSubmitMock = jest.fn();
        render(<FormTodo handleSubmit={onSubmitMock} />);

        const form = screen.getByRole('form');
        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        const button = screen.getByRole('button', { name: /add/i });

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveProperty('disabled', true);
    });

    it('should enabled add button', async () => {
        const onSubmitMock = jest.fn();
        render(<FormTodo handleSubmit={onSubmitMock} />);

        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        await userEvent.type(input, 'must work out');

        expect(screen.getByRole('button', { name: /add/i })).toHaveProperty(
            'disabled',
            false,
        );
    });

    it('should submit form', async () => {
        const output = {
            description: 'must work out',
            isCompleted: false,
        };
        const onSubmitMock = jest.fn();
        render(<FormTodo handleSubmit={onSubmitMock} />);

        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        await userEvent.type(input, output.description);

        const button = screen.getByRole('button', { name: /add/i });
        await userEvent.click(button);

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith(output);
    });
});
