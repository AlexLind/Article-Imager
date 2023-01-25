import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { extract, extractFromHtml } from "@extractus/article-extractor";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
      article.content = article.content.replace(/(<([^>]+)>)/gi, "");

      return {
        article,
      };
    } catch (error) {
      console.error(error);
    }
  }),

  getImagePromptFromArticle: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      if (!input) {
        return {
          imagePrompt: null,
        };
      }
      try {
        const response = await openai.createCompletion({
          model: "text-curie-001",
          prompt: `Create a short image prompt for AI image generation based on the following article: \n\n ${input}`,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        return {
          imagePrompt: response.data.choices[0].text,
          // imagePrompt: "test",
        };
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error?.config?.headers);
        return { imagePrompt: null };
      }
    }),

  getImageFromPrompt: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      if (!input) {
        return {
          images: null,
        };
      }
      try {
        const response = await openai.createImage({
          prompt: input,
          n: 1,
          size: "512x512",
        });

        return {
          image: response.data.data[0].url,
          // image: "https://thumbs.dreamstime.com/b/toad-27178162.jpg",
        };
      } catch (error) {
        console.error(error);
        return { image: null };
      }
    }),
});
