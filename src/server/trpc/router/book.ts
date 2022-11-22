import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const bookRouter = router({
  add: publicProcedure
    .input(z.object({
      title: z.string(),
      bookId: z.string(),
      author: z.string().optional() ,
      imageSrc: z.string(),
      pageCount: z.number().optional(),
      publicationDate: z.string().optional(),
      shelfName: z.string()
    }))
    .mutation(async ({ctx,  input }) => {
      if (ctx.session?.user?.id){
        return ctx.prisma.book.create({
          data: {
            userId: ctx.session.user.id,
            bookId: input.bookId,
            title: input.title,
            author: input.author,
            imageSrc: input.imageSrc,
            pageCount: input.pageCount,
            publicationDate: input.publicationDate,
            spineColor: "#0c4a6e",
            titleColor: "#FFFFFF",
            shelves: {
              connect: [
                {name: input.shelfName},
                {name: "All Books"}
              ]
            }
          }
        })
      }
    
    })
}) 