import React from "react";
import { Link } from "react-router-dom";
import { Box, Cpu, Settings, Terminal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavMenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface NavMenuProps {
  collapsed?: boolean;
  items?: NavMenuItem[];
  activeItem?: string;
  onItemClick?: (path: string) => void;
}

const defaultItems: NavMenuItem[] = [
  {
    icon: <Box className="w-5 h-5" />,
    label: "Models",
    path: "/models",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Config",
    path: "/config",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    label: "Deploy",
    path: "/deploy",
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    label: "Terminal",
    path: "/terminal",
  },
];

const NavMenu = ({
  collapsed = false,
  items = defaultItems,
  activeItem = "/models",
  onItemClick = () => {},
}: NavMenuProps) => {
  return (
    <nav className="p-2 bg-background">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={() => onItemClick(item.path)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                activeItem === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                collapsed && "justify-center",
              )}
            >
              {item.icon}
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
