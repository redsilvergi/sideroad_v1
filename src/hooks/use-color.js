import useInfo from "./use-info";

const useColor = () => {
  const { info, region, pick } = useInfo();

  const conditionF = (obj) => {
    const {
      roadOps,
      laneOps,
      widthOps,
      typeOps,
      barrierOps,
      onewayOps,
      statusOps,
    } = info;
    const { city, county } = region;

    if (roadOps && roadOps.checkboxes) {
      var roadConditions = roadOps.checkboxes
        .map((roadOp, index) => {
          if (roadOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.ROAD_SE === "RDC003";
              case 1:
                return (feature) => feature.properties.ROAD_SE === "RDC004";
              case 2:
                return (feature) => feature.properties.ROAD_SE === "RDC005";
              case 3:
                return (feature) => feature.properties.ROAD_SE === "RDC006";
              case 4:
                return (feature) => feature.properties.ROAD_SE === "RDC007";
              case 5:
                return (feature) => feature.properties.ROAD_SE === "RDC008";
              case 6:
                return (feature) => feature.properties.ROAD_SE === "RDC010";
              case 7:
                return (feature) => feature.properties.ROAD_SE === "RDC011";
              case 8:
                return (feature) => feature.properties.ROAD_SE === "RDC014";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      roadConditions = [];
    }
    if (laneOps && laneOps.checkboxes) {
      var laneConditions = laneOps.checkboxes
        .map((laneOp, index) => {
          if (laneOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.CARTRK_CO === 1;
              case 1:
                return (feature) => feature.properties.CARTRK_CO === 2;
              case 2:
                return (feature) => feature.properties.CARTRK_CO === 3;
              case 3:
                return (feature) => feature.properties.CARTRK_CO === 4;
              case 4:
                return (feature) =>
                  feature.properties.CARTRK_CO >= 5 &&
                  feature.properties.CARTRK_CO <= 8;
              case 5:
                return (feature) => feature.properties.CARTRK_CO >= 9;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      laneConditions = [];
    }
    if (widthOps && widthOps.checkboxes) {
      var widthConditions = widthOps.checkboxes
        .map((widthOp, index) => {
          if (widthOp) {
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
              case 5:
                return (feature) =>
                  feature.properties.ROAD_BT >= 12 &&
                  feature.properties.ROAD_BT < 15;
              case 6:
                return (feature) =>
                  feature.properties.ROAD_BT >= 15 &&
                  feature.properties.ROAD_BT < 20;
              case 7:
                return (feature) =>
                  feature.properties.ROAD_BT >= 20 &&
                  feature.properties.ROAD_BT < 25;
              case 8:
                return (feature) => feature.properties.ROAD_BT >= 25;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      widthConditions = [];
    }
    if (typeOps && typeOps.checkboxes) {
      var typeConditions = typeOps.checkboxes
        .map((typeOp, index) => {
          if (typeOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.PMTR_SE === "PVM001";
              case 1:
                return (feature) => feature.properties.PMTR_SE === "PVM002";
              case 2:
                return (feature) => feature.properties.PMTR_SE === "PVM003";
              case 3:
                return (feature) => feature.properties.PMTR_SE === "PVM004";
              case 4:
                return (feature) => feature.properties.PMTR_SE === "PVM005";
              case 5:
                return (feature) => feature.properties.PMTR_SE === "PVM006";
              case 6:
                return (feature) => feature.properties.PMTR_SE === "PVM007";
              case 7:
                return (feature) => feature.properties.PMTR_SE === "PVM999";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      typeConditions = [];
    }
    if (barrierOps && barrierOps.checkboxes) {
      var barrierConditions = barrierOps.checkboxes
        .map((barrierOp, index) => {
          if (barrierOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.EDENNC_AT === "1";
              case 1:
                return (feature) => feature.properties.EDENNC_AT === "0";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      barrierConditions = [];
    }
    if (onewayOps && onewayOps.checkboxes) {
      var onewayConditions = onewayOps.checkboxes
        .map((onewayOp, index) => {
          if (onewayOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.OSPS_SE === "OWI001";
              case 1:
                return (feature) => feature.properties.OSPS_SE === "OWI002";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      onewayConditions = [];
    }
    if (statusOps && statusOps.checkboxes) {
      var statusConditions = statusOps.checkboxes
        .map((statusOp, index) => {
          if (statusOp) {
            switch (index) {
              case 0:
                return (feature) => feature.properties.USGSTT_SE === "RUS001";
              case 1:
                return (feature) => feature.properties.USGSTT_SE === "RUS002";
              case 2:
                return (feature) => feature.properties.USGSTT_SE === "RUS003";
              case 3:
                return (feature) => feature.properties.USGSTT_SE === "RUS004";
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((condition) => condition !== null);
    } else {
      statusConditions = [];
    }
    //region/////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    return pick
      ? pick === obj.properties.NF_ID
      : (roadConditions.length === 0 ||
          roadConditions.some((condition) => condition(obj))) &&
          (laneConditions.length === 0 ||
            laneConditions.some((condition) => condition(obj))) &&
          (widthConditions.length === 0 ||
            widthConditions.some((condition) => condition(obj))) &&
          (typeConditions.length === 0 ||
            typeConditions.some((condition) => condition(obj))) &&
          (barrierConditions.length === 0 ||
            barrierConditions.some((condition) => condition(obj))) &&
          (onewayConditions.length === 0 ||
            onewayConditions.some((condition) => condition(obj))) &&
          (statusConditions.length === 0 ||
            statusConditions.some((condition) => condition(obj))) &&
          (county.cd
            ? obj.properties.LEGLCD_SE === `${county.cd}`
            : city.cd
            ? obj.properties.LEGLCD_SE.substring(0, 2) ===
              `${city.cd}`.substring(0, 2)
            : true);
  };

  const getRoadColor = (obj) => {
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
  };
  return { getRoadColor, conditionF };
};

export default useColor;
