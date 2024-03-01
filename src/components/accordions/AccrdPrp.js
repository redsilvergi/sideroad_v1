import { useEffect, useState } from "react";
import "./AccrdPrp.css";
import useInfo from "../../hooks/use-info";
import CbxPrp from "../auxiliary/CbxPrp";
import { FiPlus, FiMinus } from "react-icons/fi";

const AccrdPrp = () => {
  const { setInfo, setLength, prpall, setPrpall, reset, allset } = useInfo();
  const [expandedIndex, setExpandedIndex] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  useEffect(() => {
    setExpandedIndex([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  }, [prpall]);

  ///////////////////////////////////////////////////////////////
  const checklist = [
    {
      name: "도로폭원",
      options: [
        "3m 미만",
        "3m이상 ~ 8m미만",
        "8m이상 ~ 9m미만",
        "9m이상 ~ 10m미만",
        "10m이상 ~ 12m미만",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          rdbtOps: { ...prev.rdbtOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "경사도",
      options: [
        "10.00 초과",
        "6.00 ~ 10.00",
        "3.00 ~ 6.00",
        "1.00 ~ 3.00",
        "0.00 ~ 1.00",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          slopeOps: { ...prev.slopeOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "포장재질",
      options: ["아스팔트", "콘크리트", "블록", "비포장", "우레탄 등"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          pmtrOps: { ...prev.pmtrOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "네트워크접근성",
      options: [
        "1.35초과",
        "1.14 ~ 1.35",
        "0.98 ~ 1.14",
        "0.82 ~ 0.98",
        "0.00 ~ 0.82",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          rdnetOps: { ...prev.rdnetOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "대중교통접근성",
      options: ["500 초과", "350 ~ 500", "200 ~ 350", "100 ~ 200", "0 ~ 100"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          pubtrOps: { ...prev.pubtrOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "근생시설연면적",
      options: [
        "2000 이상",
        "1000 ~ 2000",
        "500 ~ 1000",
        "100 ~ 500",
        "0 ~ 100",
      ],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          pbuldOps: { ...prev.pbuldOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "건물출입구밀도",
      options: ["20개 이상", "11~20개", "6~10개", "1~5개", "출입구 없음 (0)"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          buldeOps: { ...prev.buldeOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "계단",
      options: ["설치", "미설치"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          stairOps: { ...prev.stairOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "보도",
      options: ["단측 설치", "양측 설치", "미설치"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          sdwkOps: { ...prev.sdwkOps, selected: sel, checkboxes: chb },
        })),
    },
  ];

  const items = [
    {
      id: "도로폭원",
      label: "도로폭원",
      content: (
        <div className="roadItem">
          <CbxPrp name={"도로폭원"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "경사도",
      label: "경사도",
      content: (
        <div className="roadItem">
          <CbxPrp name={"경사도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "포장재질",
      label: "포장재질",
      content: (
        <div className="roadItem">
          <CbxPrp name={"포장재질"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "네트워크접근성",
      label: "네트워크 접근성",
      content: (
        <div className="roadItem">
          <CbxPrp name={"네트워크접근성"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "대중교통접근성",
      label: "대중교통 접근성",
      content: (
        <div className="roadItem">
          <CbxPrp name={"대중교통접근성"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "근생시설연면적",
      label: "근생시설 연면적",
      content: (
        <div className="roadItem">
          <CbxPrp name={"근생시설연면적"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "건물출입구밀도",
      label: "건물 출입구 밀도",
      content: (
        <div className="roadItem">
          <CbxPrp name={"건물출입구밀도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "계단",
      label: "계단",
      content: (
        <div className="roadItem">
          <CbxPrp name={"계단"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "보도",
      label: "보도",
      content: (
        <div className="roadItem">
          <CbxPrp name={"보도"} checklist={checklist} />
        </div>
      ),
    },
  ];

  const updateInfoState = (nextIndex) => {
    switch (items[nextIndex].id) {
      case "도로폭원":
        setInfo((prev) => ({
          ...prev,
          rdbtOps: { ...prev.rdbtOps, selected: null, checkboxes: null },
        }));
        break;
      case "경사도":
        setInfo((prev) => ({
          ...prev,
          slopeOps: { ...prev.slopeOps, selected: null, checkboxes: null },
        }));
        break;
      case "포장재질":
        setInfo((prev) => ({
          ...prev,
          pmtrOps: { ...prev.pmtrOps, selected: null, checkboxes: null },
        }));
        break;
      case "네트워크접근성":
        setInfo((prev) => ({
          ...prev,
          rdnetOps: { ...prev.rdnetOps, selected: null, checkboxes: null },
        }));
        break;
      case "대중교통접근성":
        setInfo((prev) => ({
          ...prev,
          pubtrOps: { ...prev.pubtrOps, selected: null, checkboxes: null },
        }));
        break;

      case "근생시설연면적":
        setInfo((prev) => ({
          ...prev,
          pbuldOps: { ...prev.pbuldOps, selected: null, checkboxes: null },
        }));
        break;
      case "건물출입구밀도":
        setInfo((prev) => ({
          ...prev,
          buldeOps: { ...prev.buldeOps, selected: null, checkboxes: null },
        }));
        break;
      case "계단":
        setInfo((prev) => ({
          ...prev,
          stairOps: { ...prev.stairOps, selected: null, checkboxes: null },
        }));
        break;
      case "보도":
        setInfo((prev) => ({
          ...prev,
          sdwkOps: { ...prev.sdwkOps, selected: null, checkboxes: null },
        }));
        break;
      default:
        break;
    }
  };

  const handleClick = (nextIndex) => {
    setLength(null);
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        updateInfoState(nextIndex);
        return currentExpandedIndex.filter((item) => item !== nextIndex);
      } else {
        return [...currentExpandedIndex, nextIndex];
      }
    });
  };

  const handlePrps = () => {
    if (prpall) {
      reset();
    } else {
      allset();
    }
    setPrpall(!prpall);
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    return (
      <div key={item.id} className={`${item.id + "_prp_accitem"}`}>
        <div
          className={`prp_d1 ${item.id + "pro_d1"}`}
          onClick={() => handleClick(index)}
        >
          <div className="prplbl">{item.label}</div>
          <div className="prpline"></div>
          <div className="prp_icon">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`prp_expanded ${item.id + "_exp"}`}>
            {item.content}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={`accordion`}>
      <div className="prp_sbttl">
        <div>속성 선택</div>
        <div className="prp_sbtt1_rgt" onClick={handlePrps}>
          <div className="prp_sbtt1_rgt_lbl">전체선택</div>
          <div className={`prp_btn_all ${prpall ? "prp_all" : ""}`}>
            {prpall && "🗸"}
          </div>
        </div>
      </div>
      {renderedItems}
    </div>
  );
};

export default AccrdPrp;
