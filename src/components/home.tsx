import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./dashboard/Sidebar";
import MainContent from "./dashboard/MainContent";

interface HomeProps {
  className?: string;
}

const Home = ({ className = "" }: HomeProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workflowNodes, setWorkflowNodes] = useState<any[]>([]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const handleWorkflowChange = (nodes: any[]) => {
    setWorkflowNodes(nodes);
  };

  const handleCommand = (command: string) => {
    console.log("Executing command:", command);
  };

  return (
    <div
      className={cn(
        "flex w-screen h-screen bg-background overflow-hidden",
        className,
      )}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
        className="flex-shrink-0"
      />
      <MainContent
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-[60px]" : "ml-[280px]",
        )}
        onWorkflowChange={handleWorkflowChange}
        onCommand={handleCommand}
      />
    </div>
  );
};

export default Home;
