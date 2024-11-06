import './Bar2.css';
import React, { useState, useEffect } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Bar2 = React.memo(() => {
  // setup ----------------------------------------------------------------------
  const { genitem, ldcuid, yr } = useInfo();
  const { getBar2sido, getBar2sgg } = useDb();
  // const yrint = yr ? parseInt(yr.slice(0, 4), 10) : null;
  const [data1, setData1] = useState([]);
  console.log(
    'bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2bar2'
  );

  // data_axiliaury ----------------------------------------------------------------------
  var obj;
  var tablenm;
  switch (genitem) {
    case '인구현황':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          어린이: item.age0_12,
          청장년: item.age13_64,
          노인: item.age65_200,
        };
      };
      tablenm = 'pop';
      break;
    case '도시면적':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          면적: item.ar,
        };
      };
      tablenm = 'city_area';
      break;
    case '자동차등록대수':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          사륜차: item.wheel4,
          이륜차: item.wheel2,
        };
      };
      tablenm = 'veh';
      break;
    case '도로연장':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          '1차선': item.lane1,
          '2차선': item.lane2,
          '3차선이상': item.lane3_more,
        };
      };
      tablenm = 'road_len';
      break;
    case '보행연관시설물':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          육교: item.overpass,
          지하보도: item.underpass,
        };
      };
      tablenm = 'ped_facil';
      break;
    default:
      obj = (item) => item; // Fallback in case genitem doesn't match
      break;
  }
  // data ----------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (ldcuid && yr) {
        if (ldcuid[4].slice(2) === '000') {
          result = await getBar2sido(tablenm, yr.slice(0, 4));
        } else {
          const sidotmp = ldcuid[0].slice(0, 2);
          result = await getBar2sgg(tablenm, sidotmp, yr.slice(0, 4));
        }
      } else {
        result = [{ name: null }];
      }
      console.log('fetching result: ', result);

      setData1(result);
    };
    fetchData();
  }, [ldcuid, yr, tablenm, getBar2sido, getBar2sgg]);

  // const tmpfunc = async () => {
  //   if (ldcuid && yrint) {
  //     if (ldcuid[4].slice(2) === '000') {
  //       const bar2sido = await getBar2sido(tablenm);
  //       console.log(bar2sido);
  //       return bar2sido;
  //     } else {
  //       const sidotmp = ldcuid[0].slice(0, 2); //ldcuid[0]vs[4]
  //       const bar2sgg = await getBar2sgg(tablenm, sidotmp);
  //       console.log(bar2sgg);
  //       return bar2sgg;
  //     }
  //   } else {
  //     return [{ name: null }];
  //   }
  // };
  // const tmp = await tmpfunc();
  // // const tmp = (genfo &&
  // //   genfo
  // //     .map((item, id) => {
  // //       if (parseInt(item.yr) === yrint) {
  // //         return obj(item);
  // //       } else {
  // //         return null;
  // //       }
  // //     })
  // //     .filter((item) => item !== null)) || [{ name: null }];

  // // data ----------------------------------------------------------------------
  // const data1 = tmp;
  // console.log('data1:', data1);
  // const data1 = [
  //   {
  //     name: '대구광역시',
  //     어린이: 28560,
  //     청장년: 87763,
  //     노인: 11291,
  //   },
  //   {
  //     name: '인천광역시',
  //     어린이: 28560,
  //     청장년: 57763,
  //     노인: 41291,
  //   },
  //   {
  //     name: '대전광역시',
  //     어린이: 18560,
  //     청장년: 7763,
  //     노인: 1291,
  //   },
  //   {
  //     name: '피구광역시',
  //     어린이: 18560,
  //     청장년: 7763,
  //     노인: 1291,
  //   },
  //   {
  //     name: '포포광역시',
  //     어린이: 28560,
  //     청장년: 87763,
  //     노인: 11291,
  //   },
  // ];

  // auxiliary ----------------------------------------------------------------------
  const keys = data1 && data1[0] ? Object.keys(data1[0]).slice(1) : []; //check whether needed
  // const keys = Object.keys(data1[0]).slice(1);
  const allVals =
    data1 &&
    data1.flatMap((item, id) => {
      return keys.map((key, id) => {
        return item[key];
      });
    });
  const max_x = Math.max(...allVals);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log('payload:', payload);
      return (
        <div className="bar2_ttp">
          {payload.map((item, id) => {
            return (
              <div key={id} className="bar2_ttp_lbl">
                <div className="bar2_cirtxt">
                  <div
                    className="bar2_cirs"
                    style={{ backgroundColor: `${item.fill}` }}
                  ></div>
                  {/* <div className={`bar2_cirs bar2_cir${id}`} style={{backgroundColor: `${item.fill}`}}></div> */}
                  <div className="bar2_lbl_txt1">{`${item.dataKey}`}</div>
                </div>
                <div className="bar2_lbl_txt2">{`${item.value}`}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };
  const cityList =
    data1 &&
    data1.map((item, id) => {
      return item.name;
    });
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
  const renderIndvBars = () => {
    return keys.map((item, id) => {
      return (
        <Bar
          key={id}
          dataKey={item}
          fill={colourList[id]}
          barSize={8}
          radius={[0, 10, 10, 0]}
        />
      );
    });
  };
  const renderBars_down = () => {
    return (
      data1 &&
      data1.map((item, id) => {
        return (
          <div className="bar2_d2" key={id}>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                layout="vertical"
                data={[item]}
                margin={{
                  top: 30,
                  right: 20,
                  left: -40,
                  bottom: 0,
                }}
              >
                <text x="20" y="25" fontSize={11}>
                  {cityList[id]}
                </text>
                <CartesianGrid strokeDasharray="0 1" />
                <XAxis
                  type="number"
                  domain={[0, max_x]}
                  tick={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={false}
                  axisLine={false}
                />
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
  return <div className="bar2_d1">{renderBars_down()}</div>;
});

export default Bar2;

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import useInfo from '../../hooks/use-info';
// import useDb from '../../hooks/use-db';

// const Bar2 = React.memo(() => {
//   const { genitem, ldcuid, yr } = useInfo();
//   const { getBar2sido, getBar2sgg } = useDb();
//   const yrint = yr ? parseInt(yr.slice(0, 4), 10) : null;

//   //  data_axiliaury ----------------------------------------------------------------------
//   var obj;
//   var tablenm;
//   switch (genitem) {
//     case '인구현황':
//       obj = (item) => {
//         return {
//           name: (ldcuid && ldcuid[2]) || '',
//           어린이: item.age0_12,
//           청장년: item.age13_64,
//           노인: item.age65_200,
//         };
//       };
//       tablenm = 'pop';
//       break;
//     case '도시면적':
//       obj = (item) => {
//         return {
//           name: (ldcuid && ldcuid[2]) || '',
//           면적: item.ar,
//         };
//       };
//       tablenm = 'city_area';
//       break;
//     case '자동차등록대수':
//       obj = (item) => {
//         return {
//           name: (ldcuid && ldcuid[2]) || '',
//           사륜차: item.wheel4,
//           이륜차: item.wheel2,
//         };
//       };
//       tablenm = 'veh';
//       break;
//     case '도로연장':
//       obj = (item) => {
//         return {
//           name: (ldcuid && ldcuid[2]) || '',
//           '1차선': item.lane1,
//           '2차선': item.lane2,
//           '3차선이상': item.lane3_more,
//         };
//       };
//       tablenm = 'road_len';
//       break;
//     case '보행연관시설물':
//       obj = (item) => {
//         return {
//           name: (ldcuid && ldcuid[2]) || '',
//           육교: item.overpass,
//           지하보도: item.underpass,
//         };
//       };
//       tablenm = 'ped_facil';
//       break;
//     default:
//       obj = (item) => item; // Fallback in case genitem doesn't match
//       break;
//   }
//   const [data1, setData1] = useState([]);

//   const fetchData = async () => {
//     if (ldcuid && yrint) {
//       if (ldcuid[4].slice(2) === '000') {
//         return await getBar2sido(tablenm);
//       } else {
//         const sidotmp = ldcuid[0].slice(0, 2);
//         return await getBar2sgg(tablenm, sidotmp);
//       }
//     }
//     return [{ name: null }];
//   };

//   useEffect(() => {
//     fetchData().then((result) => setData1(result));
//   }, [ldcuid, yrint, tablenm, getBar2sido, getBar2sgg]);

//   const keys = useMemo(
//     () => (data1[0] ? Object.keys(data1[0]).slice(1) : []),
//     [data1]
//   );

//   const renderIndvBars = useMemo(() => {
//     const colourList = ['#8900f2', '#2ec4b6', '#4361ee', '#ff6f91'];
//     return keys.map((item, id) => (
//       <MemoizedBar
//         key={id}
//         dataKey={item}
//         fill={colourList[id % colourList.length]}
//       />
//     ));
//   }, [keys]);

//   return (
//     <div className="bar2_d1">
//       {data1 && data1.map((item, id) => (
//         <div className="bar2_d2" key={id}>
//           <ResponsiveContainer width="100%" height={100}>
//             <BarChart layout="vertical" data={[item]}>
//               <CartesianGrid strokeDasharray="0 1" />
//               <XAxis type="number" />
//               <YAxis type="category" dataKey="name" />
//               <Tooltip />
//               {renderIndvBars}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       ))}
//     </div>
//   );
// });

// const MemoizedBar = React.memo(({ dataKey, fill }) => (
//   <Bar dataKey={dataKey} fill={fill} barSize={8} radius={[0, 10, 10, 0]} />
// ));

// export default Bar2;
