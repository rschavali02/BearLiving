import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
        //linked to page.tsx under auth sign up
        auth: authRouter,
    })

    export type AppRouter = typeof appRouter