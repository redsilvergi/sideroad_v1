import useInfo from "./use-info";

const useColor = () => {
  const { info, region, pick, rnfo, rsk } = useInfo();

  const conditionF = (obj) => {
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
    const { city, county } = region;

    if (rdbtOps && rdbtOps.checkboxes) {
      var rdbtConditions = rdbtOps.checkboxes
        .map((rdbtOp, index) => {
          if (rdbtOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.ROAD_BT < 3;
              case 1:
                return (feature) =>
                  feature.properties.ROAD_BT >= 3 &&
                  feature.properties.ROAD_BT < 8;
              case 2:
                return (feature) =>
                  feature.properties.ROAD_BT >= 8 &&
                  feature.properties.ROAD_BT < 9;
              case 3:
                return (feature) =>
                  feature.properties.ROAD_BT >= 9 &&
                  feature.properties.ROAD_BT < 10;
              case 4:
                return (feature) =>
                  feature.properties.ROAD_BT >= 10 &&
                  feature.properties.ROAD_BT < 12;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      rdbtConditions = [];
    }
    if (slopeOps && slopeOps.checkboxes) {
      var slopeConditions = slopeOps.checkboxes
        .map((slopeOp, index) => {
          if (slopeOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.SLOPE_LG >= 10;
              case 1:
                return (feature) =>
                  feature.properties.SLOPE_LG >= 6 &&
                  feature.properties.SLOPE_LG < 10;
              case 2:
                return (feature) =>
                  feature.properties.SLOPE_LG >= 3 &&
                  feature.properties.SLOPE_LG < 6;
              case 3:
                return (feature) =>
                  feature.properties.SLOPE_LG >= 1 &&
                  feature.properties.SLOPE_LG < 3;
              case 4:
                return (feature) =>
                  feature.properties.SLOPE_LG >= 0 &&
                  feature.properties.SLOPE_LG < 1;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      slopeConditions = [];
    }
    if (pmtrOps && pmtrOps.checkboxes) {
      var pmtrConditions = pmtrOps.checkboxes
        .map((pmtrOp, index) => {
          if (pmtrOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.PMTR_SE === "PVM001";
              case 1:
                return (feature) => feature.properties.PMTR_SE === "PVM003";
              case 2:
                return (feature) => feature.properties.PMTR_SE === "PVM004";
              case 3:
                return (feature) => feature.properties.PMTR_SE === "PVM005";
              case 4:
                return (feature) =>
                  feature.properties.PMTR_SE !== "PVM001" &&
                  feature.properties.PMTR_SE !== "PVM003" &&
                  feature.properties.PMTR_SE !== "PVM004" &&
                  feature.properties.PMTR_SE !== "PVM005";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      pmtrConditions = [];
    }
    if (rdnetOps && rdnetOps.checkboxes) {
      var rdnetConditions = rdnetOps.checkboxes
        .map((rdnetOp, index) => {
          if (rdnetOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.RDNET_AC >= 1.35;
              case 1:
                return (feature) =>
                  feature.properties.RDNET_AC >= 1.14 &&
                  feature.properties.RDNET_AC < 1.35;
              case 2:
                return (feature) =>
                  feature.properties.RDNET_AC >= 0.98 &&
                  feature.properties.RDNET_AC < 1.14;
              case 3:
                return (feature) =>
                  feature.properties.RDNET_AC >= 0.82 &&
                  feature.properties.RDNET_AC < 0.98;
              case 4:
                return (feature) =>
                  feature.properties.RDNET_AC >= 0.0 &&
                  feature.properties.RDNET_AC < 0.82;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      rdnetConditions = [];
    }
    if (pubtrOps && pubtrOps.checkboxes) {
      var pubtrConditions = pubtrOps.checkboxes
        .map((pubtrOp, index) => {
          if (pubtrOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.PUBTR_AC >= 500;
              case 1:
                return (feature) =>
                  feature.properties.PUBTR_AC >= 350 &&
                  feature.properties.PUBTR_AC < 500;
              case 2:
                return (feature) =>
                  feature.properties.PUBTR_AC >= 200 &&
                  feature.properties.PUBTR_AC < 350;
              case 3:
                return (feature) =>
                  feature.properties.PUBTR_AC >= 100 &&
                  feature.properties.PUBTR_AC < 200;
              case 4:
                return (feature) =>
                  feature.properties.PUBTR_AC >= 0 &&
                  feature.properties.PUBTR_AC < 100;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      pubtrConditions = [];
    }
    if (pbuldOps && pbuldOps.checkboxes) {
      var pbuldConditions = pbuldOps.checkboxes
        .map((pbuldOp, index) => {
          if (pbuldOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.PBULD_FA >= 2000;
              case 1:
                return (feature) =>
                  feature.properties.PBULD_FA >= 1000 &&
                  feature.properties.PBULD_FA < 2000;
              case 2:
                return (feature) =>
                  feature.properties.PBULD_FA >= 500 &&
                  feature.properties.PBULD_FA < 1000;
              case 3:
                return (feature) =>
                  feature.properties.PBULD_FA >= 100 &&
                  feature.properties.PBULD_FA < 500;
              case 4:
                return (feature) =>
                  feature.properties.PBULD_FA >= 0 &&
                  feature.properties.PBULD_FA < 100;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      pbuldConditions = [];
    }
    if (buldeOps && buldeOps.checkboxes) {
      var buldeConditions = buldeOps.checkboxes
        .map((buldeOp, index) => {
          if (buldeOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.BULDE_DE >= 20;
              case 1:
                return (feature) =>
                  feature.properties.BULDE_DE >= 11 &&
                  feature.properties.BULDE_DE < 20;
              case 2:
                return (feature) =>
                  feature.properties.BULDE_DE >= 6 &&
                  feature.properties.BULDE_DE < 11;
              case 3:
                return (feature) =>
                  feature.properties.BULDE_DE >= 1 &&
                  feature.properties.BULDE_DE < 6;
              case 4:
                return (feature) => feature.properties.BULDE_DE < 1;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      buldeConditions = [];
    }
    if (stairOps && stairOps.checkboxes) {
      var stairConditions = stairOps.checkboxes
        .map((stairOp, index) => {
          if (stairOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.STAIR_AT === "1";
              case 1:
                return (feature) => feature.properties.STAIR_AT === "0";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      stairConditions = [];
    }
    if (sdwkOps && sdwkOps.checkboxes) {
      var sdwkConditions = sdwkOps.checkboxes
        .map((sdwkOp, index) => {
          if (sdwkOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.SDWK_SE === "SDW002";
              case 1:
                return (feature) => feature.properties.SDWK_SE === "SDW003";
              case 2:
                return (feature) => feature.properties.SDWK_SE === "SDW001";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      sdwkConditions = [];
    }

    return pick
      ? pick === obj.properties.NF_ID
      : rdbtConditions.length !== 0 &&
          rdbtConditions.some((condition) => condition(obj)) &&
          slopeConditions.length !== 0 &&
          slopeConditions.some((condition) => condition(obj)) &&
          pmtrConditions.length !== 0 &&
          pmtrConditions.some((condition) => condition(obj)) &&
          rdnetConditions.length !== 0 &&
          rdnetConditions.some((condition) => condition(obj)) &&
          pubtrConditions.length !== 0 &&
          pubtrConditions.some((condition) => condition(obj)) &&
          pbuldConditions.length !== 0 &&
          pbuldConditions.some((condition) => condition(obj)) &&
          buldeConditions.length !== 0 &&
          buldeConditions.some((condition) => condition(obj)) &&
          stairConditions.length !== 0 &&
          stairConditions.some((condition) => condition(obj)) &&
          sdwkConditions.length !== 0 &&
          sdwkConditions.some((condition) => condition(obj)) &&
          (county.cd
            ? obj.properties.LEGLCD_SE === `${county.cd}`
            : city.cd
            ? obj.properties.LEGLCD_SE.substring(0, 2) ===
              `${city.cd}`.substring(0, 2)
            : true);
  };

  //getRskClr/////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  const getRskClr = (obj) => {
    const { rskOps } = rnfo;
    const check = rskOps.checkboxes;
    const { city, county } = region;
    var rskVal;
    switch (rsk) {
      case "교통사고":
        rskVal = Number(obj.properties.PEDAC_RK[5]);
        break;
      case "재해사고":
        rskVal = Number(obj.properties.FLOOD_RK[5]);
        break;
      case "범죄사고":
        rskVal = Number(obj.properties.CRIME_RK[5]);
        break;
      case "밀집사고":
        rskVal = Number(obj.properties.CRWDAC_RK[5]);
        break;
      case "낙상사고":
        rskVal = Number(obj.properties.FALLAC_RK[5]);
        break;
      default:
        break;
    }
    if (pick) {
      if (obj.properties.NF_ID === pick) {
        if (rskVal === 1) {
          return [221, 0, 22, 255 * 0.8];
        } else if (rskVal === 2) {
          return [233, 141, 120, 255 * 0.8];
        } else if (rskVal === 3) {
          return [242, 212, 146, 255 * 0.8];
        } else if (rskVal === 4) {
          return [121, 194, 165, 255 * 0.8];
        } else if (rskVal === 5) {
          return [0, 175, 185, 255 * 0.8];
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    } else if (county.cd) {
      if (obj.properties.LEGLCD_SE === `${county.cd}`) {
        if (rskVal === 1) {
          return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 2) {
          return check[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 3) {
          return check[2] ? [242, 212, 146, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 4) {
          return check[3] ? [121, 194, 165, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 5) {
          return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    } else if (city.cd) {
      if (
        obj.properties.LEGLCD_SE.substring(0, 2) ===
        `${city.cd}`.substring(0, 2)
      ) {
        if (rskVal === 1) {
          return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 2) {
          return check[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 3) {
          return check[2] ? [242, 212, 146, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 4) {
          return check[3] ? [121, 194, 165, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 5) {
          return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    } else {
      if (rskVal === 1) {
        return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (rskVal === 2) {
        return check[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (rskVal === 3) {
        return check[2] ? [242, 212, 146, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (rskVal === 4) {
        return check[3] ? [121, 194, 165, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (rskVal === 5) {
        return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    }
  };
  /////////////////////////////////////////////////////////////////////////////////
  const getRoadColor = (obj) => {
    if (rsk) {
      if (!obj.properties.NF_ID) {
        ////////for int points
        return [255, 255, 255];
      } else {
        ////////for selected info(filter)
        return getRskClr(obj);
      }
    } else {
      if (!obj.properties.NF_ID) {
        ////////for int points
        return [255, 255, 255];
      } else if (conditionF(obj)) {
        ////////for selected info(filter)
        // if (hov === obj.properties.NF_ID) {
        //   return [0, 255, 0];
        // } else {
        return [0, 98, 175, 255 * 0.75];
        // }
      } else {
        ////////for unselected info(filter)
        // if (hov === obj.properties.NF_ID) {
        //   return [0, 255, 0];
        // } else {
        return [102, 135, 160, 255 * 0.35];
        // }
      }
    }
  };
  return { getRoadColor, conditionF };
};

export default useColor;
