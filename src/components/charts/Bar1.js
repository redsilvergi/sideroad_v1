import './Bar1.css';
import React from 'react';
import useInfo from '../../hooks/use-info';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // LabelList,
} from 'recharts';

const Bar1 = () => {
  // setup ----------------------------------------------------------------------
  const { genitem, genfo, ldcuid, yr } = useInfo();
  const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

  // data_axiliaury ----------------------------------------------------------------------
  var obj;
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
      break;
    case '도시면적':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          면적: item.ar,
        };
      };
      break;
    case '자동차등록대수':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          사륜차: item.wheel4,
          이륜차: item.wheel2,
        };
      };
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
      break;
    case '보행연관시설물':
      obj = (item) => {
        return {
          name: (ldcuid && ldcuid[2]) || '',
          육교: item.overpass,
          지하보도: item.underpass,
        };
      };
      break;
    default:
      obj = (item) => item; // Fallback in case genitem doesn't match
      break;
  }

  const tmp = (genfo &&
    genfo
      .map((item, id) => {
        if (parseInt(item.yr) === yrint) {
          return obj(item);
        } else {
          return null;
        }
      })
      .filter((item) => item !== null)) || [{ name: null }];

  // data ----------------------------------------------------------------------
  const data1 = tmp;
  // console.log('data1:', data1);

  // const data1 = [
  //   {
  //     name: '서울특별시',
  //     어린이: 18560,
  //     청장년: 37763,
  //     노인: 61291,
  //   },
  // ];

  // auxiliary ----------------------------------------------------------------------
  const keys = data1 && data1[0] ? Object.keys(data1[0]).slice(1) : [];
  // const keys = Object.keys(data1[0]).slice(1);
  const allVals = data1.flatMap((item, id) => {
    return keys.map((key, id) => {
      return item[key];
    });
  });
  const max_x = Math.max(...allVals);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log('payload:', payload);
      return (
        <div className="bar1_ttp">
          {payload.map((item, id) => {
            return (
              <div key={id} className="bar1_ttp_lbl">
                <div className="bar1_cirtxt">
                  <div
                    className="bar1_cirs"
                    style={{ backgroundColor: `${item.fill}` }}
                  ></div>
                  <div className="bar1_lbl_txt1">{`${item.dataKey}`}</div>
                </div>
                <div className="bar1_lbl_txt2">{`${item.value}`}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };
  const cityList = data1.map((item, id) => {
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
  const renderBars_top = () => {
    return data1.map((item, id) => {
      return (
        <div className="bar1_d2" key={id}>
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
              <text x="20" y="25" fontSize={11} fontWeight="bold">
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
    });
  };

  // return ----------------------------------------------------------------------
  return <div className="bar1_d1">{renderBars_top()}</div>;
};

export default Bar1;
