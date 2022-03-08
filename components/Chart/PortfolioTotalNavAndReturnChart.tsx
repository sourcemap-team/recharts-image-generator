import React from "react";
import { PortfolioChartDot } from "types";
import { getNavDomain, getPercentDomain } from '@utils/index'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { roundAmount } from "@components/Helpers/Amount";

const PortfolioTotalNavAndReturnChart = (props: {dots: PortfolioChartDot[]}) => {
  const { dots } = props;
  const navDomain = getNavDomain(dots)
  const percentDomain = getPercentDomain(dots)

  return (
    <ComposedChart
      width={796}
      height={220}
      data={dots}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis
        yAxisId={1}
        domain={navDomain}
        tickFormatter={(value) => {
          return roundAmount(value);
        }}
        allowDataOverflow={true}
      />
      <YAxis
        yAxisId={2}
        orientation="right"
        unit="%"
        domain={percentDomain}
      />
      <Legend />
      <Bar
        dataKey={(a) => {
          return a.nav - a.deposit;
        }}
        yAxisId={1}
        name="Total NAV"
        fill="#303778"
        stackId="a"
      />
      <Bar
        dataKey="nav_historical"
        yAxisId={1}
        name="Restored NAV"
        fill="#aeb0b7"
        stackId="a"
      />
      <Bar
        dataKey="deposit"
        yAxisId={1}
        name="Deposit"
        fill="#009900"
        stackId="a"
      />
      <Bar
        dataKey="withdrawal"
        yAxisId={1}
        name="Withdrawal"
        fill="#dc3545"
        stackId="a"
      />
      <Line
        type="linear"
        yAxisId={2}
        dataKey="portfolio"
        name="Total Return"
        stroke="#4B75FB"
        strokeWidth={2}
        dot={false}
      />

      <Line
        type="linear"
        yAxisId={2}
        dataKey="benchmark"
        name="Benchmark Return"
        stroke="#8e9096"
        strokeDasharray="4 4"
        dot={false}
      />
    </ComposedChart>
  );
};

export default PortfolioTotalNavAndReturnChart;
