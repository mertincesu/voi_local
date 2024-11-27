import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings2, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeConfig {
  id: string;
  label: string;
  type: string;
  settings: {
    inputType?: string;
    modelName?: string;
    outputFormat?: string;
    isEnabled?: boolean;
  };
}

interface ConfigPanelProps {
  selectedNode?: NodeConfig;
  onConfigChange?: (nodeId: string, config: Partial<NodeConfig>) => void;
  onDeleteNode?: (nodeId: string) => void;
  className?: string;
}

const defaultNode: NodeConfig = {
  id: "1",
  label: "Text Input",
  type: "input",
  settings: {
    inputType: "text",
    isEnabled: true,
  },
};

const ConfigPanel = ({
  selectedNode = defaultNode,
  onConfigChange = () => {},
  onDeleteNode = () => {},
  className,
}: ConfigPanelProps) => {
  const handleLabelChange = (value: string) => {
    onConfigChange(selectedNode.id, { label: value });
  };

  const handleSettingChange = (key: string, value: any) => {
    onConfigChange(selectedNode.id, {
      settings: { ...selectedNode.settings, [key]: value },
    });
  };

  return (
    <Card className={cn("w-[300px] h-[600px] bg-card", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Node Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Node Label</Label>
            <Input
              value={selectedNode.label}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="Enter node label"
            />
          </div>

          <div className="space-y-2">
            <Label>Node Type</Label>
            <Select
              value={selectedNode.type}
              onValueChange={(value) =>
                onConfigChange(selectedNode.id, { type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select node type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="output">Output</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedNode.type === "input" && (
            <div className="space-y-2">
              <Label>Input Type</Label>
              <Select
                value={selectedNode.settings.inputType}
                onValueChange={(value) =>
                  handleSettingChange("inputType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedNode.type === "process" && (
            <div className="space-y-2">
              <Label>Model Name</Label>
              <Select
                value={selectedNode.settings.modelName}
                onValueChange={(value) =>
                  handleSettingChange("modelName", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedNode.type === "output" && (
            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select
                value={selectedNode.settings.outputFormat}
                onValueChange={(value) =>
                  handleSettingChange("outputFormat", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label>Enabled</Label>
            <Switch
              checked={selectedNode.settings.isEnabled}
              onCheckedChange={(checked) =>
                handleSettingChange("isEnabled", checked)
              }
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="default"
            className="flex-1"
            onClick={() => onConfigChange(selectedNode.id, selectedNode)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDeleteNode(selectedNode.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
