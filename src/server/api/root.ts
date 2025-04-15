import { postRouter } from "@/server/api/routers/post";
import { createAgent } from "@/server/api/routers/agents/create";
import { deleteAgents } from "@/server/api/routers/agents/delete";
import { listAgents } from "@/server/api/routers/agents/list";
import { updateAgent } from "@/server/api/routers/agents/update";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  createAgent: createAgent,
  deleteAgents: deleteAgents,
  listAgents: listAgents,
  updateAgent: updateAgent,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
