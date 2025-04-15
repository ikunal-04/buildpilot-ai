import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";

export const deleteAgents = createTRPCRouter({
    delete: protectedProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.agent.delete({
                where: { id: input.id },
            });
        })
});