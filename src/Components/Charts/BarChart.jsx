import React from "react";
import { Bar } from "react-chartjs-2";
import "./charts.css";

const BarChart = ({ data, setSelectedCategory }) => {
  const totalTimeForA = data?.reduce((acc, curr) => acc + parseFloat(curr.A), 0);
  const totalTimeForB = data?.reduce((acc, curr) => acc + parseFloat(curr.B), 0);
  const totalTimeForC = data?.reduce((acc, curr) => acc + parseFloat(curr.C), 0);
  const totalTimeForD = data?.reduce((acc, curr) => acc + parseFloat(curr.D), 0);
  const totalTimeForE = data?.reduce((acc, curr) => acc + parseFloat(curr.E), 0);
  const totalTimeForF = data?.reduce((acc, curr) => acc + parseFloat(curr.F), 0);

  const timeLabel = ["A", "B", "C", "D", "E", "F"];
  const timeValues = [
    totalTimeForA,
    totalTimeForB,
    totalTimeForC,
    totalTimeForD,
    totalTimeForE,
    totalTimeForF,
  ];

  const chartData = {
    labels: timeLabel,
    datasets: [
      {
        label: "Features Count",
        data: timeValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedBarIndex = elements[0].index;
        const clickedBarLabel = timeLabel[clickedBarIndex];
        setSelectedCategory(clickedBarLabel);
      }
    },
  };
  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Features Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
