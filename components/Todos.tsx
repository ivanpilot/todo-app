import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Todo from './Todo';
import { GET_TODOS } from '../graphql/queries';
import { ITodoFull } from '../interfaces';

type IData = {
    todos: ITodoFull[];
};

function Todos(): JSX.Element {
    const { data, error, loading } = useQuery<ITodoFull[]>(GET_TODOS);

    if (loading) {
        return <P>Loading...</P>;
    }

    if (error) {
        return <P>Oops, something is broken</P>;
    }

    const sorted = (data as unknown as IData).todos
        .slice()
        .sort((a, b) => a.id - b.id);

    const todos = sorted.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
    });

    return <>{todos}</>;
}

const P = styled.p`
    width: 100%;
    text-align: center;
    font-size: 1.9rem;
    font-weight: 400;
    padding: 1.5rem;
    color: rgb(100, 100, 100);
`;

export default Todos;
