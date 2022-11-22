import { router } from "../trpc";
import { authRouter } from "./auth";
import { bookRouter } from "./book";
import { shelfRouter } from "./shelf";

export const appRouter = router({
  book: bookRouter,
  auth: authRouter,
  shelf: shelfRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;