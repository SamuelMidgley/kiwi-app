import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { WeightEntry } from "@/types/weight-tracker";

const chartConfig = {
  weight: {
    label: "Weight",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type WeightChartProps = {
  weightEntries: WeightEntry[];
};

export function WeightChart({ weightEntries }: WeightChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <LineChart accessibilityLayer data={weightEntries}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date_recorded"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(tickItem) => format(tickItem, "dd/MM/yyyy")}
        />
        <YAxis
          dataKey="weight"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[60, 90]}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          labelFormatter={(label) => format(label, "dd/MM/yyyy")}
        />
        <Line
          dataKey="weight"
          fill="var(--color-desktop)"
          dot={false}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  );
}
