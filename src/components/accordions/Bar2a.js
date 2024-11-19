import './Bar2a.css';
import { useState, useEffect, useMemo } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Bar1 from '../charts/Bar1';
import Bar2 from '../charts/Bar2';
import useDb from '../../hooks/use-db';

// config ----------------------------------------------------------------------
const config = {
  인구현황: {
    colname: ['어린이', '청장년', '노인'],
    keys: ['age0_12', 'age13_64', 'age65_200'],
    tablenm: 'pop',
  },
  도시면적: {
    colname: ['면적'],
    keys: ['ar'],
    tablenm: 'city_area',
  },
  자동차등록대수: {
    colname: ['사륜차', '이륜차'],
    keys: ['wheel4', 'wheel2'],
    tablenm: 'veh',
  },
  도로연장: {
    colname: ['1차로', '2차로', '3차로 이상'],
    keys: ['lane1', 'lane2', 'lane3_more'],
    tablenm: 'road_len',
  },
  보행연관시설물: {
    colname: ['보도육고', '지하보도'],
    keys: ['overpass', 'underpass'],
    tablenm: 'ped_facil',
  },
  체육시설: {
    colname: ['운동장', '체육관', '기타운동시설'],
    keys: ['field', 'gym', 'facils'],
    tablenm: 'sports',
  },
  문화집회시설: {
    colname: ['공연장', '관람장', '동식물원', '전시장', '집회장'],
    keys: ['theater', 'auditorium', 'zoo', 'exhibit', 'hall'],
    tablenm: 'culture',
  },
  유통시설: {
    colname: ['백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_no', 'sales_no', 'store_no', 'retail_no'],
    tablenm: 'dist',
  },
  유통시설면적: {
    colname: ['백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_tfa', 'sales_tfa', 'store_tfa', 'retail_tfa'],
    tablenm: 'dist',
  },
  공원시설: {
    colname: ['근린공원', '소공원', '어린이공원'],
    keys: ['neigh_no', 'small_no', 'child_no'],
    tablenm: 'park',
  },
  공원시설면적: {
    colname: ['근린공원', '소공원', '어린이공원'],
    keys: ['neigh_tfa', 'small_tfa', 'child_tfa'],
    tablenm: 'park',
  },
  보도없는도로: {
    colname: ['km'],
    keys: ['km'],
    tablenm: 'no_sidewalk',
  },
  보행환경개선지구: {
    colname: ['지구수'],
    keys: ['no'],
    tablenm: 'ped_env',
  },
  보행자전용길: {
    colname: ['전용길수'],
    keys: ['no'],
    tablenm: 'ped_only',
  },
  보행자길: {
    colname: ['km'],
    keys: ['km'],
    tablenm: 'ped_paths',
  },
  보행우선구역: {
    colname: ['구역수'],
    keys: ['no'],
    tablenm: 'ped_priority',
  },
  보행자전용도로: {
    colname: ['연장'],
    keys: ['length'],
    tablenm: 'ped_roads',
  },
  보호구역: {
    colname: ['노인/장애인', '어린이'],
    keys: ['old_dsbld', 'child'],
    tablenm: 'protected',
  },
  통행수단별: {
    colname: ['보행', '자가용', '대중교통'],
    keys: ['walk', 'car', 'transit'],
    tablenm: 'travel_mode',
  },
  통행목적별: {
    colname: ['업무', '출근', '등교', '귀가'],
    keys: ['work', 'commute', 'school', 'home'],
    tablenm: 'travel_purpose',
  },
  보도통행거리: {
    colname: ['500m이내', '1000m이내', '3000m이내', '3000m이상'],
    keys: ['in500m', 'in1km', 'in3km', 'up3km'],
    tablenm: 'walk_dist_behav',
  },
};

