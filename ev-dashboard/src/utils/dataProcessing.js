export const processEVData = (csvData) => {
  const manufacturerStats = {};
  const yearlyStats = {};
  const modelStats = {};
  const rangeStats = {
    '0-100': 0,
    '101-200': 0,
    '201-300': 0,
    '301+': 0
  };

  csvData.forEach(row => {
    // Manufacturer stats
    if (!manufacturerStats[row.Make]) {
      manufacturerStats[row.Make] = {
        total: 0,
        models: new Set(),
        avgRange: 0,
        rangeSum: 0
      };
    }
    manufacturerStats[row.Make].total += 1;
    manufacturerStats[row.Make].models.add(row.Model);
    manufacturerStats[row.Make].rangeSum += parseFloat(row['Electric Range']);

    // Yearly stats
    const modelYear = row['Model Year'];
    if (!yearlyStats[modelYear]) {
      yearlyStats[modelYear] = {
        total: 0,
        byMake: {}
      };
    }
    yearlyStats[modelYear].total += 1;
    if (!yearlyStats[modelYear].byMake[row.Make]) {
      yearlyStats[modelYear].byMake[row.Make] = 0;
    }
    yearlyStats[modelYear].byMake[row.Make] += 1;

    // Model stats
    const modelKey = `${row.Make} ${row.Model}`;
    if (!modelStats[modelKey]) {
      modelStats[modelKey] = {
        count: 0,
        avgRange: 0,
        rangeSum: 0
      };
    }
    modelStats[modelKey].count += 1;
    modelStats[modelKey].rangeSum += parseFloat(row['Electric Range']);

    // Range stats
    const range = parseFloat(row['Electric Range']);
    if (range <= 100) rangeStats['0-100'] += 1;
    else if (range <= 200) rangeStats['101-200'] += 1;
    else if (range <= 300) rangeStats['201-300'] += 1;
    else rangeStats['301+'] += 1;
  });

  // Calculate averages
  Object.keys(manufacturerStats).forEach(make => {
    manufacturerStats[make].avgRange = 
      manufacturerStats[make].rangeSum / manufacturerStats[make].total;
    manufacturerStats[make].models = Array.from(manufacturerStats[make].models);
  });

  Object.keys(modelStats).forEach(model => {
    modelStats[model].avgRange = 
      modelStats[model].rangeSum / modelStats[model].count;
  });

  return {
    manufacturerStats,
    yearlyStats,
    modelStats,
    rangeStats
  };
};

export const prepareChartData = (processedData) => {
  return {
    manufacturerData: Object.entries(processedData.manufacturerStats)
      .map(([make, data]) => ({
        make,
        count: data.total,
        avgRange: Math.round(data.avgRange)
      }))
      .sort((a, b) => b.count - a.count),

    yearlyTrends: Object.entries(processedData.yearlyStats)
      .map(([year, data]) => ({
        year: parseInt(year),
        total: data.total,
        ...data.byMake
      }))
      .sort((a, b) => a.year - b.year),

    rangeDistribution: Object.entries(processedData.rangeStats)
      .map(([range, count]) => ({
        range,
        count
      })),

    modelData: Object.entries(processedData.modelStats)
      .map(([model, data]) => ({
        model,
        count: data.count,
        avgRange: Math.round(data.avgRange)
      }))
      .sort((a, b) => b.count - a.count)
  };
};
