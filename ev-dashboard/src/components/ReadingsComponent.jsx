// import React from 'react';

// const ReadingsComponent = ({
//   totalVehicles,
//   avgEvRange,
//   totalBevVehicles,
//   totalPhevVehicles,
// }) => {
//   return (
//     <div className="h-[15vh] p-1 rounded grid grid-cols-1 sm:grid-cols-4 gap-4">
//       <div className="bg-gray-300 p-4 rounded">
//         <h3 className="text-lg text-red-800 font-semibold">TOTAL VEHICLES</h3>
//         <p>{totalVehicles}</p>
//       </div>
//       <div className="bg-gray-300 p-4 rounded">
//         <h3 className="text-lg text-red-800 font-semibold">AVG EV RANGE</h3>
//         <p>{avgEvRange && !isNaN(avgEvRange) ? avgEvRange.toFixed(2) : "N/A"} miles</p>
//       </div>
//       <div className="bg-gray-300 p-4 rounded">
//         <h3 className="text-lg text-red-800 font-semibold">TOTAL BEV VEHICLES</h3>
//         <p>{totalBevVehicles}</p>
//         <p>% total Change : 10%</p> {/* Static percentage */}
//       </div>
//       <div className="bg-gray-300 p-4 rounded">
//         <h3 className="text-lg text-red-800 font-semibold">TOTAL PHEV VEHICLES</h3>
//         <p>{totalPhevVehicles}</p>
//         <p>% total Change : 10%</p> {/* Static percentage */}
//       </div>
//     </div>
//   );
// };

// export default ReadingsComponent;


import React from 'react';

const ReadingsComponent = ({
  totalVehicles,
  avgEvRange,
  totalBevVehicles,
  totalPhevVehicles,
  prevTotalBevVehicles,
  prevTotalPhevVehicles,
}) => {
  const bevChange = prevTotalBevVehicles
    ? ((totalBevVehicles - prevTotalBevVehicles) / prevTotalBevVehicles) * 100
    : 0;

  const phevChange = prevTotalPhevVehicles
    ? ((totalPhevVehicles - prevTotalPhevVehicles) / prevTotalPhevVehicles) * 100
    : 0;

  return (
    <div className="h-[15vh] p-1 rounded grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-gray-300 p-4 rounded">
        <h3 className="text-lg text-red-800 font-semibold">TOTAL VEHICLES</h3>
        <p>{totalVehicles}</p>
      </div>
      <div className="bg-gray-300 p-4 rounded">
        <h3 className="text-lg text-red-800 font-semibold">AVG EV RANGE</h3>
        <p>{avgEvRange && !isNaN(avgEvRange) ? avgEvRange.toFixed(2) : "N/A"} miles</p>
      </div>
      <div className="bg-gray-300 p-4 rounded">
        <h3 className="text-lg text-red-800 font-semibold">TOTAL BEV VEHICLES</h3>
        <p>{totalBevVehicles}</p>
        <p>{bevChange ? `Change: ${bevChange.toFixed(2)}%` : ""}</p>
      </div>
      <div className="bg-gray-300 p-4 rounded">
        <h3 className="text-lg text-red-800 font-semibold">TOTAL PHEV VEHICLES</h3>
        <p>{totalPhevVehicles}</p>
        <p>{phevChange ? `Change: ${phevChange.toFixed(2)}%` : ""}</p>
      </div>
    </div>
  );
};

export default ReadingsComponent;