const getConfig = (genitem) => {
  const { colname, keys, tablenm } = config[genitem];

  const obj = (item) => {
    const res = { name: item.sigungu };
    for (let i = 0; i < colname.length; i++) {
      res[colname[i]] = item[keys[i]];
    }
    return res;
  };
  return { obj, tablenm };
};

const Bar2a = () => {
  // setup ----------------------------------------------------------------------
  const { genitem, ldcuid, yr } = useInfo();
  const [open, setOpen] = useState(true);
  const { getBar2sido, getBar2sgg } = useDb();
  const [data1, setData1] = useState([]);
  // console.log('bar2abar2abar2abar2abar2abar2abar2abar2a');

  // data_axiliaury ----------------------------------------------------------------------
  const { obj, tablenm } = useMemo(() => {
    return genitem && getConfig(genitem);
  }, [genitem]);

  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = [];
        if (ldcuid && yr) {
          if (ldcuid[4]?.slice(2) === '000') {
            res = await getBar2sido(tablenm, yr.slice(0, 4));
          } else {
            const sidotmp = ldcuid[0]?.slice(0, 2);
            res = await getBar2sgg(tablenm, sidotmp, yr.slice(0, 4));
          }
          const res2 = res.map(obj);
          setData1(res2);
        } else {
          setData1([{ name: null }]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [ldcuid, yr, tablenm, getBar2sido, getBar2sgg, obj]);
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
        {yr && ldcuid && open ? (
          <div className="bar2a_exp">
            <div className="bar2a_line"></div>
            <div className="bar2a_yr">{yr}</div>
            <div className="bar2a_line"></div>
            <Bar1 data={bar1data} keys={keys} max_x={max_x} />
            <Bar2 data={bar2data} keys={keys} max_x={max_x} />
          </div>
        ) : (
          open && (
            <div className="bar2a_exp bar2a_exp_x">
              연도와 지역을 선택하세요
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Bar2a;

// original ----------------------------------------------------------------------

// var obj;
// var tablenm;
// switch (genitem) {
//   case '인구현황':
//     obj = (item) => {
//       return {
//         name: item.sigungu,
//         어린이: item.age0_12,
//         청장년: item.age13_64,
//         노인: item.age65_200,
//       };
//     };
//     tablenm = 'pop';
//     break;
//   case '도시면적':
//     obj = (item) => {
//       return {
//         name: item.sigungu,
//         면적: item.ar,
//       };
//     };
//     tablenm = 'city_area';
//     break;
//   case '자동차등록대수':
//     obj = (item) => {
//       return {
//         name: item.sigungu,
//         사륜차: item.wheel4,
//         이륜차: item.wheel2,
//       };
//     };
//     tablenm = 'veh';
//     break;
//   case '도로연장':
//     obj = (item) => {
//       return {
//         name: item.sigungu,
//         '1차선': item.lane1,
//         '2차선': item.lane2,
//         '3차선이상': item.lane3_more,
//       };
//     };
//     tablenm = 'road_len';
//     break;
//   case '보행연관시설물':
//     obj = (item) => {
//       return {
//         name: item.sigungu,
//         육교: item.overpass,
//         지하보도: item.underpass,
//       };
//     };
//     tablenm = 'ped_facil';
//     break;
//   default:
//     obj = (item) => item; // Fallback in case genitem doesn't match
//     break;
// }

// useeffect original ----------------------------------------------------------------------
// let res;
// let res2;
// if (ldcuid && yr) {
//   if (ldcuid[4].slice(2) === '000') {
//     res = await getBar2sido(tablenm, yr.slice(0, 4));
//     res2 = res.map((item, id) => obj(item));
//   } else {
//     const sidotmp = ldcuid[0].slice(0, 2);
//     res = await getBar2sgg(tablenm, sidotmp, yr.slice(0, 4));
//     res2 = res.map((item, id) => obj(item));
//   }
// } else {
//   res2 = [{ name: null }];
// }
// console.log(`fetching res: ${res}\n\nres2: ${res2}`);

// setData1(res2);
// };
