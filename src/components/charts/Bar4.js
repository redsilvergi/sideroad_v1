import './Bar4.css';
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import useInfo from '../../hooks/use-info';

const Bar4 = () => {
  // setup ----------------------------------------------------------------------
  const { pnfo } = useInfo();
  const keys = [
    { col: 'aiw10kas', kor: '접근성' },
    { col: 'bus400s', kor: '버스정류장' },
    { col: 'mkden300s', kor: '시장' },
    { col: 'pbulddens', kor: '판매용도밀도' },
    { col: 'rbulddens', kor: '주거용도밀도' },
    { col: 'roadbts', kor: '도로폭원' },
    { col: 'roadlts', kor: '도로길이' },
    { col: 'school300s', kor: '학교' },
    { col: 'slopelgs', kor: '종단경사' },
    { col: 'subway400s', kor: '지하철' },
  ];

  // data ----------------------------------------------------------------------
  const data =
    pnfo &&
    keys
      .map((item, id) => {
        return {
          name: item.kor,
          기여도: pnfo[item.col],
        };
      })
      .sort((a, b) => Math.abs(b.기여도) - Math.abs(a.기여도));

  // console.log('data\n', data);

  // auxiliary ----------------------------------------------------------------------
  const customYtick = (props) => {
    const { y, payload } = props;
    return (
      <text
        x={0} // Push to the left edge
        y={y + 2.5}
        fill="#000"
        fontSize={9}
        // fontWeight="bold"
        textAnchor="start" // Align text to the start (left)
      >
        {payload.value}
      </text>
    );
  };

  // renderfuncs ----------------------------------------------------------------------
  const renderBar = () => {
    return (
      pnfo && (
        <div className="bar4_d2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={(props) => customYtick(props)}
              />
              <Tooltip />
              {/* <Legend content={customLegend} /> */}
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="기여도" barSize={10}>
                {data.map((item, id) => (
                  <Cell
                    key={id}
                    fill={item.기여도 >= 0 ? '#2EC4B6' : '#F64343'}
                  />
                ))}
              </Bar>
              {/* <Bar dataKey="기여도" fill="#000" barSize={10} /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    );
  };

  // return ----------------------------------------------------------------------
  return <div className="bar4_d1">{renderBar()}</div>;
};

export default Bar4;

// const data = [
//   {
//     name: 'aiw10kas',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: -3000,
//     pv: 1398,
//     amt: 2210,
//   },
// ];

// const renderIndBar = () => {
//   return (
//     data2 &&
//     data2.map((item, id) => {
//       return <Bar key={id} dataKey="기여도" fill="#000" />;
//     })
//   );
// };
