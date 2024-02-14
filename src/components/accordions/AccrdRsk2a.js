import { useState } from "react";
import "./AccrdRsk2a.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import useInfo from "../../hooks/use-info";
import axios from "axios";

const AccrdRsk2a = () => {
  const [expandedIndex, setExpandedIndex] = useState([]);
  const { rsk, setLD } = useInfo();

  // AUXILIARY -----------------------------------------------
  const handleCsvList = async () => {
    setLD(true);
    const query = "select NF_ID from side9 order by PEDAC_RK limit 5;";
    console.log("query from AccrdRsk2:", "\n", query);
    const response = await axios.get(
      `http://localhost:4000/getNFID/${query}` //  /getLength/${query}
    );
    console.log(
      "typeof response.data at AccrdRsk2:",
      "\n",
      typeof response.data
    );
    console.log("response.data at AccrdRsk2:", "\n", response.data);
    setLD(false);
  };
  ///////////////////////////////////////////////////////////////

  const items = [
    {
      id: rsk,
      label: rsk,
      content: (
        <div className="rsk2a_test" onClick={handleCsvList}>
          DB FETCH TEST
        </div>
      ),
    },
  ];

  // const updateInfoState = (nextIndex) => {
  //   switch (items[nextIndex].id) {
  //     case "도로구분":
  //       setInfo((prev) => ({
  //         ...prev,
  //         roadOps: { ...prev.roadOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     case "차로수":
  //       setInfo((prev) => ({
  //         ...prev,
  //         laneOps: { ...prev.laneOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     case "도로폭":
  //       setInfo((prev) => ({
  //         ...prev,
  //         widthOps: { ...prev.widthOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     case "포장재질":
  //       setInfo((prev) => ({
  //         ...prev,
  //         typeOps: { ...prev.typeOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     case "중앙분리대유무":
  //       setInfo((prev) => ({
  //         ...prev,
  //         barrierOps: { ...prev.barrierOps, selected: null, checkboxes: null },
  //       }));
  //       break;

  //     case "일방통행구분":
  //       setInfo((prev) => ({
  //         ...prev,
  //         onewayOps: { ...prev.onewayOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     case "도로사용상태":
  //       setInfo((prev) => ({
  //         ...prev,
  //         statusOps: { ...prev.statusOps, selected: null, checkboxes: null },
  //       }));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        // updateInfoState(nextIndex);
        return currentExpandedIndex.filter((item) => item !== nextIndex);
      } else {
        return [...currentExpandedIndex, nextIndex];
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    return (
      <div key={item.id} className={`${item.id + "_accitem"}`}>
        <div
          className={`rsk2a_d1 ${item.id + "_rsk2a_d1"}`}
          onClick={() => handleClick(index)}
        >
          <div className="acclabel">{item.label}</div>
          <div className="acc2line"></div>
          <div className="icon">{isExpanded ? <FiMinus /> : <FiPlus />}</div>
        </div>
        {isExpanded && (
          <div className={`expanded ${item.id + "_exp"}`}>{item.content}</div>
        )}
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2a;
