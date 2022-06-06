import React, { useState } from 'react';

type FormProps = {
    handleSubmit: (data: any) => void;
};

function FormTodo(props: FormProps): JSX.Element {
    const [todo, setTodo] = useState('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handleSubmit({
            description: todo,
            isCompleted: false,
            isEditing: false,
        });
        setTodo('');
    };

    return (
        <form name="formTodo" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a new todo"
                value={todo}
                onChange={handleOnChange}
            />
            <button disabled={!todo} type="submit">
                ADD
            </button>
        </form>
    );
}

export default FormTodo;
