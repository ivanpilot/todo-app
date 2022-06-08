import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { GET_TODOS } from '../graphql/queries';
import { CREATE_TODO } from '../graphql/mutations';

function FormTodo(): JSX.Element {
    const [createTodo] = useMutation(CREATE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    const [todo, setTodo] = useState('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTodo({
            variables: {
                description: todo,
                isCompleted: false,
            },
        });
        setTodo('');
    };

    return (
        <Form name="formTodo" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Enter a new todo"
                value={todo}
                onChange={handleOnChange}
            />
            <Button disabled={!todo} type="submit">
                ADD
            </Button>
        </Form>
    );
}

const Input = styled.input`
    flex-grow: 1;
    font-size: 1.9rem;
    font-weight: 400;
    padding: 1.5rem;
    color: rgb(100, 100, 100);
    background: rgb(235, 235, 235);
    border: none;
    border-radius: 5px;
    &:focus {
        outline: none;
    }

    ::placeholder {
        color: rgb(190, 190, 190);
        font-weight: 300;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 1rem;
    padding: 2rem 0;
`;

const Button = styled.button`
    font-size: 1.9rem;
    font-weight: 400;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    background-color: rgb(25, 181, 234, 80%);
    cursor: pointer;

    &:focus {
        background-color: rgb(25, 181, 234, 100%);
    }

    &:disabled {
        background-color: rgba(25, 181, 234, 30%);
    }
`;

export default FormTodo;
