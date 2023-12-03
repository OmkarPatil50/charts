import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./charts.css";

const YearChart = ({ data }) => {
  const years = data.map((item) => item.end_year);

  const yearCounts = years.reduce((counts, year) => {
    counts[year] = (counts[year] || 0) + 1;
    return counts;
  }, {});

  const uniqueYears = Object.keys(yearCounts);
  const yearCountsValues = Object.values(yearCounts);

  const chartData = {
    labels: uniqueYears,
    datasets: [
      {
        label: "Events Count",
        data: yearCountsValues,
        backgroundColor: "#fff",
        borderColor: "#07d803",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Year Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default YearChart;
