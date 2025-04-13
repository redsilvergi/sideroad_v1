import useInfo from './use-info';
import { useViewState } from '../context/view';

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
    // topPfrList,
    srvy,
    nfidlst,
  } = useInfo();
  const view = useViewState();

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
                return (feature) => feature.properties.road_bt < 3;
              case 1:
                return (feature) =>
                  feature.properties.road_bt >= 3 &&
                  feature.properties.road_bt < 8;
              case 2:
                return (feature) =>
                  feature.properties.road_bt >= 8 &&
                  feature.properties.road_bt < 9;
              case 3:
                return (feature) =>
                  feature.properties.road_bt >= 9 &&
                  feature.properties.road_bt < 10;
              case 4:
                return (feature) =>
                  feature.properties.road_bt >= 10 &&
                  feature.properties.road_bt < 12;
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
                return (feature) => feature.properties.slope_lg >= 10;
              case 1:
                return (feature) =>
                  feature.properties.slope_lg >= 6 &&
                  feature.properties.slope_lg < 10;
              case 2:
                return (feature) =>
                  feature.properties.slope_lg >= 3 &&
                  feature.properties.slope_lg < 6;
              case 3:
                return (feature) =>
                  feature.properties.slope_lg >= 1 &&
                  feature.properties.slope_lg < 3;
              case 4:
                return (feature) =>
                  feature.properties.slope_lg >= 0 &&
                  feature.properties.slope_lg < 1;
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
                return (feature) => feature.properties.pmtr_se === 1;
              case 1:
                return (feature) => feature.properties.pmtr_se === 3;
              case 2:
                return (feature) => feature.properties.pmtr_se === 4;
              case 3:
                return (feature) => feature.properties.pmtr_se === 5;
              case 4:
                return (feature) =>
                  feature.properties.pmtr_se !== 1 &&
                  feature.properties.pmtr_se !== 3 &&
                  feature.properties.pmtr_se !== 4 &&
                  feature.properties.pmtr_se !== 5;
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
                return (feature) => feature.properties.rdnet_ac >= 1.35;
              case 1:
                return (feature) =>
                  feature.properties.rdnet_ac >= 1.14 &&
                  feature.properties.rdnet_ac < 1.35;
              case 2:
                return (feature) =>
                  feature.properties.rdnet_ac >= 0.98 &&
                  feature.properties.rdnet_ac < 1.14;
              case 3:
                return (feature) =>
                  feature.properties.rdnet_ac >= 0.82 &&
                  feature.properties.rdnet_ac < 0.98;
              case 4:
                return (feature) =>
                  feature.properties.rdnet_ac >= 0.0 &&
                  feature.properties.rdnet_ac < 0.82;
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
                return (feature) => feature.properties.pubtr_ac >= 500;
              case 1:
                return (feature) =>
                  feature.properties.pubtr_ac >= 350 &&
                  feature.properties.pubtr_ac < 500;
              case 2:
                return (feature) =>
                  feature.properties.pubtr_ac >= 200 &&
                  feature.properties.pubtr_ac < 350;
              case 3:
                return (feature) =>
                  feature.properties.pubtr_ac >= 100 &&
                  feature.properties.pubtr_ac < 200;
              case 4:
                return (feature) =>
                  feature.properties.pubtr_ac >= 0 &&
                  feature.properties.pubtr_ac < 100;
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
                return (feature) => feature.properties.pbuld_fa >= 2000;
              case 1:
                return (feature) =>
                  feature.properties.pbuld_fa >= 1000 &&
                  feature.properties.pbuld_fa < 2000;
              case 2:
                return (feature) =>
                  feature.properties.pbuld_fa >= 500 &&
                  feature.properties.pbuld_fa < 1000;
              case 3:
                return (feature) =>
                  feature.properties.pbuld_fa >= 100 &&
                  feature.properties.pbuld_fa < 500;
              case 4:
                return (feature) =>
                  feature.properties.pbuld_fa >= 0 &&
                  feature.properties.pbuld_fa < 100;
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
                return (feature) => feature.properties.bulde_de >= 20;
              case 1:
                return (feature) =>
                  feature.properties.bulde_de >= 11 &&
                  feature.properties.bulde_de < 20;
              case 2:
                return (feature) =>
                  feature.properties.bulde_de >= 6 &&
                  feature.properties.bulde_de < 11;
              case 3:
                return (feature) =>
                  feature.properties.bulde_de >= 1 &&
                  feature.properties.bulde_de < 6;
              case 4:
                return (feature) => feature.properties.bulde_de < 1;
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
                return (feature) => feature.properties.stair_at === '1';
              case 1:
                return (feature) => feature.properties.stair_at === '0';
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
                return (feature) => feature.properties.sdwk_se === 2;
              case 1:
                return (feature) => feature.properties.sdwk_se === 3;
              case 2:
                return (feature) => feature.properties.sdwk_se === 1;
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
      ? pick === obj.properties.nf_id
      : (rdbtConditions.length === 0 ||
          rdbtConditions.some((condition) => condition(obj))) &&
          (slopeConditions.length === 0 ||
            slopeConditions.some((condition) => condition(obj))) &&
          (pmtrConditions.length === 0 ||
            pmtrConditions.some((condition) => condition(obj))) &&
          (rdnetConditions.length === 0 ||
            rdnetConditions.some((condition) => condition(obj))) &&
          (pubtrConditions.length === 0 ||
            pubtrConditions.some((condition) => condition(obj))) &&
          (pbuldConditions.length === 0 ||
            pbuldConditions.some((condition) => condition(obj))) &&
          (buldeConditions.length === 0 ||
            buldeConditions.some((condition) => condition(obj))) &&
          (stairConditions.length === 0 ||
            stairConditions.some((condition) => condition(obj))) &&
          (sdwkConditions.length === 0 ||
            sdwkConditions.some((condition) => condition(obj))) &&
          (ldcuid && ldcuid[4].slice(2) !== '000'
            ? obj.properties.leglcd_se === `${ldcuid[4]}`
            : ldcuid && ldcuid[4].slice(2) === '000'
            ? obj.properties.leglcd_se.slice(0, 2) === ldcuid[4].slice(0, 2)
            : true);
  };

  // getrskclr ----------------------------------------------------------------------
  const getRskClr = (obj) => {
    const mode =
      rnfo0 && rnfo1 ? '사고예측' : rnfo0 ? '사고' : rnfo1 ? '예측' : '미선택';
    const check = mode === '사고' ? rnfo0 : mode === '예측' ? rnfo1 : [];
    const rskVal =
      mode === '사고'
        ? Number(4 - obj.properties.pedac_rk) //pedac_rk: 0 안전 4 위험
        : mode === '예측'
        ? Number(4 - obj.properties.pred) //pred: 0 안전 4 위험
        : Number(4 - obj.properties.pedac_rk);

    // case pick ----------------------------------------
    if (pick) {
      if (obj.properties.nf_id === pick) {
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
                return (d) => d.properties.pedac_rk === 4;
              case 1:
                return (d) => d.properties.pedac_rk === 3;
              case 2:
                return (d) => d.properties.pedac_rk === 2;
              case 3:
                return (d) => d.properties.pedac_rk === 1;
              case 4:
                return (d) => d.properties.pedac_rk === 0;
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
                return (d) => d.properties.pred === 4;
              case 1:
                return (d) => d.properties.pred === 3;
              case 2:
                return (d) => d.properties.pred === 2;
              case 3:
                return (d) => d.properties.pred === 1;
              case 4:
                return (d) => d.properties.pred === 0;
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
          ? obj.properties.leglcd_se === `${ldcuid[4]}`
          : ldcuid && ldcuid[4].slice(2) === '000'
          ? obj.properties.leglcd_se.slice(0, 2) === ldcuid[4].slice(0, 2)
          : true);

      return finalcheck ? [0, 98, 175, 255 * 0.75] : [0, 0, 0, 255 * 0.05];
    }
    // case 나머지:사고예측중하나선택/모두미선택 ----------------------------------------
    else {
      // case 시군구 ----------------------------------------
      if (ldcuid && ldcuid[4].slice(2) !== '000') {
        if (obj.properties.leglcd_se === `${ldcuid[4]}`) {
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
        if (obj.properties.leglcd_se.slice(0, 2) === ldcuid[4].slice(0, 2)) {
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
    if (!obj.properties.nf_id) {
      //for int points
      if (view.zoom < 11) {
        return [255, 255, 255, 0];
      } else {
        return [255, 255, 255];
      }
    }
    // if (hvid === obj.properties.nf_id) {
    //   return [255, 255, 0];
    // }
    if (bar === 1) {
      if (ldcuid && ldcuid[4].slice(2) === '000') {
        if (obj.properties.leglcd_se.slice(0, 2) === ldcuid[4].slice(0, 2)) {
          return [0, 98, 175, 255 * 0.75];
        } else {
          return [102, 135, 160, 255 * 0.35];
        }
      } else if (ldcuid && ldcuid[4].slice(2) !== '000') {
        if (obj.properties.leglcd_se === ldcuid[4]) {
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
      // const selectedRank = topPfrList.find(
      //   (item) => item.nf_id === pfrPick
      // )?.ped_fitr_rank;

      // const matchingIds = topPfrList
      //   .filter((item) => item.ped_fitr_rank === selectedRank)
      //   .map((item) => item.nf_id);

      // if (
      //   matchingIds.includes(obj.properties.nf_id) ||
      //   obj.properties?.ROAD_NM ===
      //     topPfrList.find((item) => item.nf_id === pfrPick)?.road_nm
      // ) {
      if (nfidlst.includes(obj.properties.nf_id)) {
        return [245, 167, 212];
      } else {
        return [0, 0, 0, 255 * 0.05];
      }
    } else if (bar === 4) {
      if (srvy) {
        if (nfidlst.includes(obj.properties.nf_id)) {
          return [0, 98, 175, 255 * 0.75];
        } else {
          return [102, 135, 160, 255 * 0.35];
        }
      } else {
        if (conditionF(obj)) {
          //for selected info(filter)
          // if (hov === obj.properties.nf_id) {
          //   return [0, 255, 0];
          // } else {
          return [0, 98, 175, 255 * 0.75];
          // }
        } else {
          //for unselected info(filter)
          // if (hov === obj.properties.nf_id) {
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
