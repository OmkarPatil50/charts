import React from "react";
import { Bar } from "react-chartjs-2";
import "./charts.css";

const InsightVsRelevanceChart = ({ data }) => {
  const insightValues = data.map((item) => item.insight);
  const relevanceValues = data.map((item) => item.relevance);

  const chartData = {
    labels: data.map((item) => item.insight),
    datasets: [
      {
        label: "Insight",
        data: insightValues,
        backgroundColor: "#fff",
        borderColor: "#07d803",
        borderWidth: 1,
      },
      {
        label: "Relevance",
        data: relevanceValues,
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
          text: "Relevance",
        },
      },
      x: {
        title: {
          display: true,
          text: "Insight",
        },
      },
    },
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Insight vs Relevance Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default InsightVsRelevanceChart;
