import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { extract } from "@extractus/article-extractor";

export const articleExtractor = createTRPCRouter({
  /* ./src/server/api/routers/articleExtractor.ts */

  getArticle: publicProcedure.input(z.string()).query(async ({ input }) => {
    if (!input) {
      return {
        article: null,
      };
    }
    try {
      const article = await extract(input);
      return {
        article,
      };
    } catch (error) {
      console.error(error);
    }
  }),
});
