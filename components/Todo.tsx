import React, { useContext, useState } from 'react';
import TodoContext from '../context/TodoContext';
import styled from 'styled-components';

export type TodoProps = {
    id?: string | number;
    uid: string;
    description: string;
    isCompleted: boolean;
};

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

function Todo(props: TodoProps): JSX.Element {
    const store = useContext(TodoContext);
    const [todo, setTodo] = useState<TodoProps>(props);

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
            store.update(todo);
        }
    };

    const handleOnClick = () => {
        setTodo({ ...todo, isCompleted: !todo.isCompleted });
        store.update(todo);
    };

    const handleDelete = () => {
        store.remove(todo.uid);
    };

    return (
        <Wrapper>
            <Label>
                <input type="checkbox" onClick={handleOnClick} />
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

export default Todo;
