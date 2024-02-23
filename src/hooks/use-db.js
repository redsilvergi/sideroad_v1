import useInfo from "./use-info";
import { useCallback } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

const useDb = () => {
  const { setLD, setPick, setView, rsk } = useInfo();
  /////////////////////////////////////////////////////////
  const getCord = useCallback(
    async (item) => {
      setLD(true);
      console.log(item);
      const response = await axios.get(`http://localhost:4000/getCord/${item}`);
      console.log(response.data);
      setPick(item);
      setView({
        longitude: response.data.long,
        latitude: response.data.lat,
        zoom: 19.5,
      });
      setLD(false);
    },
    [setPick, setView, setLD]
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
  return { getCord, getCsv, getSrchId };
};

export default useDb;
