import "./LeftBar.css";
import React, { useState } from "react";
import AccrdRsk1 from "../accordions/AccrdRsk1";
import AccrdPrp from "../accordions/AccrdPrp";
import useInfo from "../../hooks/use-info";
import Modal from "../tools/Modal";
import guide from "../../img/guide2.png";
import nstreets from "../../img/nstreets.svg";
//icons//////////////////////////////////////////////////////////////////////////////////////////
// import {TbSquareRoundedNumber1Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber2Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber3Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber4Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber5Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber6Filled} from 'react-icons/tb'
// import {TbSquareRoundedNumber7Filled} from 'react-icons/tb'
// import {FiPlus} from 'react-icons/fi'
// import { FaRegWindowMinimize, FaExternalLinkAlt } from "react-icons/fa";
import { MdStackedBarChart } from "react-icons/md";
import { FaRoad, FaFilter, FaMagnifyingGlassChart } from "react-icons/fa6";
// import { BsQuestionCircleFill } from "react-icons/bs";
// import {IoCloseSharp} from 'react-icons/io5';
// import {AiOutlineEnter} from 'react-icons/ai'
import { CgFileDocument } from "react-icons/cg";

const LeftBar = () => {
  const {
    bar,
    setBar,
    left,
    setLeft,
    right,
    setRight,
    setRsk,
    reset,
    allset,
    setPrpall,
  } = useInfo();
  //Modal/////////////////////////////////////////////////////////////
  const [showModal, setShowModal] = useState(false);

  const handleModOpen = () => {
    setShowModal(true);
  };

  const handleModClose = () => {
    setShowModal(false);
  };

  const modal = (
    <Modal onClose={handleModClose}>
      <img src={guide} alt="guide1" height="400%" />
    </Modal>
  );
  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="left_column">
        <a href="./">
          <img src={nstreets} alt="n-street" width="32px" height="24px" />
          <div className="hvd_title">도시지역 이면도로 현황</div>
        </a>

        <div className="titleline"></div>

        <div
          className={`riskBT ${bar === 1 ? "active" : ""}`}
          onClick={() => {
            setBar(1);
            setRsk("교통사고");
            reset();
          }}
        >
          <div className="topicons">
            <MdStackedBarChart className="charticon" />
          </div>
          <div className="hvd">유형별 사고위험도</div>
        </div>

        <div
          className={`propBT ${bar === 2 ? "active" : ""}`}
          onClick={() => {
            setBar(2);
            reset();
            setRsk(null);
            allset();
            setPrpall(true);
          }}
        >
          <div className="topicons">
            <FaRoad className="roadicon" />
          </div>
          <div className="hvd">이면도로 속성</div>
        </div>

        <div className="filter">
          <div
            className={`bottom_cont ${left ? "active" : ""}`}
            onClick={() => {
              if (!left) {
                setRsk("교통사고");
              }
              setLeft(!left);
            }}
          >
            <div className="bottomicons">
              <FaFilter className="filtericon" />
            </div>
            <div className="hvd_bottom">필터 도구</div>
          </div>
        </div>

        <div className="search">
          <div
            className={`bottom_cont ${right ? "active" : ""}`}
            onClick={() => setRight(!right)}
          >
            <div className="bottomicons">
              <FaMagnifyingGlassChart className="searchicon" />
            </div>
            <div className="hvd_bottom">속성/검색 도구</div>
          </div>
        </div>

        <div className="guide">
          <div
            className={`bottom_cont ${showModal ? "active" : ""}`}
            onClick={handleModOpen}
          >
            <div className="bottomicons">
              <CgFileDocument className="guideicon" />
            </div>
            <div className="hvd_bottom">데이터 설명서</div>
          </div>
        </div>
      </div>

      {left && bar === 2 && (
        <div className="detail_div">
          <div className="dtl_ttl">이면도로 속성</div>

          <div className="accordion_div">
            <AccrdPrp />
          </div>
        </div>
      )}

      {left && bar === 1 && (
        <div className="detail_div">
          <div className="dtl_ttl">유형별 사고위험도</div>

          <div className="accordion_div">
            <AccrdRsk1 />
          </div>
        </div>
      )}
      {showModal && modal}
    </div>
  );
};

export default LeftBar;
