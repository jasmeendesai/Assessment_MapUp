import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ filteredData }) => {
  // Sort the manufacturer data by count in descending order and select the top 10
  const top10Data = filteredData.manufacturerData
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-4 max-h-96"> {/* Added overflow-y-auto and max-h-96 */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={top10Data} 
          layout="vertical" // This makes the bar chart horizontal
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="make" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
