
"use client";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"; // Optional, if you want to use Material-UI icons
import Papa from "papaparse";
import { prepareChartData, processEVData } from "@/utils/dataProcessing";
import ReadingsComponent from "@/components/ReadingsComponent";
import ChartComponent from "@/components/ChartComponent";
import BottomComponent from "@/components/BottomComponent";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [cafvOptions, setCafvOptions] = useState(["all", "Yes", "No"]);
  const [evTypeOptions, setEvTypeOptions] = useState([
    "all",
    "BEV",
    "PHEV",
    "FCEV",
  ]);

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00C49F",
    "#FFBB28",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/data-to-visualize/Electric_Vehicle_Population_Data.csv"
        );
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const parsedData = results.data.filter(
              (row) =>
                row.Make &&
                row.Model &&
                row["Model Year"] &&
                row["Electric Range"]
            );

            const processedData = processEVData(parsedData);
            const chartData = prepareChartData(processedData);

            // Set options for dropdowns (Make, Model, State, CAFV, EV Type)
            const uniqueMakes = Array.from(new Set(parsedData.map((d) => d.Make)));
            const uniqueModels = Array.from(new Set(parsedData.map((d) => d.Model)));
            const uniqueStates = Array.from(new Set(parsedData.map((d) => d.State)));

            setMakes(uniqueMakes);
            setModels(uniqueModels);
            setStates(uniqueStates);

            // Extract unique values for CAFV and EV Type
            const uniqueCafvValues = Array.from(
              new Set(
                parsedData.map(
                  (row) =>
                    row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]
                )
              )
            );
            setCafvOptions(["all", ...uniqueCafvValues]);

            const uniqueEvTypes = Array.from(
              new Set(parsedData.map((row) => row["Electric Vehicle Type"]))
            );
            setEvTypeOptions(["all", ...uniqueEvTypes]);

            setData(chartData);
            setFilteredData(chartData);
          },
          error: (error) => {
            console.error("Papa Parse Error:", error);
          },
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (make, model, state, cafv, evType) => {
    if (!data) return;

    let filtered = { ...data };

    // Apply Make Filter
    if (make !== "all") {
      filtered = {
        ...filtered,
        modelData: filtered.modelData.filter((d) => d.make === make),
        rangeDistribution: filtered.rangeDistribution.filter(
          (d) => d.make === make
        ),
      };
    }

    // Apply Model Filter
    if (model !== "all") {
      filtered = {
        ...filtered,
        modelData: filtered.modelData.filter((d) => d.model === model),
      };
    }

    // Apply State Filter
    if (state !== "all") {
      filtered = {
        ...filtered,
        modelData: filtered.modelData.filter((d) => d.state === state),
        rangeDistribution: filtered.rangeDistribution.filter(
          (d) => d.state === state
        ),
      };
    }

    // Apply Clean Alternative Fuel Vehicle Filter (CAFV)
    if (cafv !== "all") {
      filtered = {
        ...filtered,
        manufacturerData: data.manufacturerData.filter(
          (d) => d["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === cafv
        ),
        modelData: data.modelData.filter(
          (d) => d["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === cafv
        ),
      };
    }

    // Apply EV Type Filter
    if (evType !== "all") {
      filtered = {
        ...filtered,
        modelData: filtered.modelData.filter(
          (d) => d["Electric Vehicle Type"] === evType
        ),
      };
    }

    setFilteredData(filtered);
  };

  // Function to calculate readings
  const calculateReadings = (data) => {
    if (!data || !data.modelData || data.modelData.length === 0) return {};

    const totalVehicles = data.modelData.length;

    // Calculate total electric range, handling non-numeric values properly
    const totalEvRange =
      data.modelData.reduce(
        (sum, vehicle) =>
          sum + (parseFloat(vehicle["Electric Range"]) || 0),
        0
      );

    const avgEvRange = totalVehicles > 0 ? totalEvRange / totalVehicles : 0;

    // Calculate the number of BEV and PHEV vehicles based on the "Electric Vehicle Type"
    const totalBevVehicles = data.modelData.filter(
      (vehicle) => vehicle["Electric Vehicle Type"] == "Battery Electric Vehicle (BEV)"
    ).length;

    const totalPhevVehicles = data.modelData.filter(
      (vehicle) => vehicle["Electric Vehicle Type"] == "Plug-in Hybrid Electric Vehicle (PHEV)"
    ).length;

    return {
      totalVehicles,
      avgEvRange,
      totalBevVehicles,
      totalPhevVehicles,
    };
  };

  const readings = calculateReadings(data);

  const totalEVs = filteredData?.manufacturerData?.reduce((sum, item) => sum + item.count, 0) ?? 0;
  const avgRange = filteredData?.manufacturerData?.reduce((sum, item) => sum + item.avgRange, 0) / (filteredData?.manufacturerData?.length || 1);


  console.log(filteredData)

  if (!filteredData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-800">Loading...</div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top - Header */}
      <div className="w-full bg-slate-500 h-[50px] p-2 flex items-center justify-between px-4">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          ELECTRIC VEHICLE DATA ANALYSIS
        </h1>
        {/* Hamburger Menu Button (visible only on mobile) */}
        <button
          className="text-white lg:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Bottom - Main content and Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white w-64 p-4 transition-transform duration-300 lg:block fixed inset-0 lg:relative ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="text-white w-full sm:w-60 md:w-68 lg:w-72 m-1 p-2">
            {/* Filters Title */}
            <h1 className="text-2xl font-semibold mb-10 sm:mb-8">Filters</h1>

            {/* Make Dropdown */}
            <div className="mb-8">
              <label className="block text-sm mb-2">Make</label>
              <select
                className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  filterData(e.target.value, "all", "all", "all", "all")
                }
              >
                <option value="all">All</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div className="mb-8">
              <label className="block text-sm mb-2">Model</label>
              <select
                className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  filterData("all", e.target.value, "all", "all", "all")
                }
              >
                <option value="all">All</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div className="mb-8">
              <label className="block text-sm mb-2">State</label>
              <select
                className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  filterData("all", "all", e.target.value, "all", "all")
                }
              >
                <option value="all">All</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Clean Alternative Fuel Vehicle (CAFV) Dropdown */}
            <div className="mb-8">
              <label className="block text-sm mb-2">
                Clean Alternative Fuel Vehicle CAFV
              </label>
              <select
                className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  filterData("all", "all", "all", e.target.value, "all")
                }
              >
                {cafvOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* EV Type Dropdown */}
            <div className="mb-8">
              <label className="block text-sm mb-2">EV Type</label>
              <select
                className="w-[80%] p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  filterData("all", "all", "all", "all", e.target.value)
                }
              >
                {evTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-4 overflow-auto ${isSidebarOpen ? "ml-64" : ""}`}
        >
          <div className="flex flex-col space-y-4">
            {/* First Section (15% of the total height) */}
            <ReadingsComponent
              totalVehicles={totalEVs}
              avgEvRange={avgRange}
              totalBevVehicles={readings.totalBevVehicles || 1000}
              totalPhevVehicles={readings.totalPhevVehicles || 1000}
            />

            {/* Second Section (35% of the total height) */}
            <ChartComponent filteredData={filteredData} COLORS={COLORS}/>

            {/* Third Section (remaining height, 50% of the total height) */}
            <BottomComponent filteredData={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
}
