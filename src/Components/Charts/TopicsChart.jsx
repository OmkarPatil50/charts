import React from "react";
import { Bar } from "react-chartjs-2";
import "./charts.css";

const TopicsChart = ({ data }) => {
  const topics = data.map((item) => item.topic);

  const topicCounts = topics.reduce((counts, topic) => {
    counts[topic] = (counts[topic] || 0) + 1;
    return counts;
  }, {});

  const uniqueTopics = Object.keys(topicCounts);
  const topicCountsValues = Object.values(topicCounts);

  const chartData = {
    labels: uniqueTopics,
    datasets: [
      {
        label: "Topics Count",
        data: topicCountsValues,
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
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Topics Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TopicsChart;
