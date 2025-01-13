import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ filteredData }) => {
  return (
              <div className="bg-white rounded-lg shadow p-4 h-48">
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={filteredData.yearlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
  )
};

export default LineChartComponent;
