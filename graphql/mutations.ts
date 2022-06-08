import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
    mutation CreateTodo(
        $sic: String!
        $description: String!
        $isCompleted: Boolean!
    ) {
        createTodo(
            sic: $sic
            description: $description
            isCompleted: $isCompleted
        ) {
            id
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo(
        $id: Int!
        $sic: String!
        $description: String!
        $isCompleted: Boolean!
    ) {
        updateTodo(
            id: $id
            sic: $sic
            description: $description
            isCompleted: $isCompleted
        ) {
            id
            sic
            description
            isCompleted
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: Int!) {
        removeTodo(id: $id) {
            id
            sic
            description
            isCompleted
        }
    }
`;
