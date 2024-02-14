import { useState } from "react";
import "./AccrdPrp.css";
import useInfo from "../../hooks/use-info";
import CheckboxForm from "../auxiliary/CheckboxForm";
import { FiPlus, FiMinus } from "react-icons/fi";

const Accordion2 = () => {
  const { setInfo } = useInfo();
  const [expandedIndex, setExpandedIndex] = useState([]);

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

  const items = [
    {
      id: "도로구분",
      label: "도로구분",
      content: (
        <div className="road roadItem">
          <CheckboxForm name={"도로구분"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "차로수",
      label: "차로수",
      content: (
        <div className="lane roadItem">
          <CheckboxForm name={"차로수"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "도로폭",
      label: "도로폭",
      content: (
        <div className="width roadItem">
          <CheckboxForm name={"도로폭"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "포장재질",
      label: "포장재질",
      content: (
        <div className="type roadItem">
          <CheckboxForm name={"포장재질"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "중앙분리대유무",
      label: "중앙분리대유무",
      content: (
        <div className="barrier roadItem">
          <CheckboxForm name={"중앙분리대유무"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "일방통행구분",
      label: "일방통행구분",
      content: (
        <div className="oneway roadItem">
          <CheckboxForm name={"일방통행구분"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "도로사용상태",
      label: "도로사용상태",
      content: (
        <div className="status roadItem">
          <CheckboxForm name={"도로사용상태"} checklist={checklist} />
        </div>
      ),
    },
  ];

  const updateInfoState = (nextIndex) => {
    switch (items[nextIndex].id) {
      case "도로구분":
        setInfo((prev) => ({
          ...prev,
          roadOps: { ...prev.roadOps, selected: null, checkboxes: null },
        }));
        break;
      case "차로수":
        setInfo((prev) => ({
          ...prev,
          laneOps: { ...prev.laneOps, selected: null, checkboxes: null },
        }));
        break;
      case "도로폭":
        setInfo((prev) => ({
          ...prev,
          widthOps: { ...prev.widthOps, selected: null, checkboxes: null },
        }));
        break;
      case "포장재질":
        setInfo((prev) => ({
          ...prev,
          typeOps: { ...prev.typeOps, selected: null, checkboxes: null },
        }));
        break;
      case "중앙분리대유무":
        setInfo((prev) => ({
          ...prev,
          barrierOps: { ...prev.barrierOps, selected: null, checkboxes: null },
        }));
        break;

      case "일방통행구분":
        setInfo((prev) => ({
          ...prev,
          onewayOps: { ...prev.onewayOps, selected: null, checkboxes: null },
        }));
        break;
      case "도로사용상태":
        setInfo((prev) => ({
          ...prev,
          statusOps: { ...prev.statusOps, selected: null, checkboxes: null },
        }));
        break;
      default:
        break;
    }
  };

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        updateInfoState(nextIndex);
        return currentExpandedIndex.filter((item) => item !== nextIndex);
      } else {
        return [...currentExpandedIndex, nextIndex];
      }
    });
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
      <div className="prp_sbttl">속성 선택</div>
      {renderedItems}
    </div>
  );
};

export default Accordion2;
