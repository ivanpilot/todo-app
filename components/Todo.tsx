import React from 'react';

export type TodoProps = {
    id?: string | number;
    description: string;
    isCompleted: boolean;
    isEditing: boolean;
};

function Todo(props: TodoProps): JSX.Element {
    return <li>{props.description}</li>;
}

export default Todo;
