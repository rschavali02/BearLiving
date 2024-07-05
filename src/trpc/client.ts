import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './'

export const trpc = createTRPCReact<AppRouter>({}) //full-stack between front/backend