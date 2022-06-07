import { PrismaClient } from '@prisma/client';
import { todos } from '../data';

const prisma = new PrismaClient();

async function seed() {
    return await prisma.todo.createMany({
        data: todos,
    });
}

seed()
    .catch((err) => {
        console.log('Error while seeding database', err.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
