import { MockedProvider } from '@apollo/react-testing';
import { render as renderui, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTodo from '../FormTodo';

function rendered(ui: JSX.Element, mocks = []) {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            {ui}
        </MockedProvider>
    );
}

describe('FormTodo', () => {
    it('should render a form with disabled add button', () => {
        renderui(rendered(<FormTodo />));

        const form = screen.getByRole('form');
        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        const button = screen.getByRole('button', { name: /add/i });

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveProperty('disabled', true);
    });

    it('should enabled add button', async () => {
        renderui(rendered(<FormTodo />));

        const input = screen.getByPlaceholderText(/Enter a new todo/i);
        await userEvent.type(input, 'must work out');

        expect(screen.getByRole('button', { name: /add/i })).toHaveProperty(
            'disabled',
            false,
        );
    });

    it.skip('should submit form', async () => {
        // check for mutation to be triggered
    });
});
