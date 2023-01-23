import { createTRPCRouter } from "./trpc";
import { articleExtractor } from "./routers/articleExtractor";
import { db } from "./routers/db";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  db: db,
  articleExtractor: articleExtractor,
});

// export type definition of API
export type AppRouter = typeof appRouter;
