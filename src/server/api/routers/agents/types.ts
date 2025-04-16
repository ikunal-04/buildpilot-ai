export interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action';
    subtype: string;
    position: { x: number; y: number };
}

export interface Workflow {
    nodes: WorkflowNode[];
    connections: Array<{
        id: string;
        source: string;
        target: string;
    }>;
} 