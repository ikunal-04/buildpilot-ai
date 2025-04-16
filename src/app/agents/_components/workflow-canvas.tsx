import { useCallback, useEffect, useRef } from "react";
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background, Controls, MiniMap, type Connection, type Edge, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TriggerNode from "./trigger-node";
import ActionNode from "./action-node";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action';
  subtype: string;
  position: { x: number; y: number };
}

interface Workflow {
  nodes: WorkflowNode[];
  connections: Edge[];
}

interface NodeData extends Record<string, unknown> {
  subtype: string;
  onDelete?: () => void;
  onDataChange: (newData: Partial<NodeData>) => void;
}

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

type WorkflowCanvasProps = {
  workflow: Workflow | null;
  onChange: (workflow: Workflow) => void;
};

export default function WorkflowCanvas({ workflow, onChange }: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const isInitialized = useRef(false);

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const updateNodeData = useCallback((nodeId: string, newData: Partial<NodeData>) => {
    setNodes((nds) => nds.map((node) => node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node));
  }, [setNodes]);

  // Initialize nodes and edges from workflow prop
  useEffect(() => {
    if (!isInitialized.current && workflow?.nodes) {
      const transformedNodes = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: {
          subtype: node.subtype,
          onDelete: node.type === 'action' ? () => onDeleteNode(node.id) : undefined,
          onDataChange: (newData: Partial<NodeData>) => updateNodeData(node.id, newData),
        },
        position: node.position,
      }));
      setNodes(transformedNodes);
      setEdges(workflow.connections ?? []);
      isInitialized.current = true;
    } else if (!isInitialized.current && !workflow) {
      setNodes([
        {
          id: "trigger-1",
          type: "trigger",
          data: {
            subtype: "incoming-email",
            onDataChange: (newData: Partial<NodeData>) => updateNodeData("trigger-1", newData),
          },
          position: { x: 100, y: 100 },
        },
      ]);
      isInitialized.current = true;
    }
  }, [workflow, setNodes, setEdges, onDeleteNode, updateNodeData]);

  // Save workflow to parent when nodes or edges change
  useEffect(() => {
    if (!isInitialized.current) return;

    const originalNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type as 'trigger' | 'action',
      subtype: node.data.subtype,
      position: node.position,
    }));

    const currentWorkflow = {
      nodes: originalNodes,
      connections: edges,
    };

    onChange(currentWorkflow);
  }, [nodes, edges, onChange]);

  const addActionNode = (subtype: string) => {
    const id = `action-${Date.now()}`;
    const newNode: Node<NodeData> = {
      id,
      type: "action",
      data: {
        subtype,
        onDelete: () => onDeleteNode(id),
        onDataChange: (newData: Partial<NodeData>) => updateNodeData(id, newData),
      },
      position: { x: 400, y: 100 + nodes.length * 120 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="border rounded-lg bg-gray-50 h-[600px] w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <div className="absolute right-4 top-4 bg-white border rounded-lg p-4 shadow-md z-10">
        <h3 className="font-medium mb-2">Add Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => addActionNode("send-email")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => addActionNode("store-to-database")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Store to Database
          </Button>
        </div>
      </div>
    </div>
  );
}