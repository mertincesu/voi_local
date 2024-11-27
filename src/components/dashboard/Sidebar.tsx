import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./sidebar/Logo";
import NavMenu from "./sidebar/NavMenu";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
}

const Sidebar = ({
  collapsed = false,
  onCollapse = () => {},
  className = "",
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [activeItem, setActiveItem] = useState("/models");

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };

  const handleNavItemClick = (path: string) => {
    setActiveItem(path);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-[982px] bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[280px]",
        className,
      )}
    >
      <Logo collapsed={isCollapsed} />

      <div className="flex-1 overflow-y-auto">
        <NavMenu
          collapsed={isCollapsed}
          activeItem={activeItem}
          onItemClick={handleNavItemClick}
        />
      </div>

      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-8 flex items-center justify-center"
          onClick={handleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
