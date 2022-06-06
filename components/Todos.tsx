import React from 'react';
import Todo, { TodoProps } from './Todo';

type TodosProps = {
    todos: TodoProps[];
};

function Todos(props: TodosProps): JSX.Element {
    console.log('[ Todos ] props ', props);

    const todos = props.todos.map((todo) => <Todo key={todo.id} {...todo} />);
    return <ul>{todos}</ul>;
}

export default Todos;
