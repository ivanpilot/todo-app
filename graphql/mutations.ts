import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
    mutation CreateTodo($description: String!, $isCompleted: Boolean!) {
        createTodo(description: $description, isCompleted: $isCompleted) {
            id
            description
            isCompleted
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo(
        $id: Int!
        $description: String!
        $isCompleted: Boolean!
    ) {
        updateTodo(
            id: $id
            description: $description
            isCompleted: $isCompleted
        ) {
            id
            description
            isCompleted
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: Int!) {
        removeTodo(id: $id) {
            id
            description
            isCompleted
        }
    }
`;
