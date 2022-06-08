import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        todos: [Todo]!
    }

    type Mutation {
        createTodo(description: String!, isCompleted: Boolean!): Todo
        updateTodo(id: Int!, description: String!, isCompleted: Boolean!): Todo
        removeTodo(id: Int!): Todo
    }

    type Todo {
        id: Int!
        description: String!
        isCompleted: Boolean!
    }

    type TodoInput {
        description: String!
        isCompleted: Boolean!
    }

    input TodoCreateInput {
        description: String!
        isCompleted: Boolean!
    }

    input TodoUpdateInput {
        id: Int!
        description: String!
        isCompleted: Boolean!
    }
`;
