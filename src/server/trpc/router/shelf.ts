import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const shelfRouter = router({
  getShelf: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.shelf.findFirst({
          where: {
            name: input.name,
            userId: ctx.session.user.id,
          },
          include: {
            books: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });
      }
    }),
  getNameList: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shelf.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      select: {
        name: true,
        isDefault: true,
        _count: {
          select: {
            books: true,
          },
        },
      },
    });
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string().max(50),
      })
    )
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.shelf.create({
          data: {
            name: input.name,
            userId: ctx.session?.user?.id,
          },
        });
      }
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    if (ctx.session?.user?.id) {
      return ctx.prisma.shelf.delete({
        where: {
          userId_name: { userId: ctx.session.user.id, name: input },
        },
      });
    }
  }),
});
