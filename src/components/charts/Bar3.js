import './Bar3.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Bar3 = () => {
  // data ----------------------------------------------------------------------
  const data = [
    {
      name: '교통사고 위험도 현황',
      매우나쁨: 5,
      나쁨: 15.6,
      보통: 30,
      좋음: 15,
      매우좋음: 34.4,
    },
  ];

  const keys = ['매우나쁨', '나쁨', '보통', '좋음', '매우좋음'];

  // auxiliary ----------------------------------------------------------------------
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log('payload:', payload);
      return (
        <div className="bar3_ttp">
          {payload.map((item, id) => {
            return (
              <div key={id} className="bar3_ttp_lbl">
                <div className="bar3_cirtxt">
                  <div
                    className="bar3_cirs"
                    style={{ backgroundColor: `${item.fill}` }}
                  ></div>
                  <div className="bar3_lbl_txt1">{`${item.dataKey}`}</div>
                </div>
                <div className="bar3_lbl_txt2">{`${Math.round(
                  item.value
                )}%`}</div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };
  // const nameList =
  //   data &&
  //   data.map((item, id) => {
  //     return item.name;
  //   });
  const colourList = ['#dd0016', '#e98d78', '#f2d492', '#79c2a5', '#00afb9'];
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="bar3_legend">
        {payload.map((item, id) => (
          <div key={id} className="bar3_legend2">
            <span
              style={{
                display: 'inline-block',
                marginRight: '3px',
                width: '5px',
                height: '5px',
                backgroundColor: item.color,
              }}
            ></span>
            {item.value}
          </div>
        ))}
      </div>
    );
  };
  const CustomXtick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} fill="#000" fontSize={8} textAnchor="middle">
        {`${payload.value}%`}
      </text>
    );
  };

  // render ----------------------------------------------------------------------
  const renderIndvBars = () => {
    return keys.map((item, id) => {
      return (
        <Bar
          key={id}
          dataKey={item}
          stackId={'a'}
          fill={colourList[id]}
          barSize={20}
          // radius={[0, 10, 10, 0]}
        />
      );
    });
  };
  const renderBars_top = () => {
    return (
      data &&
      data.map((item, id) => {
        return (
          <div className="bar3_d2" key={id}>
            <ResponsiveContainer width="100%" height={70}>
              <BarChart
                layout="vertical"
                data={[item]}
                margin={{
                  // top: 30,
                  right: 10,
                  left: -40,
                  // bottom: 20,
                }}
              >
                {/* <text x="20" y="25" fontSize={11} fontWeight="bold">
                  {nameList[id]}
                </text> */}
                <CartesianGrid strokeDasharray="0 1" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  // tickFormatter={(val) => `${val}%`}
                  tick={<CustomXtick />}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={false}
                  axisLine={false}
                />
                <Legend content={<CustomLegend />} />

                {/* <Legend
                  // width={250}
                  // height={5}
                  verticalAlign="bottom"
                  align="center"
                  iconSize={5}
                  iconType="square"
                  className="bar3_legend"
                /> */}
                <Tooltip content={<CustomTooltip />} />
                {renderIndvBars()}
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      })
    );
  };

  // return ----------------------------------------------------------------------
  return <div className="bar3_d1">{renderBars_top()}</div>;
};

export default Bar3;

// import './Bar3.css';
// import React, { useState } from 'react';
// import useInfo from '../../hooks/use-info';
// import ReactApexChart from 'react-apexcharts';

// const Bar3 = () => {
//   const { rnfo0 } = useInfo();

//   const mode = rnfo0 && 0;

//   var seriesOp;
//   switch (mode) {
//     case 0:
//       seriesOp = [
//         {
//           name: '매우나쁨',
//           data: [5],
//           // data: [0.03],
//         },
//         {
//           name: '나쁨',
//           data: [15.6],
//           // data: [0.05],
//         },
//         {
//           name: '보통',
//           data: [30],
//           // data: [0.93],
//         },
//         {
//           name: '좋음',
//           data: [15],
//           // data: [1.96],
//         },
//         {
//           name: '매우좋음',
//           data: [34.4],
//           // data: [97.02],
//         },
//       ];
//       break;
//     default:
//       seriesOp = [
//         {
//           name: '매우나쁨',
//           data: [5],
//           // data: [0.03],
//         },
//         {
//           name: '나쁨',
//           data: [15.6],
//           // data: [0.05],
//         },
//         {
//           name: '보통',
//           data: [30],
//           // data: [0.93],
//         },
//         {
//           name: '좋음',
//           data: [15],
//           // data: [1.96],
//         },
//         {
//           name: '매우좋음',
//           data: [34.4],
//           // data: [97.02],
//         },
//       ];
//       break;
//   }

//   const config = {
//     series: seriesOp,
//     options: {
//       chart: {
//         type: 'bar',
//         stacked: true,
//         stackType: '100%',
//         toolbar: {
//           show: false, // This line disables the toolbar, removing the hamburger menu
//         },
//         padding: {
//           top: 0,
//           right: 0,
//           bottom: 0,
//           left: 0,
//         },
//         margin: {
//           top: 0,
//           right: 0,
//           bottom: 0,
//           left: 0,
//         },
//       },
//       colors: ['#dd0016', '#e98d78', '#f2d492', '#79c2a5', '#00afb9'],
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           barHeight: '100%', // Ensure bars fill the height completely
//         },
//       },
//       stroke: {
//         width: 0,
//         colors: ['#fff'],
//       },
//       xaxis: {
//         categories: [''], // A single space as a placeholder
//         labels: {
//           formatter: function (val) {
//             return `${val}%`;
//           },
//           offsetY: -5,
//           style: {
//             fontSize: '7px',
//           },
//         },
//       },
//       yaxis: {
//         labels: {
//           style: {
//             fontSize: '9px', // Adjust y-axis label font size here
//           },
//         },
//         min: 0, // Set minimum value of x-axis
//         max: 0, // Set maximum value of x-axis to 100%
//         // tickAmount: 5, // Set the number of ticks (intervals) you want, 5 intervals create 6 sections: 0%, 20%, 40%, 60%, 80%, 100%
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//       },
//       tooltip: {
//         style: {
//           fontSize: '8px',
//         },
//         x: {
//           show: false,
//         },
//         y: {
//           formatter: function (val) {
//             return val + '%';
//           },
//         },
//       },
//       fill: {
//         opacity: 1,
//       },
//       legend: {
//         position: 'bottom',
//         horizontalAlign: 'right', // Aligns the legend items in the center
//         // offsetX: -5,
//         fontSize: '7px',
//         markers: {
//           width: 6,
//           height: 6,
//         },
//         itemMargin: {
//           horizontal: 6.3,
//           vertical: 0,
//         },
//       },
//       dataLabels: {
//         enabled: false, // This line ensures that no data labels will be displayed on the bars
//       },
//     },
//   };

//   const [chartData] = useState(config);
//   return (
//     <div>
//       <div className="bar3div">
//         <ReactApexChart
//           options={chartData.options}
//           series={chartData.series}
//           type="bar"
//           height={90}
//           width={'100%'}
//         />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default Bar3;
