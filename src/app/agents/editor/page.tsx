"use client";

import { useSearchParams } from "next/navigation";
import AgentEditorPage from "../_components/agent-editor-page";

export default function EditorPage() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get("id") ?? undefined;
  
  return <AgentEditorPage agentId={agentId} />;
}