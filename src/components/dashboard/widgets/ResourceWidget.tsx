import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, CircuitBoard, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceMetric {
  name: string;
  usage: number;
  total: number;
  unit: string;
  icon: React.ReactNode;
}

interface ResourceWidgetProps {
  metrics?: ResourceMetric[];
  className?: string;
}

const defaultMetrics: ResourceMetric[] = [
  {
    name: "CPU Usage",
    usage: 45,
    total: 100,
    unit: "%",
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    name: "Memory",
    usage: 6.2,
    total: 16,
    unit: "GB",
    icon: <CircuitBoard className="h-5 w-5" />,
  },
  {
    name: "Disk Space",
    usage: 156,
    total: 512,
    unit: "GB",
    icon: <HardDrive className="h-5 w-5" />,
  },
];

const ResourceWidget = ({
  metrics = defaultMetrics,
  className,
}: ResourceWidgetProps) => {
  return (
    <Card className={cn("w-[380px] bg-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Resource Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const percentage = (metric.usage / metric.total) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {metric.usage} / {metric.total} {metric.unit}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={cn(
                    "h-2",
                    percentage > 90
                      ? "bg-red-200"
                      : percentage > 75
                        ? "bg-yellow-200"
                        : "bg-green-200",
                  )}
                  indicatorClassName={cn(
                    percentage > 90
                      ? "bg-red-500"
                      : percentage > 75
                        ? "bg-yellow-500"
                        : "bg-green-500",
                  )}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceWidget;
