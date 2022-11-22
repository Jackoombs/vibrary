import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const shelfRouter = router({
  getShelf: publicProcedure
    .input(z.object({
      name: z.string()
    })) 
    .query( ({ctx, input}) => {
      return ctx.prisma.shelf.findUnique({
        where: {
          name: input.name
        },
        include: {
          books: {
            orderBy: {
              createdAt: "desc"
            }
          }
        }
      })
    }),
  getNameList: publicProcedure
    .query( ({ctx}) => {
      return ctx.prisma.shelf.findMany({
        where: {
          userId: ctx.session?.user?.id
        },
        select: {
          name: true,
          isDefault: true,
          _count: {
            select: {
              books: true
            }
          }
        },
      })
    })
  
})