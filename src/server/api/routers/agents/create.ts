import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
} from '@/server/api/trpc';

export const createAgent = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ 
            name: z.string().min(1),
            workflow: z.object({}).optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.agent.create({
                data: {
                    name: input.name,
                    workflow: input.workflow,
                    createdBy: { connect: { id: ctx.session.user.id } },
                    lastRunAt: null,
                },
            });
        }),
})
