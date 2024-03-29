import "./RightBar.css";
import React, { useEffect, useState } from "react";
import useInfo from "../../hooks/use-info";
import useDb from "../../hooks/use-db";
import Rsrch from "../accordions/Rsrch";
import Rprp from "../accordions/Rprp";
import Rrsk from "../accordions/Rrsk";

const RightBar = () => {
  const { length, info, region, setLength, rsk, rnfo, pick, pnfo, view } =
    useInfo();
  const { getLength } = useDb();
  const [renl, setRenL] = useState(
    <div className="lengthSum2 lengthReq2">선택구간연장요청</div>
  );
  //RENDER ITEMS-------------------------------------------------
  useEffect(() => {
    if (pick) {
      setLength(Math.round(pnfo.road_lt * 1000) / 1000000);
    } else {
      setLength(null);
    }
  }, [info, rnfo, pick, region, rsk, pnfo.road_lt, setLength]);
  useEffect(() => {
    if (length || length === 0) {
      setRenL(
        <div className="lngthS isLngth">
          <div className="lngthS_txt" style={{ color: "black" }}>
            선택구간 연장
          </div>
          <div className="km">
            <span style={{ color: "black", fontWeight: 800 }}>{length}</span> km
          </div>
        </div>
      );
    } else {
      setRenL(
        <div className="lngthS lngthReq" onClick={getLength}>
          <div className="lngthS_txt">선택구간 연장요청</div>
          <div className="km">--- km</div>
        </div>
      );
    }
  }, [length, region, getLength, info]);

  return (
    <div className="rightbar">
      <div className="rb_accordion_div">
        <div className="id_finder">
          <Rsrch />
        </div>
        <div className="separation">
          <div className="rb_line"></div>
          <div className="sep_txt">도로속성</div>
          <div className="rb_line"></div>
        </div>
        <div className="lngth_div">{renl}</div>
        <div className="rb_prp">
          <Rprp />
        </div>
        <div className="rb_rsk">
          <Rrsk />
        </div>
        <div className="bottomright">
          <div className="zoomlevel">ZOOM LEVEL: {view.zoom.toFixed(2)}</div>
          <div className="lnglat">
            longlat: {view.longitude.toFixed(5)}, {view.latitude.toFixed(5)}
          </div>
          <div className="tag">@Mapbox @OpenStreetMap @VWorld</div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
