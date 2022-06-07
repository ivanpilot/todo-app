import prisma from '../lib/prisma';
import { reportError } from '../utils';
import { ITodo } from './interfaces';

export const resolvers = {
    Query: {
        todos: async (_parent: ITodo, args: undefined, ctx) => {
            try {
                // console.log('_parent ', _parent);
                // console.log('args ', args);
                // console.log('ctx ', ctx);
                return await ctx.prisma.todo.findMany();
            } catch (error) {
                const msg = reportError(error);
                console.log('Error querying todos', msg);
                return null;
            }
        },
    },
};
