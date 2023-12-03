import React from "react";
import { Line } from "react-chartjs-2";
import "./charts.css";

const LineChart = ({ data, selectedCategory }) => {
  const dates = data?.reduce((acc, curr) => {
    return acc.some((item) => item.Day === curr.Day)
      ? acc.reduce((all, current) => {
          return current.Day === curr.Day
            ? [
                ...all,
                {
                  ...current,
                  value: current.value + parseFloat(curr[selectedCategory]),
                },
              ]
            : [...all, current];
        }, [])
      : [...acc, { Day: curr.Day, value: curr[selectedCategory] }];
  }, []);
  function convertExcelSerialNumberToJSDate(serialNumber) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const excelStartDate = new Date("1900-01-01T00:00:00Z");
    const offsetDays = serialNumber - 1; // Excel starts counting from 1, not 0

    const targetDate = new Date(
      excelStartDate.getTime() + offsetDays * millisecondsPerDay
    );

    return formatDate(targetDate);
  }

  function formatDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return ` ${formattedDate}`;
  }

  const dateLabels = dates?.map(({ Day }) =>
    convertExcelSerialNumberToJSDate(Day)
  );
  const intensities = dates?.map(({ value }) => value);

  const color = "#07d803";

  const chartData = {
    labels: dateLabels,
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
          text: "Dates",
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

export default LineChart;
