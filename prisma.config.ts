import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig, env } from 'prisma/config';

// Load .env.local file explicitly for local development
config({ path: resolve(process.cwd(), '.env.local') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/migrations',
  },
});
