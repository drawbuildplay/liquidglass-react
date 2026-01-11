import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import {
  LiquidSpectrumChart,
  LiquidLineChart,
  LiquidBarChart,
  ScoreRing,
  LiquidDistributionChart,
} from "./LiquidCharts";

// Mock Recharts modules effectively to inspect what is rendered
vi.mock("recharts", () => {
  const MockChildren = ({ children, ...props }: any) => (
    <div data-testid="recharts-mock" data-props={JSON.stringify(props)}>
      {children}
    </div>
  );
  return {
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    BarChart: MockChildren,
    Bar: MockChildren,
    LineChart: MockChildren,
    Line: MockChildren,
    AreaChart: MockChildren,
    Area: MockChildren,
    PieChart: MockChildren,
    Pie: MockChildren,
    Cell: MockChildren,
    RadialBarChart: MockChildren,
    RadialBar: MockChildren,
    XAxis: () => <div />,
    YAxis: () => <div />,
    CartesianGrid: () => <div />,
    Tooltip: () => <div />,
    Legend: () => <div />,
    PolarAngleAxis: () => <div />,
  };
});

describe("LiquidCharts", () => {
  describe("LiquidSpectrumChart", () => {
    test("renders chart with data", () => {
      const data = [{ name: "A", count: 10, fill: "#fff" }];
      render(<LiquidSpectrumChart data={data} maxValue={100} />);
      // Should verify it rendered BarChart (mocked)
      // Since mocks are nested (BarChart -> Bar), we get multiple testids
      expect(screen.getAllByTestId("recharts-mock").length).toBeGreaterThan(0);
    });
  });

  describe("LiquidLineChart", () => {
    test("renders line chart", () => {
      const data = [{ name: "A", val: 10 }];
      render(<LiquidLineChart data={data} dataKey="val" xAxisKey="name" />);
      expect(screen.getAllByTestId("recharts-mock").length).toBeGreaterThan(0);
    });
  });

  describe("LiquidBarChart", () => {
    test("renders bar chart", () => {
      const data = [{ name: "A", val: 10 }];
      render(<LiquidBarChart data={data} dataKey="val" xAxisKey="name" />);
      expect(screen.getAllByTestId("recharts-mock").length).toBeGreaterThan(0);
    });
  });

  describe("ScoreRing", () => {
    test("renders label and SVG", () => {
      render(<ScoreRing value={50} label="50%" />);
      expect(screen.getByText("50%")).toBeInTheDocument();
      // It uses native SVG, not Recharts
      // Check for circles
      const svg = screen
        .getByText("50%")
        .closest("div")
        ?.parentElement?.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("LiquidDistributionChart", () => {
    test("renders pie chart", () => {
      const data = [{ name: "A", count: 10, value: 100, color: "#fff" }];
      render(<LiquidDistributionChart data={data} />);
      expect(screen.getAllByTestId("recharts-mock").length).toBeGreaterThan(0);
    });
  });
});
