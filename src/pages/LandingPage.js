import "./LandingPage.css";
import React, { useMemo, useState, useEffect } from "react";
import DeckGL, { MVTLayer } from "deck.gl";
import { Map } from "react-map-gl"; //MapProvider
// import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import useInfo from "../hooks/use-info";
import useTooltip from "../hooks/use-tooltip";
import { GiExpand } from "react-icons/gi";
import LeftBar from "../components/LeftBar";
import useColor from "../hooks/use-color";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";

// const MAP_STYLE = "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"; //lowz in the layer
// const MAP_STYLE = "mapbox://styles/redsilver522/clm61py9g00i301of6dv76f2e"; //lowz in the style

const INITIAL_VIEW_STATE = {
  longitude: 127.25161672437677,
  latitude: 35.86497806027222,
  zoom: 6.620000000000002,
  bearing: 0,
  pitch: 0,
};
function LandingPage() {
  const { isFilter, setIsFilter, info, depth1, length, data, setLength } =
    useInfo();
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const { getTooltip } = useTooltip();
  const { getRoadColor, getLength } = useColor();
  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"
  );
  //auxiliary funcs////////////////////////////////////////
  const handleMap = () => {
    const maps = [
      "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz",
      "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s",
      "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07",
    ];

    const currentIndex = maps.indexOf(basemap);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % maps.length;
      setBasemap(maps[nextIndex]);
      return;
    }
    setBasemap(basemap);
    return;
  };

  //layers//////////////////////////////////////////////
  const layer1 = useMemo(() => {
    if (depth1 !== "이면도로") {
      return new MVTLayer({
        id: "mvt-layer1",
        data: `https://api.mapbox.com/v4/redsilver522.lowz2/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
        lineWidthScale: 20,
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 15,
        visible: isFilter && view.zoom >= 6 && view.zoom <= 11,
        getLineColor: [230, 0, 60, 255 * 0.2],
        onClick: (d) => console.log(d.object.properties),
      });
    }
  }, [view.zoom, isFilter, depth1]); //lowz in the layer

  useEffect(() => {
    setLength(0);
  }, [info, setLength, view]);

  const layer2 = useMemo(() => {
    if (depth1 === "이면도로") {
      return new MVTLayer({
        id: "mvt-layer2",
        data,
        // data: `https://api.mapbox.com/v4/redsilver522.blb67rex/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
        // data: `https://api.mapbox.com/v4/redsilver522.nationalroad/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
        // data: `https://tiles-sideroad.s3.ap-northeast-2.amazonaws.com/tiles_ext2/{z}/{x}/{y}.pbf`,
        lineWidthScale: 20,
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 15,
        pickable: true,
        visible: isFilter && view.zoom >= 6 && view.zoom <= 20,
        getLineColor: (d) => {
          return getRoadColor(d);
        },
        onClick: (d) => console.log(d.object.properties),
        updateTriggers: {
          getLineColor: info,
        },
      });
    }
  }, [data, view.zoom, isFilter, info, getRoadColor, depth1]);
  const layers = [layer1, layer2];
  //render////////////////////////////////////
  return (
    <div className="testc">
      <LeftBar />
      <div className="container">
        <div className="toggle_button_div">
          <button
            className="toggle_button"
            onClick={() =>
              setView((prev) => {
                return {
                  ...prev,
                  zoom: prev.zoom < 20 ? prev.zoom + 1 : prev.zoom,
                };
              })
            }
          >
            +
          </button>
          <button
            className="toggle_button"
            onClick={() =>
              setView((prev) => ({
                ...prev,
                zoom: prev.zoom > 0.87 ? prev.zoom - 1 : prev.zoom,
              }))
            }
          >
            -
          </button>
          <button
            className="toggle_button"
            onClick={() => setView(INITIAL_VIEW_STATE)}
          >
            <GiExpand />
          </button>
          <button className="toggle_button" onClick={handleMap}>
            M
          </button>
          <button
            className="toggle_button"
            onClick={() => setIsFilter(!isFilter)}
          >
            F
          </button>
          <button
            className="toggle_button"
            onClick={() =>
              console.log(
                "view:",
                view,
                "info:",
                info,
                "depth1:",
                depth1,
                "length:",
                length
              )
            }
          >
            VS
          </button>
          <button className="toggle_button" onClick={getLength}>
            DT
          </button>
        </div>
        <div className="zoom">
          줌 <span>{view ? view.zoom.toFixed(2) : "no view yet"}</span>
        </div>
        <div className="lengthSum">
          선택구간 연장 <span>{length ? length / 1000 : 0}</span> km
        </div>

        <DeckGL
          initialViewState={view}
          onViewStateChange={({ viewState }) => setView(viewState)}
          controller={true}
          layers={layers}
          getTooltip={getTooltip}
        >
          <Map mapStyle={basemap} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div>
    </div>
  );
}

export default LandingPage;
