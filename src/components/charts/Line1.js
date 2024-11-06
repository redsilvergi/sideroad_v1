import './Line1.css';
import React from 'react';
import useInfo from '../../hooks/use-info';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Linechart = () => {
  // setup ----------------------------------------------------------------------
  const { genitem, genfo, yr } = useInfo();
  const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

  // data_axiliaury ----------------------------------------------------------------------
  var obj;
  switch (genitem) {
    case '인구현황':
      obj = (item) => {
        return {
          year: item.yr,
          어린이: item.age0_12,
          청장년: item.age13_64,
          노인: item.age65_200,
        };
      };
      break;
    case '도시면적':
      obj = (item) => {
        return {
          year: item.yr,
          면적: item.ar,
        };
      };
      break;
    case '자동차등록대수':
      obj = (item) => {
        return {
          year: item.yr,
          사륜차: item.wheel4,
          이륜차: item.wheel2,
        };
      };
      break;
    case '도로연장':
      obj = (item) => {
        return {
          year: item.yr,
          '1차선': item.lane1,
          '2차선': item.lane2,
          '3차선이상': item.lane3_more,
        };
      };
      break;
    case '보행연관시설물':
      obj = (item) => {
        return {
          year: item.yr,
          육교: item.overpass,
          지하보도: item.underpass,
        };
      };
      break;
    default:
      obj = (item) => item; // Fallback in case genitem doesn't match
      break;
  }

  // data ----------------------------------------------------------------------
  const tmp = (genfo &&
    genfo
      .map((item, id) => {
        if (parseInt(item.yr) <= yrint) {
          return obj(item);
        } else {
          return null;
        }
      })
      .filter((item) => item !== null)) || [
    { year: null },
    { year: null },
    { year: null },
    { year: null },
    { year: null },
  ];
  // console.log('tmp:', tmp);
  // var tmp2;
  switch (tmp.length) {
    case 5:
      break;
    case 4:
      tmp.push({ year: `${yrint - 1}` });
      break;
    case 3:
      tmp.push({ year: `${yrint - 1}` }, { year: yrint - 2 });
      break;
    case 2:
      tmp.push(
        { year: `${yrint - 1}` },
        { year: yrint - 2 },
        { year: yrint - 3 }
      );
      break;
    case 1:
      tmp.push(
        { year: `${yrint - 1}` },
        { year: yrint - 2 },
        { year: yrint - 3 },
        { year: yrint - 4 }
      );
      break;
    case 0:
      tmp.push(
        { year: yrint },
        { year: `${yrint - 1}` },
        { year: yrint - 2 },
        { year: yrint - 3 },
        { year: yrint - 4 }
      );
      break;
    default:
      break;
  }
  const data1 = tmp.slice(0, 5).reverse();
  // const data1 = tmp

  // const data1 = [
  //   {
  //     year: '2019',
  //     어린이: 887943,
  //     청장년: 1362500,
  //     노인: 1478664,
  //     쫑구대창막창: 431234,
  //   },
  //   {
  //     year: '2020',
  //     어린이: 842538,
  //     청장년: 1264788,
  //     노인: 1561139,
  //     쫑구대창막창: 431234,
  //   },
  //   {
  //     year: '2021',
  //     어린이: 798371,
  //     청장년: 1313640,
  //     노인: 1597447,
  //     쫑구대창막창: 431234,
  //   },
  //   {
  //     year: '2022',
  //     어린이: 764399,
  //     청장년: 1005766,
  //     노인: 1658207,
  //     쫑구대창막창: 431234,
  //   },
  //   {
  //     year: '2023',
  //     어린이: 726432,
  //     청장년: 2126022,
  //     노인: 1733580,
  //     쫑구대창막창: 431234,
  //   },
  // ];

  //auxiliary ----------------------------------------------------------------------
  const keys = data1 && data1[0] && Object.keys(data1[0]).slice(1);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log('payload:', payload);
      return (
        <div className="line1_ttp">
          {payload.map((item, id) => {
            return (
              <div key={id} className="line1_ttp_lbl">
                <div className="line1_cirtxt">
                  <div
                    className="line1_cirs"
                    style={{ backgroundColor: `${item.stroke}` }}
                  ></div>
                  {/* <div className={`line1_cirs line1_cir${id}`} style={{backgroundColor: `${item.fill}`}}></div> */}
                  <div className="line1_lbl_txt1">{`${item.dataKey}`}</div>
                </div>
                <div className="line1_lbl_txt2">{`${item.value}`}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };
  const colourList = [
    '#8900f2',
    '#2ec4b6',
    '#4361ee',
    '#ff6f91',
    '#ffc75f',
    '#845ec2',
    '#4b88a2',
    '#ffa69e',
  ];

  // renderfuncs ----------------------------------------------------------------------
  // const renderSVG = (x1, x2, y1, y2, stroke, strokeWidth) => {
  //   return (
  //     <svg>
  //       <line
  //         x1={x1}
  //         x2={x2}
  //         y1={y1}
  //         y2={y2}
  //         stroke={stroke}
  //         strokeWidth={strokeWidth}
  //       />
  //     </svg>
  //   );
  // };
  const renderIndvLines = () => {
    return (
      keys &&
      keys.map((item, id) => {
        return (
          <Line
            type="monotone"
            key={id}
            dataKey={item}
            stroke={colourList[id]}
            dot={{ fill: colourList[id], stroke: colourList[id], r: 3 }}
            activeDot={{ fill: '#ffffff', stroke: colourList[id], r: 5 }}
          />
        );
      })
    );
  };
  const renderLines = () => {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data1}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="1 0"
            horizontalPoints={[10]}
            // horizontal={false}
            // vertical={false}
          />
          <XAxis
            dataKey="year"
            interval={0}
            // axisLine={false}
            tickLine={false}
            // tick={{ dy: 5 }} // Moves the X-axis labels up
            // dy={10}
            // dy={Math.round(180 * 0.1)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
          // wrapperStyle={{
          //   bottom: 0,
          // }}
          />
          {/* {renderSVG('8', '202', '0', '0', '#e6e6e6', 4)} */}
          {/* {[20, 62.5, 105, 147.5, 190].map((item, id) => {
            return renderSVG(`${item}`, `${item}`, '0', '70%', '#e6e6e6', 2);
          })} */}
          {renderIndvLines()}
          {/* {renderSVG('8', '202', '70%', '70%', '#e6e6e6', 2)} */}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // return ----------------------------------------------------------------------
  return <div className="line1_d1">{renderLines()}</div>;
};

export default Linechart;
