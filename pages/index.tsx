import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormTodo from '../components/FormTodo';
import Todos from '../components/Todos';
import { TodoProps } from '../components/Todo';

const db = [
    {
        id: 1,
        description: 'first todo',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: 2,
        description: 'second todo',
        isCompleted: false,
        isEditing: false,
    },
    {
        id: 3,
        description: 'third todo',
        isCompleted: false,
        isEditing: false,
    },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-content: stretch;
    align-items: center;
    padding: 10rem;
    max-width: 900px;
    width: 100%;
    margin: auto;
`;

const H1 = styled.h1`
    font-size: 6rem;
    padding: 2rem 0;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

function Home(): JSX.Element {
    const [todos, setTodos] = useState<TodoProps[] | []>([]);

    useEffect(() => {
        setTimeout(() => setTodos(db), 3000);
    }, []);

    const addTodo = (todo: TodoProps) => {
        setTodos([...todos, { id: todos.length + 1, ...todo }]);
    };

    return (
        <Container>
            <H1>Task List</H1>
            <Wrapper>
                <FormTodo handleSubmit={addTodo} />
                <Todos todos={todos} />
            </Wrapper>
        </Container>
    );
}

export default Home;
