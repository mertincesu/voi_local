import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Circle, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  label: string;
}

interface Connection {
  from: string;
  to: string;
}

interface CanvasProps {
  nodes?: Node[];
  connections?: Connection[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeAdd?: (position: { x: number; y: number }) => void;
  className?: string;
}

const defaultNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 100, y: 100 },
    label: "Text Input",
  },
  {
    id: "2",
    type: "process",
    position: { x: 300, y: 100 },
    label: "NLP Processing",
  },
  {
    id: "3",
    type: "output",
    position: { x: 500, y: 100 },
    label: "Result Output",
  },
];

const defaultConnections: Connection[] = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
];

const Canvas = ({
  nodes = defaultNodes,
  connections = defaultConnections,
  onNodeSelect = () => {},
  onNodeAdd = () => {},
  className,
}: CanvasProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    onNodeSelect(nodeId);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      onNodeAdd(position);
    }
  };

  return (
    <Card
      className={cn(
        "w-[900px] h-[600px] bg-slate-50 dark:bg-slate-900 relative overflow-hidden",
        className,
      )}
      onClick={handleCanvasClick}
    >
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-background"
          onClick={(e) => {
            e.stopPropagation();
            onNodeAdd({ x: 200, y: 200 });
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <svg className="w-full h-full absolute top-0 left-0 pointer-events-none">
        {connections.map((connection, index) => {
          const fromNode = nodes.find((n) => n.id === connection.from);
          const toNode = nodes.find((n) => n.id === connection.to);

          if (!fromNode || !toNode) return null;

          const startX = fromNode.position.x + 80;
          const startY = fromNode.position.y + 25;
          const endX = toNode.position.x;
          const endY = toNode.position.y + 25;

          return (
            <g key={index}>
              <path
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-muted-foreground"
              />
              <ArrowRight
                className="text-muted-foreground"
                style={{
                  transform: `translate(${endX - 10}px, ${endY - 8}px)`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className={cn(
            "absolute p-4 rounded-lg border shadow-sm cursor-pointer transition-colors",
            "bg-card hover:bg-accent",
            selectedNode === node.id && "ring-2 ring-primary",
          )}
          style={{
            left: node.position.x,
            top: node.position.y,
            width: 160,
            height: 50,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node.id);
          }}
        >
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-primary" />
            <span className="font-medium">{node.label}</span>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Canvas;
