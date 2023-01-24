import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";

export const db = createTRPCRouter({
  saveImage: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string(),
        title: z.string(),
        sessionData: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await prisma.userImages.create({
        data: {
          image: input.imageUrl,
          title: input.title,
          user: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            connect: { id: input.sessionData.user.id },
          },
        },
      });

      return response;
    }),

  getImages: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log(input);
    if (!input) {
      return {
        images: null,
      };
    }
    try {
      const images = await prisma.userImages.findMany({
        where: {
          user: {
            id: input,
          },
        },
      });

      return {
        images,
      };
    } catch (error) {
      console.error(error);
    }
  }),
});
