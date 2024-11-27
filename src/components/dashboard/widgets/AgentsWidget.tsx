import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Play, Pause, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AgentStatus = "running" | "paused" | "stopped";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  runtime: string;
}

interface AgentsWidgetProps {
  agents?: Agent[];
  className?: string;
  onAgentAction?: (agentId: string, action: "start" | "pause" | "stop") => void;
}

const defaultAgents: Agent[] = [
  {
    id: "1",
    name: "Text Processing Agent",
    type: "NLP",
    status: "running",
    runtime: "2h 15m",
  },
  {
    id: "2",
    name: "Image Recognition",
    type: "Computer Vision",
    status: "paused",
    runtime: "45m",
  },
  {
    id: "3",
    name: "Data Analysis Agent",
    type: "Analytics",
    status: "stopped",
    runtime: "0m",
  },
];

const statusConfig = {
  running: {
    color: "text-green-500",
    bgColor: "bg-green-100",
    icon: Play,
    action: "pause",
    actionIcon: Pause,
  },
  paused: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    icon: Pause,
    action: "start",
    actionIcon: Play,
  },
  stopped: {
    color: "text-red-500",
    bgColor: "bg-red-100",
    icon: XCircle,
    action: "start",
    actionIcon: Play,
  },
};

const AgentsWidget = ({
  agents = defaultAgents,
  className,
  onAgentAction = () => {},
}: AgentsWidgetProps) => {
  return (
    <Card className={cn("w-[380px] bg-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Active AI Agents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent) => {
            const StatusIcon = statusConfig[agent.status].icon;
            const ActionIcon = statusConfig[agent.status].actionIcon;
            return (
              <div
                key={agent.id}
                className={cn(
                  "p-3 rounded-lg",
                  statusConfig[agent.status].bgColor,
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusIcon
                        className={cn(
                          "h-4 w-4",
                          statusConfig[agent.status].color,
                        )}
                      />
                      <span className="font-medium">{agent.name}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{agent.type}</span>
                      <span>•</span>
                      <span>{agent.runtime}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onAgentAction(
                        agent.id,
                        statusConfig[agent.status].action as any,
                      )
                    }
                  >
                    <ActionIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentsWidget;
