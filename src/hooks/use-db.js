import useInfo from './use-info';
import { useCallback } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useViewUpdate } from '../../src/context/view';

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const useDb = () => {
  const {
    setLD,
    setPick,
    setPnfo,
    setLength,
    rnfo0,
    rnfo1,
    setRight,
    setLeft,
    scrn,
    setGenfo,
    setLdcuid,
    setExp,
    bar,
    info,
    ldcuid,
    setPfrdata,
    setPfrPick,
    setPfrjs,
    setSrvdata,
  } = useInfo();

  const setView = useViewUpdate();
  /////////////////////////////////////////////////////////
  const getMbkey = useCallback(async () => {
    const response = await axios.get(`/getMbkey`);
    // console.log('getMbkey response at use-db.js: ', response);
    return response.data;
  }, []);

  //getLdcuid state set from ldctable using new ldc not uid - to access uid using new ldc
  const getLdc = useCallback(
    async (ldc, isSetView = true) => {
      // setLD(true);
      // console.log('getLdc called with ldc: ', ldc);
      const response = await axios.get(`/getLdc/${ldc}`);
      // console.log('getLdc arrayarrayarray:\n', Object.values(response.data[0]));
      const arraydata = Object.values(response.data[0]);
      setLdcuid(arraydata);
      if (isSetView) {
        setView({
          longitude: arraydata[5],
          latitude: arraydata[6],
          zoom: scrn < 1015 ? arraydata[8] : arraydata[7],
        });
      }
      setExp(2);
      // setLD(false);
      return response.data;
    },
    [setLdcuid, setView, scrn, setExp]
  );

  const getConnectedLinks = useCallback(async (nf_id) => {
    const response = await axios.get(`/getTouchedLinks/${nf_id}`);
    if (response.data) {
      return response.data;
    } else {
      console.log('no data fetched from getConnectedLinks at use-db.js');
    }
  }, []);

  const getLinkProp = useCallback(
    async (nf_id, setMap) => {
      if (setMap) {
        // setLD(true);
      }
      // console.log(nf_id);
      const response = await axios.get(`/getCordOnly/${nf_id}`);
      const response2 = await axios.get(`/getProp/${nf_id}`);
      const response3 = await axios.get(`/getShap/${nf_id}`);
      // console.log('getLinkProp response.data at use-db.js: ', response.data);
      // console.log('getLinkProp response2.data at use-db.js: ', response2.data);
      // console.log('getLinkProp response3.data at use-db.js: ', response3.data);
      bar === 3 ? setPfrPick(nf_id) : setPick(nf_id);

      if (response.data) {
        const data = response.data;
        const data2 = response2.data;
        const data3 = response3.data;
        if (setMap) {
          setView({
            longitude: data.long,
            latitude: data.lat,
            zoom: 16.5,
          });
        }
        setPnfo({
          road_se: data2.road_se,
          cartrk_co: data2.cartrk_co,
          road_bt: data2.road_bt,
          pmtr_se: data2.pmtr_se,
          osps_se: data2.osps_se,
          road_lt: data2.road_lt,
          slope_lg: data2.slope_lg,
          sdwk_se: data2.sdwk_se,
          rdnet_ac: data2.rdnet_ac,
          pbuld_fa: data2.pbuld_fa,
          bulde_de: data2.bulde_de,
          pubtr_ac: data2.pubtr_ac,
          stair_at: data2.stair_at,
          edennc_at: data2.edennc_at,
          pedac_rk: data2.pedac_rk,
          pred: data2.pred,
          aiw10kas: data3.aiw10kas,
          bus400s: data3.bus400s,
          mkden300s: data3.mkden300s,
          pbulddens: data3.pbulddens,
          rbulddens: data3.rbulddens,
          roadbts: data3.roadbts,
          roadlts: data3.roadlts,
          school300s: data3.school300s,
          slopelgs: data3.slopelgs,
          subway400s: data3.subway400s,
        });
        getLdc(data2.leglcd_se, false);
      } else {
        console.log(
          'no response.data fetched from getCordOnly, getProp, getShap at use-db.js'
        );
      }
      if (scrn < 1015) {
        setLeft(false);
        setRight(false);
      }
      // setLength(Math.round(data.road_lt * 1000) / 1000000);
      // setLD(false);
    },
    [
      setPick,
      setView,
      setPnfo,
      setRight,
      setLeft,
      scrn,
      bar,
      setPfrPick,
      getLdc,
    ]
  );
  /////////////////////////////////////////////////////////
  const getCsvPfr = useCallback(
    async (nfList) => {
      if (!nfList || nfList.length === 0) {
        console.error('선택된 list가 없습니다.');
        return;
      }

      setLD(true);
      const response = await axios.get(
        `/getCsvPfr/${
          ldcuid && ldcuid[0] !== ldcuid[4] ? ldcuid[4] : ldcuid[0]
        }`
      );
      // console.log("csvlistdwn: ", response.data);
      // Construct CSV string and Adding BOM(Byte Order Mark) for UTF-8 Encoding
      const BOM = '\uFEFF';
      const csvRows = response.data
        .map((row) => {
          return row
            .map((value) => {
              if (!isNaN(value) && value !== null) {
                return `="${value}"`; // Format number as a string to prevent Excel auto-formatting & Enclose the value in ="", to ensure Excel treats it as a string
              }
              return value; // Return non-numeric values unchanged
            })
            .join(',');
        })
        .join('\n');
      const csvContent = BOM + csvRows; // Prepend BOM
      // Using Blob for potentially large data sets or special characters
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        bar === 3 &&
          `보행자우선도로후보_${
            ldcuid ? `${ldcuid[1]}_${ldcuid[2]}` : '전국'
          }_top20.csv`
      );
      document.body.appendChild(link); //required for firefox
      link.click();
      URL.revokeObjectURL(url); // Clean up to avoid memory leaks
      setLD(false);
    },
    [setLD, ldcuid, bar]
  );

  /////////////////////////////////////////////////////////
  const getSrchId = useCallback(
    async (rdnm) => {
      // console.log('getSrchId params usedb:\n', rdnm);
      const response = await axios.get(`/getSrchId/${rdnm}`);
      // console.log('rsrch getsrchid: ', response.data);
      const rtrvdLst = response.data;
      const nfidLst = rtrvdLst.map((item, id) => {
        return (
          <div
            key={id}
            className="rsrch_nfid_row"
            onClick={async () => await getLinkProp(item.nf_id, true)}
          >
            <div className="rsrch_nfid1">{`${id + 1}`}</div>
            <div className="rsrch_nfid2">{item.nf_id}</div>
            <div className="rsrch_nfid3">
              <FaExternalLinkAlt />
            </div>
          </div>
        );
      });
      return nfidLst;
    },
    [getLinkProp]
  );
  /////////////////////////////////////////////////////////////////
  const getLstLength = useCallback(async (lst) => {
    const response = await axios.get(`/getLstLength`, {
      params: { ids: lst },
    });
    return response.data.total_length;
  }, []);

  const getLength = useCallback(async () => {
    setLD(true);
    if (bar === 1) {
      console.log('now bar1');
    } else if (bar === 2) {
      const ldc = ldcuid ? ldcuid[4] : null;
      const response = await axios.post(`/getLength2`, {
        rnfo0,
        rnfo1,
        ldc,
      });
      // console.log('getLength response.data\n', response.data);
      // console.log('response.data type: ', typeof response.data);
      setLength(response.data.total_length / 1000);
    } else if (bar === 3) {
      console.log('now bar3');
    } else if (bar === 4) {
      console.log('info and ldcuid\n', info, ldcuid);
      const ldc = ldcuid ? ldcuid[4] : null;
      const response = await axios.post(`/getLength4`, {
        info,
        ldc,
      });
      // console.log('getLength response.data\n', response.data);
      // console.log('response.data type: ', typeof response.data);
      setLength(response.data.total_length / 1000);
    }
    setLD(false);
  }, [setLD, setLength, rnfo0, rnfo1, bar, info, ldcuid]);
  /////////////////////////////////////////////////////////
  // const getTop5 = useCallback(async () => {
  //   setLD(true);
  //   const rskType = () => {
  //     switch (rsk) {
  //       case '교통사고':
  //         return 'PEDAC';
  //       case '범죄사고':
  //         return 'CRIME';
  //       case '재해사고':
  //         return 'FLOOD';
  //       case '밀집사고':
  //         return 'CRWD';
  //       case '낙상사고':
  //         return 'FALLAC';
  //       default:
  //         break;
  //     }
  //   };
  //   // const qryF = () => {
  //   //   if (ldcuid && ldcuid[4].slice(2) !== '000') {
  //   //     return `SELECT ROAD_NM, NF_ID FROM aclogdbf3 WHERE ${rskType()} IS NOT NULL AND LEGLCD_SE LIKE '${
  //   //       ldcuid[4]
  //   //     }%' ORDER BY ${rskType()} DESC LIMIT 5`;
  //   //   } else if (ldcuid && ldcuid[4].slice(2) === '000') {
  //   //     return `SELECT ROAD_NM, NF_ID FROM aclogdbf3 WHERE ${rskType()} IS NOT NULL AND sido = ${Number(
  //   //       ldcuid[4].slice(0, 2)
  //   //     )} order by ${rskType()} desc limit 5`;
  //   //   } else {
  //   //     return `SELECT ROAD_NM, NF_ID FROM aclogdbf3 WHERE ${rskType()} IS NOT NULL ORDER BY ${rskType()} DESC LIMIT 5`;
  //   //   }
  //   // };
  //   // console.log('getTop5 query usedb:\n', qryF());

  //   const response = await axios.get(
  //     `/getTop5/${ldcuid && ldcuid[4]}/${rskType()}`
  //   );
  //   const rtrvdLst = response.data;
  //   // console.log("rsrch getTop5: ", rtrvdLst);
  //   setLD(false);
  //   return rtrvdLst;
  // }, [rsk, setLD, ldcuid]);

  const getEcon = useCallback(
    async (citem, ldc, yr) => {
      setLD(true);
      const response = await axios.get(`/getEcon/${citem}/${ldc}/${yr}`);
      // console.log('getEcon at use-db', response.data);
      // const lst = response.data;
      // const lst2 = lst.map((item, id, arr) => {
      //   if (id === lst.length - 1) {
      //     return { ...item, sum_pd: null };
      //   } else {
      //     const cursum = parseFloat(item.sum);
      //     const presum = parseFloat(arr[id + 1].sum);
      //     console.log('cursum&presum: ????', cursum, presum);

      //     const sum_pd = (cursum / presum - 1) * 100;
      //     return { ...item, sum_pd: parseFloat(sum_pd.toFixed(2)) };
      //   }
      // });

      // console.log(lst2);
      setGenfo(response.data);
      setLD(false);
    },
    [setLD, setGenfo]
  );

  const getReg = useCallback(async () => {
    setLD(true);
    const response = await axios.get(`/getReg`);
    // console.log('getReg at use-db', response.data);
    setLD(false);
    return response.data;
  }, [setLD]);

  const getBar2sido = useCallback(
    async (tablenm, yr) => {
      setLD(true);
      // console.log(
      //   'getbar2sido axios at use-db',
      //   `/getBar2sido/${tablenm}/${yr}`
      // );

      const response = await axios.get(`/getBar2sido/${tablenm}/${yr}`);
      // console.log('getBar2sido at use-db', response.data);
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const getBar2sgg = useCallback(
    async (tablenm, sidotmp, yr) => {
      setLD(true);
      const response = await axios.get(
        `/getBar2sgg/${tablenm}/${sidotmp}/${yr}`
      );
      // console.log('getBar2sgg at use-db', response.data);
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const getPie1 = useCallback(
    async (col, ldc) => {
      setLD(true);
      const response = await axios.get(`/getPie1/${col}/${ldc}`);
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const postSrvy = useCallback(
    async (tmp1) => {
      setLD(true);
      const response = await axios.post(`/postSrvy`, tmp1);
      console.log('postSrvy response\n', response);

      setLD(false);
    },
    [setLD]
  );

  const getSrvyhist = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/getSrvyhist`, obj);
      console.log('getSrvyhist response\n', response.data);

      setLD(false);
      return response.data;
    },
    [setLD]
  );

  // const postSrvyuser = useCallback(async () => {
  //   setLD(true);
  //   const response = await axios.post(`/postSrvyuser`);
  //   console.log('postSrvyuser response\n', response);

  //   setLD(false);
  // }, [setLD]);

  const getCsvSrvy = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/getCsvSrvy`, obj);
      console.log('csvlistdwn: ', response.data, '\nobj', obj);

      // Construct CSV string and Adding BOM(Byte Order Mark) for UTF-8 Encoding
      const BOM = '\uFEFF';
      const keys = Object.keys(response.data).join(',');
      const values = Object.values(response.data)
        .map((item, id) => {
          if (Array.isArray(item)) {
            return `"${item.join(',')}"`; // Convert array to comma-separated string and enclose in quotes
          }
          if (typeof item === 'string' && item.includes(',')) {
            return `"${item}"`; // Enclose values with commas in quotes
          }
          if (id === 1) {
            const date = new Date(item);
            console.log('Original UTC Date:', date.toISOString()); // Logs UTC time
            console.log(
              'Converted KST Date:',
              date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) // Should show KST time
            );
            return date.toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          }
          if (id === 3) {
            return `"'${item}'"`; // prepend single quote to prevent Excel from auto-formatting
          }
          return item;
        })
        .join(',');
      const csvContent = BOM + keys + '\n' + values;

      // Using Blob for potentially large data sets or special characters
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `실태조사_srvyid_${obj.srvyid}.csv`);
      document.body.appendChild(link); //required for firefox
      link.click();
      URL.revokeObjectURL(url); // Clean up to avoid memory leaks
      setLD(false);
    },
    [setLD]
  );

  const getSrvyItem = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/getSrvyItem`, obj);

      if (response.data) {
        console.log('getSrvyItem response.data\n', response.data);
      }
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const delSrvyItem = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/delSrvyItem`, obj);

      if (response.data) {
        console.log('delSrvyItem response\n', response.data);
        alert('삭제되었습니다.');
      }

      setLD(false);
    },
    [setLD]
  );

  const editSrvy = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/editSrvy`, obj);
      console.log('editSrvy response\n', response);

      setLD(false);
    },
    [setLD]
  );

  const getCordNView = useCallback(
    async (nf_id) => {
      setLD(true);
      // console.log(nf_id);
      const response = await axios.get(`/getCordOnly/${nf_id}`);
      // console.log("getCordNView response at use-de.js: ", response);

      if (response.data) {
        const data = response.data;

        setView({
          longitude: data.long,
          latitude: data.lat,
          zoom: 15,
        });
      } else {
        console.log('no data fetched from getCordNView at use-db.js');
      }

      setLD(false);
    },
    [setView, setLD]
  );

  const getCsvGen1 = useCallback(
    async (obj) => {
      setLD(true);
      const response = await axios.post(`/getCsvGen1`, obj);
      console.log('csvlistdwn: ', response.data, '\nobj', obj);

      // Construct CSV string and Adding BOM(Byte Order Mark) for UTF-8 Encoding
      const BOM = '\uFEFF';
      const data = response.data;

      // Extract keys from the first object to use as headers
      const keys = Object.keys(data[0]).join(',');

      // Map over each object to create a CSV row
      const values = data
        .map((row) => {
          return Object.values(row)
            .map((item) => {
              if (typeof item === 'string' && item.includes(',')) {
                return `"${item}"`; // Enclose values with commas in quotes
              }
              return item;
            })
            .join(',');
        })
        .join('\n');

      // Combine BOM, headers, and rows into the final CSV content
      const csvContent = BOM + keys + '\n' + values;

      // Using Blob for potentially large data sets or special characters
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `일반현황_${obj.tablename}_${obj.yr}_${obj.ldc}.csv`
      );
      document.body.appendChild(link); //required for firefox
      link.click();
      URL.revokeObjectURL(url); // Clean up to avoid memory leaks
      setLD(false);
    },
    [setLD]
  );

  const getRiskPrcnt = useCallback(async (obj) => {
    // setLD(true);
    const response = await axios.post(`/getRiskPrcnt`, obj);
    // setLD(false);
    return response.data;
  }, []);

  /////////////////////////////////////////////////////////
  const getpfrjs = async () => {
    try {
      setLD(true);
      const res = await axios.get(`/getPfrjs`);
      setPfrjs(res.data);
      setLD(false);
    } catch (e) {
      console.error('Failed to get pfrGjs:\n', e);
    }
  };

  const getPfrdata = useCallback(async () => {
    setLD(true);
    try {
      const [
        parks,
        parks_buffer,
        ch_safe_zone,
        sn_safe_zone,
        multfac,
        multfac_entr,
        schl_bld,
        schl_buffer,
        schl_entr,
      ] = await Promise.all([
        axios.get(`/getPfrdata/parks/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/parks_buffer/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/ch_safe_zone/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/sn_safe_zone/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/multfac/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/multfac_entr/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/schl_bld/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/schl_buffer/${ldcuid && ldcuid[0]}`),
        axios.get(`/getPfrdata/schl_entr/${ldcuid && ldcuid[0]}`),
      ]);
      setPfrdata((prev) => ({
        ...prev,
        parks: parks.data,
        parks_buffer: parks_buffer.data,
        ch_safe_zone: ch_safe_zone.data,
        sn_safe_zone: sn_safe_zone.data,
        multfac: multfac.data,
        multfac_entr: multfac_entr.data,
        schl_bld: schl_bld.data,
        schl_buffer: schl_buffer.data,
        schl_entr: schl_entr.data,
      }));
    } catch (err) {
      console.error('Error fetching pfrdata:', err);
    } finally {
      setLD(false);
      console.log('pfr fetched');
    }
  }, [setLD, ldcuid, setPfrdata]);

  const getTopPfr = useCallback(async () => {
    setLD(true);
    const response = await axios.get(
      `/getTopPfr/${ldcuid && ldcuid[0] !== ldcuid[4] ? ldcuid[4] : ldcuid[0]}`
    );
    const rtrvdLst = response.data;
    setLD(false);
    return rtrvdLst;
  }, [setLD, ldcuid]);

  const getSurveyBuffer = useCallback(
    async (nfidlst) => {
      setLD(true);
      try {
        const response = await axios.get(`/getSurveyBuffer`, {
          params: { ids: nfidlst },
        });
        const rtrvd = response.data;
        setLD(false);
        return rtrvd;
      } catch (error) {
        console.error('Error fetching survey buffer:', error);
        setLD(false);
      }
    },
    [setLD]
  );

  const getSurveyBufferMask = useCallback(
    async (nfidlst) => {
      setLD(true);
      try {
        const response = await axios.get(`/getSurveyBufferMask`, {
          params: { ids: nfidlst },
        });
        const rtrvd = response.data;
        setLD(false);
        return rtrvd;
      } catch (error) {
        console.error('Error fetching survey buffer mask:', error);
        setLD(false);
      }
    },
    [setLD]
  );

  const getSrvData = useCallback(
    async (nfidlst) => {
      setLD(true);
      try {
        const response = await axios.get(`/getSrvData`, {
          params: { ids: nfidlst },
        });

        setSrvdata((prev) => ({
          ...prev,
          bld: response.data.bld,
          rodway: response.data.rodway,
          pedpath: response.data.pedpath,
          cctv: response.data.cctv,
          crosswalk: response.data.crosswalk,
        }));
      } catch (err) {
        console.error('Error fetching srvdata:', err);
      } finally {
        setLD(false);
        console.log('srvdata fetched');
      }
    },
    [setLD, setSrvdata]
  );

  const getPfrProps = useCallback(async (nfidlst) => {
    try {
      const response = await axios.get(`/getPfrProps`, {
        params: { ids: nfidlst },
      });
      const data = response.data;

      if (data) {
        return data;
      } else {
        return {
          cartrk_co: null,
          road_bt: null,
          rdnet_ac: null,
          pbuld_fa: null,
          bulde_de: null,
          pubtr_ac: null,
        };
      }
    } catch (err) {
      console.error('Error fetching pfrprops:', err);
      return {
        cartrk_co: null,
        road_bt: null,
        rdnet_ac: null,
        pbuld_fa: null,
        bulde_de: null,
        pubtr_ac: null,
      };
    }
  }, []);

  const fetchManual = async () => {
    setLD(true);
    try {
      const res = await axios.get(`/manual`, {
        responseType: 'blob', // binary file handling
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', '이면도로_활용_메뉴얼_2025_v1.pdf');
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error fetching manual:', err);
    } finally {
      setLD(false);
    }
  };

  /////////////////////////////////////////////////////////
  return {
    getMbkey,
    getLdc,
    getConnectedLinks,
    getLinkProp,
    getCsvPfr,
    getSrchId,
    getLength,
    // getTop5,
    getEcon,
    getReg,
    getBar2sido,
    getBar2sgg,
    getPie1,
    postSrvy,
    getSrvyhist,
    getCsvSrvy,
    getSrvyItem,
    delSrvyItem,
    editSrvy,
    getCordNView,
    getCsvGen1,
    getRiskPrcnt,
    ////////////////////////////////////
    getpfrjs,
    getPfrdata,
    getTopPfr,
    getSurveyBuffer,
    getSurveyBufferMask,
    getSrvData,
    getLstLength,
    getPfrProps,
    fetchManual,
  };
};

export default useDb;
