import useInfo from "./use-info";
import useQuery from "./use-query";
import { useCallback } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

const useDb = () => {
  const { setLD, setPick, setView, rsk, setPnfo, setLength, rnfo, region } =
    useInfo();
  const { queryF, queryR } = useQuery();
  /////////////////////////////////////////////////////////
  const getCord = useCallback(
    async (item) => {
      setLD(true);
      // console.log(item);
      const response = await axios.get(`http://localhost:4000/getCord/${item}`);
      // console.log("getCord response at use-de.js: ", response);
      setPick(item);
      if (response.data) {
        const data = response.data;
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
      } else {
        console.log("no data fetched from getCord at use-db.js");
      }

      // setLength(Math.round(data.road_lt * 1000) / 1000000);
      setLD(false);
    },
    [setPick, setView, setLD, setPnfo]
  );
  /////////////////////////////////////////////////////////
  const getCsv = useCallback(
    async (nfList) => {
      setLD(true);
      const nf_ids = nfList.map((item) => `'${item}'`).join(",");
      const query = `select NF_ID, ROAD_NM, ROAD_SE, PMTR_SE, EDENNC_AT, CARTRK_CO, ROAD_BT, OSPS_SE, SLOPE_LG, PBULD_FA, BULDE_DE, SDWK_SE, STAIR_AT, RDNET_AC, PEDAC_RK, CRIME_RK, FLOOD_RK, CRWDAC_RK, FALLAC_RK, PUBTR_AC, ROAD_LT, ST_X(ST_Centroid(ST_GeomFromWKB(wkb_geometry))) as long, ST_Y(ST_Centroid(ST_GeomFromWKB(wkb_geometry))) as lat from side10 where NF_ID in (${nf_ids})`;
      const response = await axios.get(`http://localhost:4000/getCsv/${query}`);
      // console.log("csvlistdwn: ", response.data);
      // Construct CSV string and Adding BOM(Byte Order Mark) for UTF-8 Encoding
      const BOM = "\uFEFF";
      const csvRows = response.data
        .map((row) => {
          return row
            .map((value) => {
              if (!isNaN(value) && value !== null) {
                return `="${value}"`; // Format number as a string to prevent Excel auto-formatting & Enclose the value in ="", to ensure Excel treats it as a string
              }
              return value; // Return non-numeric values unchanged
            })
            .join(",");
        })
        .join("\n");
      const csvContent = BOM + csvRows; // Prepend BOM
      // Using Blob for potentially large data sets or special characters
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${rsk}_${
          region.county.name
            ? region.city.name + "_" + region.county.name
            : region.city.name
            ? region.city.name
            : "전국"
        }_top5.csv`
      );
      document.body.appendChild(link); //required for firefox
      link.click();
      URL.revokeObjectURL(url); // Clean up to avoid memory leaks
      setLD(false);
    },
    [rsk, setLD, region.city.name, region.county.name]
  );

  /////////////////////////////////////////////////////////
  const getSrchId = useCallback(
    async (rdnm) => {
      var qry = `select NF_ID from side10 where ROAD_NM = '${rdnm}'`;
      const response = await axios.get(
        `http://localhost:4000/getSrchId/${qry}`
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
        // console.log("response.data: ", response.data / 1000);
        // console.log("response.data type: ", typeof response.data);
        setLength(response.data / 1000);
      }
    }
    setLD(false);
  }, [setLD, queryF, setLength, queryR, rnfo.rskOps.checkboxes, rsk]);
  /////////////////////////////////////////////////////////
  const getTop5 = useCallback(async () => {
    setLD(true);
    const rskType = () => {
      switch (rsk) {
        case "교통사고":
          return "PEDAC";
        case "범죄사고":
          return "CRIME";
        case "재해사고":
          return "FLOOD";
        case "밀집사고":
          return "CRWD";
        case "낙상사고":
          return "FALLAC";
        default:
          break;
      }
    };
    const qryF = () => {
      if (region.county.cd) {
        return `select ROAD_NM, NF_ID from aclogdbf2 where ${rskType()} is not null and LEGLCD_SE = '${
          region.county.cd
        }' order by ${rskType()} desc limit 5`;
      } else if (region.city.cd) {
        return `select ROAD_NM, NF_ID from aclogdbf2 where ${rskType()} is not null and sido = ${Number(
          String(region.city.cd).substring(0, 2)
        )} order by ${rskType()} desc limit 5`;
      } else {
        return `select ROAD_NM, NF_ID from aclogdbf2 where ${rskType()} is not null order by ${rskType()} desc limit 5`;
      }
    };
    const response = await axios.get(`http://localhost:4000/getTop5/${qryF()}`);
    const rtrvdLst = response.data;
    // console.log("rsrch getTop5: ", rtrvdLst);
    setLD(false);
    return rtrvdLst;
  }, [rsk, setLD, region.city.cd, region.county.cd]);
  /////////////////////////////////////////////////////////
  return { getCord, getCsv, getSrchId, getLength, getTop5 };
};

export default useDb;
