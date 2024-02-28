import useInfo from "./use-info";
import useQuery from "./use-query";
import { useCallback } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

const useDb = () => {
  const { setLD, setPick, setView, rsk, setPnfo, setLength, rnfo } = useInfo();
  const { queryF, queryR } = useQuery();
  /////////////////////////////////////////////////////////
  const getCord = useCallback(
    async (item) => {
      setLD(true);
      console.log(item);
      const { data } = await axios.get(`http://localhost:4000/getCord/${item}`);
      console.log(data);
      setPick(item);
      setView({
        longitude: data.long,
        latitude: data.lat,
        zoom: 19.5,
      });
      setPnfo({
        road_se: data.road_se,
        cartrk_co: data.cartrk_co,
        road_bt: data.road_bt,
        pmtr_se: data.pmtr_se,
        osps_se: data.osps_se,
        road_lt: data.road_lt,
        slope_lg: data.slope_lg,
        sdwk_se: data.sdwk_se,
        rdnet_ac: data.rdnet_ac,
        pbuld_fa: data.pbuld_fa,
        bulde_de: data.bulde_de,
        pubtr_ac: data.pubtr_ac,
        stair_at: data.stair_at,
        edennc_at: data.edennc_at,
        pedac_rk: data.pedac_rk,
        crime_rk: data.crime_rk,
        flood_rk: data.flood_rk,
        crwdac_rk: data.crwdac_rk,
        fallac_rk: data.fallac_rk,
      });
      // setLength(Math.round(data.road_lt * 1000) / 1000000);
      setLD(false);
    },
    [setPick, setView, setLD, setPnfo]
  );
  /////////////////////////////////////////////////////////
  const getCsv = useCallback(
    async (nfList) => {
      setLD(true);
      // console.log("nfList: ", nfList);
      const nf_ids = nfList.map((item) => `'${item}'`).join(",");
      // console.log("nf_ids: ", nf_ids);
      const query = `select * from side10 where NF_ID in (${nf_ids})`;
      // console.log("query: ", query);
      const response = await axios.get(`http://localhost:4000/getCsv/${query}`);
      console.log("csvlistdwn: ", response.data);
      const csvContent =
        "data:test/csv;charset=utf-8," +
        response.data.map((row) => row.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${rsk}_top5.csv`);
      document.body.appendChild(link); //required for firefox
      link.click();

      setLD(false);
    },
    [rsk, setLD]
  );

  /////////////////////////////////////////////////////////
  const getSrchId = useCallback(
    async (rdnm) => {
      var qry = `select NF_ID from side10 where ROAD_NM = '${rdnm}'`;
      const response = await axios.get(
        `http://localhost:4000/getSrchId/${qry}`
      );
      console.log("rsrch getsrchid: ", response.data);
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
    if (rnfo.rskOps.checkboxes.every((v) => v === false)) {
      setLength(0);
    } else {
      const query = rsk ? queryR() : queryF();
      if (query === 0) {
        setLength(0);
      } else {
        // console.log("query from use-db.js:", "\n", query);
        const response = await axios.get(
          `http://localhost:4000/getLength/${query}` // /getLength/${query}
        );
        console.log("response.data: ", response.data / 1000);
        console.log("response.data type: ", typeof response.data);
        setLength(response.data / 1000);
      }
    }
    setLD(false);
  }, [setLD, queryF, setLength, queryR, rnfo.rskOps.checkboxes, rsk]);

  return { getCord, getCsv, getSrchId, getLength };
};

export default useDb;
