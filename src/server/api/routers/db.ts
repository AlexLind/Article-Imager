import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";

export const db = createTRPCRouter({
  saveImage: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string(),
        sessionData: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await prisma.userImages.create({
        data: {
          image: input.imageUrl,
          title: "Test Title",
          user: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            connect: { id: input.sessionData.user.id },
          },
        },
      });

      return response;
    }),

  //   getImages: publicProcedure.query(({ ctx }) => {
  //     return ctx.prisma.example.findMany();
  //   }),
});
