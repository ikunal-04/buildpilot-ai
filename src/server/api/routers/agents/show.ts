import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
  } from "@/server/api/trpc";

export const showAgent = createTRPCRouter({
    show: protectedProcedure
        .input(z.object({ 
            id: z.number() 
        }))
        .query(async ({ ctx, input }) => {
            const agent = await ctx.db.agent.findUnique({
                where: { id: input.id },
            });

            if (!agent) {
                throw new Error("Agent not found");
            }

            return agent;
    }),
})