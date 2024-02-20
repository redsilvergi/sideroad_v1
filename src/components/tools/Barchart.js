import "./Barchart.css";
import React, { useState } from "react";

import ReactApexChart from "react-apexcharts";

const Barchart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "매우나쁨",
        data: [15],
      },
      {
        name: "나쁨",
        data: [20],
      },
      {
        name: "보통",
        data: [45],
      },
      {
        name: "좋음",
        data: [15],
      },
      {
        name: "매우좋음",
        data: [5],
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false, // This line disables the toolbar, removing the hamburger menu
        },
      },
      colors: ["#dd0016", "#e98d78", "#f2d492", "#79c2a5", "#00afb9"],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 0,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [" "], // A single space as a placeholder
        labels: {
          formatter: function (val) {
            return `${val}%`;
          },
          offsetY: -5,
          style: {
            fontSize: "7px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "9px", // Adjust y-axis label font size here
          },
        },
        min: 0, // Set minimum value of x-axis
        max: 100, // Set maximum value of x-axis to 100%
        tickAmount: 5, // Set the number of ticks (intervals) you want, 5 intervals create 6 sections: 0%, 20%, 40%, 60%, 80%, 100%
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
      },
      tooltip: {
        style: {
          fontSize: "8px",
        },
        x: {
          show: false,
        },
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center", // Aligns the legend items in the center
        offsetX: -5,
        fontSize: "7px",
        markers: {
          width: 5,
          height: 5,
        },
        itemMargin: {
          horizontal: 2,
          vertical: 0,
        },
      },
      dataLabels: {
        enabled: false, // This line ensures that no data labels will be displayed on the bars
      },
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={"60%"}
          width={"103%"}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Barchart;
