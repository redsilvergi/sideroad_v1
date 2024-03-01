// import React, { useEffect, useRef } from "react";
// import OLMap from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import XYZ from "ol/source/XYZ";
// import "ol/ol.css";
// import { fromLonLat } from "ol/proj";

// const MapComponent = ({ view }) => {
//   const mapElement = useRef(null);
//   const coord3857 = fromLonLat([view.longitude, view.latitude]);

//   useEffect(() => {
//     const map = new OLMap({
//       target: mapElement.current,
//       layers: [
//         new TileLayer({
//           source: new XYZ({
//             // url: "http://xdworld.vworld.kr:8080/2d/Base/202002/{z}/{x}/{y}.png",
//             // url: "https://map.vworld.kr/js/apis.do?type=Base&apiKey=EE923334-C29E-3907-BCA8-15D3CF0A5B3B", //https://map.vworld.kr/js/apis.do?type=Base&apiKey=EE923334-C29E-3907-BCA8-15D3CF0A5B3B
//             url: "http://api.vworld.kr/req/wmts/1.0.0/EE923334-C29E-3907-BCA8-15D3CF0A5B3B/Satellite/{z}/{y}/{x}.jpeg",
//           }),
//         }),
//       ],
//       view: new View({
//         center: [coord3857[0], coord3857[1]], // center: [14126669.41589247, 4493404.190498611],
//         // center: [view.longitude, view.latitude],
//         zoom: view.zoom + 1,
//         projection: "EPSG:3857",
//         // projection: "EPSG:4326",
//         minZoom: 7,
//         maxZoom: 19,
//       }),
//     });

//     return () => map.setTarget(null);
//   }, [view, coord3857]);

//   return (
//     <div ref={mapElement} style={{ height: "100vh" }}></div> //width: "100%",
//   );
// };

// export default MapComponent;
