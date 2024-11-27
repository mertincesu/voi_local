import React from "react";
import { Brain } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
  title?: string;
}

const Logo = ({ collapsed = false, title = "AI Platform" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-background border-b border-border h-[40px]">
      <Brain className="h-6 w-6 text-primary" />
      {!collapsed && (
        <span className="font-semibold text-lg text-foreground truncate">
          {title}
        </span>
      )}
    </div>
  );
};

export default Logo;
