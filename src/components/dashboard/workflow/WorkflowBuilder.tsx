import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Canvas from "./Canvas";
import ConfigPanel from "./ConfigPanel";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  label: string;
  settings: {
    inputType?: string;
    modelName?: string;
    outputFormat?: string;
    isEnabled?: boolean;
  };
}

interface WorkflowBuilderProps {
  className?: string;
  onWorkflowChange?: (nodes: Node[]) => void;
}

const defaultNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 100, y: 100 },
    label: "Text Input",
    settings: {
      inputType: "text",
      isEnabled: true,
    },
  },
  {
    id: "2",
    type: "process",
    position: { x: 300, y: 100 },
    label: "NLP Processing",
    settings: {
      modelName: "gpt-4",
      isEnabled: true,
    },
  },
  {
    id: "3",
    type: "output",
    position: { x: 500, y: 100 },
    label: "Result Output",
    settings: {
      outputFormat: "json",
      isEnabled: true,
    },
  },
];

const WorkflowBuilder = ({
  className,
  onWorkflowChange = () => {},
}: WorkflowBuilderProps) => {
  const [nodes, setNodes] = useState<Node[]>(defaultNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleNodeAdd = (position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "process",
      position,
      label: "New Node",
      settings: {
        isEnabled: true,
      },
    };
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    onWorkflowChange(updatedNodes);
  };

  const handleNodeConfigChange = (nodeId: string, config: Partial<Node>) => {
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, ...config } : node,
    );
    setNodes(updatedNodes);
    onWorkflowChange(updatedNodes);
  };

  const handleNodeDelete = (nodeId: string) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    setNodes(updatedNodes);
    setSelectedNodeId(null);
    onWorkflowChange(updatedNodes);
  };

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <Card
      className={cn(
        "w-[1200px] h-[600px] bg-background flex gap-4 p-4",
        className,
      )}
    >
      <Canvas
        nodes={nodes}
        connections={[
          { from: "1", to: "2" },
          { from: "2", to: "3" },
        ]}
        onNodeSelect={handleNodeSelect}
        onNodeAdd={handleNodeAdd}
      />
      <ConfigPanel
        selectedNode={selectedNode}
        onConfigChange={handleNodeConfigChange}
        onDeleteNode={handleNodeDelete}
      />
    </Card>
  );
};

export default WorkflowBuilder;
