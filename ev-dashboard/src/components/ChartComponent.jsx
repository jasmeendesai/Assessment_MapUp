import React from 'react'
import LineChartComponent from './LineChartComponent'

import PieChartComponent from './PieChartComponent'

const ChartComponent = ({filteredData, COLORS}) => {
  return (
    <div className="h-[40vh] p-4 rounded grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-200 p-2 rounded">
                <h5 className="text-lg font-semibold mb-2">EV By model year</h5>
                <LineChartComponent filteredData={filteredData}/>
              </div>
              <div className="bg-gray-200 p-2 rounded">
                <h3 className="text-lg font-semibold mb-2">Range Distribution</h3>
                <PieChartComponent filteredData={filteredData} COLORS={COLORS}/>
              </div>
            </div>
  )
}

export default ChartComponent
