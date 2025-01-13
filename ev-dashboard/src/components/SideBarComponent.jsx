"use client";
import React, { useState } from "react";

const SideBarComponent = () => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");

  const handleChange1 = (e) => setSelectedOption1(e.target.value);
  const handleChange2 = (e) => setSelectedOption2(e.target.value);
  const handleChange3 = (e) => setSelectedOption3(e.target.value);
  const handleChange4 = (e) => setSelectedOption4(e.target.value);

  return (
    <div className="text-white w-full sm:w-60 md:w-68 lg:w-72 m-1 p-2">
      {/* Filters Title */}
      <h1 className="text-2xl font-semibold mb-10 sm:mb-8">Filters</h1>

      {/* Dropdown 1 */}
      <div className="mb-8">
        <label className="block text-sm mb-2">Clean Alternative Fuel Vehicle CAFV</label>
        <select
          className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedOption1}
          onChange={handleChange1}
        >
        {Array.from(new Set(data.yearlyTrends.map(d => d.year))).map(year => (
          <option key={year} value={year.toString()}>{year}</option>
        ))}
        </select>
      </div>

      {/* Dropdown 2 */}
      <div className="mb-8">
        <label className="block text-sm mb-2">EV Type</label>
        <select
          className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedOption2}
          onChange={handleChange2}
        >
        {Array.from(new Set(data.manufacturerData.map(d => d.make))).map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
        </select>
      </div>

      {/* Dropdown 3 */}
      <div className="mb-8">
        <label className="block text-sm mb-2">Make</label>
        <select
          className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedOption3}
          onChange={handleChange3}
        >
        {Array.from(new Set(data.manufacturerData.map(d => d.make))).map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
        </select>
      </div>

      {/* Dropdown 4 */}
      <div className="mb-8">
        <label className="block text-sm mb-2">Model</label>
        <select
          className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedOption4}
          onChange={handleChange4}
        >
        {Array.from(new Set(data.manufacturerData.map(d => d.make))).map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
        </select>
      </div>

      {/* Dropdown 5 */}
      <div className="mb-8">
        <label className="block text-sm mb-2">State</label>
        <select
          className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedOption4}
          onChange={handleChange4}
        >
        {Array.from(new Set(data.manufacturerData.map(d => d.make))).map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
        </select>
      </div>
    </div>
  );
};

export default SideBarComponent;
