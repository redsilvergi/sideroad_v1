import "./Basemap.css";
import React, { useState, useEffect, useRef } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const Basemap = ({ basemap, setBasemap }) => {
  const [mapExp, setMapExp] = useState(false);
  const divEl = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setMapExp(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  const getBaseName = () => {
    switch (basemap) {
      case "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz":
        return "일반지도";
      case "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s":
        return "위성사진";
      case "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07":
        return "위성흑백";
      default:
        return "N/A";
    }
  };
  return (
    <div>
      <div
        ref={divEl}
        className="map_toggle_button"
        onClick={() => setMapExp(true)}
      >
        <div id="map_tg_name">{getBaseName()}</div>
        <div id="map_tg_icon">
          {mapExp ? <GoTriangleUp /> : <GoTriangleDown />}
        </div>
      </div>
      {mapExp && (
        <div ref={divEl} id="map_exp">
          <ul>
            <li
              onClick={() =>
                setBasemap(
                  "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"
                )
              }
            >
              일반지도
            </li>
            <li
              onClick={() =>
                setBasemap(
                  "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s"
                )
              }
            >
              위성사진
            </li>
            <li
              onClick={() =>
                setBasemap(
                  "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07"
                )
              }
            >
              위성흑백
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Basemap;
