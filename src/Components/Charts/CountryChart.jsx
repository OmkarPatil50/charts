import React from "react";
import { Pie } from "react-chartjs-2";
import "./charts.css";

const CountryChart = ({ data }) => {
  const countries = data.map((item) => item.country);

  const countryCounts = countries.reduce((counts, country) => {
    counts[country] = (counts[country] || 0) + 1;
    return counts;
  }, {});

  const uniqueCountries = Object.keys(countryCounts);
  const countryCountsValues = Object.values(countryCounts);

  const colors = [
    "#ff5733",
    "#ffbd33",
    "#33ff5e",
    "#33b8ff",
    "#a933ff",
    "#ff33cf",
    "#33ffe9",
    "#ff5733",
  ];

  const chartData = {
    labels: uniqueCountries,
    datasets: [
      {
        label: "Events Count",
        data: countryCountsValues,
        backgroundColor: colors,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Country Chart</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default CountryChart;
