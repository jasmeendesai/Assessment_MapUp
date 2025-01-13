import React from 'react';
import LineChartComponent from './LineChartComponent';

const SummaryComponent = ({ filteredData }) => {
  if (!filteredData) return null;

  const topManufacturers = filteredData.manufacturerData; // Top 10 manufacturers
  
  return (
    <div className="bg-white rounded-lg shadow p-4 max-h-96">
      
      {/* Top 10 Manufacturers */}
      <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">Make</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">Average Range</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">Count</th>
            </tr>
          </thead>
          <tbody>
            {topManufacturers.map((manufacturer, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-2 text-xs text-gray-600">{manufacturer.make}</td>
                <td className="px-4 py-2 text-xs text-gray-600">{manufacturer.avgRange}</td>
                <td className="px-4 py-2 text-xs font-bold text-gray-600">{manufacturer.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
};

export default SummaryComponent;
