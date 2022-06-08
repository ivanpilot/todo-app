import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        todos: [Todo]!
    }

    type Mutation {
        createTodo(
            sic: String!
            description: String!
            isCompleted: Boolean!
        ): Todo
        updateTodo(
            id: Int!
            sic: String!
            description: String!
            isCompleted: Boolean!
        ): Todo
        removeTodo(id: Int!): Todo
    }

    type Todo {
        id: Int!
        sic: String!
        description: String!
        isCompleted: Boolean!
    }

    type TodoInput {
        sic: String!
        description: String!
        isCompleted: Boolean!
    }

    input TodoCreateInput {
        sic: String!
        description: String!
        isCompleted: Boolean!
    }

    input TodoUpdateInput {
        id: Int!
        sic: String!
        description: String!
        isCompleted: Boolean!
    }
`;
