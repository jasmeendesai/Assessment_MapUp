import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AreaChartComponent = ({ filteredData }) => {
  // Sort the manufacturer data by count in descending order and select the top 10
  const top10Data = filteredData.manufacturerData
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-auto max-h-96">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={top10Data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="make" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
