export const resolvers = {
    Query: {
        todos() {
            return [
                {
                    id: 1,
                    sic: 'bf8aff55-657f-4d4e-a2ef-6348e83bbdf7',
                    description: 'first todo',
                    isCompleted: false,
                },
                {
                    id: 2,
                    sic: 'b29da053-a34d-49d8-899b-39a1ebaa3eaa',
                    description: 'second todo',
                    isCompleted: false,
                },
                {
                    id: 3,
                    sic: '68f9240a-8a36-4956-81c8-bd04d93f86ce',
                    description: 'third todo',
                    isCompleted: false,
                },
            ];
        },
    },
};
