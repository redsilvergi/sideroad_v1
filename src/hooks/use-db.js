import useInfo from './use-info';
import { useCallback } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useViewUpdate } from '../../src/context/view';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

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
  } = useInfo();

  const setView = useViewUpdate();
  /////////////////////////////////////////////////////////
  const getProp = useCallback(async (nf_id) => {
    // setLD(true);
    const response = await axios.get(
      `${REACT_APP_SERVER_URL}/getProp/${nf_id}`
    ); ////http://localhost:4000
    return response.data;
    // console.log('getProp response at use-db.js: ', response);
    // setPnfo(response.data);
    // setLD(false);
  }, []);

  const getCord = useCallback(
    async (nf_id) => {
      setLD(true);
      // console.log(nf_id);
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getCord/${nf_id}` ////http://localhost:4000
      );
      const response2 = await axios.get(
        `${REACT_APP_SERVER_URL}/getProp/${nf_id}` ////http://localhost:4000
      );
      const response3 = await axios.get(
        `${REACT_APP_SERVER_URL}/getShap/${nf_id}` ////http://localhost:4000
      );
      // console.log("getCord response at use-de.js: ", response);
      bar === 3 ? setPfrPick(nf_id) : setPick(nf_id);
      if (response.data) {
        const data = response.data;
        const data2 = response2.data;
        const data3 = response3.data;
        setView({
          longitude: data.long,
          latitude: data.lat,
          zoom: 16.5,
        });
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
      } else {
        console.log('no data fetched from getCord at use-db.js');
      }
      if (scrn < 1015) {
        setLeft(false);
        setRight(false);
      }
      // setLength(Math.round(data.road_lt * 1000) / 1000000);
      setLD(false);
    },
    [setPick, setView, setLD, setPnfo, setRight, setLeft, scrn, bar, setPfrPick]
  );
  /////////////////////////////////////////////////////////
  const getCsv = useCallback(
    async (nfList) => {
      setLD(true);
      const nf_ids = nfList.map((item) => `'${item.nf_id}'`).join(',');
      const query = `select * from public.side1r where NF_ID in (${nf_ids})`;
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getCsv/${query}`
      ); ////http://localhost:4000
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
          `보행자우선도로후보_${ldcuid ? ldcuid[2] : '전국'}_top20.csv`
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
      var qry = `select NF_ID from public.side1r where ROAD_NM = '${rdnm}'`;
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getSrchId/${qry}` ////http://localhost:4000
      );
      // console.log("rsrch getsrchid: ", response.data);
      const rtrvdLst = response.data;
      const nfidLst = rtrvdLst.map((item, id) => {
        return (
          <div
            key={id}
            className="rsrch_nfid_row"
            onClick={async () => await getCord(item.nf_id)}
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
    [getCord]
  );
  /////////////////////////////////////////////////////////////////
  const getLength = useCallback(async () => {
    setLD(true);
    if (bar === 1) {
      console.log('now bar1');
    } else if (bar === 2) {
      const ldc = ldcuid ? ldcuid[4] : null;
      const response = await axios.post(`${REACT_APP_SERVER_URL}/getLength2`, {
        //http://localhost:4000
        //
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
      const response = await axios.post(`${REACT_APP_SERVER_URL}/getLength4`, {
        //http://localhost:4000
        //
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
  //     `${REACT_APP_SERVER_URL}/getTop5/${ldcuid && ldcuid[4]}/${rskType()}`
  //   );
  //   const rtrvdLst = response.data;
  //   // console.log("rsrch getTop5: ", rtrvdLst);
  //   setLD(false);
  //   return rtrvdLst;
  // }, [rsk, setLD, ldcuid]);

  const getEcon = useCallback(
    async (citem, ldc, yr) => {
      setLD(true);
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getEcon/${citem}/${ldc}/${yr}` ////http://localhost:4000
      );
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
    const response = await axios.get(`${REACT_APP_SERVER_URL}/getReg`); ////http://localhost:4000
    // console.log('getReg at use-db', response.data);
    setLD(false);
    return response.data;
  }, [setLD]);

  const getBar2sido = useCallback(
    async (tablenm, yr) => {
      setLD(true);
      // console.log(
      //   'getbar2sido axios at use-db',
      //   `${REACT_APP_SERVER_URL}/getBar2sido/${tablenm}/${yr}`
      // );

      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getBar2sido/${tablenm}/${yr}` ////http://localhost:4000
      );
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
        `${REACT_APP_SERVER_URL}/getBar2sgg/${tablenm}/${sidotmp}/${yr}` ////http://localhost:4000
      );
      // console.log('getBar2sgg at use-db', response.data);
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const getLdc = useCallback(
    async (ldc) => {
      setLD(true);
      const response = await axios.get(`${REACT_APP_SERVER_URL}/getLdc/${ldc}`);
      // console.log('getLdc arrayarrayarray:\n', Object.values(response.data[0]));
      const arraydata = Object.values(response.data[0]);
      setLdcuid(arraydata);
      setView({
        longitude: arraydata[5],
        latitude: arraydata[6],
        zoom: scrn < 1015 ? arraydata[8] : arraydata[7],
      });
      setExp(2);
      setLD(false);
      return response.data;
    },
    [setLD, setLdcuid, setView, scrn, setExp]
  );

  const getPie1 = useCallback(
    async (col, ldc) => {
      setLD(true);
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/getPie1/${col}/${ldc}`
      );
      setLD(false);
      return response.data;
    },
    [setLD]
  );

  const postSrvy = useCallback(
    async (tmp1) => {
      setLD(true);
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/postSrvy`,
        tmp1
      );
      console.log('postSrvy response\n', response);

      setLD(false);
    },
    [setLD]
  );

  /////////////////////////////////////////////////////////
  const getpfrjs = async () => {
    try {
      setLD(true);
      const res = await axios.get(`${REACT_APP_SERVER_URL}/getPfrjs`); ////http://localhost:4000
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
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/parks/${ldcuid && ldcuid[0]}` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/parks_buffer/${
            ldcuid && ldcuid[0]
          }` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/ch_safe_zone/${
            ldcuid && ldcuid[0]
          }` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/sn_safe_zone/${
            ldcuid && ldcuid[0]
          }` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/multfac/${ldcuid && ldcuid[0]}` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/multfac_entr/${
            ldcuid && ldcuid[0]
          }` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/schl_bld/${ldcuid && ldcuid[0]}` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/schl_buffer/${
            ldcuid && ldcuid[0]
          }` ////http://localhost:4000
        ),
        axios.get(
          `${REACT_APP_SERVER_URL}/getPfrdata/schl_entr/${ldcuid && ldcuid[0]}` ////http://localhost:4000
        ),
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
      `${REACT_APP_SERVER_URL}/getTopPfr/${ldcuid && ldcuid[0]}` ////http://localhost:4000
    );
    const rtrvdLst = response.data;
    setLD(false);
    return rtrvdLst;
  }, [setLD, ldcuid]);

  /////////////////////////////////////////////////////////
  return {
    getProp,
    getCord,
    getCsv,
    getSrchId,
    getLength,
    // getTop5,
    getEcon,
    getReg,
    getBar2sido,
    getBar2sgg,
    getLdc,
    getPie1,
    ////////////////////////////////////
    getpfrjs,
    getPfrdata,
    getTopPfr,
    postSrvy,
  };
};

export default useDb;
