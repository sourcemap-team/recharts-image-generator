import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import ChartColors from "@components/Helpers/ChartColors";
import { IPortfolioStructure } from "types";

export default (props: { structure: IPortfolioStructure }) => {
  const { structure } = props;

  return (
    <PieChart width={403} height={240}>
      <Pie
        data={structure.data}
        dataKey={(row) => {
          return Math.abs(row.total);
        }}
        label={(row) => {
          return (row.share * 100).toFixed(1) + "%";
        }}
        nameKey="short_name"
        labelLine={false}
        innerRadius="60%"
        outerRadius="80%"
        fill="#8884d8"
        paddingAngle={2}
      >
        {structure.data.map((entry, index) => (
          <Cell
            key={`structure-${index}`}
            fill={ChartColors[index % ChartColors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
