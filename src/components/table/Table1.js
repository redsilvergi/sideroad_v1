import './Table1.css';
import React from 'react';
import useInfo from '../../hooks/use-info';

// config ----------------------------------------------------------------------
const config = {
  인구현황: {
    colname: ['계/증감률', '어린이', '청장년', '노인'],
    keys: ['age0_12', 'age13_64', 'age65_200'],
    minmax: [0, 0],
    unit: '명',
  },
  도시면적: {
    colname: ['계/증감률', '면적'],
    keys: ['ar'],
    minmax: [2, 2],
    unit: 'km²',
  },
  자동차등록대수: {
    colname: ['계/증감률', '사륜차', '이륜차'],
    keys: ['wheel4', 'wheel2'],
    minmax: [0, 0],
    unit: '대',
  },
  도로연장: {
    colname: ['계/증감률', '1차로', '2차로', '3차로 이상'],
    keys: ['lane1', 'lane2', 'lane3_more'],
    minmax: [0, 0],
    unit: 'km',
  },
  보행연관시설물: {
    colname: ['계/증감률', '보도육교', '지하보도'],
    keys: ['overpass', 'underpass'],
    minmax: [0, 0],
    unit: '개',
  },
  체육시설: {
    colname: ['계/증감률', '운동장', '체육관', '기타운동시설'],
    keys: ['field', 'gym', 'facils'],
    minmax: [0, 0],
    unit: '개',
  },
  문화집회시설: {
    colname: ['계/증감률', '공연장', '관람장', '동식물원', '전시장', '집회장'],
    keys: ['theater', 'auditorium', 'zoo', 'exhibit', 'hall'],
    minmax: [0, 0],
    unit: '개',
  },
  유통시설: {
    colname: ['계/증감률', '백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_no', 'sales_no', 'store_no', 'retail_no'],
    minmax: [0, 0],
    unit: '개',
  },
  유통시설면적: {
    colname: ['계/증감률', '백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_tfa', 'sales_tfa', 'store_tfa', 'retail_tfa'],
    minmax: [0, 0],
    unit: 'km²',
  },
  공원시설: {
    colname: ['계/증감률', '근린공원', '소공원', '어린이공원'],
    keys: ['neigh_no', 'small_no', 'child_no'],
    minmax: [0, 0],
    unit: '개',
  },
  공원시설면적: {
    colname: ['계/증감률', '근린공원', '소공원', '어린이공원'],
    keys: ['neigh_tfa', 'small_tfa', 'child_tfa'],
    minmax: [0, 0],
    unit: 'km²',
  },
  보도없는도로: {
    colname: ['계/증감률', 'km'],
    keys: ['km'],
    minmax: [0, 0],
    unit: 'km',
  },
  보행환경개선지구: {
    colname: ['계/증감률', '지구수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
  },
  보행자전용길: {
    colname: ['계/증감률', '전용길수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
  },
  보행자길: {
    colname: ['계/증감률', 'km'],
    keys: ['km'],
    minmax: [0, 0],
    unit: 'km',
  },
  보행우선구역: {
    colname: ['계/증감률', '구역수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
  },
  보행자전용도로: {
    colname: ['계/증감률', '연장'],
    keys: ['length'],
    minmax: [0, 0],
    unit: 'km',
  },
  보호구역: {
    colname: ['계/증감률', '노인/장애인', '어린이'],
    keys: ['old_dsbld', 'child'],
    minmax: [0, 0],
    unit: '개',
  },
  통행수단별: {
    colname: ['계/증감률', '보행', '자가용', '대중교통'],
    keys: ['walk', 'car', 'transit'],
    minmax: [0, 0],
    unit: '명',
  },
  통행목적별: {
    colname: ['계/증감률', '업무', '출근', '등교', '귀가'],
    keys: ['work', 'commute', 'school', 'home'],
    minmax: [0, 0],
    unit: '명',
  },
  보도통행거리: {
    colname: ['계/증감률', '500m이내', '1000m이내', '3000m이내', '3000m이상'],
    keys: ['in500m', 'in1km', 'in3km', 'up3km'],
    minmax: [0, 0],
    unit: '개?',
  },
};

// Table1 ----------------------------------------------------------------------
const Table1 = () => {
  const { genitem, genfo, yr, ldcuid } = useInfo();
  const yrint = yr && parseInt(yr.slice(0, 4), 10);
  // const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

  // optimised ----------------------------------------------------------------------
  const calculateData = (keys) => {
    if (!genfo) return null;

    //Map to calculate sums and pd
    const data = genfo.map((item, id) => {
      const sum = keys.reduce(
        (acc, key) => acc + parseFloat(item[key] || null),
        0
      );
      return { ...item, sum };
    });

    return data.map((item, id, arr) => {
      if (id === arr.length - 1) {
        // For the last item, set percent differences to null
        const pdKeys = keys.map((key) => `${key}_pd`);
        const pdObj = pdKeys.reduce(
          (obj, pdKey) => ({ ...obj, [pdKey]: null }),
          {}
        );
        return { ...item, sum_pd: null, ...pdObj };
      } else {
        // Calculate percent differences
        const sum_pd = (
          (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) *
          100
        ).toFixed(2);
        const pdObj = keys.reduce((obj, key) => {
          obj[`${key}_pd`] = (
            (parseFloat(item[key]) / parseFloat(arr[id + 1][key]) - 1) *
            100
          ).toFixed(2);
          return obj;
        }, {});
        return { ...item, sum_pd, ...pdObj };
      }
    });
  };

  // Generalized filtering and formatting function
  const formatData = (tmp, keys, minmax) => {
    if (!tmp) return { tdata: [], tdata_pd: [] };

    return keys.reduce(
      (acc, key) => {
        const flted = tmp.filter(
          (item) =>
            parseInt(item.yr, 10) <= yrint && parseInt(item.yr, 10) >= yrint - 4
        );
        acc.tdata.push(
          flted.map((item) =>
            parseFloat(item[key]).toLocaleString('en-US', {
              minimumFractionDigits: minmax[0],
              maximumFractionDigits: minmax[1],
            })
          )
        );
        acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
        return acc;
      },
      { tdata: [], tdata_pd: [] }
    );
  };

  const tdataF2 = () => {
    const { keys, minmax } = genitem && config[genitem];
    const tmp = keys && calculateData(keys);
    // console.log('tmptdataF2F2\n', tmp);

    return tmp ? formatData(tmp, ['sum', ...keys], minmax) : null;
  };

  const { tdata, tdata_pd } = (tdataF2 && tdataF2()) || {
    tdata: [],
    tdata_pd: [],
  };
  // console.log('tmptdatadata\n', tdata);

  // render ----------------------------------------------------------------------
  const thead_th =
    yrint &&
    [yrint, yrint - 1, yrint - 2, yrint - 3, yrint - 4]
      .map((item, id) => {
        return (
          <th className="tbl1_th_top" key={id} colSpan={2}>
            {item}
          </th>
        );
      })
      .reverse();

  const tbody_tr =
    genitem &&
    config[genitem].colname &&
    config[genitem].colname.map((item, id) => {
      return (
        <tr key={id}>
          {id === 0 ? (
            <th
              className="tbl1_th_ldc"
              rowSpan={config[genitem].colname.length}
            >
              {ldcuid && ldcuid[2]}
            </th>
          ) : null}
          <th className="tbl1_th_prp">{item}</th>
          {/* {tbody_th(id)} */}
          {(() => {
            const cells = [];
            for (let i = 4; i >= 0; i--) {
              cells.push(
                <td className="tbl1_td" key={`tbl1_td_${i}`}>
                  {tdata &&
                  tdata[id] &&
                  tdata[id][i] &&
                  !isNaN(tdata[id][i].replace(/,/g, ''))
                    ? tdata[id][i]
                    : ''}
                </td>
              );
              cells.push(
                <td className="tbl1_tdpd" key={`tbl1_tdpd_${i}`}>
                  {tdata_pd && tdata_pd[id] && !isNaN(tdata_pd[id][i])
                    ? tdata_pd[id][i]
                    : ''}
                </td>
              );
            }
            return cells;
          })()}
        </tr>
      );
    });

  // return ----------------------------------------------------------------------
  return yr && ldcuid ? (
    <div className="tbl1_cont">
      <div className="tbl1_head">
        <div className="tbl1_head1">
          {ldcuid && ldcuid[2]} {genitem}
        </div>
        <div className="tbl1_head2">
          <div className="tbl1_edit">수정</div>
          <div className="tbl1_save">저장</div>
        </div>
      </div>
      <div className="tbl1_head3">
        <div className="tbl1_head3_1">{`단위: ${config[genitem].unit}/%`}</div>
      </div>
      <table className="tbl1">
        <thead>
          <tr>
            <th className="tbl1_th_top" colSpan={2}></th>
            {thead_th}
          </tr>
        </thead>
        <tbody>{tbody_tr}</tbody>
      </table>
    </div>
  ) : (
    <div className="tbl1_cont table_cont_x">연도와 지역을 선택하세요</div>
  );
};

export default Table1;
