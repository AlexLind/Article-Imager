import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { extract } from "@extractus/article-extractor";

export const articleExtractor = createTRPCRouter({
  /* ./src/server/api/routers/articleExtractor.ts */

  getArticle: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const article = await extract(input.text);
      return {
        article,
      };
    }),
});
