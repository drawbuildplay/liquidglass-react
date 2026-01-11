import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { GlassPanel } from "../GlassPanel/GlassPanel";

// ... existing code ...

// --- Liquid Spectrum Chart (Stacked Bar) ---
interface LiquidSpectrumChartProps {
  data: {
    name: string;
    count: number;
    fill: string;
  }[];
  height?: number;
  maxValue?: number; // Total bottles
}

const SpectrumTooltip = ({ active, payload, total }: any) => {
  if (active && payload && payload.length) {
    // In a stacked bar, payload[0] gives the specific segment data if set up correctly,
    // or we might need to find the specific key unless we map data creatively.
    // Actually, for a single stacked bar, we usually reshape data to be { "Strong": 5, "Standard": 10 ... }
    // BUT if we use multiple <Bar> components (one per category), we can just pass the generic payload.

    // However, standard Tooltip in Recharts for stacked bars shows ALL items in the stack.
    // We want a hover on a specific segment?
    // Recharts Tooltip behavior on stacked bars: usually shows everything for that "Category" (X-axis index).
    // Since we have 1 category (the whole collection), it shows everything.

    // To show ONLY the hovered segment, we need `cursor={false}` and maybe custom logic,
    // OR we just accept a shared tooltip that shows the breakdown (Spectrum Breakdown).
    // Let's try the "Breakdown" approach first as it's cleaner for a single bar.
    // User asked for "what proof range they are concentrated in".

    return (
      <GlassPanel
        style={{
          padding: "12px",
          background: "rgba(20, 20, 23, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          color: "white",
          minWidth: "180px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "4px",
          }}
        >
          Proof Breakdown
        </p>
        {payload.map((entry: any, index: number) => {
          const count = entry.value;
          const percentage = total ? Math.round((count / total) * 100) : 0;
          return (
            <div key={index} style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: entry.color,
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <span>{entry.name}</span>
                <span>{percentage}%</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "13px",
                }}
              >
                <span>Count</span>
                <span>{count}</span>
              </div>
            </div>
          );
        })}
      </GlassPanel>
    );
  }
  return null;
};

