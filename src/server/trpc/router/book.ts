import { string, z } from "zod";
import { router, publicProcedure } from "../trpc";

export const bookRouter = router({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        bookId: z.string(),
        author: z.string().optional(),
        imageSrc: z.string(),
        pageCount: z.number().optional(),
        publicationDate: z.string().optional(),
        shelfName: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.book.create({
          data: {
            userId: ctx.session.user.id,
            bookId: input.bookId,
            title: input.title,
            author: input.author,
            imageSrc: input.imageSrc,
            pageCount: input.pageCount,
            publicationDate: input.publicationDate,
            spineColor: "#0f234e",
            titleColor: "#f9f0ee",
            read: false,
            shelves: {
              connect: [
                {
                  userId_name: {
                    userId: ctx.session.user.id,
                    name: input.shelfName,
                  },
                },
                {
                  userId_name: {
                    userId: ctx.session.user.id,
                    name: "All Books",
                  },
                },
                {
                  userId_name: {
                    userId: ctx.session.user.id,
                    name: "Not Yet Read",
                  },
                },
              ],
            },
          },
        });
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.book.delete({
          where: {
            id: input.id,
          },
        });
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: string(),
        title: z.string(),
        author: z.string(),
        imageSrc: z.string(),
        spineColor: z.string(),
        titleColor: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.book.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            author: input.author,
            imageSrc: input.imageSrc,
            spineColor: input.spineColor,
            titleColor: input.titleColor,
          },
        });
      }
    }),
  updateRead: publicProcedure
    .input(
      z.object({
        id: z.string(),
        read: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        return ctx.prisma.book.update({
          where: {
            id: input.id,
          },
          data: {
            read: input.read,
            shelves: {
              connect: [
                {
                  userId_name: {
                    name: input.read ? "Read" : "Not Yet Read",
                    userId: ctx.session.user.id,
                  },
                },
              ],
              disconnect: [
                {
                  userId_name: {
                    name: !input.read ? "Read" : "Not Yet Read",
                    userId: ctx.session.user.id,
                  },
                },
              ],
            },
          },
        });
      }
    }),
});
