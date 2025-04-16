// src/app/agents/_components/agent-card.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  PlayCircle,
  PauseCircle 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AgentCardProps = {
  agent: {
    workflow: string;
    id: string;
    name: string;
    status: string;
    editedAt: Date;
    lastRunAt: Date | null;
  };
};

export default function AgentCard({ agent }: AgentCardProps) {
  const router = useRouter();
  const utils = api.useContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const updateMutation = api.updateAgent.update.useMutation({
    onSuccess: async () => {
      await utils.listAgents.list.invalidate();
    },
  });
  
  const deleteMutation = api.deleteAgents.delete.useMutation({
    onSuccess: async () => {
      await utils.listAgents.list.invalidate();
    },
  });
  
  const handleStatusToggle = () => {
    updateMutation.mutate({
      id: parseInt(agent.id),
      name: agent.name,
      workflow: agent.workflow,
      status: agent.status === "active" ? "inactive" : "active",
    });
  };
  const handleDelete = () => {
    deleteMutation.mutate({ id: parseInt(agent.id) });
    setDeleteDialogOpen(false);
  };
  
  const handleEdit = () => {
    router.push(`/agents/editor?id=${agent.id}`);
  };
  
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{agent.name}</h3>
                <Badge 
                  variant={agent.status === "active" ? "default" : "secondary"}
                >
                  {agent.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <span>Edited: {new Date(agent.editedAt).toLocaleDateString()}</span>
                {agent.lastRunAt && (
                  <span className="ml-4">
                    Last run: {new Date(agent.lastRunAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleStatusToggle}
              >
                {agent.status === "active" ? (
                  <PauseCircle className="h-5 w-5" />
                ) : (
                  <PlayCircle className="h-5 w-5" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setDeleteDialogOpen(true)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the agent &quot;{agent.name}&quot; and all its associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}