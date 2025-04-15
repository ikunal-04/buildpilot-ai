import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
  } from "@/server/api/trpc";

export const updateAgent = createTRPCRouter({
    update: protectedProcedure
        .input(z.object({ 
            id: z.number(),
            name: z.string().min(1),
            workflow: z.object({}).optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.agent.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    workflow: input.workflow,
                },
            });
        }),
})