import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import useInfo from '../../hooks/use-info';
import useTooltip from '../../hooks/use-tooltip';
import useColor from '../../hooks/use-color';
import useColor2 from '../../hooks/use-color2';
import iconsheet from '../../img/srv_spritesheet.png';
import { Map } from 'react-map-gl';
import DeckGL, {
  MVTLayer,
  TileLayer,
  BitmapLayer,
  GeoJsonLayer,
  IconLayer,
} from 'deck.gl';
import { useViewState, useViewUpdate } from '../../context/view';
import axios from 'axios';
import useDb from '../../hooks/use-db';
// import { WebMercatorViewport } from '@deck.gl/core';
// import { debounce } from 'lodash';
import { PathStyleExtension } from '@deck.gl/extensions';

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

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
  const {
    isFilter,
    setLength,
    pick,
    // hov,
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
    srvy,
    nfidlst,
    setNfidlst,
    setSrvyid,
    /////////////////////////////
    bufferData,
    setBufferData,
    srvdata,
    bffLegendCbx,
    bufferExp,
    setBufferExp,
  } = useInfo();
  const {
    getTooltip1,
    getTooltip2,
    getTooltip3,
    getTooltip6,
    getTooltip4_wb,
    getTooltip5_wb,
  } = useTooltip();
  const { getRoadColor, getAccpColor } = useColor();
  const { getPfrLineColor, getPfrMultFacColor, getSrvBldColor } = useColor2();
  const view = useViewState();
  const setView = useViewUpdate();
  const [sdgjs, setSdgjs] = useState(null);
  const [tile, setTile] = useState(null);
  const [tile2, setTile2] = useState(null);
  const [sgggjs, setSgggjs] = useState(null);
  const [hvid, setHvid] = useState(null);
  const { getMbkey, getLdc, getCord, getpfrjs } = useDb();

  // useeffect ----------------------------------------------------------------------
  const mapbox_token_ref = useRef(null);

  useEffect(() => {
    const getkey = async () => {
      try {
        const res = await getMbkey();
        mapbox_token_ref.current = res;
        // console.log('getmbkey:', mapbox_token_ref.current);
      } catch (e) {
        console.error('err deck useeffect:\n', e);
      }
    };
    getkey();
  }, [getMbkey]);
  useEffect(() => {
    const getsdgjs = async () => {
      try {
        // setLD(true);
        const res = await axios.get(`/getSidogjs`);
        setSdgjs(res.data);
        // setLD(false);
      } catch (e) {
        console.error('err getsdgjs:\n', e);
      }
    };
    const getsgggjs = async () => {
      try {
        // setLD(true);
        const res = await axios.get(`/getSgggjs`);
        setSgggjs(res.data);
        // setLD(false);
      } catch (e) {
        console.error('Failed to get sggGjs:\n', e);
      }
    };
    // const getsidesmp = async () => {
    //   try {
    //     setLD(true);
    //     const res = await axios.get(`/getSidesmp`);
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
    if (!tile) {
      setTile('https://d2df0jiv553vbg.cloudfront.net/tiles_v2/{z}/{x}/{y}.pbf');
      // setTile(`http://localhost:8008/{z}/{x}/{y}.pbf`);
      // setTile(`http://localhost:8080/data/side1r/{z}/{x}/{y}.pbf`);
      // setTile(`https://n-streets.kr/tiles/data/side1r/{z}/{x}/{y}.pbf`);
    }
    // if (!sidesmp & (view.zoom >= 11)) {
    //   getsidesmp();
    // }
    if (!tile2 & (view.zoom >= 11)) {
      setTile2(
        `https://d2df0jiv553vbg.cloudfront.net/tiles_acc_p/{z}/{x}/{y}.pbf`
      );
      // setTile2(`http://localhost:8080/data/side_acc_p/{z}/{x}/{y}.pbf`);
      // setTile2(`https://n-streets.kr/tiles/data/side_acc_p/{z}/{x}/{y}.pbf`);
    }
    if (view.zoom < 11) {
      setPick(null);
      // setPnfo(null);
    }
  }, [view.zoom, sdgjs, sgggjs, bar, tile, setLD, tile2, setPick, pfrjs]);

  useEffect(() => {
    const fetchPfrjs = async () => {
      if (bar === 3 && !pfrjs) {
        await getpfrjs();
      }
    };

    fetchPfrjs();
  }, [ldcuid, pfrjs, bar, getpfrjs]);

  useEffect(() => {
    if (bar !== 3) {
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
    }
    if (bar !== 4) {
      setBufferData([null, null]);
      setBufferExp(false);
    }
  }, [
    bar,
    srvy,
    ldcuid,
    setPfrdata,
    setBufferData,
    setNfidlst,
    setBufferExp,
    pfrPick,
  ]);

  useEffect(() => {
    if (srvy && nfidlst.length === 1) {
      getCord(nfidlst[0], false);
    }
  }, [srvy, nfidlst, getCord]);

  // useEffect(() => {
  //   setSrvy(false);
  // }, [ldcuid, setSrvy]);

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
  const iconLayer2 = useMemo(() => {
    if (!srvdata.crosswalk || !srvdata.crosswalk.features || !bufferExp) return;

    const ICON_MAPPING = {
      icon: { x: 0, y: 0, width: 144, height: 128, mask: false },
    };

    const iData = srvdata.crosswalk.features.map((feature) => ({
      properties: feature.properties,
      coordinates: feature.geometry.coordinates,
    }));

    return new IconLayer({
      id: 'geojson-layer-survey-crosswalkic',
      data: iData,
      iconAtlas: iconsheet,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'icon',
      getSize: 18,
      getPosition: (d) => {
        return d.coordinates;
      },
      pickable: true,
      autoHighlight: false,
      visible:
        bufferData[0] &&
        bffLegendCbx[3] &&
        bar === 4 &&
        isFilter &&
        view.zoom >= 15 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, view.zoom, srvdata, bufferData, bffLegendCbx, bufferExp]);

  // const layer20_wb = useMemo(() => {
  //   if (!srvdata.crosswalk || !srvdata.crosswalk.features || !ldcuid) return;
  //   return new GeoJsonLayer({
  //     id: "geojson-layer-survey-crosswalk",
  //     data: srvdata.crosswalk,
  //     filled: true,
  //     stroked: true,
  //     lineWidthMaxPixels: 1,
  //     pointRadiusMinPixels: 4,
  //     pointRadiusMaxPixels: 10,
  //     getFillColor: [245, 209, 92, 224],
  //     getLineColor: [0, 0, 0, 32],
  //     pickable: true,
  //     onClick: (d) => {
  //       console.log("survey-crosswalk picked and d: \n", d.object.properties);
  //     },
  //     visible:
  //       bufferData[0] &&
  //       bffLegendCbx[3] &&
  //       bar === 4 &&
  //       isFilter &&
  //       view.zoom >= 11 &&
  //       view.zoom <= 20,
  //   });
  // }, [bar, isFilter, ldcuid, view.zoom, srvdata, bufferData, bffLegendCbx]);

  const iconLayer1 = useMemo(() => {
    if (!srvdata.cctv || !srvdata.cctv.features || !bufferExp) return;

    const ICON_MAPPING = {
      icon: { x: 148, y: 0, width: 128, height: 128, mask: true },
    };

    const iData = srvdata.cctv.features.map((feature) => ({
      ...feature.properties,
      coordinates: feature.geometry.coordinates,
    }));

    return new IconLayer({
      id: 'geojson-layer-survey-cctv',
      data: iData,
      iconAtlas: iconsheet,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'icon',
      getSize: 30,
      getPosition: (d) => {
        const [lng, lat] = d.coordinates;
        return [lng + 0.000025, lat + 0.00002]; // 아이콘을 셀 중앙으로 정렬
      },
      pickable: true,
      autoHighlight: false,
      visible:
        bufferData[0] &&
        bffLegendCbx[2] &&
        bar === 4 &&
        isFilter &&
        view.zoom >= 15 &&
        view.zoom <= 20,
      getColor: [55, 55, 55],
    });
  }, [bar, isFilter, view.zoom, srvdata, bufferData, bffLegendCbx, bufferExp]);

  // const layer19_wb = useMemo(() => {
  //   if (!srvdata.cctv || !srvdata.cctv.features || !ldcuid) return;
  //   return new GeoJsonLayer({
  //     id: "geojson-layer-survey-cctv",
  //     data: srvdata.cctv,
  //     filled: true,
  //     stroked: true,
  //     lineWidthMaxPixels: 1,
  //     pointRadiusMinPixels: 4,
  //     pointRadiusMaxPixels: 10,
  //     getFillColor: [204, 204, 204, 224],
  //     getLineColor: [0, 0, 0, 32],
  //     pickable: true,
  //     onClick: (d) => {
  //       console.log("survey-cctv picked and d: \n", d.object.properties);
  //     },
  //     visible:
  //       bufferData[0] &&
  //       bffLegendCbx[2] &&
  //       bar === 4 &&
  //       isFilter &&
  //       view.zoom >= 11 &&
  //       view.zoom <= 20,
  //   });
  // }, [bar, isFilter, ldcuid, view.zoom, srvdata, bufferData, bffLegendCbx]);

  const layer18_wb = useMemo(() => {
    if (!srvdata.pedpath || !srvdata.pedpath.features || !bufferExp) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-survey-pedpath',
      data: srvdata.pedpath,
      filled: true,
      stroked: true,
      getFillColor: [245, 167, 167],
      getLineColor: [245, 167, 167, 128],
      lineWidthMaxPixels: 2,
      pickable: true,
      visible:
        bufferData[0] &&
        bffLegendCbx[4] &&
        bar === 4 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, view.zoom, srvdata, bufferData, bffLegendCbx, bufferExp]);

  const layer17_wb = useMemo(() => {
    if (!srvdata.rodway || !srvdata.rodway.features || !bufferExp) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-survey-rodway',
      data: srvdata.rodway,
      filled: true,
      stroked: true,
      getFillColor: [153, 153, 153],
      getLineColor: [153, 153, 153, 128],
      lineWidthMaxPixels: 1,
      pickable: true,
      visible:
        bufferData[0] &&
        bffLegendCbx[5] &&
        bar === 4 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, view.zoom, srvdata, bufferData, bffLegendCbx, bufferExp]);

  const layer16_wb = useMemo(() => {
    if (!srvdata.bld || !srvdata.bld.features || !bufferExp) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-survey-bld',
      data: srvdata.bld,
      filled: true,
      stroked: true,
      getFillColor: (d) => {
        return getSrvBldColor(d);
      },
      getLineColor: [0, 0, 0, 64],
      lineWidthMaxPixels: 1,
      pickable: true,
      onClick: (d) => {
        // console.log('survey-bld picked and d: \n', d.object.properties);
      },
      onHover: (d) => getTooltip5_wb(d),
      visible:
        bufferData[0] &&
        bffLegendCbx[0] &&
        bar === 4 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [
    bar,
    isFilter,
    view.zoom,
    srvdata,
    bufferData,
    getSrvBldColor,
    bffLegendCbx,
    bufferExp,
    getTooltip5_wb,
  ]);

  const layer15_wb = useMemo(() => {
    if (!bufferExp) return;

    return new GeoJsonLayer({
      id: 'geojson-layer-survey-buffer-mask',
      data: bufferData && bufferData[1],
      filled: true,
      stroked: true,
      getFillColor: [255, 255, 255, 128],
      getLineColor: [0, 0, 0, 0],
      lineWidthMaxPixels: 1,
      pickable: true,
      // onClick: (d) => {
      //   console.log("survey-buffer-mask picked and d: \n", d.object.properties);
      // },
      visible:
        srvy && bar === 4 && isFilter && view.zoom >= 15 && view.zoom <= 20,
    });
  }, [bar, isFilter, view.zoom, bufferData, srvy, bufferExp]);

  const layer14_wb = useMemo(() => {
    if (!bufferExp) return;

    return new GeoJsonLayer({
      id: 'geojson-layer-survey-buffer',
      data: bufferData && bufferData[0],
      filled: true,
      stroked: true,
      getFillColor: [255, 255, 255, 0],
      getLineColor: [104, 104, 104, 128],
      lineWidthMaxPixels: 1,
      pickable: false,
      // onClick: (d) => {
      //   console.log("survey-buffer picked and d: \n", d.object.properties);
      // },
      extensions: [new PathStyleExtension({ dash: true })],
      getDashArray: [7, 5],
      dashJustified: true,
      dashGapPickable: true,
      visible:
        srvy && bar === 4 && isFilter && view.zoom >= 11 && view.zoom <= 20,
    });
  }, [bar, isFilter, view.zoom, bufferData, srvy, bufferExp]);

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
      visible:
        pfrPick &&
        pfrLegendCbx[2] &&
        bar === 3 &&
        isFilter &&
        view.zoom >= 11 &&
        view.zoom <= 20,
    });
  }, [bar, isFilter, ldcuid, view.zoom, pfrdata, pfrLegendCbx, pfrPick]);

  const layer11_wb = useMemo(() => {
    if (!pfrdata.schl_bld || !pfrdata.schl_bld.features || !ldcuid) return;
    return new GeoJsonLayer({
      id: 'geojson-layer-pfr-schlbld',
      data: pfrdata.schl_bld,
      filled: true,
      stroked: true,
      getFillColor: [167, 233, 250],
      getLineColor: [0, 0, 0, 40],
      lineWidthMaxPixels: 2,
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
      lineWidthMaxPixels: 2,
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
      lineWidthMaxPixels: 1,
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
              setPick(null);
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
    setPick,
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
        getPointRadius: srvy ? get_p_rad(view.zoom) / 2 : get_p_rad(view.zoom),
        getFillColor: (obj) => getAccpColor(obj, hvid),
        stroked: false,
        pickable: true,
        visible:
          (bar === 2 || bar === 3 || (bar === 4 && bffLegendCbx[1])) &&
          isFilter &&
          view.zoom >= 11 &&
          view.zoom <= 20,
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
                console.log('layer6 prop:', prp);
                setView((prev) => ({
                  ...prev,
                  longitude: d.coordinate[0],
                  latitude: d.coordinate[1],
                }));
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
        //         d.object ? setHov(d.object.properties.nf_id) : setHov(null);
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
    setView,
    getTooltip6,
    hvid,
    bffLegendCbx,
    srvy,
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
    visible:
      isFilter && bar !== 0 && !ldcuid && view.zoom >= 8 && view.zoom < 11,
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
          console.log(
            'gjs picked and d: \n',
            d.object.properties.ctprvn_cd + '000'
          );
          const ldc = d.object.properties.ctprvn_cd + '000';
          await getLdc(ldc);
        },
        onHover: (d) => getTooltip2(d),
        visible: isFilter && bar !== 0 && !ldcuid && view.zoom < 8,
        updateTriggers: {
          getLineColor: [ldcuid],
          getFillColor: [ldcuid], // Add this line to update color when ldcuid changes
        },
      })
    );
  }, [getLdc, isFilter, ldcuid, sdgjs, view.zoom, getTooltip2, bar]);

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

  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // const [hoveredObject, setHoveredObject] = useState(null);

  // const layer1 = useMemo(() => {
  //   return (
  //     tile &&
  //     new MVTLayer({
  //       id: 'mvt-layer1',
  //       data: tile,
  //       pickable: true,
  //       visible: isFilter && ldcuid ? true : view.zoom >= 11 && view.zoom <= 20,
  //       getLineColor: (obj) => getRoadColor(obj), // No hover logic here
  //       onClick: (d) => {
  //         console.log('d object:', d.object);
  //       },
  //       onHover:
  //         view.zoom > 15
  //           ? (d) => {
  //               setHoveredObject(d.object);
  //               getTooltip1(d);
  //             }
  //           : (d) => {
  //               setHoveredObject(null);
  //               // ...
  //             },
  //     })
  //   );
  // }, [
  //   bar,
  //   tile,
  //   view.zoom,
  //   isFilter,
  //   info,
  //   getRoadColor,
  //   ldcuid,
  //   pick,
  //   setPick,
  //   rnfo0,
  //   rnfo1,
  //   setRight,
  //   getTooltip1,
  //   pfrPick,
  //   getCord,
  //   srvy,
  //   nfidlst,
  //   setNfidlst,
  //   bufferExp,
  //   setSrvyid,
  // ]);

  // const highlightLayer = useMemo(() => {
  //   return (
  //     hoveredObject &&
  //     new GeoJsonLayer({
  //       id: 'highlight-layer',
  //       data: [hoveredObject], // Only the hovered feature
  //       getLineColor: [255, 255, 0, 255],
  //       getLineWidth: 1,
  //       pickable: false, // Don't interfere with main layer
  //     })
  //   );
  // }, [hoveredObject]);

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
          obj.properties.nf_id ? 7 : view.zoom < 15 ? 1 : 4,
        getPointRadius: 0,
        // (obj) => {
        //   return obj.properties.nf_id && hov === obj.properties.nf_id ? 10 : 6;
        // },
        pickable: true,
        visible: isFilter && ldcuid ? true : view.zoom >= 11 && view.zoom <= 20,
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
        autoHighlight: true,
        highlightColor: [255, 255, 0, 128],
        onClick:
          view.zoom > 15 && bar !== 3 && !bufferExp
            ? (d) => {
                const prp = d.object.properties;
                console.log('layer1 prop', prp);
                /////////////////////////////////////
                if (srvy) {
                  setSrvyid(null);
                  setNfidlst((prev) => {
                    if (prev.includes(prp.nf_id)) {
                      return prev.filter((id) => id !== prp.nf_id);
                    } else {
                      return [...prev, prp.nf_id];
                    }
                  });
                }
                /////////////////////////////////////
                else {
                  setPick(prp.nf_id);
                  getCord(prp.nf_id, true);
                  setRight(true);
                }
              }
            : null,
        onHover:
          view.zoom > 15
            ? (d) => {
                getTooltip1(d);
              }
            : (d) =>
                (document.querySelector('.custom-tooltip').style.display =
                  'none'),
        updateTriggers: {
          getLineColor: [
            info,
            ldcuid,
            pick,
            // hov,
            rnfo0,
            rnfo1,
            pfrPick,
            srvy,
            nfidlst,
          ],
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
    // hov,
    rnfo0,
    rnfo1,
    setRight,
    getTooltip1,
    pfrPick,
    getCord,
    srvy,
    nfidlst,
    setNfidlst,
    bufferExp,
    setSrvyid,
  ]);

  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------
  // hover highlight logic test ----------------------------------------------------------------------

  const baselayer = useMemo(() => {
    return (
      !basemap &&
      new TileLayer({
        id: 'baselayer',
        data: 'https://api.vworld.kr/req/wmts/1.0.0/E3F693A4-0F13-3470-8014-5E7D0DA2A484/Satellite/{z}/{y}/{x}.jpeg',
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

  // const testpbflayer = useMemo(() => {
  //   return new MVTLayer({
  //     id: 'roads-layer',
  //     data: 'https://d2df0jiv553vbg.cloudfront.net/{z}/{x}/{y}.pbf',
  //     layerName: 'side1rndjson',
  //     getLineWidth: 2,
  //     lineWidthMinPixels: 1,
  //     getLineColor: [255, 0, 0, 255],
  //     pickable: true,
  //     visible: view.zoom >= 11 && view.zoom <= 19.4,
  //     onClick: (info) => console.log(info),
  //   });
  // }, [view.zoom]);

  const layers = [
    baselayer,
    //
    layer6_wb,
    layer12_wb,
    //

    // layer6,
    layer2,
    layer3,
    //
    layer5_wb,
    layer11_wb,
    layer7_wb,
    layer8_wb,
    layer9_wb,
    layer10_wb,
    layer13_wb,
    layer4_wb,
    //
    layer17_wb,
    layer15_wb,
    layer14_wb,
    layer16_wb,
    layer18_wb,
    // layer20_wb,
    iconLayer2,
    // layer19_wb,
    iconLayer1,
    layer1,
    // highlightLayer,
    layer6,
    // testpbflayer,
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
      controller={{
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        maxZoom: 19.4,
        minZoom: 4,
      }}
      // controller={true}
      layers={layers}
      // getTooltip={renderTooltip}
      // getTooltip={view.zoom >= 15 ? getTooltip : getTooltip2}
      onClick={(event) => {
        if (!event.object) {
          if (!srvy) {
            setPick(null);
            setPfrPick(null);
            setNfidlst([]);
            setLength(null);
          }
          setPfrInfo(null);
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
      //           setHov(info.object.properties.nf_id)
      //         } else {
      //           setHov(null);
      //         }
      //       }
      //     : null
      // }
    >
      {basemap && mapbox_token_ref.current && (
        <Map
          mapStyle={basemap}
          mapboxAccessToken={mapbox_token_ref.current}
          minZoom={4}
          maxZoom={19.4}
        />
      )}
      <div className="custom-tooltip"></div>
    </DeckGL>
  );
});

export default Deck;
