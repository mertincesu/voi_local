import React, { useState } from "react";
import { cn } from "@/lib/utils";
import StatusWidget from "./widgets/StatusWidget";
import ResourceWidget from "./widgets/ResourceWidget";
import AgentsWidget from "./widgets/AgentsWidget";
import WorkflowBuilder from "./workflow/WorkflowBuilder";
import Terminal from "./terminal/Terminal";

interface MainContentProps {
  className?: string;
  onWorkflowChange?: (nodes: any[]) => void;
  onCommand?: (command: string) => void;
}

const MainContent = ({
  className = "",
  onWorkflowChange = () => {},
  onCommand = () => {},
}: MainContentProps) => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "flex-1 h-[982px] bg-background p-6 overflow-y-auto",
        className,
      )}
    >
      {/* Widgets Row */}
      <div className="flex gap-6 mb-6">
        <StatusWidget
          className={cn(
            "transition-all duration-300",
            selectedWidget && selectedWidget !== "status" && "opacity-50",
          )}
          onClick={() => setSelectedWidget("status")}
        />
        <ResourceWidget
          className={cn(
            "transition-all duration-300",
            selectedWidget && selectedWidget !== "resource" && "opacity-50",
          )}
          onClick={() => setSelectedWidget("resource")}
        />
        <AgentsWidget
          className={cn(
            "transition-all duration-300",
            selectedWidget && selectedWidget !== "agents" && "opacity-50",
          )}
          onClick={() => setSelectedWidget("agents")}
        />
      </div>

      {/* Workflow Builder */}
      <div className="mb-6">
        <WorkflowBuilder
          className={cn(
            "transition-all duration-300",
            selectedWidget && selectedWidget !== "workflow" && "opacity-50",
          )}
          onWorkflowChange={onWorkflowChange}
          onClick={() => setSelectedWidget("workflow")}
        />
      </div>

      {/* Terminal */}
      <div>
        <Terminal
          className={cn(
            "transition-all duration-300",
            selectedWidget && selectedWidget !== "terminal" && "opacity-50",
          )}
          onCommand={onCommand}
          onClick={() => setSelectedWidget("terminal")}
        />
      </div>
    </div>
  );
};

export default MainContent;
