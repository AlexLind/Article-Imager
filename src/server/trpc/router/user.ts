import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.session.user.id);
    return ctx.prisma.user.findUnique({
        where: {id: ctx.session.user.id}
    });
  }),
});
