import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useInfo from '../../hooks/use-info';
import useTooltip from '../../hooks/use-tooltip';
import useColor from '../../hooks/use-color';
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

const Deck = React.memo(({ basemap }) => {
  // setup ----------------------------------------------------------------------
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsbTYwaHVoazJ1ZHgza3M2ZWJpYXdueXQifQ.vg0BobV69pbNLJdKAv856Q';
  const {
    isFilter,
    setLength,
    pick,
    hov,
    setPnfo,
    info,
    setPick,
    rnfo,
    scrn,
    setLeft,
    setRight,
    ldcuid,
    setLD,
    bar,
  } = useInfo();
  const { getTooltip, getTooltip2 } = useTooltip();
  const { getRoadColor } = useColor();
  const view = useViewState();
  const setView = useViewUpdate();
  const [sdgjs, setSdgjs] = useState(null);
  const [tile, setTile] = useState(null);
  const [sgggjs, setSgggjs] = useState(null);
  const { getLdc } = useDb();

  // useeffect ----------------------------------------------------------------------
  // useEffect(() => {
  //   const getsdgjs = async () => {
  //     // console.log('getgjs called at deck');
  //     setLD(true);
  //     const res = await axios.get('http://localhost:4000/getSidogjs');
  //     // console.log('getgjsgetgjsgetgjsdonedonedonedone');
  //     setSdgjs(res.data);
  //     setLD(false);
  //   };
  //   getsdgjs();
  // }, [setLD]);

  useEffect(() => {
    const getsdgjs = async () => {
      try {
        setLD(true);
        const res = await axios.get('http://localhost:4000/getSidogjs');
        setSdgjs(res.data);
        setLD(false);
      } catch (e) {
        console.error('err getsdgjs:\n', e);
      }
    };
    const getsgggjs = async () => {
      try {
        setLD(true);
        const res = await axios.get('http://localhost:4000/getSgggjs');
        setSgggjs(res.data);
        setLD(false);
      } catch (e) {
        console.error('Failed to get sggGjs:\n', e);
      }
    };
    if (!sdgjs & (view.zoom < 8)) {
      getsdgjs();
    }
    if (!sgggjs & (view.zoom >= 8)) {
      getsgggjs();
    }
    if (!tile & (view.zoom >= 11)) {
      setTile(
        `https://api.mapbox.com/v4/redsilver522.59bd8ljy/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
    }
  }, [view, sdgjs, sgggjs, tile, bar, setLD]);

  const handleViewStateChange = useCallback(
    ({ viewState }) => {
      setView(viewState);

      // if (!sgggjs && (bar === 1) & (viewState.zoom >= 8)) {
      //   getsgggjs();
      // }

      // if (!tile && (bar === 2 || bar === 3) && viewState.zoom >= 10.5) {
      //   setTile(
      //     `https://api.mapbox.com/v4/redsilver522.59bd8ljy/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`
      //   );
      // }
    },
    [setView]
  );

  // const handleViewStateChange = useCallback(
  //   ({ viewState }) => {
  //     setView(viewState);
  //     if (!sgggjs && view.zoom > 9) {
  //       getsgggjs();
  //     }
  //   },
  //   [setView,getsgggjs,sgggjs,view.zoom]
  // );

  // layer ----------------------------------------------------------------------
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
      console.log('sgggjs picked and d: \n', d.object.properties);
      const ldc = d.object.properties.sig_cd;
      await getLdc(ldc);
      // console.log(res);
    },
    // visible: isFilter,
    visible: !(bar === 3) && isFilter && view.zoom >= 8 && view.zoom < 11,
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
        data: sdgjs && sdgjs,
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
        visible: !(bar === 3) && isFilter && view.zoom < 8,
        updateTriggers: {
          getLineColor: [ldcuid],
          getFillColor: [ldcuid], // Add this line to update color when ldcuid changes
        },
      })
    );
  }, [bar, getLdc, isFilter, ldcuid, sdgjs, view.zoom]);
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
        getPointRadius: 0, //getRadius
        // (obj) => {
        //   return obj.properties.NF_ID && hov === obj.properties.NF_ID ? 10 : 6;
        // },
        pickable: true,
        visible: !(bar === 3) && isFilter && view.zoom >= 11 && view.zoom <= 20,
        getLineColor: (obj) => {
          return getRoadColor(obj);
        },
        onClick:
          view.zoom > 15
            ? (d) => {
                const prp = d.object.properties;
                setPick(prp.NF_ID);
                setView((prev) => ({
                  ...prev,
                  longitude: d.coordinate[0],
                  latitude: d.coordinate[1],
                }));
                console.log(prp);
                setPnfo({
                  road_se: prp.ROAD_SE,
                  cartrk_co: prp.CARTRK_CO,
                  road_bt: prp.ROAD_BT,
                  pmtr_se: prp.PMTR_SE,
                  osps_se: prp.OSPS_SE,
                  road_lt: prp.ROAD_LT,
                  slope_lg: prp.SLOPE_LG,
                  sdwk_se: prp.SDWK_SE,
                  rdnet_ac: prp.RDNET_AC,
                  pbuld_fa: prp.PBULD_FA,
                  bulde_de: prp.BULDE_DE,
                  pubtr_ac: prp.PUBTR_AC,
                  stair_at: prp.STAIR_AT,
                  edennc_at: prp.EDENNC_AT,
                  pedac_rk: prp.PEDAC_RK,
                  crime_rk: prp.CRIME_RK,
                  flood_rk: prp.FLOOD_RK,
                  crwdac_rk: prp.CRWDAC_RK,
                  fallac_rk: prp.FALLAC_RK,
                });
                setRight(true);
              }
            : null,
        // onHover:
        //   view.zoom > 15
        //     ? (d) => {
        //         d.object ? setHov(d.object.properties.NF_ID) : setHov(null);
        //       }
        //     : null,
        updateTriggers: {
          getLineColor: [info, ldcuid, pick, hov, rnfo],
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
    setView,
    rnfo,
    setPnfo,
    setRight,
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

  // const landuse = useMemo(() => {
  //   return (
  //     istgl &&
  //     new MVTLayer({
  //       id: "landuselayer",
  //       data: `https://api.mapbox.com/v4/redsilver522.lu_mim/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //       getLineColor: [255, 255, 255],
  //       getFillColor: (obj) => {
  //         switch (obj.properties.LANDUSE1) {
  //           case "UQA1":
  //             return [227, 224, 105, 114.75]; //255*0.45
  //           case "UQA2":
  //             return [238, 184, 152, 114.75];
  //           case "UQA3":
  //             return [176, 197, 218, 114.75];
  //           case "UQA4":
  //             return [190, 211, 140, 114.75];
  //           default:
  //             return [184, 184, 184, 114.75];
  //         }
  //       },
  //     })
  //   );
  // }, [istgl]);

  const layers = [baselayer, layer3, layer2, layer1]; // landuse

  // tooltip ----------------------------------------------------------------------
  const renderTooltip = ({ object }) => {
    if (bar !== 1 && view.zoom >= 15) {
      return getTooltip({ object });
    } else if (bar === 1) {
      return getTooltip2({ object });
    }
  };

  // return ----------------------------------------------------------------------
  return (
    <DeckGL
      initialViewState={view}
      onViewStateChange={handleViewStateChange}
      // onViewStateChange={({ viewState }) => setView(viewState)}
      controller={true}
      layers={layers}
      getTooltip={renderTooltip}
      // getTooltip={view.zoom >= 15 ? getTooltip : getTooltip2}
      onClick={(event) => {
        if (!event.object) {
          setPick(null);
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
    </DeckGL>
  );
});

export default Deck;
