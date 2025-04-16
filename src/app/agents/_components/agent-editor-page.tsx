// src/app/agents/editor/_components/agent-editor-page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WorkflowCanvas from "./workflow-canvas";

interface Workflow {
  nodes: Array<{
    id: string;
    type: 'trigger' | 'action';
    subtype: string;
    position: { x: number; y: number };
  }>;
  connections: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}

export default function AgentEditorPage({ agentId }: { agentId?: string }) {
    const router = useRouter();
    const utils = api.useUtils();

    const [name, setName] = useState("Untitled Agent");
    const [workflow, setWorkflow] = useState<Workflow>({
        nodes: [],
        connections: []
    });
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const createMutation = api.createAgent.create.useMutation();
    const updateMutation = api.updateAgent.update.useMutation();

    const { data: agentData } = api.showAgent.show.useQuery(
        { id: parseInt(agentId ?? "0") },
        { enabled: !!agentId }
    );

    useEffect(() => {
        if (agentData) {
            setName(agentData.name);
            if (typeof agentData.workflow === 'string') {
                try {
                    const parsedWorkflow = JSON.parse(agentData.workflow) as Workflow;
                    setWorkflow(parsedWorkflow);
                } catch (error) {
                    console.error('Failed to parse workflow:', error);
                }
            }
            setLastSaved(agentData.editedAt);
        }
    }, [agentData]);

    useEffect(() => {
        const saveTimer = setTimeout(() => {
            if (agentId) {
                updateMutation.mutate({
                    id: parseInt(agentId),
                    name,
                    workflow: JSON.stringify(workflow),
                }, {
                    onSuccess: () => {
                        setLastSaved(new Date());
                        void utils.listAgents.list.invalidate();
                    }
                });
            } else {
                createMutation.mutate({
                    name,
                    workflow: JSON.stringify(workflow),
                }, {
                    onSuccess: (data) => {
                        router.replace(`/agents/editor?id=${data.id}`);
                        setLastSaved(new Date());
                        void utils.listAgents.list.invalidate();
                    }
                });
            }
        }, 2000);

        return () => clearTimeout(saveTimer);
    }, [name, workflow, agentId, updateMutation, createMutation, router, utils]);

    const handleDone = () => {
        if (agentId) {
            updateMutation.mutate({
                id: parseInt(agentId),
                name,
                workflow: JSON.stringify(workflow),
            }, {
                onSuccess: () => {
                    void utils.listAgents.list.invalidate();
                    router.push("/agents");
                }
            });
        } else {
            createMutation.mutate({
                name,
                workflow: JSON.stringify(workflow),
            }, {
                onSuccess: () => {
                    void utils.listAgents.list.invalidate();
                    router.push("/agents");
                }
            });
        }
    };

    return (
        <div className="container mx-auto py-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-xl font-semibold w-64"
                    />
                    {lastSaved && (
                        <span className="text-sm text-gray-500">
                            Last saved: {lastSaved.toLocaleTimeString()}
                        </span>
                    )}
                </div>
                <Button onClick={handleDone}>
                    Done
                </Button>
            </div>

            <WorkflowCanvas
                workflow={workflow}
                onChange={setWorkflow}
            />
        </div>
    );
}