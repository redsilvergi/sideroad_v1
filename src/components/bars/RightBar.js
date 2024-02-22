import "./RightBar.css";
import React, { useEffect, useState, useCallback } from "react";
import useInfo from "../../hooks/use-info";
import useQuery from "../../hooks/use-query";
import axios from "axios";
import Rsrch from "../accordions/Rsrch";

const RightBar = () => {
  const { length, info, region, setLD, setLength } = useInfo();
  const { queryF } = useQuery();
  const [renl, setRenL] = useState(
    <div className="lengthSum2 lengthReq2">선택구간연장요청</div>
  );
  //AUXILIARY---------------------------------------------------
  const handleLength = useCallback(async () => {
    setLD(true);
    const query = queryF();
    console.log("query from RightBar.js:", "\n", query);
    const response = await axios.get(
      `http://localhost:4000/getLength/${query}` // /getLength/${query}
    );
    console.log("response.data: ", response.data);
    console.log("response.data type: ", typeof response.data);
    setLength(Math.round(response.data / 1000));
    setLD(false);
  }, [setLD, queryF, setLength]);

  //RENDER ITEMS-------------------------------------------------
  useEffect(() => {
    if (length) {
      setRenL(
        <div className="lngthS">
          <div className="lngthS_txt">선택구간 연장</div>
          <div className="km">
            <span>{length}</span> km
          </div>
        </div>
      );
    } else {
      return;
    }
  }, [length]);
  useEffect(() => {
    setRenL(
      <div className="lngthS lngthReq" onClick={handleLength}>
        <div className="lngthS_txt">선택구간 연장요청</div>
        <div className="km">--- km</div>
      </div>
    );
  }, [region, handleLength, info]);

  return (
    <div className="rightbar">
      <div className="id_finder">
        <Rsrch />
      </div>
      <div className="separation">
        <div className="rb_line"></div>
        <div className="sep_txt">도로속성</div>
        <div className="rb_line"></div>
      </div>
      <div className="lngth_div">{renl}</div>
      {/* <div className="length">선택연장구간</div> */}
      <div className="rb_prp">roadprop</div>
      <div className="rb_rsk">risk</div>
      <div className="bottomright">
        <div className="zoomlevel">ZOOM LEVEL:</div>
        <div className="tag">@Mapbox @OpenStreetMap</div>
      </div>
    </div>
  );
};

export default RightBar;
