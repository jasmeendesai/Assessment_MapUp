import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-auto max-h-96">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Make
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              EV Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Count
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Make}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Model}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Electric Vehicle Type"]}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
