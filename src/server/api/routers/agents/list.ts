import {
    createTRPCRouter,
    protectedProcedure,
  } from "@/server/api/trpc";

export const listAgents = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        const agents = await ctx.db.agent.findMany({
            where: { createdBy: { id: ctx.session.user.id } },
            orderBy: { createdAt: "desc" },
        });

        return agents;
    }),
})