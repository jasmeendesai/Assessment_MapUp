import React from 'react';
import BarChartComponent from './BarChartComponent';
import AreaChartComponent from './AreaChartComponent';
import DataTable from './DataTable';
import SummaryComponent from './SummaryComponent';

const BottomComponent = ({ filteredData }) => {
  return (
    <div className="h-[40vh] p-4 rounded grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gray-200 p-4 rounded overflow-y-auto"> {/* Added overflow-y-auto */}
        <h3 className="text-lg font-semibold">Top EV Vehicles</h3>
        <BarChartComponent filteredData={filteredData} />
      </div>
      <div className="bg-gray-200 p-4 rounded overflow-y-auto"> {/* Added overflow-y-auto */}
        <h3 className="text-lg font-semibold">CAFV Eligibility</h3>
        <AreaChartComponent filteredData={filteredData}/>
      </div>
      <div className="bg-gray-200 p-4 rounded overflow-y-auto"> {/* Added overflow-y-auto */}
        <h3 className="text-lg font-semibold">EV Models</h3>
        <SummaryComponent filteredData={filteredData}/>
      </div>
    </div>
  );
}

export default BottomComponent;
