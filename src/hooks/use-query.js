import useInfo from "./use-info";
import { useCallback } from "react";

const useQuery = () => {
  const { info, region, rnfo, rsk } = useInfo();

  const queryF = useCallback(() => {
    const {
      rdbtOps,
      slopeOps,
      pmtrOps,
      rdnetOps,
      pubtrOps,
      pbuldOps,
      buldeOps,
      stairOps,
      sdwkOps,
    } = info;

    const citycd = region.city.cd;
    const countycd = region.county.cd;

    var query = "select sum(length) as total_length from side10p where ";

    const rdbtQry =
      rdbtOps.checkboxes &&
      rdbtOps.checkboxes
        .map((rdbtOp, index) => {
          if (rdbtOp) {
            switch (index) {
              case 0:
                return "ROAD_BT < 3";
              case 1:
                return "ROAD_BT >= 3 and ROAD_BT < 8";
              case 2:
                return "ROAD_BT >= 8 and ROAD_BT < 9";
              case 3:
                return "ROAD_BT >= 9 and ROAD_BT < 10";
              case 4:
                return "ROAD_BT >= 10 and ROAD_BT < 12";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const slopeQry =
      slopeOps.checkboxes &&
      slopeOps.checkboxes
        .map((slopeOp, index) => {
          if (slopeOp) {
            switch (index) {
              case 0:
                return "SLOPE_LG >= 10 ";
              case 1:
                return "SLOPE_LG >= 6 and SLOPE_LG < 10";
              case 2:
                return "SLOPE_LG >= 3 and SLOPE_LG < 6";
              case 3:
                return "SLOPE_LG >= 1 and SLOPE_LG < 3";
              case 4:
                return "SLOPE_LG >= 0 and SLOPE_LG < 1";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const pmtrQry =
      pmtrOps.checkboxes &&
      pmtrOps.checkboxes
        .map((pmtrOp, index) => {
          if (pmtrOp) {
            switch (index) {
              case 0:
                return "PVM001";
              case 1:
                return "PVM003";
              case 2:
                return "PVM004";
              case 3:
                return "PVM005";
              case 4:
                return "PVM002, PVM006, PVM007, PVM999";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    const rdnetQry =
      rdnetOps.checkboxes &&
      rdnetOps.checkboxes
        .map((rdnetOp, index) => {
          if (rdnetOp) {
            switch (index) {
              case 0:
                return "RDNET_AC >= 1.35";
              case 1:
                return "RDNET_AC >= 1.14 and RDNET_AC < 1.35";
              case 2:
                return "RDNET_AC >= 0.98 and RDNET_AC < 1.14";
              case 3:
                return "RDNET_AC >= 0.82 and RDNET_AC < 0.98";
              case 4:
                return "RDNET_AC >= 0.0 and RDNET_AC < 0.82";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const pubtrQry =
      pubtrOps.checkboxes &&
      pubtrOps.checkboxes
        .map((pubtrOp, index) => {
          if (pubtrOp) {
            switch (index) {
              case 0:
                return "PUBTR_AC >= 500";
              case 1:
                return "PUBTR_AC >= 350 and PUBTR_AC < 500";
              case 2:
                return "PUBTR_AC >= 200 and PUBTR_AC < 350";
              case 3:
                return "PUBTR_AC >= 100 and PUBTR_AC < 200";
              case 4:
                return "PUBTR_AC >= 0 and PUBTR_AC < 100";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const pbuldQry =
      pbuldOps.checkboxes &&
      pbuldOps.checkboxes
        .map((pbuldOp, index) => {
          if (pbuldOp) {
            switch (index) {
              case 0:
                return "PBULD_FA >= 2000";
              case 1:
                return "PBULD_FA >= 1000 and PBULD_FA < 2000";
              case 2:
                return "PBULD_FA >= 500 and PBULD_FA < 1000";
              case 3:
                return "PBULD_FA >= 100 and PBULD_FA < 500";
              case 4:
                return "PBULD_FA >= 0 and PBULD_FA < 100";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const buldeQry =
      buldeOps.checkboxes &&
      buldeOps.checkboxes
        .map((buldeOp, index) => {
          if (buldeOp) {
            switch (index) {
              case 0:
                return "BULDE_DE >= 20";
              case 1:
                return "BULDE_DE >= 11 and BULDE_DE < 20";
              case 2:
                return "BULDE_DE >= 6 and BULDE_DE < 11";
              case 3:
                return "BULDE_DE >= 1 and BULDE_DE < 6";
              case 4:
                return "BULDE_DE < 1";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join(" or ");

    const stairQry =
      stairOps.checkboxes &&
      stairOps.checkboxes
        .map((stairOp, index) => {
          if (stairOp) {
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

    const sdwkQry =
      sdwkOps.checkboxes &&
      sdwkOps.checkboxes
        .map((sdwkOp, index) => {
          if (sdwkOp) {
            switch (index) {
              case 0:
                return "SDW002";
              case 1:
                return "SDW003";
              case 2:
                return "SDW001";
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
      : citycd && (query += `(sido = ${cityParam}) and `); //: citycd && (query += `(sido = ${cityParam}) and `); //: citycd && (query += `(left(LEGLCD_SE,2) = '${cityParam}') and `);
    // : citycd && (query += `(LEGLCD_SE like '${cityParam}%25') and `);

    rdbtQry && (query += `(${rdbtQry}) and `);
    slopeQry && (query += `(${slopeQry}) and `);
    pmtrQry && (query += `(PMTR_SE in ('${pmtrQry}')) and `);
    rdnetQry && (query += `(${rdnetQry}) and `);
    pubtrQry && (query += `(${pubtrQry}) and `);
    pbuldQry && (query += `(${pbuldQry}) and `);
    buldeQry && (query += `(${buldeQry}) and `);
    stairQry && (query += `(STAIR_AT in ('${stairQry}')) and `);
    sdwkQry && (query += `(SDWK_SE in ('${sdwkQry}')) and `);

    if (
      rdbtQry &&
      slopeQry &&
      pmtrQry &&
      rdnetQry &&
      pubtrQry &&
      pbuldQry &&
      buldeQry &&
      stairQry &&
      sdwkQry
    ) {
      query =
        query.slice(-6) === "where " ? query.slice(0, -7) : query.slice(0, -5);
    } else {
      query = 0;
    }

    // console.log("query from use-query.js:", "\n", query);
    return query;
  }, [info, region.city.cd, region.county.cd]);

  const queryR = useCallback(() => {
    const { rskOps } = rnfo;
    const chbxs = rskOps && rskOps.checkboxes;

    const citycd = region.city.cd;
    const countycd = region.county.cd;
    const cityParam = citycd && Math.round(citycd / 100000000);
    var query = "select sum(length) as total_length from side10r where ";
    countycd
      ? (query += `(LEGLCD_SE in ('${countycd}')) and `)
      : citycd && (query += `(sido = ${cityParam}) and `);

    var rskType;
    var rskcol;
    switch (rsk) {
      case "교통사고":
        rskcol = "PEDAC_RK";
        rskType = "PDA";
        break;
      case "범죄사고":
        rskcol = "CRIME_RK";
        rskType = "CRA";
        break;
      case "재해사고":
        rskcol = "FLOOD_RK";
        rskType = "FLA";
        break;
      case "밀집사고":
        rskcol = "CRWDAC_RK";
        rskType = "PDA";
        break;
      case "낙상사고":
        rskcol = "FALLAC_RK";
        rskType = "CWA";
        break;
      default:
        break;
    }

    const rskQry =
      chbxs &&
      chbxs
        .map((Op, index) => {
          if (Op) {
            switch (index) {
              case 0:
                return `${rskType}001`;
              case 1:
                return `${rskType}002`;
              case 2:
                return `${rskType}003`;
              case 3:
                return `${rskType}004`;
              case 4:
                return `${rskType}005`;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
        .join("','");

    rskQry && (query += `(${rskcol} in ('${rskQry}')) and `);

    query =
      query.slice(-6) === "where " ? query.slice(0, -7) : query.slice(0, -5);

    // console.log("queryRsk:", "\n", query);
    return query;
  }, [region.city.cd, region.county.cd, rnfo, rsk]);
  return { queryF, queryR };
};

export default useQuery;
