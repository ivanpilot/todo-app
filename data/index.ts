import { v4 as uuidv4 } from 'uuid';

const one = uuidv4();
const two = uuidv4();
const three = uuidv4();

export const todos = [
    {
        id: 1,
        sic: one,
        description: 'first todo',
        isCompleted: false,
    },
    {
        id: 2,
        sic: two,
        description: 'second todo',
        isCompleted: false,
    },
    {
        id: 3,
        sic: three,
        description: 'third todo',
        isCompleted: false,
    },
];
