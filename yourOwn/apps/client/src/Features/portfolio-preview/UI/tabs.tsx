import React from "react";
import { cn } from "../../../lib/utils";

// The root wrapper that coordinates the state/callbacks
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ value, onValueChange, children, className }: TabsProps) => {
  // We pass value and onValueChange down to children via cloning or simply let 
  // the Nav handle the mapping (simpler for your custom setup)
  return <div className={cn("flex items-center", className)}>{children}</div>;
};

export const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("inline-flex items-center justify-center rounded-lg bg-gray-100 p-1", className)}>
    {children}
  </div>
);

interface TabsTriggerProps {
  value: string;
  activeValue: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

export const TabsTrigger = ({ value, activeValue, onClick, children }: TabsTriggerProps) => {
  const isActive = value === activeValue;

  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
        isActive 
          ? "bg-white text-black shadow-sm" 
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
      )}
    >
      {children}
    </button>
  );
};