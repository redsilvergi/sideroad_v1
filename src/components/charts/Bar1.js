import './Bar1.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Bar1 = ({ data, keys, max_x }) => {
  // auxiliary ----------------------------------------------------------------------
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
  const cityList =
    data &&
    data.map((item, id) => {
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
    return (
      data &&
      data.map((item, id) => {
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
      })
    );
  };

  // return ----------------------------------------------------------------------
  return <div className="bar1_d1">{renderBars_top()}</div>;
};

export default Bar1;
