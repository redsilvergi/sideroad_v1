import useInfo from "./use-info";

const useColor = () => {
  const { info, setLength } = useInfo();

  const conditionF = (d) => {
    const {
      roadOps,
      laneOps,
      widthOps,
      typeOps,
      barrierOps,
      onewayOps,
      statusOps,
    } = info;

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
                return (feature) =>
                  feature.properties.CARTRK_CO > 2 &&
                  feature.properties.CARTRK_CO <= 5;
              case 3:
                return (feature) =>
                  feature.properties.CARTRK_CO > 5 &&
                  feature.properties.CARTRK_CO <= 10;
              case 4:
                return (feature) =>
                  feature.properties.CARTRK_CO > 10 &&
                  feature.properties.CARTRK_CO <= 24;
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
                  feature.properties.ROAD_BT < 10;
              case 3:
                return (feature) =>
                  feature.properties.ROAD_BT >= 10 &&
                  feature.properties.ROAD_BT < 12;
              case 4:
                return (feature) =>
                  feature.properties.ROAD_BT >= 12 &&
                  feature.properties.ROAD_BT < 15;
              case 5:
                return (feature) =>
                  feature.properties.ROAD_BT >= 15 &&
                  feature.properties.ROAD_BT < 20;
              case 6:
                return (feature) => feature.properties.ROAD_BT >= 20;
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

    return (
      (roadConditions.length === 0 ||
        roadConditions.some((condition) => condition(d))) &&
      (laneConditions.length === 0 ||
        laneConditions.some((condition) => condition(d))) &&
      (widthConditions.length === 0 ||
        widthConditions.some((condition) => condition(d))) &&
      (typeConditions.length === 0 ||
        typeConditions.some((condition) => condition(d))) &&
      (barrierConditions.length === 0 ||
        barrierConditions.some((condition) => condition(d))) &&
      (onewayConditions.length === 0 ||
        onewayConditions.some((condition) => condition(d))) &&
      (statusConditions.length === 0 ||
        statusConditions.some((condition) => condition(d)))
    );
  };

  var len = 0;
  const getRoadColor = (d) => {
    if (conditionF(d)) {
      //   console.log(feature.properties.length);
      len = len + d.properties.length;
      setLength((prev) => prev + d.properties.length);

      return [230, 0, 60, 255 * 0.8];
    } else {
      return [0, 0, 0, 255 * 0.05];
    }
  };

  const getLength = () => {
    console.log("len:", len / 1000);
  };
  return { getRoadColor, getLength };
};

export default useColor;
