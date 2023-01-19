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
          model: "text-davinci-003",
          prompt: `Create a short image prompt for AI image generation based on the following article: \n\n ${input}`,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        return {
          imagePrompt: response.data.choices[0].text,
        };
      } catch (error) {
        console.error(error);
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
          size: "1024x1024",
        });

        return {
          image: response.data.data[0].url,
        };
      } catch (error) {
        console.error(error);
      }
    }),
});
