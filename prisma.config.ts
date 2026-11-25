import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // The CLI (migrate dev/deploy) uses the direct string for Neon;
    // the app client uses the pooled DATABASE_URL.
    url: env("DATABASE_URL_UNPOOLED"),
  },
});
