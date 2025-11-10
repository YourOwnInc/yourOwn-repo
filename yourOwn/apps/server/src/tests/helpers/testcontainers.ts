// apps/server/tests/helpers/testcontainers.ts
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function startPostgres() {
  const container = await new PostgreSqlContainer('postgres:16')
    .withDatabase('testdb')
    .withUsername('test')
    .withPassword('test')
    .start();

  // Ready-to-use DATABASE_URL for Prisma
  const url = container.getConnectionUri();
  return { container, url };
}
