import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const layouts = await prisma.layout.findMany({
        include: { slots: true }
    });
    console.log(JSON.stringify(layouts, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
