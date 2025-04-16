import { z } from 'zod';
import {
    createTRPCRouter,
    protectedProcedure,
} from '@/server/api/trpc';
import type { Workflow } from './types';
import { type Prisma } from '@prisma/client';

export const createAgent = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ 
            name: z.string().min(1),
            workflow: z.string().transform((str) => {
                try {
                    return JSON.parse(str) as Workflow;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    return { nodes: [], connections: [] } as Workflow;
                }
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.agent.create({
                data: {
                    name: input.name,
                    workflow: input.workflow as unknown as Prisma.InputJsonValue,
                    createdBy: { connect: { id: ctx.session.user.id } },
                    lastRunAt: null,
                },
            });
        }),
})
