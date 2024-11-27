import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CommandInput from "./CommandInput";
import CommandHistory from "./CommandHistory";
import { Terminal as TerminalIcon } from "lucide-react";

interface CommandHistoryEntry {
  id: string;
  timestamp: string;
  command: string;
  output: string;
  status: "success" | "error" | "info";
}

interface TerminalProps {
  className?: string;
  defaultOpen?: boolean;
  onCommand?: (command: string) => void;
}

const Terminal = ({
  className,
  defaultOpen = true,
  onCommand = () => {},
}: TerminalProps) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryEntry[]>([
    {
      id: "welcome",
      timestamp: new Date().toLocaleTimeString(),
      command: "help",
      output:
        "Welcome to the AI Platform Terminal\n\nAvailable commands:\n- help: Show this help message\n- status: Check system status\n- list models: Show available AI models\n- clear: Clear terminal history",
      status: "info",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newEntry: CommandHistoryEntry = {
      id: Date.now().toString(),
      timestamp,
      command,
      output: "Processing command...",
      status: "info",
    };

    setCommandHistory((prev) => [...prev, newEntry]);
    onCommand(command);

    // Simulate command processing
    setTimeout(() => {
      setCommandHistory((prev) =>
        prev.map((entry) =>
          entry.id === newEntry.id
            ? {
                ...entry,
                output:
                  command === "clear"
                    ? "Terminal cleared"
                    : `Executed command: ${command}`,
                status: "success",
              }
            : entry,
        ),
      );

      if (command === "clear") {
        setTimeout(() => {
          setCommandHistory([]);
        }, 500);
      }
    }, 500);
  };

  return (
    <Card
      className={cn("w-[1200px] h-[300px] bg-card flex flex-col", className)}
    >
      <div className="flex items-center gap-2 p-2 border-b border-border bg-muted">
        <TerminalIcon className="h-4 w-4" />
        <span className="font-medium">Terminal</span>
      </div>

      <div className="flex-1 flex flex-col">
        <CommandHistory entries={commandHistory} className="flex-1" />
        <CommandInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleCommand}
          suggestions={[
            "help",
            "clear",
            "status",
            "list models",
            "run model --name gpt-4",
            "stop model",
          ]}
        />
      </div>
    </Card>
  );
};

export default Terminal;
