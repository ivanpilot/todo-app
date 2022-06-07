import React, { useContext } from 'react';
import Todo from './Todo';
import TodoContext from '../context/TodoContext';

function Todos(): JSX.Element {
    const store = useContext(TodoContext);

    const todos = Object.keys(store.todos).map((key) => {
        const todo = store.todos[key];
        return <Todo key={todo.uid} {...todo} />;
    });

    return <>{todos}</>;
}

export default Todos;
