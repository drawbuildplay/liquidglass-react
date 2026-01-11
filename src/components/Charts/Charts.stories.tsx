import {
  LiquidBarChart,
  LiquidLineChart,
  LiquidSpectrumChart,
  ScoreRing,
  LiquidDistributionChart,
} from "./LiquidCharts";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "Components/Charts",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const BarChartStory = {
  render: () => (
    <LiquidBarChart
      data={[
        { day: "Mon", value: 10 },
        { day: "Tue", value: 20 },
        { day: "Wed", value: 15 },
        { day: "Thu", value: 25 },
        { day: "Fri", value: 30 },
      ]}
      dataKey="value"
      xAxisKey="day"
      height={200}
    />
  ),
  name: "Bar Chart",
};

export const LineChartStory = {
  render: () => (
    <LiquidLineChart
      data={[
        { day: "Mon", value: 10 },
        { day: "Tue", value: 20 },
        { day: "Wed", value: 15 },
        { day: "Thu", value: 25 },
        { day: "Fri", value: 30 },
      ]}
      dataKey="value"
      xAxisKey="day"
      height={200}
    />
  ),
  name: "Line Chart",
};

export const ScoreRingStory = {
  render: () => (
    <div style={{ background: "#000", padding: "20px" }}>
      <ScoreRing value={75} label="75" subLabel="Score" />
    </div>
  ),
  name: "Score Ring",
};

export const SpectrumChartStory = {
  render: () => (
    <div style={{ width: "100%", height: 300 }}>
      <LiquidSpectrumChart
        data={[
          { name: "Strong", count: 5, fill: "#ff0000" },
          { name: "Medium", count: 10, fill: "#00ff00" },
          { name: "Mild", count: 3, fill: "#0000ff" },
        ]}
        maxValue={18}
      />
    </div>
  ),
  name: "Spectrum Chart",
};

export const DistributionChartStory = {
  render: () => (
    <div style={{ width: "100%", height: 300 }}>
      <LiquidDistributionChart
        data={[
          { name: "Type A", count: 10, value: 1000, color: "#ff6384" },
          { name: "Type B", count: 20, value: 2000, color: "#36a2eb" },
          { name: "Type C", count: 15, value: 1500, color: "#cc65fe" },
        ]}
      />
    </div>
  ),
  name: "Distribution Chart",
};
