"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import AgentCard from "./agent-card";
import type { Workflow } from "@/server/api/routers/agents/types";
import { type Prisma } from "@prisma/client";

interface Agent {
    id: number;
    name: string;
    workflow: Prisma.JsonValue;
    status: string;
    createdAt: Date;
    editedAt: Date;
    lastRunAt: Date | null;
    createdById: string;
}

interface AgentCardProps {
    id: string;
    name: string;
    workflow: string;
    status: string;
    editedAt: Date;
    lastRunAt: Date | null;
}

export default function ListAgentsPage() {
    const router = useRouter();
    const [listAgents] = api.listAgents.list.useSuspenseQuery<Agent[]>();

    const handleCreateAgent = () => {
        router.push("/agents/editor");
    };

    const parseWorkflow = (agent: Agent): AgentCardProps => {
        let workflow: Workflow;
        try {
            workflow = typeof agent.workflow === 'string' 
                ? JSON.parse(agent.workflow) as Workflow
                : agent.workflow as unknown as Workflow;
        } catch (e) {
            console.log("Failed to parse workflow:", e);
            workflow = { nodes: [], connections: [] };
        }
        return {
            id: agent.id.toString(),
            name: agent.name,
            status: agent.status,
            editedAt: agent.editedAt,
            lastRunAt: agent.lastRunAt,
            workflow: JSON.stringify(workflow),
        };
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Agents</h1>
                <div className="flex gap-2 items-center">
                    <Button onClick={handleCreateAgent}>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Create Agent
                    </Button>
                    <Button variant={"outline"} onClick={() => router.push("/api/auth/signout")}>
                        Logout
                    </Button>
                </div>
            </div>

            {!listAgents ? (
                <div className="flex justify-center text-black">Loading...</div>
            ) : (
                listAgents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listAgents.map((agent) => (
                            <AgentCard 
                                key={agent.id.toString()} 
                                agent={parseWorkflow(agent)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center text-black">No agents found.</div>
                )
            )}
        </div>
    );
}