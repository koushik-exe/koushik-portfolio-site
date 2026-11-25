import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Phase 6: server-only Prisma client singleton (Prisma 7 + `@prisma/adapter-neon`).
 * The app client uses the pooled `DATABASE_URL`; the Prisma CLI uses the direct
 * `DATABASE_URL_UNPOOLED` (see `prisma.config.ts`).
 */
export const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  }),
});
