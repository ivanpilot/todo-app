import { PrismaClient } from '@prisma/client';
import { reportError } from '../utils';
import { ITodoFull } from '../interfaces';

const Query = {
    todos: async (
        _parent: ITodoFull,
        args: undefined,
        ctx: { prisma: PrismaClient },
    ) => {
        try {
            return await ctx.prisma.todo.findMany();
        } catch (error) {
            const msg = reportError(error);
            console.log('Error querying todos', msg);
            return null;
        }
    },
};

const Mutation = {
    createTodo: async (
        parent: undefined,
        args: { description: string; isCompleted: boolean },
        ctx: { prisma: PrismaClient },
    ) => {
        try {
            return await ctx.prisma.todo.create({ data: args });
        } catch (error) {
            const msg = reportError(error);
            console.log('Error creating todos', msg);
            return null;
        }
    },

    updateTodo: async (
        parent: undefined,
        args: {
            id: number;
            description: string;
            isCompleted: boolean;
        },
        ctx: { prisma: PrismaClient },
    ) => {
        try {
            const { id, description, isCompleted } = args;

            return await ctx.prisma.todo.update({
                where: { id },
                data: { description, isCompleted },
            });
        } catch (error) {
            const msg = reportError(error);
            console.log('Error updating todos', msg);
            return null;
        }
    },

    removeTodo: async (
        parent: undefined,
        args: { id: number },
        ctx: { prisma: PrismaClient },
    ) => {
        try {
            return await ctx.prisma.todo.delete({
                where: args,
            });
        } catch (error) {
            const msg = reportError(error);
            console.log('Error removing todos', msg);
            return null;
        }
    },
};

export const resolvers = {
    Query,
    Mutation,
};
