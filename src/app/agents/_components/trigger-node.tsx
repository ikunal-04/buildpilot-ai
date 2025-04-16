import { useState, useEffect } from "react";
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudLightning } from "lucide-react";

export default function TriggerNode({ data }: NodeProps) {
  const [subtype, setSubtype] = useState(data.subtype ?? "incoming-email");

  useEffect(() => {
    if (data.onDataChange) {
      // data.onDataChange({ subtype });
    }
  }, [subtype, data.onDataChange]);

  const getTriggerDisplayName = () => {
    switch (subtype) {
      case "incoming-email":
        return "Incoming Email";
      case "scheduled":
        return "Scheduled";
      case "webhook":
        return "Webhook";
      default:
        return "Trigger";
    }
  };

  return (
    <Card className="border-2 border-blue-500 w-[240px]">
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#3b82f6", width: 12, height: 12 }}
      />
      <CardHeader className="p-3 bg-blue-50 flex flex-row items-center gap-2">
        <CloudLightning className="h-5 w-5 text-blue-500" />
        <div className="font-medium">Trigger</div>
      </CardHeader>
      <CardContent className="p-4">
        <Select value={"subtype"} onValueChange={setSubtype}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getTriggerDisplayName()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incoming-email">Incoming Email</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}