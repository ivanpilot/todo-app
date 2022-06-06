import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import FormTodo from '../FormTodo';

test('renders a form input', () => {
    const submit = (data) => console.log('mocked data', data);
    render(<FormTodo handleSubmit={submit} />);
    // screen.debug();

    const form = screen.getByRole('form');
    const input = screen.getByPlaceholderText(/Enter a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
});
