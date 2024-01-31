import "./LandingPage.css";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DeckGL, { MVTLayer } from "deck.gl";
import { Map } from "react-map-gl"; //MapProvider
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import useInfo from "../hooks/use-info";
import useColor from "../hooks/use-color";
import useTooltip from "../hooks/use-tooltip";
import LeftBar from "../components/LeftBar";
import Region from "../components/Region";
import Basemap from "../components/Basemap";
import Landbase from "../components/Landbase";
import Controls from "../components/Controls";
import useQuery from "../hooks/use-query";
import axios from "axios";
import RightBar from "../components/RightBar";
// import axios from "axios"; // Import Axios here
// import Pbf from "pbf";
// import { VectorTile } from "@mapbox/vector-tile";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsbTYwaHVoazJ1ZHgza3M2ZWJpYXdueXQifQ.vg0BobV69pbNLJdKAv856Q";

// const MAP_STYLE = "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"; //lowz in the layer
// const MAP_STYLE = "mapbox://styles/redsilver522/clm61py9g00i301of6dv76f2e"; //lowz in the style

const INITIAL_VIEW_STATE = {
  longitude: 127.25161672437677,
  latitude: 35.86497806027222,
  zoom: 6.0,
  bearing: 0,
  pitch: 0,
};

function LandingPage() {
  const { isFilter, info, length, data, region, LD, setLD, setLength, istgl } =
    useInfo();
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [renL, setRenL] = useState(<div className="lengthSum">REQ</div>);
  const { getTooltip } = useTooltip();
  const { getRoadColor } = useColor();
  const { queryF } = useQuery();

  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn"
  );
  // AUXILIARY -----------------------------------------------
  const handleLength = useCallback(async () => {
    setLD(true);
    const query = queryF();
    console.log("query from LandingPage.js:", "\n", query);
    const response = await axios.get(
      `http://localhost:4000/getLength/${query}` //  /getLength/${query}
    );
    setLength(Math.round(response.data / 1000));
    setLD(false);
  }, [setLD, queryF, setLength]);

  //LAYER ---------------------------------------------------
  const layer2 = useMemo(() => {
    return new MVTLayer({
      id: "mvt-layer2",
      data,
      // data: `https://api.mapbox.com/v4/redsilver522.blb67rex/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
      // data: `https://api.mapbox.com/v4/redsilver522.nationalroad/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
      // data: `https://tiles-sideroad.s3.ap-northeast-2.amazonaws.com/tiles_ext2/{z}/{x}/{y}.pbf`,
      // lineWidthScale: 20,
      lineWidthMinPixels: view.zoom <= 8 ? 3 : 1,
      lineWidthMaxPixels: view.zoom < 14 ? 2 : view.zoom < 17 ? 5 : 10,
      getLineWidth: 500,
      pickable: true,
      visible: isFilter && view.zoom >= 6 && view.zoom <= 20,
      getLineColor: (d) => {
        return getRoadColor(d);
      },
      onClick: (d) => console.log(d.object.properties),
      updateTriggers: {
        getLineColor: [info, region],
      },
    });
  }, [data, view.zoom, isFilter, info, getRoadColor, region]);
  const layers = [layer2];
  // RENDER ITEMS ------------------------------------------------
  useEffect(() => {
    if (length) {
      setRenL(
        <div className="lengthSum">
          선택구간 연장 <span>{length}</span> km
        </div>
      );
    } else {
      return;
    }
  }, [length]);
  useEffect(() => {
    setRenL(
      <div className="lengthSum lengthReq" onClick={handleLength}>
        선택구간 연장 쿼리요청
      </div>
    );
  }, [region, handleLength, info]);
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
      <RightBar />
      <div className="container">
        <Region setView={setView} />
        <Landbase basemap={basemap} setBasemap={setBasemap} />
        <Basemap basemap={basemap} setBasemap={setBasemap} />
        <Controls
          view={view}
          setView={setView}
          INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        />
        {istgl && legend}
        <div className="zoom">
          줌 <span>{view ? view.zoom.toFixed(2) : "no view yet"}</span>
        </div>
        {renL}
        {/* <div className="lengthSum">
          선택구간 연장 <span>{length ? length : 0}</span> km
        </div> */}

        <DeckGL
          initialViewState={view}
          onViewStateChange={({ viewState }) => setView(viewState)}
          controller={true}
          layers={layers}
          getTooltip={getTooltip}
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
