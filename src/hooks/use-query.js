import useInfo from "./use-info";
import { useCallback } from "react";

const useQuery = () => {
  const { info, region } = useInfo();

  const queryF = useCallback(() => {
    const {
      roadOps,
      laneOps,
      widthOps,
      typeOps,
      barrierOps,
      onewayOps,
      statusOps,
    } = info;

    const citycd = region.city.cd;
    const countycd = region.county.cd;

    var query = "select sum(ROAD_LT) as total_length from side10 where ";

    const roadQry =
      roadOps.checkboxes &&
      roadOps.checkboxes
        .map((roadOp, index) => {
          if (roadOp) {
            switch (index) {
              case 0:
                return "RDC003";
              case 1:
                return "RDC004";
              case 2:
                return "RDC005";
              case 3:
                return "RDC006";
              case 4:
                return "RDC007";
              case 5:
                return "RDC008";
              case 6:
                return "RDC010";
              case 7:
                return "RDC011";
              case 8:
                return "RDC014";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const laneQry =
      laneOps.checkboxes &&
      laneOps.checkboxes
        .map((laneOp, index) => {
          if (laneOp) {
            switch (index) {
              case 0:
                return "CARTRK_CO = 1";
              case 1:
                return "CARTRK_CO = 2";
              case 2:
                return "CARTRK_CO = 3";
              case 3:
                return "CARTRK_CO = 4";
              case 4:
                return "CARTRK_CO >= 5 and CARTRK_CO <= 8";
              case 5:
                return "CARTRK_CO >= 9";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const widthQry =
      widthOps.checkboxes &&
      widthOps.checkboxes
        .map((widthOp, index) => {
          if (widthOp) {
            switch (index) {
              case 0:
                return "ROAD_BT < 3";
              case 1:
                return "ROAD_BT >= 3 and ROAD_BT < 8";
              case 2:
                return "ROAD_BT >= 8 and ROAD_BT < 9";
              case 3:
                return "ROAD_BT >= 9 and ROAD_BT < 10 ";
              case 4:
                return "ROAD_BT >= 10 and ROAD_BT < 12";
              case 5:
                return "ROAD_BT >= 12 and ROAD_BT < 15";
              case 6:
                return "ROAD_BT >= 15 and ROAD_BT < 20";
              case 7:
                return "ROAD_BT >= 20 and ROAD_BT < 25";
              case 8:
                return "ROAD_BT >= 25";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const typeQry =
      typeOps.checkboxes &&
      typeOps.checkboxes
        .map((typeOp, index) => {
          if (typeOp) {
            switch (index) {
              case 0:
                return "PVM001";
              case 1:
                return "PVM002";
              case 2:
                return "PVM003";
              case 3:
                return "PVM004";
              case 4:
                return "PVM005";
              case 5:
                return "PVM006";
              case 6:
                return "PVM007";
              case 7:
                return "PVM999";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const barrierQry =
      barrierOps.checkboxes &&
      barrierOps.checkboxes
        .map((barrierOp, index) => {
          if (barrierOp) {
            switch (index) {
              case 0:
                return "1";
              case 1:
                return "0";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const onewayQry =
      onewayOps.checkboxes &&
      onewayOps.checkboxes
        .map((onewayOp, index) => {
          if (onewayOp) {
            switch (index) {
              case 0:
                return "OWI001";
              case 1:
                return "OWI002";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const statusQry =
      statusOps.checkboxes &&
      statusOps.checkboxes
        .map((statusOp, index) => {
          if (statusOp) {
            switch (index) {
              case 0:
                return "RUS001";
              case 1:
                return "RUS002";
              case 2:
                return "RUS003";
              case 3:
                return "RUS004";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const cityParam = citycd && Math.round(citycd / 100000000);

    countycd
      ? (query += `(LEGLCD_SE in ('${countycd}')) and `)
      : citycd && (query += `(sido = ${cityParam}) and `);
    // : citycd && (query += `(LEGLCD_SE like '${cityParam}%25') and `);

    roadQry && (query += `(ROAD_SE in ('${roadQry}')) and `);
    laneQry && (query += `(${laneQry}) and `);
    widthQry && (query += `(${widthQry}) and `);
    typeQry && (query += `(PMTR_SE in ('${typeQry}')) and `);
    barrierQry && (query += `(EDENNC_AT in ('${barrierQry}')) and `);
    onewayQry && (query += `(OSPS_SE in ('${onewayQry}')) and `);
    statusQry && (query += `(USGSTT_SE in ('${statusQry}')) and `);

    query =
      query.slice(-6) === "where " ? query.slice(0, -7) : query.slice(0, -5);

    console.log("query:", "\n", query);
    return query;
  }, [info, region.city.cd, region.county.cd]);
  return { queryF };
};

export default useQuery;
