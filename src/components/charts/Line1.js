import './Line1.css';
import React, { useMemo } from 'react';
import useInfo from '../../hooks/use-info';
import {
  LineChart,
  Line,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const colourList = [
  '#8900f2',
  '#2ec4b6',
  '#4361ee',
  '#4da87e',
  '#184e77',
  '#845ec2',
  '#4b88a2',
  '#ffa69e',
];

// Utility function: Transform item data based on genitem
const getTransformFunction = (genitem) => {
  switch (genitem) {
    case '인구현황':
      return (item) => ({
        year: item.yr,
        어린이: item.age0_12,
        청장년: item.age13_64,
        노인: item.age65_200,
      });
    case '도시면적':
      return (item) => ({
        year: item.yr,
        면적: item.ar,
      });
    case '자동차등록대수':
      return (item) => ({
        year: item.yr,
        사륜차: item.wheel4,
        이륜차: item.wheel2,
      });
    case '도로연장':
      return (item) => ({
        year: item.yr,
        '1차선': item.lane1,
        '2차선': item.lane2,
        '3차선이상': item.lane3_more,
      });
    case '보행연관시설물':
      return (item) => ({
        year: item.yr,
        육교: item.overpass,
        지하보도: item.underpass,
      });
    // Add other cases as needed...
    case '체육시설':
      return (item) => ({
        year: item.yr,
        운동장: item.field,
        체육관: item.gym,
        기타운동시설: item.facils,
      });
    case '문화집회시설':
      return (item) => ({
        year: item.yr,
        공연장: item.theater,
        관람장: item.auditorium,
        동식물원: item.zoo,
        전시장: item.exhibit,
        집회장: item.hall,
      });
    case '유통시설 개소':
      return (item) => ({
        year: item.yr,
        백화점: item.dpt_no,
        대형판매점: item.sales_no,
        대형점: item.store_no,
        대규모소매점: item.retail_no,
      });
    case '유통시설면적':
      return (item) => ({
        year: item.yr,
        백화점: item.dpt_tfa,
        대형판매점: item.sales_tfa,
        대형점: item.store_tfa,
        대규모소매점: item.retail_tfa,
      });
    case '공원시설 개소':
      return (item) => ({
        year: item.yr,
        근린공원: item.neigh_no,
        소공원: item.small_no,
        어린이공원: item.child_no,
      });
    case '공원시설면적':
      return (item) => ({
        year: item.yr,
        근린공원: item.neigh_tfa,
        소공원: item.small_tfa,
        어린이공원: item.child_tfa,
      });
    // Add other cases as needed...
    case '보도없는도로':
      return (item) => ({
        year: item.yr,
        km: item.km,
      });
    case '보행환경개선지구':
      return (item) => ({
        year: item.yr,
        지구수: item.no,
      });
    case '보행자전용길':
      return (item) => ({
        year: item.yr,
        전용길수: item.no,
      });
    case '보행자길':
      return (item) => ({
        year: item.yr,
        km: item.km,
      });
    case '보행우선구역':
      return (item) => ({
        year: item.yr,
        구역수: item.no,
      });
    case '보행자전용도로':
      return (item) => ({
        year: item.yr,
        연장: item.length,
      });
    case '보호구역':
      return (item) => ({
        year: item.yr,
        '노인/장애인': item.old_dsbld,
        어린이: item.child,
      });
    // Add other cases as needed...
    case '통행수단별':
      return (item) => ({
        year: item.yr,
        보행: item.walk,
        자가용: item.car,
        대중교통: item.transit,
      });
    case '통행목적별':
      return (item) => ({
        year: item.yr,
        업무: item.work,
        출근: item.commute,
        등교: item.school,
        귀가: item.home,
      });
    case '보도통행거리':
      return (item) => ({
        year: item.yr,
        '500m이내': item.in500m,
        '1000m이내': item.in1km,
        '3000m이내': item.in3km,
        '3000m이상': item.up3km,
      });
    default:
      return (item) => ({ year: item.yr });
  }
};

const CustomTooltip = React.memo(({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="line1_ttp">
        {payload.map((item, id) => (
          <div key={id} className="line1_ttp_lbl">
            <div className="line1_cirtxt">
              <div
                className="line1_cirs"
                style={{ backgroundColor: item.stroke }}
              ></div>
              <div className="line1_lbl_txt1">{item.dataKey}</div>
            </div>
            <div className="line1_lbl_txt2">{Math.round(item.value)}</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
});

const Linechart = React.memo(() => {
  // Setup ----------------------------------------------------------------------
  const { genitem, genfo, yr } = useInfo();
  const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

  // Memoize the data processing for efficiency
  const processedData = useMemo(() => {
    const transform = getTransformFunction(genitem);
    const filteredData =
      (genfo && genfo.filter((item) => parseInt(item.yr) <= yrint)) || [];
    const defaultYears = Array.from({ length: 5 }, (_, i) => ({
      yr: `${yrint - i}`,
    }));
    return [...filteredData, ...defaultYears.slice(filteredData.length)]
      .slice(0, 5)
      .map(transform)
      .reverse();
  }, [genfo, genitem, yrint]);

  const keys = useMemo(() => {
    return processedData[0] ? Object.keys(processedData[0]).slice(1) : [];
  }, [processedData]);

  return (
    <div className="line1_d1">
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={processedData}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="1 0" horizontalPoints={[10]} />
          <XAxis dataKey="year" tickLine={false} interval={0} />
          {/* <YAxis
            domain={['auto', 'auto']} // Adjusts boundaries automatically based on data
            tickLine={false}
            interval={0}
            // padding={{ top: 40, bottom: 40 }}/
          /> */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {keys.map((item, id) => (
            <Line
              key={id}
              type="monotone"
              dataKey={item}
              stroke={colourList[id]}
              dot={{ fill: colourList[id], stroke: colourList[id], r: 3 }}
              activeDot={{ fill: '#ffffff', stroke: colourList[id], r: 5 }}
              isAnimationActive={false} // Disable animation for better performance
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Linechart;

// import './Line1.css';
// import React from 'react';
// import useInfo from '../../hooks/use-info';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const Linechart = () => {
//   // setup ----------------------------------------------------------------------
//   const { genitem, genfo, yr } = useInfo();
//   const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

//   // data_axiliaury ----------------------------------------------------------------------
//   var obj;
//   switch (genitem) {
//     case '인구현황':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           어린이: item.age0_12,
//           청장년: item.age13_64,
//           노인: item.age65_200,
//         };
//       };
//       break;
//     case '도시면적':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           면적: item.ar,
//         };
//       };
//       break;
//     case '자동차등록대수':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           사륜차: item.wheel4,
//           이륜차: item.wheel2,
//         };
//       };
//       break;
//     case '도로연장':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           '1차선': item.lane1,
//           '2차선': item.lane2,
//           '3차선이상': item.lane3_more,
//         };
//       };
//       break;
//     case '보행연관시설물':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           육교: item.overpass,
//           지하보도: item.underpass,
//         };
//       };
//       break;
//     case '체육시설':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           운동장: item.field,
//           체육관: item.gym,
//           기타운동시설: item.facils,
//         };
//       };
//       break;
//     case '문화집회시설':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           공연장: item.theater,
//           관람장: item.auditorium,
//           동식물원: item.zoo,
//           전시장: item.exhibit,
//           집회장: item.hall,
//         };
//       };
//       break;
//     case '유통시설':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           백화점: item.dpt_no,
//           대형판매점: item.sales_no,
//           대형점: item.store_no,
//           대규모소매점: item.retail_no,
//         };
//       };
//       break;
//     case '유통시설면적':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           백화점: item.dpt_tfa,
//           대형판매점: item.sales_tfa,
//           대형점: item.store_tfa,
//           대규모소매점: item.retail_tfa,
//         };
//       };
//       break;
//     case '공원시설':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           근린공원: item.neigh_no,
//           소공원: item.small_no,
//           어린이공원: item.child_no,
//         };
//       };
//       break;
//     case '공원시설면적':
//       obj = (item) => {
//         return {
//           year: item.yr,
//           근린공원: item.neigh_tfa,
//           소공원: item.small_tfa,
//           어린이공원: item.child_tfa,
//         };
//       };
//       break;
//     default:
//       obj = (item) => item; // Fallback in case genitem doesn't match
//       break;
//   }

//   // data ----------------------------------------------------------------------
//   const tmp =
//     (genfo &&
//       genfo.filter((item) => {
//         return parseInt(item.yr) <= yrint;
//       })) ||
//     [];
//   // const tmp = (genfo &&
//   //   genfo
//   //     .map((item, id) => {
//   //       if (parseInt(item.yr) <= yrint) {
//   //         return obj(item);
//   //       } else {
//   //         return null;
//   //       }
//   //     })
//   //     .filter((item) => item !== null)) || [
//   //   { year: null },
//   //   { year: null },
//   //   { year: null },
//   //   { year: null },
//   //   { year: null },
//   // ];
//   // console.log('tmp:', tmp);
//   // var tmp2;
//   switch (tmp.length) {
//     case 5:
//       break;
//     case 4:
//       tmp.push({ yr: `${yrint - tmp.length}` });
//       break;
//     case 3:
//       tmp.push(
//         { yr: `${yrint - tmp.length}` },
//         { yr: `${yrint - tmp.length - 1}` }
//       );
//       break;
//     case 2:
//       tmp.push(
//         { yr: `${yrint - tmp.length}` },
//         { yr: `${yrint - tmp.length - 1}` },
//         { yr: `${yrint - tmp.length - 2}` }
//       );
//       break;
//     case 1:
//       tmp.push(
//         { yr: `${yrint - tmp.length}` },
//         { yr: `${yrint - tmp.length - 1}` },
//         { yr: `${yrint - tmp.length - 2}` },
//         { yr: `${yrint - tmp.length - 3}` }
//       );
//       break;
//     case 0:
//       tmp.push(
//         { yr: `${yrint}` },
//         { yr: `${yrint - 1}` },
//         { yr: `${yrint - 2}` },
//         { yr: `${yrint - 3}` },
//         { yr: `${yrint - 4}` }
//       );
//       break;
//     default:
//       break;
//   }

//   const tmp2 =
//     tmp &&
//     tmp.map((item, id) => {
//       return obj(item);
//     });

//   const data1 = tmp2 && tmp2.slice(0, 5).reverse();
//   console.log('line1line1 data1:\n', data1);

//   // const data1 = tmp

//   // const data1 = [
//   //   {
//   //     year: '2019',
//   //     어린이: 887943,
//   //     청장년: 1362500,
//   //     노인: 1478664,
//   //     쫑구대창막창: 431234,
//   //   },
//   //   {
//   //     year: '2020',
//   //     어린이: 842538,
//   //     청장년: 1264788,
//   //     노인: 1561139,
//   //     쫑구대창막창: 431234,
//   //   },
//   //   {
//   //     year: '2021',
//   //     어린이: 798371,
//   //     청장년: 1313640,
//   //     노인: 1597447,
//   //     쫑구대창막창: 431234,
//   //   },
//   //   {
//   //     year: '2022',
//   //     어린이: 764399,
//   //     청장년: 1005766,
//   //     노인: 1658207,
//   //     쫑구대창막창: 431234,
//   //   },
//   //   {
//   //     year: '2023',
//   //     어린이: 726432,
//   //     청장년: 2126022,
//   //     노인: 1733580,
//   //     쫑구대창막창: 431234,
//   //   },
//   // ];

//   //auxiliary ----------------------------------------------------------------------
//   const keys = data1 && data1[0] && Object.keys(data1[0]).slice(1);
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       // console.log('payload:', payload);
//       return (
//         <div className="line1_ttp">
//           {payload.map((item, id) => {
//             return (
//               <div key={id} className="line1_ttp_lbl">
//                 <div className="line1_cirtxt">
//                   <div
//                     className="line1_cirs"
//                     style={{ backgroundColor: `${item.stroke}` }}
//                   ></div>
//                   {/* <div className={`line1_cirs line1_cir${id}`} style={{backgroundColor: `${item.fill}`}}></div> */}
//                   <div className="line1_lbl_txt1">{`${item.dataKey}`}</div>
//                 </div>
//                 <div className="line1_lbl_txt2">{`${item.value}`}</div>
//               </div>
//             );
//           })}
//         </div>
//       );
//     }

//     return null;
//   };
//   const colourList = [
//     '#8900f2',
//     '#2ec4b6',
//     '#4361ee',
//     '#ff6f91',
//     '#ffc75f',
//     '#845ec2',
//     '#4b88a2',
//     '#ffa69e',
//   ];

//   // renderfuncs ----------------------------------------------------------------------
//   // const renderSVG = (x1, x2, y1, y2, stroke, strokeWidth) => {
//   //   return (
//   //     <svg>
//   //       <line
//   //         x1={x1}
//   //         x2={x2}
//   //         y1={y1}
//   //         y2={y2}
//   //         stroke={stroke}
//   //         strokeWidth={strokeWidth}
//   //       />
//   //     </svg>
//   //   );
//   // };
//   const renderIndvLines = () => {
//     return (
//       keys &&
//       keys.map((item, id) => {
//         return (
//           <Line
//             type="monotone"
//             key={id}
//             dataKey={item}
//             stroke={colourList[id]}
//             dot={{ fill: colourList[id], stroke: colourList[id], r: 3 }}
//             activeDot={{ fill: '#ffffff', stroke: colourList[id], r: 5 }}
//           />
//         );
//       })
//     );
//   };
//   const renderLines = () => {
//     return (
//       <ResponsiveContainer width="100%" height={180}>
//         <LineChart
//           data={data1}
//           margin={{
//             top: 10,
//             right: 20,
//             left: 20,
//             bottom: 10,
//           }}
//         >
//           <CartesianGrid
//             strokeDasharray="1 0"
//             horizontalPoints={[10]}
//             // horizontal={false}
//             // vertical={false}
//           />
//           <XAxis
//             dataKey="year"
//             interval={0}
//             // axisLine={false}
//             tickLine={false}
//             // tick={{ dy: 5 }} // Moves the X-axis labels up
//             // dy={10}
//             // dy={Math.round(180 * 0.1)}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Legend
//           // wrapperStyle={{
//           //   bottom: 0,
//           // }}
//           />
//           {/* {renderSVG('8', '202', '0', '0', '#e6e6e6', 4)} */}
//           {/* {[20, 62.5, 105, 147.5, 190].map((item, id) => {
//             return renderSVG(`${item}`, `${item}`, '0', '70%', '#e6e6e6', 2);
//           })} */}
//           {renderIndvLines()}
//           {/* {renderSVG('8', '202', '70%', '70%', '#e6e6e6', 2)} */}
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   };

//   // return ----------------------------------------------------------------------
//   return <div className="line1_d1">{renderLines()}</div>;
// };

// export default Linechart;
