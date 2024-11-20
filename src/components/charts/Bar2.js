import './Bar2.css';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Bar2 = React.memo(({ data, keys, max_x }) => {
  // auxiliary ----------------------------------------------------------------------
  // console.log('bar2bar2bar2bar2bar2');

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
    data &&
    data.map((item, id) => {
      return item.name;
    });
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
      data &&
      data.map((item, id) => {
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
