import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoProps } from '../components/Todo';

type TodosProps = {
    [k: string]: TodoProps;
};

const TodoContext = React.createContext<{
    todos: TodosProps;
    create: (description: string) => void;
    update: (todo: TodoProps) => void;
    remove: (id: string) => void;
}>({
    todos: {},
    create: (description: string) => {
        return;
    },
    update: (todo: TodoProps) => {
        return;
    },
    remove: (id: string) => {
        return;
    },
});

type ChildrenProps = {
    children: React.ReactNode;
};

const one = uuidv4();
const two = uuidv4();
const three = uuidv4();

const initialState = {
    [one]: {
        id: 1,
        uid: one,
        description: 'first todo',
        isCompleted: false,
    },
    [two]: {
        id: 2,
        uid: two,
        description: 'second todo',
        isCompleted: false,
    },
    [three]: {
        id: 3,
        uid: three,
        description: 'third todo',
        isCompleted: false,
    },
};

export const TodoProvider = ({ children }: ChildrenProps) => {
    const [todos, setTodos] = useState<TodosProps>({});

    useEffect(() => {
        setTimeout(() => setTodos(initialState), 3000);
    }, []);

    const create = (description: string) => {
        const newTodo = {
            uid: uuidv4(),
            description,
            isCompleted: false,
        };
        setTodos({ ...todos, [newTodo.uid]: newTodo });
    };

    const update = (todo: TodoProps) => {
        setTodos({ ...todos, [todo.uid]: todo });
    };

    const remove = (uid: string) => {
        const updatedTodos = Object.keys(todos).reduce((acc, key) => {
            if (key === uid) {
                return { ...acc };
            }
            return {
                ...acc,
                [key]: todos[key],
            };
        }, {});
        setTodos(updatedTodos);
    };

    return (
        <TodoContext.Provider value={{ todos, create, update, remove }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
