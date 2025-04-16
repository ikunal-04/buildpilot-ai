import { useState } from "react";
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Boxes, Mail, Database, Trash2 } from "lucide-react";

interface NodeData extends Record<string, unknown> {
    subtype: string;
    onDelete?: () => void;
    onDataChange: (data: Partial<NodeData>) => void;
}

export default function ActionNode({ data }: NodeProps<Node<NodeData>>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const getActionIcon = () => {
        switch (data.subtype) {
            case "send-email":
                return <Mail className="h-5 w-5 text-purple-500" />;
            case "store-to-database":
                return <Database className="h-5 w-5 text-purple-500" />;
            case "send-discord-message":
                return <Mail className="h-5 w-5 text-purple-500" />;
            default:
                return <Boxes className="h-5 w-5 text-purple-500" />;
        }
    };

    const getActionDisplayName = () => {
        switch (data.subtype) {
            case "send-email":
                return "Send Email";
            case "store-to-database":
                return "Store to Database";
            case "send-discord-message":
                return "Send Discord Message";
            default:
                return "Action";
        }
    };

    const handleDeleteClick = () => {
        if (showDeleteConfirm && data.onDelete) {
            data.onDelete();
            setShowDeleteConfirm(false);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => {
                setShowDeleteConfirm(false);
            }, 3000);
        }
    };

    return (
        <Card className="border-2 border-purple-500 w-[240px] relative">
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: "#8b5cf6", width: 12, height: 12 }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: "#8b5cf6", width: 12, height: 12 }}
            />
            <CardHeader className="p-3 bg-purple-50 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    {getActionIcon()}
                    <div className="font-medium">{getActionDisplayName()}</div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={handleDeleteClick}
                >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
            </CardHeader>
            <CardContent className="p-4">
                {data.subtype === "send-email" && (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">To:</label>
                            <Input placeholder="recipient@example.com" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Subject:</label>
                            <Input placeholder="Email subject" />
                        </div>
                    </div>
                )}
                {data.subtype === "store-to-database" && (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Collection:</label>
                            <Input placeholder="collection_name" />
                        </div>
                    </div>
                )}
                {data.subtype === "send-discord-message" && (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Channel:</label>
                            <Input placeholder="#channel" />
                        </div>
                    </div>
                )}
            </CardContent>
            {showDeleteConfirm && (
                <div className="absolute -top-8 right-0 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                    Click again to delete
                </div>
            )}
        </Card>
    );
}