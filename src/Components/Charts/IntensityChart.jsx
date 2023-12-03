import React from "react";
import { Line } from "react-chartjs-2";
import "./charts.css";

const IntensityChart = ({ data }) => {
  const intensities = data.map((item) => item.intensity);
  const sectors = data.map((item) => item.sector);

  const color = "#07d803";

  const chartData = {
    labels: sectors,
    datasets: [
      {
        label: "Intensity",
        data: intensities,
        backgroundColor: "#fff",
        borderColor: color,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Intensity",
          padding: 10,
        },
        grid: {
          color: "#ddd",
        },
      },
      x: {
        title: {
          display: true,
          text: "Sectors",
        },
      },
    },
  };

  return (
    <div className="chart-main-div">
      <h2 style={{ margin: "20px 0" }} className="chart-heading">
        Intensity Chart
      </h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default IntensityChart;
