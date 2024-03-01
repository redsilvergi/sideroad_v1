import "./Basemap.css";
import React, { useState, useEffect, useRef } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import useInfo from "../../hooks/use-info";

const Basemap = ({ basemap, setBasemap }) => {
  const { setIstgl, right } = useInfo();
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
      case "mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn":
        return "일반지도";
      case null: //"mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s"
        return "위성사진";
      case "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07":
        return "위성흑백";
      case "mapbox://styles/redsilver522/clmp8ra0e01wd01ra0k0731dw":
        return "토지이용계획도";
      default:
        return "N/A";
    }
  };
  return (
    <div>
      <div
        ref={divEl}
        className={`map_toggle_button ${right ? "" : "rmv_basemap"}`}
        onClick={() => setMapExp(true)}
      >
        <div id="map_tg_name">{getBaseName()}</div>
        <div id="map_tg_icon">
          {mapExp ? <GoTriangleUp /> : <GoTriangleDown />}
        </div>
      </div>
      {mapExp && (
        <div
          ref={divEl}
          className={`basemap_exp ${right ? "" : "rmv_basemap_exp"}`}
        >
          <ul>
            <li
              onClick={() => {
                setBasemap(
                  "mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn"
                );
                setIstgl(false);
              }}
            >
              일반지도
            </li>
            <li
              onClick={() => {
                setBasemap(
                  null // "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s"
                );
                setIstgl(false);
              }}
            >
              위성사진
            </li>
            <li
              onClick={() => {
                setBasemap(
                  "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07"
                );
                setIstgl(false);
              }}
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
