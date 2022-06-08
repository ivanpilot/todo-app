import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { gql, useQuery } from '@apollo/client';
import { TodoProps } from '../components/Todo';

type TodosProps = {
    [k: string]: TodoProps;
};

type ChildrenProps = {
    children: React.ReactNode;
};

// const one = uuidv4();
// const two = uuidv4();
// const three = uuidv4();

// const initialState = {
//     [one]: {
//         id: 1,
//         sic: one,
//         description: 'first todo',
//         isCompleted: false,
//     },
//     [two]: {
//         id: 2,
//         sic: two,
//         description: 'second todo',
//         isCompleted: false,
//     },
//     [three]: {
//         id: 3,
//         sic: three,
//         description: 'third todo',
//         isCompleted: false,
//     },
// };

const TodoContext = React.createContext<{
    todos: TodosProps[];
    create: (description: string) => void;
    update: (todo: TodoProps) => void;
    remove: (id: string) => void;
}>({
    todos: [],
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

const TODOS = gql`
    query todos {
        todos {
            id
            sic
            description
            isCompleted
        }
    }
`;

const P = styled.p`
    width: 100%;
    text-align: center;
    font-size: 1.9rem;
    font-weight: 400;
    padding: 1.5rem;
    color: rgb(100, 100, 100);
`;

export const TodoProvider = ({ children }: ChildrenProps) => {
    const { data, error, loading } = useQuery(TODOS);
    const [todos, setTodos] = useState<TodosProps>({});

    // useEffect(() => {
    //     setTimeout(() => setTodos(initialState), 3000);
    // }, []);

    const create = (description: string) => {
        const newTodo = {
            sic: uuidv4(),
            description,
            isCompleted: false,
        };
        // setTodos({ ...todos, [newTodo.sic]: newTodo });
        console.log('CREATE');
    };

    const update = (todo: TodoProps) => {
        // setTodos({ ...todos, [todo.sic]: todo });
        console.log('UPDATE');
    };

    const remove = (sic: string) => {
        const updatedTodos = Object.keys(todos).reduce((acc, key) => {
            if (key === sic) {
                return { ...acc };
            }
            return {
                ...acc,
                [key]: todos[key],
            };
        }, {});
        // setTodos(updatedTodos);
        console.log('REMOVE');
    };

    if (loading) {
        return <P>Loading...</P>;
    }

    if (error) {
        return <P>Oops, something is broken</P>;
    }

    return (
        <TodoContext.Provider
            value={{ todos: data.todos, create, update, remove }}
        >
            {children}
        </TodoContext.Provider>
    );
};
// export const TodoProvider = ({ children }: ChildrenProps) => {
//     const { data, error, loading } = useQuery(todosQuery);
//     const [todos, setTodos] = useState<TodosProps>({});

//     useEffect(() => {
//         setTimeout(() => setTodos(initialState), 3000);
//     }, []);

//     const create = (description: string) => {
//         const newTodo = {
//             sic: uuidv4(),
//             description,
//             isCompleted: false,
//         };
//         setTodos({ ...todos, [newTodo.sic]: newTodo });
//     };

//     const update = (todo: TodoProps) => {
//         setTodos({ ...todos, [todo.sic]: todo });
//     };

//     const remove = (sic: string) => {
//         const updatedTodos = Object.keys(todos).reduce((acc, key) => {
//             if (key === sic) {
//                 return { ...acc };
//             }
//             return {
//                 ...acc,
//                 [key]: todos[key],
//             };
//         }, {});
//         setTodos(updatedTodos);
//     };

//     return (
//         <TodoContext.Provider value={{ todos, create, update, remove }}>
//             {children}
//         </TodoContext.Provider>
//     );
// };

export default TodoContext;
