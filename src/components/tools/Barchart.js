import "./Barchart.css";
import React, { useState } from "react";
import useInfo from "../../hooks/use-info";
import ReactApexChart from "react-apexcharts";

const Barchart = () => {
  const { rsk } = useInfo();

  var seriesOp;
  switch (rsk) {
    case "교통사고":
      seriesOp = [
        {
          name: "매우나쁨",
          data: [0.05],
        },
        {
          name: "나쁨",
          data: [0.09],
        },
        {
          name: "보통",
          data: [1.25],
        },
        {
          name: "좋음",
          data: [2.3],
        },
        {
          name: "매우좋음",
          data: [96.31],
        },
      ];
      break;
    case "재해사고":
      seriesOp = [
        {
          name: "매우나쁨",
          data: [0.15],
        },
        {
          name: "나쁨",
          data: [2.29],
        },
        {
          name: "보통",
          data: [2.66],
        },
        {
          name: "좋음",
          data: [6.24],
        },
        {
          name: "매우좋음",
          data: [88.66],
        },
      ];
      break;
    case "범죄사고":
      seriesOp = [
        {
          name: "매우나쁨",
          data: [1.25],
        },
        {
          name: "나쁨",
          data: [4.85],
        },
        {
          name: "보통",
          data: [9.74],
        },
        {
          name: "좋음",
          data: [17.54],
        },
        {
          name: "매우좋음",
          data: [66.62],
        },
      ];
      break;
    case "밀집사고":
      seriesOp = [
        {
          name: "매우나쁨",
          data: [1.8],
        },
        {
          name: "나쁨",
          data: [18.99],
        },
        {
          name: "보통",
          data: [16.16],
        },
        {
          name: "좋음",
          data: [2.98],
        },
        {
          name: "매우좋음",
          data: [60.07],
        },
      ];
      break;
    case "낙상사고":
      seriesOp = [
        {
          name: "매우나쁨",
          data: [0.002],
        },
        {
          name: "나쁨",
          data: [0.008],
        },
        {
          name: "보통",
          data: [0.112],
        },
        {
          name: "좋음",
          data: [1.368],
        },
        {
          name: "매우좋음",
          data: [98.51],
        },
      ];
      break;

    default:
      break;
  }

  const config = {
    series: seriesOp,
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
  };

  const [chartData] = useState(config);
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
