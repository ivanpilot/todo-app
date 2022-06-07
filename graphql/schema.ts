import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Todo {
        id: Int
        sic: String
        description: String
        isCompleted: Boolean
    }

    type Query {
        todos: [Todo]
    }
`;
