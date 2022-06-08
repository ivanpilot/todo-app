import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query todos {
        todos {
            id
            sic
            description
            isCompleted
        }
    }
`;