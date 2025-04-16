import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";
import type { Workflow } from './types';
import { type Prisma } from '@prisma/client';

export const updateAgent = createTRPCRouter({
    update: protectedProcedure
        .input(z.object({ 
            id: z.number(),
            name: z.string().min(1),
            status: z.enum(["active", "inactive"]).optional(),
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
            return ctx.db.agent.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    status: input.status,
                    workflow: input.workflow as unknown as Prisma.InputJsonValue,
                },
            });
        }),
})