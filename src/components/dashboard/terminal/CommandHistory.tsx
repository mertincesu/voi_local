import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CommandHistoryEntry {
  id: string;
  timestamp: string;
  command: string;
  output: string;
  status: "success" | "error" | "info";
}

interface CommandHistoryProps {
  entries?: CommandHistoryEntry[];
  className?: string;
}

const defaultEntries: CommandHistoryEntry[] = [
  {
    id: "1",
    timestamp: "10:30:15",
    command: "list models",
    output: "Available models:\n- GPT-4\n- GPT-3.5\n- Custom Model",
    status: "success",
  },
  {
    id: "2",
    timestamp: "10:30:45",
    command: "status",
    output: "All systems operational",
    status: "success",
  },
  {
    id: "3",
    timestamp: "10:31:00",
    command: "run model --name invalid",
    output: "Error: Model 'invalid' not found",
    status: "error",
  },
];

const CommandHistory = ({
  entries = defaultEntries,
  className,
}: CommandHistoryProps) => {
  return (
    <ScrollArea
      className={cn(
        "w-full h-[260px] bg-card border-border rounded-md overflow-hidden",
        className,
      )}
    >
      <div className="p-4 space-y-4 font-mono text-sm">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{entry.timestamp}</span>
              <span className="text-primary-foreground">$</span>
              <span className="text-primary">{entry.command}</span>
            </div>
            <div
              className={cn(
                "pl-8 whitespace-pre-wrap",
                entry.status === "error"
                  ? "text-red-500"
                  : entry.status === "info"
                    ? "text-blue-500"
                    : "text-muted-foreground",
              )}
            >
              {entry.output}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CommandHistory;
