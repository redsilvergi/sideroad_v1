import "./LandingPage.css";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DeckGL, { MVTLayer } from "deck.gl";
import { Map } from "react-map-gl"; //MapProvider
// import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import useInfo from "../hooks/use-info";
import useColor from "../hooks/use-color";
import useTooltip from "../hooks/use-tooltip";
import LeftBar from "../components/LeftBar";
import Region from "../components/Region";
import Basemap from "../components/Basemap.";
import Controls from "../components/Controls";
import useQuery from "../hooks/use-query";
import axios from "axios";
// import axios from "axios"; // Import Axios here
// import Pbf from "pbf";
// import { VectorTile } from "@mapbox/vector-tile";

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
  const { isFilter, info, length, data, region, LD, setLD, setLength } =
    useInfo();
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [renL, setRenL] = useState(<div className="lengthSum">REQ</div>);
  const { getTooltip } = useTooltip();
  const { getRoadColor } = useColor();
  const { queryF } = useQuery();

  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"
  );
  // AUXILIARY -----------------------------------------------
  const handleLength = useCallback(async () => {
    setLD(true);
    const query = queryF();
    console.log("query from LandingPage.js:", "\n", query);
    const response = await axios.get(
      `http://localhost:4000/getLength/${query}`
    );
    setLength(Math.round(response.data / 1000));
    setLD(false);
  }, [setLD, queryF, setLength]);
  // const handleMap = () => {
  // setMapExp(!mapExp);
  // const maps = [
  //   "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz",
  //   "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s",
  //   "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07",
  // ];

  // const currentIndex = maps.indexOf(basemap);
  // if (currentIndex !== -1) {
  //   const nextIndex = (currentIndex + 1) % maps.length;
  //   setBasemap(maps[nextIndex]);
  //   return;
  // }
  // setBasemap(basemap);
  // return;
  // };
  //useEffect///////////////////////////////////////////
  // useEffect(() => {
  //   const fetchVectorTile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.mapbox.com/v4/redsilver522.genz1/0/0/0.vector.pbf?access_token=pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw`,
  //         {
  //           responseType: "arraybuffer", // Tell Axios to treat the response as an ArrayBuffer
  //         }
  //       );
  //       console.log(response);

  //       // if (!response.status === 200) {
  //       //   throw new Error("Network response was not ok");
  //       // }

  //       // const pbfdata = new Pbf(response.data);
  //       // const tile = new VectorTile(pbfdata);

  //       // // Access a specific layer (replace 'layerName' with the actual layer name)
  //       // const layer = tile.layers["genz1"];

  //       // // Iterate through features and access properties
  //       // for (let i = 0; i < layer.length; i++) {
  //       //   const feature = layer.feature(i);
  //       //   const properties = feature.properties;

  //       //   // Access specific properties as needed
  //       //   const roadName = properties.ROAD_NAME;
  //       //   console.log(roadName);
  //       // }
  //     } catch (error) {
  //       console.error("Error fetching or parsing vector tile data:", error);
  //       // console.error("Response status:", response.status); // Log th
  //     }
  //   };

  //   // Call the function to fetch and process the vector tile when the component mounts
  //   fetchVectorTile();
  // }, []);

  //layers//////////////////////////////////////////////
  // const layer1 = useMemo(() => {
  //   if (depth1 !== "이면도로") {
  //     return new MVTLayer({
  //       id: "mvt-layer1",
  //       data: `https://api.mapbox.com/v4/redsilver522.lowz2/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //       lineWidthScale: 20,
  //       lineWidthMinPixels: 1,
  //       lineWidthMaxPixels: 15,
  //       visible: isFilter && view.zoom >= 6 && view.zoom <= 11,
  //       getLineColor: [230, 0, 60, 255 * 0.2],
  //       onClick: (d) => console.log(d.object.properties),
  //     });
  //   }
  // }, [view.zoom, isFilter, depth1]); //lowz in the layer

  const layer2 = useMemo(() => {
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
  // RENDER ------------------------------------------------------------
  return (
    <div className="testc">
      <LeftBar />
      <div className="container">
        <Region />
        <Basemap basemap={basemap} setBasemap={setBasemap} />
        <Controls
          view={view}
          setView={setView}
          INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        />
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
