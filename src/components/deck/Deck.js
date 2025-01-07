import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useInfo from '../../hooks/use-info';
import useTooltip from '../../hooks/use-tooltip';
import useColor from '../../hooks/use-color';
import useColor2 from '../../hooks/use-color2';
import { Map } from 'react-map-gl';
import DeckGL, {
  MVTLayer,
  TileLayer,
  BitmapLayer,
  GeoJsonLayer,
} from 'deck.gl';
import { useViewState, useViewUpdate } from '../../context/view';
import axios from 'axios';
import useDb from '../../hooks/use-db';
// import { WebMercatorViewport } from '@deck.gl/core';
// import { debounce } from 'lodash';

const get_p_rad = (zoom) => {
  if (zoom < 12) {
    return 10;
  } else if (zoom < 13) {
    return 10;
  } else if (zoom < 14) {
    return 7;
  } else if (zoom < 15) {
    return 5;
  } else if (zoom < 16) {
    return 5;
  } else if (zoom < 17) {
    return 4;
  } else if (zoom < 18) {
    return 3;
  } else if (zoom < 19) {
    return 2;
  } else if (zoom < 20) {
    return 1;
  } else {
    return 0.7;
  }
};

const Deck = React.memo(({ basemap }) => {
  // setup ----------------------------------------------------------------------
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsbTYwaHVoazJ1ZHgza3M2ZWJpYXdueXQifQ.vg0BobV69pbNLJdKAv856Q';
  const {
    isFilter,
    setLength,
    pick,
    hov,
    info,
    setPick,
    rnfo0,
    rnfo1,
    scrn,
    setLeft,
    setRight,
    ldcuid,
    setLD,
    bar,
    pfrjs,
    checkedPfr,
    setPfrInfo,
    pfrPick,
    setPfrPick,
    pfrdata,
    pfrLegendCbx,
    setPfrdata,
  } = useInfo();
  const { getTooltip1, getTooltip2, getTooltip3, getTooltip6, getTooltip4_wb } =
    useTooltip();
  const { getRoadColor, getAccpColor } = useColor();
  const { getPfrLineColor, getPfrMultFacColor } = useColor2();
  const view = useViewState();
  const setView = useViewUpdate();
  const [sdgjs, setSdgjs] = useState(null);
  const [tile, setTile] = useState(null);
  const [tile2, setTile2] = useState(null);
  const [sgggjs, setSgggjs] = useState(null);
  const [hvid, setHvid] = useState(null);
  const { getLdc, getCord, getpfrjs } = useDb();

  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const getsdgjs = async () => {
      try {
        setLD(true);
        const res = await axios.get('/getSidogjs'); //http://localhost:4000
        setSdgjs(res.data);
        setLD(false);
      } catch (e) {
        console.error('err getsdgjs:\n', e);
      }
    };
    const getsgggjs = async () => {
      try {
        setLD(true);
        const res = await axios.get('/getSgggjs'); //http://localhost:4000
        setSgggjs(res.data);
        setLD(false);
      } catch (e) {
        console.error('Failed to get sggGjs:\n', e);
      }
    };
    // const getsidesmp = async () => {
    //   try {
    //     setLD(true);
    //     const res = await axios.get('/getSidesmp');
    //     setSidesmp(res.data);
    //     setLD(false);
    //   } catch (e) {
    //     console.error('err getsidesmp\n', e);
    //   }
    // };

    if (!sdgjs & (view.zoom < 8)) {
      getsdgjs();
    }
    if (!sgggjs & (view.zoom >= 8)) {
      getsgggjs();
    }
    if (!tile & (view.zoom >= 11)) {
      setTile(`https://n-streets.kr/tiles/data/side1r/{z}/{x}/{y}.pbf`);
      // setTile(
      //   `https://api.mapbox.com/v4/redsilver522.59bd8ljy/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`
      // );
    }
    // if (!sidesmp & (view.zoom >= 11)) {
    //   getsidesmp();
    // }
    if (!tile2 & (view.zoom >= 11)) {
      setTile2(`https://n-streets.kr/tiles/data/side_acc_p/{z}/{x}/{y}.pbf`);
    }
    if (view.zoom < 11) {
      setPick(null);
      // setPnfo(null);
    }
  }, [view.zoom, sdgjs, sgggjs, bar, tile, setLD, tile2, setPick, pfrjs]);

  useEffect(() => {
    const fetchPfrjs = async () => {
      if (!pfrjs) {
        await getpfrjs();
      }
    };

    fetchPfrjs();
  }, [ldcuid, pfrjs, getpfrjs]);

  useEffect(() => {
    setPfrdata((prev) => ({
      ...prev,
      parks: null,
      parks_buffer: null,
      ch_safe_zone: null,
      sn_safe_zone: null,
      multfac: null,
      multfac_entr: null,
      schl_bld: null,
      schl_buffer: null,
      schl_entr: null,
    }));
  }, [ldcuid, setPfrdata]);

  // useEffect(() => {
  //   const viewport = new WebMercatorViewport(view);
  //   const bbx = viewport.getBounds();

  //   const getSide1r = async (bbx) => {
  //     try {
  //       // setLD(true);
  //       const res = await axios.get(
  //         `/getSide1r/${bbx[0]}/${bbx[1]}/${bbx[2]}/${bbx[3]}`
  //       );
  //       setSide1r(res.data);
  //       console.log('getside1r\n', res.data);
  //       // setLD(false);
  //     } catch (e) {
  //       console.error('error getside1r\n', e);
  //     }
  //   };

  //   const fetchDebounced = debounce((bbx) => {
  //     if (view.zoom >= 20) {
  //       console.log('Debounced request triggered');
  //       getSide1r(bbx);
  //     }
  //   }, 50); // Adjust delay time in ms

  //   fetchDebounced(bbx);

  //   return () => {
  //     fetchDebounced.cancel(); // Clean up
  //   };
  // }, [view]);

  // handle ----------------------------------------------------------------------
  const handleViewStateChange = useCallback(
    ({ viewState }) => {
      setView(viewState);
    },
    [setView]
  );

  // layers ----------------------------------------------------------------------
  const layer13_wb = useMemo(() => {
    if (!pfrdata.schl_entr || !pfrdata.schl_entr.features || !ldcuid) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-schlentr',
      data: pfrdata.schl_entr,
      filled: true,
      stroked: true,
      lineWidthMaxPixels: 1,
      pointRadiusMinPixels: 4,
      pointRadiusMaxPixels: 10,
      getFillColor: [204, 204, 204, 224],
      getLineColor: [0, 0, 0, 128],
      pickable: true,
      onClick: (d) => {
        console.log('schlentr picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[2] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 15 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer12_wb = useMemo(() => {
    if (!pfrdata.schl_buffer || !pfrdata.schl_buffer.features || !ldcuid)
      return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-schlbuffer',
      data: pfrdata.schl_buffer,
      filled: true,
      stroked: true,
      getFillColor: [98, 213, 239, 16],
      getLineColor: [0, 0, 0, 16],
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (d) => {
        console.log('schlbuffer picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[2] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer11_wb = useMemo(() => {
    if (!pfrdata.schl_bld || !pfrdata.schl_bld.features || !ldcuid) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-schlbld',
      data: pfrdata.schl_bld,
      filled: true,
      stroked: true,
      getFillColor: [167, 233, 250],
      getLineColor: [0, 0, 0, 40],
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (d) => {
        console.log('schlbld picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[2] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer10_wb = useMemo(() => {
    if (!pfrdata.multfac_entr || !pfrdata.multfac_entr.features || !ldcuid)
      return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-multfac_entr',
      data: pfrdata.multfac_entr,
      filled: true,
      stroked: true,
      lineWidthMaxPixels: 1,
      pointRadiusMinPixels: 4,
      pointRadiusMaxPixels: 10,
      getFillColor: [204, 204, 204, 224],
      getLineColor: [0, 0, 0, 128],
      pickable: true,
      onClick: (d) => {
        console.log('multfac_entr picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[4] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 15 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer9_wb = useMemo(() => {
    if (!pfrdata.multfac || !pfrdata.multfac.features || !ldcuid) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-multfac',
      data: pfrdata.multfac,
      filled: true,
      stroked: true,
      getFillColor: (d) => {
        return getPfrMultFacColor(d);
      },
      getLineColor: [0, 0, 0, 32],
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (d) => {
        console.log('multfac picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[4] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [
    bar,
    isFilter,
    ldcuid,
    view.zoom,
    pfrdata,
    getPfrMultFacColor,
    pfrLegendCbx,
  ]);

  const layer8_wb = useMemo(() => {
    if (!pfrdata.sn_safe_zone || !pfrdata.sn_safe_zone.features || !ldcuid)
      return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-snsafezone',
      data: pfrdata.sn_safe_zone,
      getLineColor: [255, 196, 0],
      lineWidthMinPixels: view.zoom < 9 ? 3 : 2,
      lineWidthMaxPixels:
        view.zoom < 7
          ? 2
          : view.zoom < 9
          ? 3
          : view.zoom < 14
          ? 2
          : view.zoom < 15
          ? 3
          : 4,
      getLineWidth: (obj) => (obj.properties.id ? 7 : view.zoom < 15 ? 1 : 4),
      getPointRadius: 0,
      pickable: true,
      onClick: (d) => {
        console.log('sn_safe_zone picked and d: \n', d.object.properties);
      },
      visible: pfrLegendCbx[1] && bar === 3 && isFilter && view.zoom >= 11,
      // updateTriggers: {
      //   getLineColor: [ldcuid],
      // },
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer7_wb = useMemo(() => {
    if (!pfrdata.ch_safe_zone || !pfrdata.ch_safe_zone.features || !ldcuid)
      return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-chsafezone',
      data: pfrdata.ch_safe_zone,
      getLineColor: [255, 255, 117],
      lineWidthMinPixels: view.zoom < 9 ? 3 : 2,
      lineWidthMaxPixels:
        view.zoom < 7
          ? 2
          : view.zoom < 9
          ? 3
          : view.zoom < 14
          ? 2
          : view.zoom < 15
          ? 3
          : 4,
      getLineWidth: (obj) => (obj.properties.id ? 7 : view.zoom < 15 ? 1 : 4),
      getPointRadius: 0,
      pickable: true,
      onClick: (d) => {
        console.log('ch_safe_zone picked and d: \n', d.object.properties);
      },
      visible: pfrLegendCbx[0] && bar === 3 && isFilter && view.zoom >= 11,
      // updateTriggers: {
      //   getLineColor: [ldcuid],
      // },
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer6_wb = useMemo(() => {
    if (!pfrdata.parks_buffer || !pfrdata.parks_buffer.features || !ldcuid)
      return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-parksbuffer',
      data: pfrdata.parks_buffer,
      filled: true,
      stroked: true,
      getFillColor: [45, 196, 0, 16],
      getLineColor: [0, 0, 0, 16],
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (d) => {
        console.log('parks_buffer picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[3] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer5_wb = useMemo(() => {
    if (!pfrdata.parks || !pfrdata.parks.features || !ldcuid) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-parks',
      data: pfrdata.parks,
      filled: true,
      stroked: true,
      getFillColor: [128, 196, 142, 224],
      getLineColor: [80, 122, 88, 224],
      lineWidthMinPixels: 1,
      pickable: true,
      onClick: (d) => {
        console.log('pfr_parks picked and d: \n', d.object.properties);
      },
      visible:
        pfrLegendCbx[3] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx]);

  const layer4_wb = useMemo(() => {
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr',
      data: pfrjs && pfrjs,
      getLineColor: (d) => {
        return getPfrLineColor(d);
      },
      lineWidthMinPixels: view.zoom < 9 ? 3 : 2,
      lineWidthMaxPixels:
        view.zoom < 7
          ? 2
          : view.zoom < 9
          ? 3
          : view.zoom < 14
          ? 2
          : view.zoom < 15
          ? 3
          : 10,
      getLineWidth: (obj) => (obj.properties.id ? 7 : view.zoom < 15 ? 1 : 4),
      getPointRadius: 0,
      pickable: true,
      autoHighlight: true,
      highlightColor: [0, 98, 175, 255],
      onHover: (d) => getTooltip4_wb(d),
      onClick:
        view.zoom > 15
          ? (d) => {
              const g = d.object.geometry.coordinates;
              const length = Math.floor(g.length / 2);
              setPfrInfo(d.object.properties);
              setPfrPick(null);
              setView((prev) => ({
                ...prev,
                longitude: g[length][Math.floor(g[length].length / 2)][0],
                latitude: g[length][Math.floor(g[length].length / 2)][1],
              }));
              console.log('pfrjs picked and d: \n', d.object);
            }
          : null,
      visible: bar === 3 && isFilter && view.zoom >= 11,
      updateTriggers: {
        getLineColor: [ldcuid, checkedPfr],
      },
    });
  }, [
    bar,
    isFilter,
    ldcuid,
    pfrjs,
    view.zoom,
    checkedPfr,
    getPfrLineColor,
    setPfrInfo,
    setPfrPick,
    setView,
    getTooltip4_wb,
  ]);

  ////////////////////////////////////////////////////////////////
  const layer6 = useMemo(() => {
    return (
      tile2 &&
      new MVTLayer({
        binary: false,
        id: 'mvt-layer2',
        data: tile2,
        getPointRadius: get_p_rad(view.zoom),
        getFillColor: (obj) => getAccpColor(obj, hvid),
        stroked: false,
        pickable: true,
        visible: bar === 2 && isFilter && view.zoom >= 11 && view.zoom <= 20,
        // getLineColor: [255, 0, 0],
        // renderSubLayers: (props) => {
        //   return new GeoJsonLayer(props, {
        //     autoHighlight: true,
        //     highlightColor: [255, 0, 0, 180],
        //   });
        // },
        onClick:
          view.zoom > 15
            ? (d) => {
                const prp = d.object.properties;
                console.log(prp);
                setPick(prp.NF_ID);
                setView((prev) => ({
                  ...prev,
                  longitude: d.coordinate[0],
                  latitude: d.coordinate[1],
                }));
                // console.log(prp);
              }
            : null,
        onHover:
          view.zoom > 15
            ? (d) => {
                if (d.object) {
                  setHvid(d.object.properties.acdnt_no);
                } else {
                  setHvid(null);
                }
                getTooltip6(d);
              }
            : null,
        // onHover:
        //   view.zoom > 15
        //     ? (d) => {
        //         d.object ? setHov(d.object.properties.NF_ID) : setHov(null);
        //       }
        //     : null,
        updateTriggers: {
          getFillColor: [ldcuid, pick, hvid],
          // getLineColor: [ldcuid, pick],
        },
      })
    );
  }, [
    getAccpColor,
    bar,
    tile2,
    view.zoom,
    isFilter,
    ldcuid,
    pick,
    setPick,
    setView,
    getTooltip6,
    hvid,
  ]);

  // const layer5 = useMemo(() => {
  //   return (
  //     side1r &&
  //     new GeoJsonLayer({
  //       id: 'geojsonlayer-side1r2',
  //       data: side1r,
  //       // data: sdgjs,
  //       filled: true,
  //       stroked: true,
  //       lineWidthScale: 5,
  //       getLineColor: [255, 0, 0], // RGB for red
  //       getLineWidth: 1, // Line width in pixels
  //       autoHighlight: true,
  //       pickable: true,
  //       visible: view.zoom >= 20,
  //     })
  //   );
  // }, [side1r, view.zoom]);

  // const layer4 = new GeoJsonLayer({
  //   id: 'geojson-layer-sidesmp',
  //   data: sidesmp && sidesmp,
  //   // data: sdgjs,
  //   filled: true,
  //   stroked: true,
  //   getLineColor: [255, 0, 0],
  //   lineWidthMinPixels: 3,
  //   pickable: true,
  //   autoHighlight: true,
  //   // highlightColor: [0, 98, 175, 128],
  //   onClick: async (d) => {
  //     console.log('sidesmp picked and d: \n', d.object.properties);
  //   },
  //   // visible: isFilter,
  //   visible: true,
  // });

  const layer3 = new GeoJsonLayer({
    id: 'geojson-layer-sgg',
    data: sgggjs && sgggjs,
    // data: sdgjs,
    filled: true,
    stroked: true,
    getFillColor: (d) => {
      if (ldcuid) {
        if (d.properties.sig_cd === ldcuid[0]) {
          return [0, 98, 175, 128];
        }
      }
      return [169, 213, 232, 128]; // Default color
    },
    // getFillColor: [0, 0, 255, 128],
    getLineColor: [0, 0, 0, 20],
    lineWidthMinPixels: 1,
    pickable: true,
    autoHighlight: true,
    highlightColor: [0, 98, 175, 128],
    onClick: async (d) => {
      // console.log('sgggjs picked and d: \n', d.object.properties);
      const ldc = d.object.properties.sig_cd;
      await getLdc(ldc);
    },
    // visible: isFilter,
    onHover: (d) => getTooltip3(d),
    visible: isFilter && view.zoom >= 8 && view.zoom < 11,
    updateTriggers: {
      getLineColor: [ldcuid],
      getFillColor: [ldcuid], // Add this line to update color when ldcuid changes
    },
  });

  const layer2 = useMemo(() => {
    return (
      sdgjs &&
      new GeoJsonLayer({
        id: 'geojson-layer-sido',
        data: sdgjs,
        filled: true,
        stroked: true,
        getFillColor: (d) => {
          if (ldcuid) {
            if (d.properties.ctprvn_cd + '000' === ldcuid[0]) {
              return [0, 98, 175, 128];
            }
          }
          return [169, 213, 232, 128]; // Default color
        },
        getLineColor: [0, 0, 0, 20],
        lineWidthMinPixels: 1,
        pickable: true,
        autoHighlight: true,
        highlightColor: [0, 98, 175, 128],
        onClick: async (d) => {
          // console.log(
          //   'gjs picked and d: \n',
          //   d.object.properties.ctprvn_cd + '000'
          // );
          const ldc = d.object.properties.ctprvn_cd + '000';
          await getLdc(ldc);
        },
        onHover: (d) => getTooltip2(d),
        visible: isFilter && view.zoom < 8,
        updateTriggers: {
          getLineColor: [ldcuid],
          getFillColor: [ldcuid], // Add this line to update color when ldcuid changes
        },
      })
    );
  }, [getLdc, isFilter, ldcuid, sdgjs, view.zoom, getTooltip2]);

  // const layer2 = useMemo(() => {
  //   return (
  //     sdgjs &&
  //     new GeoJsonLayer({
  //       id: 'geojson-layer-sido',
  //       data: sdgjs && sdgjs,
  //       filled: true,
  //       stroked: true,

  //       getFillColor: [0, 0, 255, 128],
  //       getLineColor: [0, 0, 0, 20],
  //       lineWidthMinPixels: 1,
  //       pickable: true,
  //       autoHighlight: true,
  //       highlightColor: [0, 98, 175, 128],
  //       onClick: async (d) => {
  //         console.log(
  //           'gjs picked and d: \n',
  //           d.object.properties.ctprvn_cd + '000'
  //         );
  //         const ldc = d.object.properties.ctprvn_cd + '000';
  //         await getLdc(ldc);
  //       },
  //       visible: !(bar === 3) && isFilter && view.zoom < 8,
  //       updateTriggers: {
  //         getLineColor: [ldcuid],
  //       },
  //     })
  //   );
  // }, [bar, getLdc, isFilter, ldcuid, sdgjs, view.zoom]);

  const layer1 = useMemo(() => {
    return (
      tile &&
      new MVTLayer({
        id: 'mvt-layer1',
        data: tile,
        // lineWidthScale: 1,
        lineWidthMinPixels: view.zoom < 9 ? 3 : 2,
        lineWidthMaxPixels:
          view.zoom < 7
            ? 2
            : view.zoom < 9
            ? 3
            : view.zoom < 14
            ? 2
            : view.zoom < 15
            ? 3
            : 10,
        getLineWidth: (obj) =>
          obj.properties.NF_ID ? 7 : view.zoom < 15 ? 1 : 4,
        getPointRadius: 0,
        // (obj) => {
        //   return obj.properties.NF_ID && hov === obj.properties.NF_ID ? 10 : 6;
        // },
        pickable: true,
        visible: isFilter && view.zoom >= 11 && view.zoom <= 20,
        getLineColor: (obj) => {
          return getRoadColor(obj);
        },
        // renderSubLayers: (props) => {
        //   return new GeoJsonLayer(props, {
        //     autoHighlight: true,
        //     highlightColor: [255, 0, 0, 180],
        //   });
        // },
        // autoHighlight: true,
        onClick:
          view.zoom > 15 && bar !== 3
            ? (d) => {
                const prp = d.object.properties;
                console.log(prp);

                setPick(prp.NF_ID);
                // setView((prev) => ({
                //   ...prev,
                //   longitude: d.coordinate[0],
                //   latitude: d.coordinate[1],
                // }));
                getCord(prp.NF_ID);
                // setPnfo({
                //   road_se: prp.ROAD_SE,
                //   cartrk_co: prp.CARTRK_CO,
                //   road_bt: prp.ROAD_BT,
                //   pmtr_se: prp.PMTR_SE,
                //   osps_se: prp.OSPS_SE,
                //   road_lt: prp.ROAD_LT,
                //   slope_lg: prp.SLOPE_LG,
                //   sdwk_se: prp.SDWK_SE,
                //   rdnet_ac: prp.RDNET_AC,
                //   pbuld_fa: prp.PBULD_FA,
                //   bulde_de: prp.BULDE_DE,
                //   pubtr_ac: prp.PUBTR_AC,
                //   stair_at: prp.STAIR_AT,
                //   edennc_at: prp.EDENNC_AT,
                //   pedac_rk: prp.PEDAC_RK,
                //   pred: prp.PRED,
                //   aiw10kas: prp.aiw10kas,
                //   bus400s: prp.bus400s,
                //   mkden300s: prp.mkden300s,
                //   pbulddens: prp.pbulddens,
                //   rbulddens: prp.rbulddens,
                //   roadbts: prp.roadbts,
                //   roadlts: prp.roadlts,
                //   school300s: prp.school300s,
                //   slopelgs: prp.slopelgs,
                //   subway400s: prp.subway400s,
                // });
                setRight(true);
              }
            : null,
        onHover:
          view.zoom > 15
            ? (d) => {
                // if (d.object) {
                //   // hovered
                //   // console.log('hoveredId\n', d.object.properties.NF_ID);
                //   setHvid(d.object.properties.NF_ID);
                // } else {
                //   // out of hovering
                //   setHvid(null);
                // }

                getTooltip1(d);

                // if (d.object) {
                //   const prp = d.object.properties;
                //   console.log(prp);
                //   if (prp.NF_ID) {
                //     // setPick(prp.NF_ID);
                //     // setPnfo({
                //     //   road_se: prp.ROAD_SE,
                //     //   cartrk_co: prp.CARTRK_CO,
                //     //   road_bt: prp.ROAD_BT,
                //     //   pmtr_se: prp.PMTR_SE,
                //     //   osps_se: prp.OSPS_SE,
                //     //   road_lt: prp.ROAD_LT,
                //     //   slope_lg: prp.SLOPE_LG,
                //     //   sdwk_se: prp.SDWK_SE,
                //     //   rdnet_ac: prp.RDNET_AC,
                //     //   pbuld_fa: prp.PBULD_FA,
                //     //   bulde_de: prp.BULDE_DE,
                //     //   pubtr_ac: prp.PUBTR_AC,
                //     //   stair_at: prp.STAIR_AT,
                //     //   edennc_at: prp.EDENNC_AT,
                //     //   pedac_rk: prp.PEDAC_RK,
                //     //   pred: prp.PRED,
                //     // });
                //     // setRight(true);
                //   }
                // } else {
                //   console.log('out');
                //   setPick(null);
                // }
              }
            : (d) =>
                (document.querySelector('.custom-tooltip').style.display =
                  'none'),

        // onHover:
        //   view.zoom > 15
        //     ? (d) => {
        //         d.object ? setHov(d.object.properties.NF_ID) : setHov(null);
        //       }
        //     : null,
        updateTriggers: {
          getLineColor: [info, ldcuid, pick, hov, rnfo0, rnfo1, pfrPick],
        },
      })
    );
  }, [
    bar,
    tile,
    view.zoom,
    isFilter,
    info,
    getRoadColor,
    ldcuid,
    pick,
    setPick,
    hov,
    rnfo0,
    rnfo1,
    setRight,
    getTooltip1,
    pfrPick,
    getCord,
  ]);

  const baselayer = useMemo(() => {
    return (
      !basemap &&
      new TileLayer({
        id: 'baselayer',
        data: 'https://api.vworld.kr/req/wmts/1.0.0/EE923334-C29E-3907-BCA8-15D3CF0A5B3B/Satellite/{z}/{y}/{x}.jpeg',
        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,
        renderSubLayers: (props) => {
          const {
            bbox: { west, south, east, north },
          } = props.tile;
          return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north],
            // visible: basemap ? false : true,
          });
        },
      })
    );
  }, [basemap]);

  const layers = [
    baselayer,
    //
    layer6_wb,
    layer5_wb,
    layer12_wb,
    layer11_wb,
    //
    layer1,
    layer6,
    layer2,
    layer3,
    //
    layer7_wb,
    layer8_wb,
    layer9_wb,
    layer10_wb,
    layer13_wb,
    layer4_wb,
    //
  ];

  // tooltip ----------------------------------------------------------------------
  // const renderTooltip = ({ object }) => {
  //   // console.log(object && object);
  //   if (view.zoom >= 15) {
  //     return getTooltip({ object });
  //   } else if (view.zoom <= 11) {
  //     return getTooltip2({ object });
  //   }
  // };

  // return ----------------------------------------------------------------------
  return (
    <DeckGL
      initialViewState={view}
      onViewStateChange={handleViewStateChange}
      // onViewStateChange={({ viewState }) => setView(viewState)}
      controller={true}
      layers={layers}
      // getTooltip={renderTooltip}
      // getTooltip={view.zoom >= 15 ? getTooltip : getTooltip2}
      onClick={(event) => {
        if (!event.object) {
          setPick(null);
          setPfrPick(null);
          setPfrInfo(null);
          setLength(null);
          if (scrn < 1015) {
            setRight(false);
            setLeft(false);
          }
        }
      }}
      // onHover={
      //   view.zoom >= 16
      //     ? (info) => {
      //         if (info.object) {
      //           setHov(info.object.properties.NF_ID)
      //         } else {
      //           setHov(null);
      //         }
      //       }
      //     : null
      // }
    >
      {basemap && (
        <Map mapStyle={basemap} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      )}
      <div className="custom-tooltip"></div>
    </DeckGL>
  );
});

export default Deck;
