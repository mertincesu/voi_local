import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SystemStatus = "operational" | "degraded" | "down";

interface StatusItem {
  name: string;
  status: SystemStatus;
  lastUpdated: string;
}

interface StatusWidgetProps {
  items?: StatusItem[];
  className?: string;
}

const defaultItems: StatusItem[] = [
  {
    name: "AI Model Service",
    status: "operational",
    lastUpdated: "2 minutes ago",
  },
  {
    name: "Local Runtime",
    status: "operational",
    lastUpdated: "5 minutes ago",
  },
  {
    name: "Resource Manager",
    status: "degraded",
    lastUpdated: "1 minute ago",
  },
];

const statusConfig = {
  operational: {
    icon: CheckCircle2,
    color: "text-green-500",
    label: "Operational",
  },
  degraded: {
    icon: AlertCircle,
    color: "text-yellow-500",
    label: "Degraded",
  },
  down: {
    icon: XCircle,
    color: "text-red-500",
    label: "Down",
  },
};

const StatusWidget = ({
  items = defaultItems,
  className,
}: StatusWidgetProps) => {
  return (
    <Card className={cn("w-[380px] bg-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <StatusIcon
                    className={cn("h-5 w-5", statusConfig[item.status].color)}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={cn("text-sm", statusConfig[item.status].color)}
                  >
                    {statusConfig[item.status].label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.lastUpdated}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusWidget;
