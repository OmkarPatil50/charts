import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./charts.css";

const RegionChart = ({ data }) => {
  const regions = data.map((item) => item.region);

  const regionCounts = regions.reduce((counts, region) => {
    counts[region] = (counts[region] || 0) + 1;
    return counts;
  }, {});

  const uniqueRegions = Object.keys(regionCounts);
  const regionCountsValues = Object.values(regionCounts);

  const colors = uniqueRegions.map(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  });

  const chartData = {
    labels: uniqueRegions,
    datasets: [
      {
        label: "Events Count",
        data: regionCountsValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Region Chart (Doughnut)</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default RegionChart;
