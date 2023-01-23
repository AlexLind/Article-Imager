import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const db = createTRPCRouter({
  saveImage: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string(),
      })
    )
    .mutation(({ ctx }) => {
      console.log("input", ctx);
      return { imageUrl: "test" };
      //   const { prisma, session } = ctx;
      //   const userId = session.user.id;
      //   console.log("userId", userId, "input", input);

      //   return prisma.userImages.create({
      //     data: {
      //       image: input.image,
      //       title: "test",
      //       user: {
      //         connect: { id: "clcysd6hp0000ivzk6ajxmeq3" },
      //       },
      //     },
      //   });
    }),

  //   getImages: publicProcedure.query(({ ctx }) => {
  //     return ctx.prisma.example.findMany();
  //   }),

  //   login: publicProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //       })
  //     )
  //     .mutation(({ input }) => {
  //       console.log("input", input);
  //       // Here some login stuff would happen
  //       return {
  //         user: {
  //           name: input.name,
  //           role: "ADMIN",
  //         },
  //       };
  //     }),
});
