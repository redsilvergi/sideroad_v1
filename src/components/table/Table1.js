import './Table1.css';
import React from 'react';
import useInfo from '../../hooks/use-info';

const Table1 = () => {
  const { genitem, genfo, yr, ldcuid } = useInfo();
  const yrint = yr ? parseInt(yr.slice(0, 4), 10) : 2023;

  // switch ----------------------------------------------------------------------
  let colname;
  let tdataF;
  // let updowndata;
  var updowndata2;
  let tmp;
  switch (genitem) {
    case '인구현황':
      colname = ['계/증감률', '어린이', '청장년', '노인'];
      updowndata2 = () => {
        if (!genfo) return null;
        const data = genfo.map((item, id, arr) => {
          const sum =
            parseFloat(item.age0_12 || null) +
            parseFloat(item.age13_64 || null) +
            parseFloat(item.age65_200 || null);
          return { ...item, sum };
        });
        return (
          data &&
          data.map((item, id, arr) => {
            if (id === data.length - 1) {
              return {
                ...item,
                sum_pd: null,
                age0_12_pd: null,
                age13_64_pd: null,
                age65_200_pd: null,
              };
            } else {
              const sum_pd =
                (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) * 100;
              const age0_12_pd =
                (parseFloat(item.age0_12) / parseFloat(arr[id + 1].age0_12) -
                  1) *
                100;
              const age13_64_pd =
                (parseFloat(item.age13_64) / parseFloat(arr[id + 1].age13_64) -
                  1) *
                100;
              const age65_200_pd =
                (parseFloat(item.age65_200) /
                  parseFloat(arr[id + 1].age65_200) -
                  1) *
                100;
              return {
                ...item,
                sum_pd: sum_pd.toFixed(2),
                age0_12_pd: age0_12_pd.toFixed(2),
                age13_64_pd: age13_64_pd.toFixed(2),
                age65_200_pd: age65_200_pd.toFixed(2),
              };
            }
          })
        );
      };
      tmp = updowndata2();
      tdataF = () => {
        const keys = ['sum', 'age0_12', 'age13_64', 'age65_200'];
        if (!tmp) return { tdata: [], tdata_pd: [] };
        return keys.reduce(
          (acc, key) => {
            const flted = tmp.filter(
              (item) =>
                parseInt(item.yr, 10) <= yrint &&
                parseInt(item.yr, 10) >= yrint - 4
            );
            acc.tdata.push(
              flted.map((item) =>
                parseFloat(item[key]).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              )
            );
            acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
            return acc;
          },
          { tdata: [], tdata_pd: [] }
        );
      };
      break;
    case '도시면적':
      colname = ['계/증감률', '면적'];
      updowndata2 = () => {
        if (!genfo) return null;
        const data = genfo.map((item, id, arr) => {
          const sum = parseFloat(item.ar || null);
          return { ...item, sum };
        });
        return (
          data &&
          data.map((item, id, arr) => {
            if (id === data.length - 1) {
              return {
                ...item,
                sum_pd: null,
                ar_pd: null,
              };
            } else {
              const sum_pd =
                (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) * 100;
              const ar_pd =
                (parseFloat(item.ar) / parseFloat(arr[id + 1].ar) - 1) * 100;

              return {
                ...item,
                sum_pd: sum_pd.toFixed(2),
                ar_pd: ar_pd.toFixed(2),
              };
            }
          })
        );
      };
      tmp = updowndata2();
      tdataF = () => {
        const keys = ['sum', 'ar'];
        if (!tmp) return { tdata: [], tdata_pd: [] };
        return keys.reduce(
          (acc, key) => {
            const flted = tmp.filter(
              (item) =>
                parseInt(item.yr, 10) <= yrint &&
                parseInt(item.yr, 10) >= yrint - 4
            );
            acc.tdata.push(
              flted.map((item) =>
                parseFloat(item[key]).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              )
            );
            acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
            return acc;
          },
          { tdata: [], tdata_pd: [] }
        );
      };
      break;
    case '자동차등록대수':
      colname = ['계/증감률', '사륜차', '이륜차'];
      updowndata2 = () => {
        if (!genfo) return null;
        const data = genfo.map((item, id, arr) => {
          const sum =
            parseFloat(item.wheel4 || null) + parseFloat(item.wheel2 || null);
          return { ...item, sum };
        });
        return (
          data &&
          data.map((item, id, arr) => {
            if (id === data.length - 1) {
              return {
                ...item,
                sum_pd: null,
                wheel4_pd: null,
                wheel2_pd: null,
              };
            } else {
              const sum_pd =
                (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) * 100;
              const wheel4_pd =
                (parseFloat(item.wheel4) / parseFloat(arr[id + 1].wheel4) - 1) *
                100;
              const wheel2_pd =
                (parseFloat(item.wheel2) / parseFloat(arr[id + 1].wheel2) - 1) *
                100;

              return {
                ...item,
                sum_pd: sum_pd.toFixed(2),
                wheel4_pd: wheel4_pd.toFixed(2),
                wheel2_pd: wheel2_pd.toFixed(2),
              };
            }
          })
        );
      };
      tmp = updowndata2();
      tdataF = () => {
        const keys = ['sum', 'wheel4', 'wheel2'];
        if (!tmp) return { tdata: [], tdata_pd: [] };
        return keys.reduce(
          (acc, key) => {
            const flted = tmp.filter(
              (item) =>
                parseInt(item.yr, 10) <= yrint &&
                parseInt(item.yr, 10) >= yrint - 4
            );
            acc.tdata.push(
              flted.map((item) =>
                parseFloat(item[key]).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              )
            );
            acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
            return acc;
          },
          { tdata: [], tdata_pd: [] }
        );
      };
      break;
    case '도로연장':
      colname = ['계/증감률', '1차로', '2차로', '3차로 이상'];
      updowndata2 = () => {
        if (!genfo) return null;
        const data = genfo.map((item, id, arr) => {
          const sum =
            parseFloat(item.lane1 || null) +
            parseFloat(item.lane2 || null) +
            parseFloat(item.lane3_more || null);
          return { ...item, sum };
        });
        return (
          data &&
          data.map((item, id, arr) => {
            if (id === data.length - 1) {
              return {
                ...item,
                sum_pd: null,
                lane1_pd: null,
                lane2_pd: null,
                lane3_more_pd: null,
              };
            } else {
              const sum_pd =
                (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) * 100;
              const lane1_pd =
                (parseFloat(item.lane1) / parseFloat(arr[id + 1].lane1) - 1) *
                100;
              const lane2_pd =
                (parseFloat(item.lane2) / parseFloat(arr[id + 1].lane2) - 1) *
                100;
              const lane3_more_pd =
                (parseFloat(item.lane3_more) /
                  parseFloat(arr[id + 1].lane3_more) -
                  1) *
                100;
              return {
                ...item,
                sum_pd: sum_pd.toFixed(2),
                lane1_pd: lane1_pd.toFixed(2),
                lane2_pd: lane2_pd.toFixed(2),
                lane3_more_pd: lane3_more_pd.toFixed(2),
              };
            }
          })
        );
      };
      tmp = updowndata2();
      tdataF = () => {
        const keys = ['sum', 'lane1', 'lane2', 'lane3_more'];
        if (!tmp) return { tdata: [], tdata_pd: [] };
        return keys.reduce(
          (acc, key) => {
            const flted = tmp.filter(
              (item) =>
                parseInt(item.yr, 10) <= yrint &&
                parseInt(item.yr, 10) >= yrint - 4
            );
            acc.tdata.push(
              flted.map((item) =>
                parseFloat(item[key]).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              )
            );
            acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
            return acc;
          },
          { tdata: [], tdata_pd: [] }
        );
      };
      break;

    case '보행연관시설물':
      colname = ['계/증감률', '보도육고', '지하보도'];
      updowndata2 = () => {
        if (!genfo) return null;
        const data = genfo.map((item, id, arr) => {
          const sum =
            parseFloat(item.overpass || null) +
            parseFloat(item.underpass || null);
          return { ...item, sum };
        });
        return (
          data &&
          data.map((item, id, arr) => {
            if (id === data.length - 1) {
              return {
                ...item,
                sum_pd: null,
                overpass_pd: null,
                underpass_pd: null,
              };
            } else {
              const sum_pd =
                (parseFloat(item.sum) / parseFloat(arr[id + 1].sum) - 1) * 100;
              const overpass_pd =
                (parseFloat(item.overpass) / parseFloat(arr[id + 1].overpass) -
                  1) *
                100;
              const underpass_pd =
                (parseFloat(item.underpass) /
                  parseFloat(arr[id + 1].underpass) -
                  1) *
                100;
              return {
                ...item,
                sum_pd: sum_pd.toFixed(2),
                overpass_pd: overpass_pd.toFixed(2),
                underpass_pd: underpass_pd.toFixed(2),
              };
            }
          })
        );
      };
      tmp = updowndata2();
      tdataF = () => {
        const keys = ['sum', 'overpass', 'underpass'];
        if (!tmp) return { tdata: [], tdata_pd: [] };
        return keys.reduce(
          (acc, key) => {
            const flted = tmp.filter(
              (item) =>
                parseInt(item.yr, 10) <= yrint &&
                parseInt(item.yr, 10) >= yrint - 4
            );
            acc.tdata.push(
              flted.map((item) =>
                parseFloat(item[key]).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              )
            );
            acc.tdata_pd.push(flted.map((item) => item[`${key}_pd`]));
            return acc;
          },
          { tdata: [], tdata_pd: [] }
        );
      };
      break;
    default:
      break;
  }

  const { tdata, tdata_pd } = (tdataF && tdataF()) || {
    tdata: [],
    tdata_pd: [],
  };

  // const updowndata2res = updowndata2 && updowndata2();

  //   console.log('res:', res);
  // console.log('tdata: ', tdata);
  // console.log('tdata_pd: ', tdata_pd);
  // console.log('updown: ', updowndata2res);

  // renderfunc ----------------------------------------------------------------------
  const thead_th =
    yrint &&
    [yrint, yrint - 1, yrint - 2, yrint - 3, yrint - 4]
      .map((item, id) => {
        return (
          <th key={id} colSpan={2}>
            {item}
          </th>
        );
      })
      .reverse();

  //   const updown_render = () => {
  //     return (
  //       updowndata &&
  //       updowndata.map((item, id) => {
  //         return <td key={id}></td>;
  //       })
  //     );
  //   };

  //   const tbody_th = (arg) => {
  //     return (
  //       tdata &&
  //       tdata.map((item, id) => {
  //         return (
  //           <React.Fragment key={id}>
  //             <td>{parseFloat(item[arg]).toFixed(0)}</td>
  //             {/* <td>
  //                 {updowndata[id] && updowndata[id][arg] !== undefined
  //                   ? parseFloat(updowndata[id][arg]).toFixed(2)
  //                   : ''}
  //               </td> */}
  //             {/* <td>{parseFloat(updowndata[id][arg]).toFixed(2)}</td> */}
  //             {/* <td>{updowndata[id][arg].}</td> */}
  //           </React.Fragment>
  //         );
  //       })
  //     );
  //   };

  const tbody_tr =
    colname &&
    colname.map((item, id) => {
      return (
        <tr key={id}>
          {id === 0 ? <th rowSpan={colname.length}>서울특별시</th> : null}
          <th>{item}</th>
          {/* {tbody_th(id)} */}
          {(() => {
            const cells = [];
            for (let i = 4; i >= 0; i--) {
              cells.push(
                <td key={`tdata_${i}`}>
                  {tdata &&
                  tdata[id] &&
                  tdata[id][i] &&
                  !isNaN(tdata[id][i].replace(/,/g, ''))
                    ? tdata[id][i]
                    : ''}
                </td>
              );
              cells.push(
                <td key={`tdata_pd_${i}`}>
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
  return (
    <div className="table-container">
      <div className="table_head">
        <div>{ldcuid && ldcuid[2]} 인구현황</div>
        <div className="table_head2">
          <div>수정</div>
          <div>저장</div>
        </div>
      </div>
      <div className="table_head3">
        <div className="table_head3_1">단위: 명/%</div>
      </div>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th> </th>
            {thead_th}
          </tr>
        </thead>
        <tbody>{tbody_tr}</tbody>
      </table>
    </div>
  );
};

export default Table1;
