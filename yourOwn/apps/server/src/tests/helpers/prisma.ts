import { execa } from 'execa';
import { PrismaClient } from '@prisma/client';

export async function initPrisma(DATABASE_URL: string) {
  process.env.DATABASE_URL = DATABASE_URL;

  // run migrations against the container DB
  await execa('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit' });

  const prisma = new PrismaClient();
  return prisma;
}
