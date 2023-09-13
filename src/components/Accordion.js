import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import "./Accordion.css";
import useInfo from "../hooks/use-info";

function Accordion({ items }) {
  const { setInfo, setIsSelect, setDepth1, setLength } = useInfo();
  const [expandedIndex, setExpandedIndex] = useState([]);

  const reset = () => {
    setInfo({
      // roadNo: { name: "도로번호", selected: null },
      roadOps: { name: "도로구분", selected: null, checkboxes: null },
      laneOps: { name: "차로수", selected: null, checkboxes: null },
      widthOps: { name: "도로폭", selected: null, checkboxes: null },
      typeOps: { name: "포장재질", selected: null, checkboxes: null },
      barrierOps: { name: "중앙분리대유무", selected: null, checkboxes: null },
      onewayOps: { name: "일방통행구분", selected: null, checkboxes: null },
      statusOps: { name: "도로사용상태", selected: null, checkboxes: null },
    });
    setLength(0);
    setIsSelect(false);
  };

  const updateInfoState = (nextIndex) => {
    switch (items[nextIndex].id) {
      case "이면도로":
        reset();
        setDepth1(null);
        break;
      case "TMS":
        setDepth1(null);
        break;
      case "TAAS":
        setDepth1(null);
        break;
      // case "도로번호별":
      //   setIsSelect(false);
      //   break;
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
        switch (items[nextIndex].id) {
          // case "이면도로":
          //   setDepth1("이면도로");
          //   return [nextIndex];
          case "TMS":
            reset();
            setDepth1("TMS");
            return [nextIndex];
          case "TAAS":
            reset();
            setDepth1("TAAS");
            return [nextIndex];
          default:
            break;
        }
        return [...currentExpandedIndex, nextIndex];
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    const icon =
      items[0].id === "이면도로" ? null : (
        <span className="icon">
          {isExpanded ? <GoTriangleUp /> : <GoTriangleDown />}
        </span>
      );

    return (
      <div key={item.id} className={`${item.id + "_accitem"}`}>
        <div
          className={`d1 ${item.id + "_d1"}`}
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {(items[0].id === "이면도로" || isExpanded) && (
          <div className={`expanded ${item.id + "_exp"}`}>{item.content}</div>
        )}
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
}

export default Accordion;
