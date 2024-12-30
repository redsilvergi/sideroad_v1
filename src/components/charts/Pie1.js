import './Pie1.css';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  // Adjust radius for better alignment
  const radius = outerRadius + 8; // Slightly beyond the outer radius
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // const fontSize = percent > 0.1 ? '12px' : '10px';
  const fontSize =
    percent > 0.8
      ? '18px'
      : percent > 0.6
      ? '16px'
      : percent > 0.4
      ? '14px'
      : percent > 0.1
      ? '12px'
      : percent > 0.05
      ? '11px'
      : percent > 0.02
      ? '9px'
      : percent > 0.005
      ? '8px'
      : '8px';
  const fontWeight = percent > 0.2 ? 'bold' : 'normal';

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontSize, fontWeight }}
    >
      {`${(percent * 100).toFixed(0)}`}
      {percent >= 0.05 ? <tspan style={{ fontSize }}>%</tspan> : null}
    </text>
  );
};

const Pie1 = ({ data, colors }) => {
  // setup ----------------------------------------------------------------------
  // console.log('data in pie1\n', data);
  const data2 = data.map((item, id) => {
    return { ...item, cnt: Number(item.cnt) };
  });

  // return ----------------------------------------------------------------------
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="cnt"
          data={data2}
          startAngle={450}
          endAngle={90}
          outerRadius={60}
          isAnimationActive={false}
          label={renderCustomizedLabel}
          labelLine={false}
          // label
          // animationDuration={10}
          // fill="#8884d8"
          // cx="50%"
          // cy="50%"
        >
          {data.map((item, id) => (
            <Cell key={id} fill={colors[id % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Pie1;

// const data = [
//   { name: 'Group A', cnt: 400 },
//   { name: 'Group B', cnt: 300 },
//   { name: 'Group C', cnt: 300 },
//   { name: 'Group D', cnt: 200 },
// ];
