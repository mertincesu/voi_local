import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TerminalIcon, SendIcon, CommandIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (command: string) => void;
  suggestions?: string[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CommandInput = ({
  value = "",
  onChange = () => {},
  onSubmit = () => {},
  suggestions = ["help", "clear", "status", "list models", "run model"],
  className = "",
  placeholder = "Enter command...",
  disabled = false,
}: CommandInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      onChange("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 p-2 bg-card border-t border-border",
        className,
      )}
    >
      <div className="flex-shrink-0 flex items-center gap-2 px-2">
        <TerminalIcon className="h-4 w-4 text-muted-foreground" />
        <CommandIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-background"
        disabled={disabled}
        list="command-suggestions"
      />
      <datalist id="command-suggestions">
        {suggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={disabled || !value.trim()}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default CommandInput;