export const LiquidSpectrumChart: React.FC<LiquidSpectrumChartProps> = ({
  data,
  height = 60, // Much shorter
  maxValue,
}) => {
  // We need to transform the array of objects [{name, count, fill}]
  // into a single object { "Strong": 5, "Standard": 10 ... } for a Stacked Bar with 1 data point.

  // 1. Transform Data
  const chartData = React.useMemo(() => {
    const singleDataPoint: any = { name: "Collection" };
    data.forEach((d) => {
      singleDataPoint[d.name] = d.count;
    });
    return [singleDataPoint];
  }, [data]);

  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide domain={[0, maxValue || "auto"]} />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<SpectrumTooltip total={maxValue} />}
          />
          {/* Render a Bar for each category in the original data to stack them */}
          {data.map((category, index) => {
            // Custom bar shape to handle rounded corners properly for the first/last
            const isFirst = index === 0;
            const isLast = index === data.length - 1;
            const radius: [number, number, number, number] =
              data.length === 1
                ? [12, 12, 12, 12]
                : isFirst
                  ? [12, 0, 0, 12] // Top-Left, Top-Right, Bottom-Right, Bottom-Left... wait, layout vertical?
                  : // Vertical Layout: Bars grow from Left to Right.
                  // Radius prop for Bar: [topLeft, topRight, bottomRight, bottomLeft]
                  // For horizontal bar (layout vertical):
                  // Left end: topLeft & bottomLeft
                  // Right end: topRight & bottomRight

                  isFirst
                    ? [12, 0, 0, 12] // Left side rounded
                    : isLast
                      ? [0, 12, 12, 0] // Right side rounded
                      : [0, 0, 0, 0];

            return (
              <Bar
                key={category.name}
                dataKey={category.name}
                stackId="a"
                fill={category.fill}
                radius={radius}
                barSize={32}
                animationDuration={1000}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Shared Chart Props
interface BaseChartProps {
  data: any[];
  height?: number;
  isLoading?: boolean;
}

// Custom Tooltip Component for "Liquid Glass" look
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <GlassPanel
        style={{
          padding: "12px",
          background: "rgba(20, 20, 23, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          color: "white",
          minWidth: "150px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          {label}
        </p>
        {payload.map((p: any, index: number) => (
          <p
            key={index}
            style={{
              margin: "4px 0",
              fontSize: "16px",
              fontWeight: 600,
              color: p.color,
            }}
          >
            {p.name}: {p.value}
          </p>
        ))}
      </GlassPanel>
    );
  }
  return null;
};

// --- Liquid Line Chart ---
interface LiquidLineChartProps extends BaseChartProps {
  dataKey: string;
  xAxisKey: string;
  colors?: string[];
  yAxisLabel?: string;
  areaField?: boolean; // If true, renders as AreaChart for "filled" look
  tickColor?: string;
}

export const LiquidLineChart: React.FC<LiquidLineChartProps> = ({
  data,
  height = 300,
  dataKey,
  xAxisKey,
  colors = ["#10b981"],
  areaField = false,
  tickColor = "rgba(255,255,255,0.4)",
}) => {
  const ChartComponent = areaField ? AreaChart : LineChart;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ChartComponent data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke={tickColor}
            tick={{ fontSize: 12, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke={tickColor}
            tick={{ fontSize: 12, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          {areaField ? (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              fillOpacity={1}
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

// --- Liquid Bar Chart ---
interface LiquidBarChartProps extends BaseChartProps {
  dataKey: string;
  xAxisKey: string;
  color?: string;
  barSize?: number;
  tickColor?: string;
}

export const LiquidBarChart: React.FC<LiquidBarChartProps> = ({
  data,
  height = 200,
  dataKey,
  xAxisKey,
  color = "#3b82f6",
  barSize = 12, // Skinny bars like Apple Fitness
  tickColor = "rgba(255,255,255,0.4)",
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke={tickColor}
            tick={{ fontSize: 12, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
          />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[10, 10, 10, 10]}
            barSize={barSize}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Score Ring (Apple Fitness Ring Style) ---
interface ScoreRingProps {
  value: number; // 0 to 100
  label: string;
  subLabel?: string;
  color?: string;
  size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  value,
  label,
  subLabel,
  color = "#ef4444",
  size = 200,
}) => {
  // SVG Metrics
  const strokeWidth = 12; // Thicker ring
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      {/* Content */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "white",
            textShadow: `0 0 20px ${color}`,
          }}
        >
          {label}
        </span>
        {subLabel && (
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "4px",
            }}
          >
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Liquid Distribution Chart (Nested Donut / Apple Rings style) ---
interface LiquidDistributionChartProps {
  data: {
    name: string;
    count: number;
    value: number;
    color: string;
  }[];
  height?: number;
}

const DistributionTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Payload is an array, but for Pie, usually just one item is active/hovered
    const p = payload[0];
    // p.name = Category Name (e.g. "Bourbon")
    // p.value = The value
    // p.dataKey = "value" | "count" | "consumed"

    // We need to access the dataKey to know what label to show.
    // Recharts payload structure: p.name, p.value, p.payload (original object), p.dataKey (sometimes?)
    // Actually p.name comes from nameKey="name".
    // To differentiate rings, we can look at the value in context of the original object?
    // No, simpler: check which property matches p.value? Risky if equal.
    // Better: Recharts Pie passes the `name` prop to the payload if defined on Pie?
    // Let's rely on mapping raw dataKey if possible, but CustomTooltip receives prepared data.
    // Hack: Recharts 2.x passes dataKey. If not available, we assume the order or check props.

    // Using a simpler approach: Render ALL metrics for the hovered collection?
    // User interaction: "Tooltip more obvious what it is".
    // If I hover the outer ring, I expect to see Value.

    // Recharts `Pie` doesn't easily pass the series name to the tooltip payload in standard ways distinct from the slice name.
    // HOWEVER, we can render a consistent "Card" for the collection since the slices behave as one unit visually?
    // No, they are separate rings.

    // Let's try to infer from the value or just render all stats for the collection.
    // "When hovering any ring segment, show the full stats for that collection."
    // This is actually a great UX. "Bourbon: $1200, 45 bottles, 12 consumed".

    const data = p.payload; // The original data object { name, value, count, consumed }

    return (
      <GlassPanel
        style={{
          padding: "12px",
          background: "rgba(20, 20, 23, 0.95)", // Slightly more opaque
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          color: "white",
          minWidth: "180px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "16px",
            fontWeight: 700,
            color: data.color,
            borderBottom: `1px solid ${data.color}`,
            paddingBottom: "4px",
          }}
        >
          {data.name}
        </p>

        {/* Value (Outer) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "4px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)", paddingRight: "4px" }}>
            Collection Value:{" "}
          </span>
          <span style={{ fontWeight: 600 }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.value)}
          </span>
        </div>

        {/* Count (Middle) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "4px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            Total Bottles:{" "}
          </span>
          <span style={{ fontWeight: 600 }}>{data.count}</span>
        </div>
      </GlassPanel>
    );
  }
  return null;
};

export const LiquidDistributionChart: React.FC<
  LiquidDistributionChartProps
> = ({ data, height = 300 }) => {
  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          {/* Ring 1: Collection Value (Outer) */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="95%"
            paddingAngle={4}
            cornerRadius={6}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-value-${index}`}
                fill={entry.color}
                opacity={1}
              />
            ))}
          </Pie>

          {/* Ring 2: Bottle Count (Inner) */}
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="70%"
            paddingAngle={4}
            cornerRadius={6}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-count-${index}`}
                fill={entry.color}
                opacity={0.6}
              />
            ))}
          </Pie>

          <Tooltip
            content={<DistributionTooltip />}
            cursor={{ fill: "transparent" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
