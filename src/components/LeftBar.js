import "./LeftBar.css";
import React, { useState } from "react";
// import axios from "axios";
// import Dropdown from "./Dropdown";
import Accordion from "./Accordion";
import CheckboxForm from "./CheckboxForm";
import useInfo from "../hooks/use-info";
import Modal from "./Modal";

// import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import guide from "../img/guide.PNG";
import nstreets from "../img/nstreets.svg";
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
  const { setInfo, bar, setBar, left, setLeft, right, setRight } = useInfo();
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
  const checklist = [
    {
      name: "도로구분",
      options: [
        "지방도",
        "특별시도",
        "광역시도",
        "시도",
        "군도",
        "구도",
        "면리간도로",
        "부지안도로",
        "소로",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          roadOps: { ...prev.roadOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "차로수",
      options: ["1차선", "2차선", "3차선", "4차선", "5-8차선", "9차선 이상"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          laneOps: { ...prev.laneOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "도로폭",
      options: [
        "3m미만",
        "3m이상 ~ 8m미만",
        "8m이상 ~ 9m미만",
        "9m이상 ~ 10m미만",
        "10m이상 ~ 12m미만",
        "12m이상 ~ 15m미만",
        "15m이상 ~ 20m미만",
        "20m이상 ~ 25m미만",
        "25m이상",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          widthOps: { ...prev.widthOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "포장재질",
      options: [
        "아스팔트",
        "아스팔트콘크리트",
        "콘크리트",
        "블록",
        "비포장",
        "우레탄",
        "고무",
        "기타",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          typeOps: { ...prev.typeOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "중앙분리대유무",
      options: ["유", "무"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          barrierOps: { ...prev.barrierOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "일방통행구분",
      options: ["일방통행", "양방통행"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          onewayOps: { ...prev.onewayOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "도로사용상태",
      options: ["건설예정", "공사중", "운영중", "폐쇄"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          statusOps: { ...prev.statusOps, selected: sel, checkboxes: chb },
        })),
    },
  ];

  const roadStatusItems = [
    // {
    //   id: "도로번호별",
    //   label: "- 도로번호별",
    //   content: (
    //     <div>
    //       <div className="roadNo" onClick={() => setIsSelect(!isSelect)}>
    //         <div>
    //           {info.roadNo.selected && info.roadNo.selected.length !== 0
    //             ? info.roadNo.selected.length > 9
    //               ? info.roadNo.selected.slice(0, 9).join(",") + "..."
    //               : info.roadNo.selected.join(",")
    //             : "선택"}
    //         </div>
    //         {isSelect ? <GoTriangleUp /> : <GoTriangleDown />}
    //       </div>
    //       {isSelect && <Dropdown options={roadNoOps} />}
    //     </div>
    //   ),
    // },
    {
      id: "도로구분",
      label: "- 도로구분",
      content: (
        <div className="road roadItem">
          <CheckboxForm name={"도로구분"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "차로수",
      label: "- 차로수",
      content: (
        <div className="lane roadItem">
          <CheckboxForm name={"차로수"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "도로폭",
      label: "- 도로폭",
      content: (
        <div className="width roadItem">
          <CheckboxForm name={"도로폭"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "포장재질",
      label: "- 포장재질",
      content: (
        <div className="type roadItem">
          <CheckboxForm name={"포장재질"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "중앙분리대유무",
      label: "- 중앙분리대유무",
      content: (
        <div className="barrier roadItem">
          <CheckboxForm name={"중앙분리대유무"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "일방통행구분",
      label: "- 일방통행구분",
      content: (
        <div className="oneway roadItem">
          <CheckboxForm name={"일방통행구분"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "도로사용상태",
      label: "- 도로사용상태",
      content: (
        <div className="status roadItem">
          <CheckboxForm name={"도로사용상태"} checklist={checklist} />
        </div>
      ),
    },
  ];

  ///////////////////////////////////////////////////////////////
  const items = [
    {
      id: "이면도로",
      label: "도시지역 이면도로 현황",
      content: <Accordion items={roadStatusItems} />,
    },
    // {
    //   id: "TMS",
    //   label: "교통량(TMS)",
    //   content: <div className="prep">- 준비중</div>,
    // },
    // {
    //   id: "TAAS",
    //   label: "교통사고(TAAS)",
    //   content: <Accordion items={taasItems} />,
    // },
  ];
  ///////////////////////////////////////////////////////////////

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
          onClick={() => setBar(1)}
        >
          <div className="topicons">
            <MdStackedBarChart className="charticon" />
          </div>
          <div className="hvd">유형별 사고위험도</div>
        </div>

        <div
          className={`propBT ${bar === 2 ? "active" : ""}`}
          onClick={() => setBar(2)}
        >
          <div className="topicons">
            <FaRoad className="roadicon" />
          </div>
          <div className="hvd">이면도로 속성</div>
        </div>

        <div className="filter">
          <div
            className={`bottom_cont ${left ? "active" : ""}`}
            onClick={() => setLeft(!left)}
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
          <div className="accordion_div">
            <Accordion items={items} />
          </div>

          <div className="footnote">
            <div className="fnt">데이터 출처</div>
            <div style={{ marginTop: "7px" }}>
              ㆍ2022, 국가기본도DB (도로링크 데이터), 국토지리정보원
            </div>
            <div style={{ marginBottom: "5px" }}>
              ㆍ2023, 국가중점데이터(토지이용계획정보), 국가공간정보포털
            </div>
            <div>*시차로 인한 속성정보 누락구간에 유의·활용 바랍니다.</div>
          </div>
        </div>
      )}

      {left && bar === 1 && <div className="detail_div">사고위험도 div</div>}
      {showModal && modal}
    </div>
  );
};

export default LeftBar;
