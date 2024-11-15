import './Bar2a.css';
import { useState, useEffect } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Bar1 from '../charts/Bar1';
import Bar2 from '../charts/Bar2';
import useDb from '../../hooks/use-db';

const Bar2a = () => {
  // setup ----------------------------------------------------------------------
  const { genitem, ldcuid, yr } = useInfo();
  const [open, setOpen] = useState(true);
  const { getBar2sido, getBar2sgg } = useDb();

  const [data1, setData1] = useState([]);
  console.log('bar2abar2abar2abar2abar2abar2abar2abar2a');

  // data_axiliaury ----------------------------------------------------------------------
  var obj;
  var tablenm;
  switch (genitem) {
    case '인구현황':
      obj = (item) => {
        return {
          name: item.sigungu,
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
          name: item.sigungu,
          면적: item.ar,
        };
      };
      tablenm = 'city_area';
      break;
    case '자동차등록대수':
      obj = (item) => {
        return {
          name: item.sigungu,
          사륜차: item.wheel4,
          이륜차: item.wheel2,
        };
      };
      tablenm = 'veh';
      break;
    case '도로연장':
      obj = (item) => {
        return {
          name: item.sigungu,
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
          name: item.sigungu,
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
      let res;
      let res2;
      if (ldcuid && yr) {
        if (ldcuid[4].slice(2) === '000') {
          res = await getBar2sido(tablenm, yr.slice(0, 4));
          res2 = res.map((item, id) => obj(item));
        } else {
          const sidotmp = ldcuid[0].slice(0, 2);
          res = await getBar2sgg(tablenm, sidotmp, yr.slice(0, 4));
          res2 = res.map((item, id) => obj(item));
        }
      } else {
        res2 = [{ name: null }];
      }
      console.log(`fetching res: ${res}\n\nres2: ${res2}`);

      setData1(res2);
    };
    fetchData();
  }, [ldcuid, yr, tablenm, getBar2sido, getBar2sgg]);
  console.log(`data1 at bar2a\n`, data1);

  // find max_x ----------------------------------------------------------------------
  const keys = data1 && data1[0] ? Object.keys(data1[0]).slice(1) : [];
  // console.log('keys at bar2a\n', keys);
  const allVals =
    data1 && data1.flatMap((item, id) => keys.map((key, id) => item[key]));
  // console.log('allvals at bar2a\n', allVals);
  const max_x = Math.max(...allVals);
  // console.log('maxx at bar2a\n', max_x);

  const tmp2 =
    data1 &&
    data1
      .map((item, id) => {
        return {
          ...item,
          sum: keys.reduce((acc, cur) => {
            return acc + parseFloat(item[cur]);
          }, 0),
        };
        // keys.map((key, id) => item[key]);
      })
      .sort((a, b) => b.sum - a.sum);

  // console.log('tmp2 at bar2a\n', tmp2);

  const bar1data =
    tmp2 && ldcuid && tmp2.filter((item) => item.name === ldcuid[2]);
  const bar2data =
    tmp2 && ldcuid && tmp2.filter((item) => item.name !== ldcuid[2]);
  console.log(
    'bar1data at bar2a\n',
    bar1data,
    '\n\nbar2data at bar2a\n',
    bar2data
  );

  // return ----------------------------------------------------------------------
  return (
    <div className="bar2a_accitem">
      <div className="bar2a_d1">
        <div className="bar2a_d2" onClick={() => setOpen(!open)}>
          <div className="bar2a_lbl">동급 비교</div>
          <div className="bar2a_icon">{open ? <FiMinus /> : <FiPlus />}</div>
        </div>
        {open && (
          <div className="bar2a_exp">
            <div className="bar2a_line"></div>
            <div className="bar2a_yr">{yr || '2023년'}</div>
            <div className="bar2a_line"></div>
            <Bar1 data={bar1data} keys={keys} max_x={max_x} />
            <Bar2 data={bar2data} keys={keys} max_x={max_x} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bar2a;
