import "./LandingPage.css";
import React, { useEffect, useMemo, useState } from "react";
import DeckGL, { MVTLayer, TileLayer, BitmapLayer } from "deck.gl";
import { Map } from "react-map-gl"; //MapProvider
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import useInfo from "../hooks/use-info";
import useColor from "../hooks/use-color";
import useTooltip from "../hooks/use-tooltip";
import LeftBar from "../components/bars/LeftBar";
import Region from "../components/tools/Region";
import Basemap from "../components/bases/Basemap";
import Landbase from "../components/bases/Landbase";
import Controls from "../components/tools/Controls";
import RightBar from "../components/bars/RightBar";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsbTYwaHVoazJ1ZHgza3M2ZWJpYXdueXQifQ.vg0BobV69pbNLJdKAv856Q";

function LandingPage() {
  const {
    view,
    setView,
    isFilter,
    info,
    data,
    region,
    LD,
    setLength,
    istgl,
    right,
    pick,
    setPick,
    hov,
    rnfo,
    setPnfo,
  } = useInfo();
  const { getTooltip } = useTooltip();
  const { getRoadColor } = useColor();

  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn"
  );
  // AUXILIARY -----------------------------------------------
  //LAYER ---------------------------------------------------
  const layer1 = useMemo(() => {
    return new MVTLayer({
      id: "mvt-layer1",
      data,
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
      visible: isFilter && view.zoom >= 6 && view.zoom <= 20,
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
              // setLength(Math.round(prp.ROAD_LT * 1000) / 1000000);
            }
          : null,
      // onHover:
      //   view.zoom > 15
      //     ? (d) => {
      //         d.object ? setHov(d.object.properties.NF_ID) : setHov(null);
      //       }
      //     : null,
      updateTriggers: {
        getLineColor: [info, region, pick, hov, rnfo],
      },
    });
  }, [
    data,
    view.zoom,
    isFilter,
    info,
    getRoadColor,
    region,
    pick,
    setPick,
    hov,
    setView,
    rnfo,
    setPnfo,
  ]);
  // const layer2 = useMemo(() => {
  //   return new ScatterplotLayer({
  //     id: "layer2",
  //     data: geoJ,
  //     filled: true,
  //     // getFillColor: [160, 160, 180, 200],
  //     opacity: 1,
  //     stroked: true,
  //     filled: true,
  //     radiusScale: 1,
  //     // radiusMinPixels: 1,
  //     // radiusMaxPixels: 1,
  //     lineWidthMinPixels: 1,
  //     lineWidthMaxPixels: 10,
  //     getPosition: (d) => d.position,
  //     getRadius: 10,
  //     getFillColor: [255, 0, 0, 0],
  //     getLineColor: [255, 0, 0, 255 * 0.7],
  //     // pickable: true,
  //     // autoHighlight: true,
  //     // onClick: (d) => console.log(d.object),
  //   });
  // }, [geoJ]);

  const baselayer = useMemo(() => {
    return (
      !basemap &&
      new TileLayer({
        id: "baselayer",
        data: "http://api.vworld.kr/req/wmts/1.0.0/EE923334-C29E-3907-BCA8-15D3CF0A5B3B/Satellite/{z}/{y}/{x}.jpeg",
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

  const layers = [baselayer, layer1]; // landuse
  // RENDER ITEMS ------------------------------------------------
  useEffect(() => {
    setPick(null);
  }, [setPick, region, info, rnfo]);
  const legend = (
    <div className="landuse">
      <div className="g1">지도 범례</div>
      <div className="gitem g2">
        <div id="b1"></div>주거지역
      </div>
      <div className="gitem g3">
        <div id="b2"></div>공업지역
      </div>
      <div className="gitem g4">
        <div id="b3"></div>상업지역
      </div>
      <div className="gitem g5">
        <div id="b4"></div>녹지지역
      </div>
    </div>
  );
  // RENDER ------------------------------------------------------------
  return (
    <div className="testc">
      <LeftBar />
      {right && <RightBar />}
      <div className="container">
        <Region />
        <Landbase basemap={basemap} setBasemap={setBasemap} />
        <Basemap basemap={basemap} setBasemap={setBasemap} />
        <Controls />
        {istgl && legend}
        {/* <MapComponent view={view} /> */}
        <DeckGL
          initialViewState={view}
          onViewStateChange={({ viewState }) => setView(viewState)}
          controller={true}
          layers={layers}
          getTooltip={view.zoom >= 15 ? getTooltip : null}
          onClick={(event) => {
            if (!event.object) {
              setPick(null);
              setLength(null);
            }
          }}
          // onHover={
          //   view.zoom >= 16
          //     ? (info) => {
          //         if (info.object) {
          //           setHov(info.object.properties.NF_ID);
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

        {LD && (
          <div className="overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
