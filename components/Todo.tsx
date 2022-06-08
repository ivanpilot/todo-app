import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { GET_TODOS } from '../graphql/queries';
import { UPDATE_TODO, DELETE_TODO } from '../graphql/mutations';
import { ITodoFull } from '../interfaces';

function Todo(props: ITodoFull): JSX.Element {
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    const [todo, setTodo] = useState<ITodoFull>(props);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            description: e.target.value,
        });
    };

    const handleOnBlur = () => {
        if (todo.description === '') {
            setTodo({
                ...todo,
                description: props.description,
            });
        } else {
            updateTodo({
                variables: todo,
            });
        }
    };

    const handleOnClick = () => {
        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
        updateTodo({
            variables: updatedTodo,
        });
        setTodo(updatedTodo);
    };

    const handleDelete = () => {
        deleteTodo({
            variables: { id: todo.id },
        });
    };

    return (
        <Wrapper>
            <Label>
                <input
                    id="check"
                    type="checkbox"
                    onClick={handleOnClick}
                    defaultChecked={todo.isCompleted}
                />
            </Label>
            <InputWrapper>
                <Input
                    role="input"
                    onChange={handleOnChange}
                    value={todo.description}
                    onBlur={handleOnBlur}
                    disabled={todo.isCompleted}
                />
            </InputWrapper>
            <Button onClick={handleDelete}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-item: center;
`;

const InputWrapper = styled.div`
    width: 100%;
    padding: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    padding: 1rem;
    font-family: 'Inter';
    font-size: 1.9rem;
    color: #646464;
    cursor: pointer;
    &:focus {
        background: rgb(245, 245, 245);
        outline: none;
    }

    &:disabled {
        background-color: white;
        text-decoration: line-through;
        cursor: auto;
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Button = styled.button`
    font-size: 2.5rem;
    color: #858585;
    border: none;
    background: none;
    cursor: pointer;
`;

export default Todo;
