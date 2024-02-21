import { useState } from "react";
import "./AccrdRsk1.css";
import useInfo from "../../hooks/use-info";
// import CheckboxForm from "../auxiliary/CheckboxForm";
import { FiPlus, FiMinus } from "react-icons/fi";
import AccrdRsk2a from "./AccrdRsk2a";
import AccrdRsk2b from "./AccrdRsk2b";

const AccrdRsk1 = () => {
  const { reset, setRsk } = useInfo();
  const [expandedIndex, setExpandedIndex] = useState([0, 1]);

  const items = [
    {
      id: "위험구간",
      label: "위험구간 TOP 5",
      content: (
        <div className="road roadItem">
          <AccrdRsk2a />
        </div>
      ),
    },
    {
      id: "유형별위험도구성비",
      label: "유형별 위험도 구성비",
      content: (
        <div className="lane roadItem">
          <AccrdRsk2b />
        </div>
      ),
    },
  ];

  const updateInfoState = (nextIndex) => {
    switch (items[nextIndex].id) {
      case "유형별위험도구성비":
        setRsk(null);
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
    if (nextIndex === 1) {
      reset();
    }
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    return (
      <div key={item.id} className={`${item.id + "_accitem"}`}>
        {item.id === "위험구간" && <div className="rsk1_line"></div>}
        <div
          className={`rsk1_d1 ${item.id + "_rsk1_d1"}`}
          onClick={() => handleClick(index)}
        >
          <div className="rsklbl">{item.label}</div>
          <div className="rsk1_icon">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`rsk1_expanded ${item.id + "_rsk1_exp"}`}>
            {item.content}
          </div>
        )}
        <div className="rsk1_line"></div>
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk1;
