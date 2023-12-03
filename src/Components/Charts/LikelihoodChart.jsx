import React from "react";
import { Bar } from "react-chartjs-2";
import "./charts.css";

const LikelihoodBarChart = ({ data }) => {
  const insightsByValue = {};
  data.forEach((item) => {
    const insight = item.insight;
    if (!insightsByValue[insight]) {
      insightsByValue[insight] = {
        totalLikelihood: 0,
        count: 0,
      };
    }
    insightsByValue[insight].totalLikelihood += item.likelihood;
    insightsByValue[insight].count++;
  });

  const uniqueInsights = Object.keys(insightsByValue);
  const averageLikelihoods = uniqueInsights.map((insight) => {
    const { totalLikelihood, count } = insightsByValue[insight];
    return totalLikelihood / count;
  });

  const chartData = {
    labels: uniqueInsights,
    datasets: [
      {
        label: "Average Likelihood",
        data: averageLikelihoods,
        backgroundColor: "#fff",
        borderColor: "#07d803",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Insight",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Likelihood",
        },
      },
    },
  };

  return (
    <div className="chart-main-div">
      <h2 className="chart-heading">Insight vs. Average Likelihood</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default LikelihoodBarChart;
