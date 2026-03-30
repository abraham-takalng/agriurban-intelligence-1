"use client";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

const ChartContext = React.createContext<{config: ChartConfig} | null>(null);

export function ChartContainer({ id, className, children, config, ...props }: any) {
  return (
    React.createElement(ChartContext.Provider, { value: { config } },
      React.createElement("div", { className: cn("flex aspect-video justify-center text-xs", className), ...props },
        React.createElement(RechartsPrimitive.ResponsiveContainer, null, children)
      )
    )
  );
}

export const ChartStyle = () => null;
export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({ active, payload, className }: any) {
  if (!active || !payload?.length) return null;
  return (
    React.createElement("div", { className: cn("bg-background border rounded-lg p-2 shadow-xl", className) },
      payload.map((item: any, i: number) => (
        React.createElement("div", { key: i, className: "flex items-center gap-2" },
          React.createElement("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: item.color } }),
          React.createElement("span", null, item.name, ": ", item.value)
        )
      ))
    )
  );
}

export const ChartLegend = RechartsPrimitive.Legend;
export function ChartLegendContent({ payload }: any) {
  if (!payload?.length) return null;
  return (
    React.createElement("div", { className: "flex gap-4 justify-center pt-2" },
      payload.map((item: any, i: number) => (
        React.createElement("div", { key: i, className: "flex items-center gap-1" },
          React.createElement("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: item.color } }),
          React.createElement("span", { className: "text-xs" }, item.value)
        )
      ))
    )
  );
}