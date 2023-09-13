import "./Region.css";
import React, { useState, useEffect, useRef } from "react";
import useInfo from "../hooks/use-info";
import Dropdown from "./Dropdown";
import { AiOutlineClose } from "react-icons/ai";

const Region = () => {
  const { region, setRegion } = useInfo();
  const [exp, setExp] = useState(0);
  const divEl = useRef();
  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        if (!region.city) {
          setExp(0);
        } else {
          setExp(2);
        }
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [region.city]);
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

  switch (region.city.cd) {
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

  const handleCity = (code, str) => {
    setRegion((prev) => {
      if (prev.city.cd === code) {
        return {
          city: { cd: null, name: null },
          county: { cd: null, name: null },
        };
      } else {
        return {
          city: { cd: code, name: str },
          county: { cd: null, name: null },
        };
      }
    });
  };
  const handleCounty = (code, str) => {
    setRegion((prev) => {
      if (prev.county.cd === code) {
        return { ...prev, county: { cd: null, name: null } };
      } else {
        return {
          ...prev,
          county: { cd: code, name: str },
        };
      }
    });
  };

  const handleClose = () => {
    setExp(0);
    setRegion({
      city: { cd: null, name: null },
      county: { cd: null, name: null },
    });
  };
  ///////////////////////////////////////////////////////////////

  var rendered;

  switch (exp) {
    case 1:
      rendered = (
        <div
          ref={divEl}
          className={`regionExp ${region.city.cd ? "exp1" : ""}`}
        >
          <div className="region" onClick={() => setExp(1)}>
            지역선택
          </div>
          <div className="city">
            <div>시/도</div>
            <Dropdown
              options={cityOps}
              handleOps={handleCity}
              type={"city_dd"}
            />
          </div>
          {region.city.cd && (
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
            className={`close ${region.city.cd ? "exp1" : ""}`}
            onClick={handleClose}
          />
        </div>
      );
      break;
    case 2:
      rendered = !region.city.cd ? (
        <div className="region" onClick={() => setExp(1)}>
          지역선택
        </div>
      ) : (
        <div
          ref={divEl}
          className={`regionExp ${region.county.cd ? "exp1" : ""} exp2`}
        >
          <div className="region" onClick={() => setExp(1)}>
            지역선택
          </div>
          <div className="city">
            <div>{region.city.name}</div>
          </div>

          {region.county.cd && (
            <div className="county">
              <div>{region.county.name}</div>
            </div>
          )}
          <AiOutlineClose
            className={`close ${region.county.cd ? "exp1" : ""}`}
            onClick={handleClose}
          />
        </div>
      );
      break;
    default:
      rendered = (
        <div className="region" onClick={() => setExp(1)}>
          지역선택
        </div>
      );
      break;
  }
  ////////////////////////////////////////////////////////////
  return rendered;
};

export default Region;
