
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { context } from "../Main/Main";
// const data = [
//   {
//     name: "travel",
//     // uv: 4000,
//     // pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "entertainment",
//     // uv: 3000,
//     // pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "food",
//     // uv: 2000,
//     // pv: 9800,
//     amt: 2290,
//   },
 
  
// ];

export default function Barchart() {
  let {catPrice} = useContext(context)
  return (
    <BarChart
      width={500}
      height={300}
     
      data={catPrice}
      layout="vertical"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis
        type="number"
        axisLine={false}
        display="none"
        padding={{ left: 10, right: 10 }}
      />
      <YAxis type="category" width={100} dataKey="name" axisLine ={false}/>
      <Bar dataKey="amt" fill="#8884d8"  />
    </BarChart>
  );
}
