import React from 'react';
import Todo, { TodoProps } from './Todo';

type TodosProps = {
    todos: TodoProps[];
};

function Todos(props: TodosProps): JSX.Element {
    const todos = props.todos.map((todo) => <Todo key={todo.id} {...todo} />);
    return <>{todos}</>;
}

export default Todos;
