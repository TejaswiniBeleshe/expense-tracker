import React, { useCallback, useContext, useState } from "react";
import { PieChart, Pie, Cell,Legend } from "recharts";
import styles from "../Piechart/Piechart.module.css"
import { context } from "../Main/Main";
const data = [
  { name: "food", value: 0 },
  { name: "entertainment", value: 0},
  { name: "travel", value: 0 },
  // {name:"no data",value:1}
 
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Piechart() {
  let {categories} = useContext(context);
  return (
    <PieChart  width={300} height={200} margin={{ top:-95, right: 5, bottom: 0, left: -30}} >
      <Legend />
      <Pie
        data={categories}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        
      </Pie>
      
    </PieChart>
  );
}
