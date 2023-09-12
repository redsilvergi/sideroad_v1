import "./Region.css";
import React, { useState } from "react";
import useInfo from "../hooks/use-info";
import Dropdown from "./Dropdown";
import { AiOutlineClose } from "react-icons/ai";

const Region = () => {
  const { region, setRegion } = useInfo();
  const [exp, setExp] = useState(false);
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  const cityOps = [
    [1, "서울특별시"],
    [2, "부산광역시"],
    [3, "대구광역시"],
    [4, "인천광역시"],
    [5, "광주광역시"],
    [6, "대전광역시"],
    [7, "울산광역시"],
    [8, "세종특별자치시"],
    [9, "경기도"],
    [10, "asda도"],
    [11, "fasd기도"],
    [12, "h1ag"],
    [13, "thklj"],
    [14, "jkkfh도"],
    [15, "asdlfhkj"],
    [16, "sdfhjkl"],
    [17, "qkas"],
  ];

  var countyOps = [];

  switch (region.city) {
    case 1:
      countyOps = [
        [10, "강북구"],
        [20, "강서구"],
        [30, "관악구"],
        [40, "광진구"],
        [50, "구로구"],
        [60, "금천구"],
        [70, "노원구"],
        [80, "도봉구"],
        [90, "동대문구"],
        [100, "safd구"],
        [110, "agsdf구"],
        [120, "asgdfs"],
        [130, "sd구fa"],
      ];
      break;
    case 2:
      countyOps = [
        [10, "달서구"],
        [20, "호호호구"],
        [30, "히히히구"],
      ];
      break;
    default:
      break;
  }

  const handleCity = (cd) => {
    setRegion((prev) => {
      if (prev.city === cd) {
        return { ...prev, city: null };
      } else {
        return {
          ...prev,
          city: cd,
        };
      }
    });
  };
  const handleCounty = (cd) => {
    setRegion((prev) => {
      if (prev.county === cd) {
        return { ...prev, county: null };
      } else {
        return {
          ...prev,
          county: cd,
        };
      }
    });
  };

  const handleClose = () => {
    setExp(false);
    setRegion({ city: null, county: null });
  };
  ///////////////////////////////////////////////////////////////

  return exp ? (
    <div className={`regionExp ${region.city ? "exp2" : ""}`}>
      <div className="region" onClick={() => setExp(!exp)}>
        지역선택
      </div>
      <div className="city">
        <div>시/도</div>
        <Dropdown options={cityOps} handleOps={handleCity} type={"city_dd"} />
      </div>
      {region.city && (
        <div className="county">
          <div>시/군/구</div>
          <Dropdown
            options={countyOps}
            handleOps={handleCounty}
            type={"coun_dd"}
          />
        </div>
      )}
      <AiOutlineClose
        className={`close ${region.city ? "exp2" : ""}`}
        onClick={handleClose}
      />
    </div>
  ) : (
    <div className="region" onClick={() => setExp(!exp)}>
      지역선택
    </div>
  );
};

export default Region;
