import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'], // add 'query' in local debugging if you want
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
