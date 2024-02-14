import "./RightBar.css";
import React, { useEffect, useState, useCallback } from "react";
import useInfo from "../../hooks/use-info";
import useQuery from "../../hooks/use-query";
import axios from "axios";

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
    setLength(Math.round(response.data / 1000));
    setLD(false);
  }, [setLD, queryF, setLength]);

  //RENDER ITEMS-------------------------------------------------
  useEffect(() => {
    if (length) {
      setRenL(
        <div className="lengthSum2">
          선택구간연장 <span>{length}</span>km
        </div>
      );
    } else {
      return;
    }
  }, [length]);
  useEffect(() => {
    setRenL(
      <div className="lengthSum2 lengthReq2" onClick={handleLength}>
        선택구간연장요청
      </div>
    );
  }, [region, handleLength, info]);

  return (
    <div className="rightbar">
      <div className="id_finder">id finder</div>
      <div className="separation">-- 도로속성 --</div>
      {renl}
      {/* <div className="length">선택연장구간</div> */}
      <div className="roadprop">roadprop</div>
      <div className="risk">risk</div>
      <div className="bottomright">
        <div className="zoomlevel">ZOOM LEVEL:</div>
        <div className="tag">@Mapbox @OpenStreetMap</div>
      </div>
    </div>
  );
};

export default RightBar;
