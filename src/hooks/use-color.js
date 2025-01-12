import useInfo from './use-info';

const useColor = () => {
  // setup ----------------------------------------------------------------------
  const {
    info,
    pick,
    ldcuid,
    bar,
    rnfo0,
    rnfo1,
    pfrPick,
    topPfrList,
    srvy,
    nfidlst,
  } = useInfo();

  // conditionf ----------------------------------------------------------------------
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
                return (feature) => feature.properties.PMTR_SE === 1;
              case 1:
                return (feature) => feature.properties.PMTR_SE === 3;
              case 2:
                return (feature) => feature.properties.PMTR_SE === 4;
              case 3:
                return (feature) => feature.properties.PMTR_SE === 5;
              case 4:
                return (feature) =>
                  feature.properties.PMTR_SE !== 1 &&
                  feature.properties.PMTR_SE !== 3 &&
                  feature.properties.PMTR_SE !== 4 &&
                  feature.properties.PMTR_SE !== 5;
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
                return (feature) => feature.properties.STAIR_AT === '1';
              case 1:
                return (feature) => feature.properties.STAIR_AT === '0';
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
                return (feature) => feature.properties.SDWK_SE === 2;
              case 1:
                return (feature) => feature.properties.SDWK_SE === 3;
              case 2:
                return (feature) => feature.properties.SDWK_SE === 1;
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
          (ldcuid && ldcuid[4].slice(2) !== '000'
            ? obj.properties.LEGLCD_SE === `${ldcuid[4]}`
            : ldcuid && ldcuid[4].slice(2) === '000'
            ? obj.properties.LEGLCD_SE.slice(0, 2) === ldcuid[4].slice(0, 2)
            : true);
  };

  // getrskclr ----------------------------------------------------------------------
  const getRskClr = (obj) => {
    const mode =
      rnfo0 && rnfo1 ? '사고예측' : rnfo0 ? '사고' : rnfo1 ? '예측' : '미선택';
    const check = mode === '사고' ? rnfo0 : mode === '예측' ? rnfo1 : [];
    const rskVal =
      mode === '사고'
        ? Number(4 - obj.properties.PEDAC_RK) //PEDAC_RK: 0 안전 4 위험
        : mode === '예측'
        ? Number(4 - obj.properties.PRED) //PRED: 0 안전 4 위험
        : Number(4 - obj.properties.PEDAC_RK);

    // case pick ----------------------------------------
    if (pick) {
      if (obj.properties.NF_ID === pick) {
        if (rskVal === 0) {
          return [221, 0, 22, 255 * 0.8];
        } else if (rskVal === 1) {
          return [233, 141, 120, 255 * 0.8];
        } else if (rskVal === 2) {
          return [242, 212, 146, 255 * 0.8];
        } else if (rskVal === 3) {
          return [121, 194, 165, 255 * 0.8];
        } else if (rskVal === 4) {
          return [0, 175, 185, 255 * 0.8];
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    }
    // case 사고예측모두선택 ----------------------------------------
    else if (mode === '사고예측') {
      var cond0 = rnfo0
        .map((item, id) => {
          if (item) {
            switch (id) {
              case 0:
                return (d) => d.properties.PEDAC_RK === 4;
              case 1:
                return (d) => d.properties.PEDAC_RK === 3;
              case 2:
                return (d) => d.properties.PEDAC_RK === 2;
              case 3:
                return (d) => d.properties.PEDAC_RK === 1;
              case 4:
                return (d) => d.properties.PEDAC_RK === 0;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((cond) => cond !== null);

      var cond1 = rnfo1
        .map((item, id) => {
          if (item) {
            switch (id) {
              case 0:
                return (d) => d.properties.PRED === 4;
              case 1:
                return (d) => d.properties.PRED === 3;
              case 2:
                return (d) => d.properties.PRED === 2;
              case 3:
                return (d) => d.properties.PRED === 1;
              case 4:
                return (d) => d.properties.PRED === 0;
              default:
                return null;
            }
          } else {
            return null;
          }
        })
        .filter((cond) => cond !== null);

      const finalcheck =
        cond0.length !== 0 &&
        cond0.some((condition) => condition(obj)) &&
        cond1.length !== 0 &&
        cond1.some((condition) => condition(obj)) &&
        (ldcuid && ldcuid[4].slice(2) !== '000'
          ? obj.properties.LEGLCD_SE === `${ldcuid[4]}`
          : ldcuid && ldcuid[4].slice(2) === '000'
          ? obj.properties.LEGLCD_SE.slice(0, 2) === ldcuid[4].slice(0, 2)
          : true);

      return finalcheck ? [0, 98, 175, 255 * 0.75] : [0, 0, 0, 255 * 0.05];
    }
    // case 나머지:사고예측중하나선택/모두미선택 ----------------------------------------
    else {
      // case 시군구 ----------------------------------------
      if (ldcuid && ldcuid[4].slice(2) !== '000') {
        if (obj.properties.LEGLCD_SE === `${ldcuid[4]}`) {
          if (rskVal === 0) {
            return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 1) {
            return check[1]
              ? [233, 141, 120, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 2) {
            return check[2]
              ? [242, 212, 146, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 3) {
            return check[3]
              ? [121, 194, 165, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 4) {
            return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
          } else {
            return [0, 0, 0, 255 * 0.05];
          }
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      }
      // case 시도 ----------------------------------------
      else if (ldcuid && ldcuid[4].slice(2) === '000') {
        if (obj.properties.LEGLCD_SE.slice(0, 2) === ldcuid[4].slice(0, 2)) {
          if (rskVal === 0) {
            return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 1) {
            return check[1]
              ? [233, 141, 120, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 2) {
            return check[2]
              ? [242, 212, 146, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 3) {
            return check[3]
              ? [121, 194, 165, 255 * 0.8]
              : [0, 0, 0, 255 * 0.05];
          } else if (rskVal === 4) {
            return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
          } else {
            return [0, 0, 0, 255 * 0.05];
          }
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      }
      // case 시도시군구미선택 ----------------------------------------
      else {
        if (rskVal === 0) {
          return check[0] ? [221, 0, 22, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 1) {
          return check[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 2) {
          return check[2] ? [242, 212, 146, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 3) {
          return check[3] ? [121, 194, 165, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else if (rskVal === 4) {
          return check[4] ? [0, 175, 185, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
        } else {
          return [0, 0, 0, 255 * 0.05];
        }
      }
    }
  };

  // getroadcolor ----------------------------------------------------------------------
  const getRoadColor = (obj) => {
    if (!obj.properties.NF_ID) {
      //for int points
      return [255, 255, 255];
    }
    // if (hvid === obj.properties.NF_ID) {
    //   return [255, 255, 0];
    // }
    if (bar === 1) {
      if (ldcuid && ldcuid[4].slice(2) === '000') {
        if (obj.properties.LEGLCD_SE.slice(0, 2) === ldcuid[4].slice(0, 2)) {
          return [0, 98, 175, 255 * 0.75];
        } else {
          return [102, 135, 160, 255 * 0.35];
        }
      } else if (ldcuid && ldcuid[4].slice(2) !== '000') {
        if (obj.properties.LEGLCD_SE === ldcuid[4]) {
          return [0, 98, 175, 255 * 0.75];
        } else {
          return [102, 135, 160, 255 * 0.35];
        }
      } else {
        return [102, 135, 160, 255 * 0.35];
      }
    } else if (bar === 2) {
      //for selected info(filter)
      return getRskClr(obj);
    } else if (bar === 3 && pfrPick) {
      const selectedRank = topPfrList.find(
        (item) => item.nf_id === pfrPick
      )?.ped_fitr_rank;

      const matchingIds = topPfrList
        .filter((item) => item.ped_fitr_rank === selectedRank)
        .map((item) => item.nf_id);

      if (matchingIds.includes(obj.properties.NF_ID)) {
        return [245, 167, 212];
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    } else if (bar === 4) {
      if (pfrPick) {
        const selectedRank = topPfrList.find(
          (item) => item.nf_id === pfrPick
        )?.ped_fitr_rank;

        const matchingIds = topPfrList
          .filter((item) => item.ped_fitr_rank === selectedRank)
          .map((item) => item.nf_id);

        if (matchingIds.includes(obj.properties.NF_ID)) {
          return [245, 167, 212];
        }
      }
      if (srvy) {
        if (nfidlst.includes(obj.properties.NF_ID)) {
          return [0, 98, 175, 255 * 0.75];
        } else {
          return [102, 135, 160, 255 * 0.35];
        }
      } else {
        if (conditionF(obj)) {
          //for selected info(filter)
          // if (hov === obj.properties.NF_ID) {
          //   return [0, 255, 0];
          // } else {
          return [0, 98, 175, 255 * 0.75];
          // }
        } else {
          //for unselected info(filter)
          // if (hov === obj.properties.NF_ID) {
          //   return [0, 255, 0];
          // } else {
          return [102, 135, 160, 255 * 0.35];
          // }
        }
      }
    } else {
      return [102, 135, 160, 255 * 0.35];
    }
  };

  // getaccpcolor ----------------------------------------------------------------------
  const getAccpColor = (obj, hvid) => {
    if (hvid === obj.properties.acdnt_no) {
      return [255, 255, 0];
    }
    if (ldcuid && ldcuid[4].slice(2) === '000') {
      if (obj.properties.ldc.slice(0, 2) === ldcuid[4].slice(0, 2)) {
        return [255, 0, 0];
      } else {
        return [102, 135, 160, 255 * 0.35];
      }
    } else if (ldcuid && ldcuid[4].slice(2) !== '000') {
      if (obj.properties.ldc === ldcuid[4]) {
        return [255, 0, 0];
      } else {
        return [102, 135, 160, 255 * 0.35];
      }
    } else {
      return [255, 0, 0];
    }
  };
  return { getRoadColor, conditionF, getAccpColor };
};

export default useColor;
