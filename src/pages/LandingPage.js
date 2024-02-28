import "./LandingPage.css";
import React, { useEffect, useMemo, useState } from "react";
import DeckGL, { MVTLayer } from "deck.gl";
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
// import useQuery from "../hooks/use-query";
// import axios from "axios";
import RightBar from "../components/bars/RightBar";
// import axios from "axios"; // Import Axios here
// import Pbf from "pbf";
// import { VectorTile } from "@mapbox/vector-tile";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsbTYwaHVoazJ1ZHgza3M2ZWJpYXdueXQifQ.vg0BobV69pbNLJdKAv856Q";

// const MAP_STYLE = "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"; //lowz in the layer
// const MAP_STYLE = "mapbox://styles/redsilver522/clm61py9g00i301of6dv76f2e"; //lowz in the style

function LandingPage() {
  const {
    view,
    setView,
    isFilter,
    info,
    // length,
    data,
    region,
    LD,
    // setLD,
    setLength,
    istgl,
    right,
    pick,
    setPick,
    hov,
    rnfo,
    // geoJ,
    // setHov,
    setPnfo,
  } = useInfo();

  // const [renL, setRenL] = useState(<div className="lengthSum">REQ</div>);
  const { getTooltip } = useTooltip();
  const { getRoadColor } = useColor();
  // const { queryF } = useQuery();

  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn"
  );
  // AUXILIARY -----------------------------------------------
  // const handleLength = useCallback(async () => {
  //   setLD(true);
  //   const query = queryF();
  //   console.log("query from LandingPage.js:", "\n", query);
  //   const response = await axios.get(
  //     `http://localhost:4000/getLength/${query}` //  /getLength/${query}
  //   );
  //   console.log("response from LandingPage.js:", "\n", response);
  //   setLength(Math.round(response.data / 1000));
  //   setLD(false);
  // }, [setLD, queryF, setLength]);

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
      getRadius: 0,
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
  const layers = [layer1]; //layer2
  // RENDER ITEMS ------------------------------------------------
  useEffect(() => {
    setPick(null);
  }, [setPick, region, info, rnfo]);
  // useEffect(() => {
  //   if (view.zoom < 16) {
  //     setHov(null);
  //   }
  // }, [view.zoom, setHov]);
  // useEffect(() => {
  //   if (length || length === 0) {
  //     setRenL(
  //       <div className="lengthSum">
  //         선택구간 연장 <span>{length}</span> km
  //       </div>
  //     );
  //   } else {
  //     return;
  //   }
  // }, [length]);
  // useEffect(() => {
  //   setRenL(
  //     <div className="lengthSum lengthReq" onClick={handleLength}>
  //       선택구간 연장 쿼리요청
  //     </div>
  //   );
  // }, [region, handleLength, info]);
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
        {/* <div className="zoom">
          줌 <span>{view ? view.zoom.toFixed(2) : "no view yet"}</span>
        </div> */}
        {/* {renL} */}
        {/* <div className="lengthSum">
          선택구간 연장 <span>{length ? length : 0}</span> km
        </div> */}

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
          <Map mapStyle={basemap} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
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
