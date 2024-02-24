// import { useState } from "react";
import "./AccrdRsk2b.css";
import useInfo from "../../hooks/use-info";
import CbxRsk from "../auxiliary/CbxRsk";
import { FiPlus, FiMinus } from "react-icons/fi";
import Barchart from "../tools/Barchart";

const AccrdRsk2b = () => {
  const { setRnfo, rsk, setRsk, setAccRsk2a, reset } = useInfo();
  // const [expandedIndex, setExpandedIndex] = useState([]);

  ///////////////////////////////////////////////////////////////
  const checklist = [
    {
      name: "위험도",
      options: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
      updateInfo: (sel, chb) =>
        setRnfo((prev) => ({
          ...prev,
          rskOps: { ...prev.rskOps, selected: sel, checkboxes: chb },
        })),
    },
  ];

  const items = [
    {
      id: "교통사고",
      label: "교통사고",
      content: (
        <div className="crwdac">
          <Barchart />
          <CbxRsk name={"위험도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "범죄사고",
      label: "범죄사고",
      content: (
        <div className="crwdac">
          <Barchart />
          <CbxRsk name={"위험도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "재해사고",
      label: "재해사고",
      content: (
        <div className="crwdac">
          <Barchart />
          <CbxRsk name={"위험도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "밀집사고",
      label: "밀집사고",
      content: (
        <div className="crwdac">
          <Barchart />
          <CbxRsk name={"위험도"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "낙상사고",
      label: "낙상사고",
      content: (
        <div className="crwdac">
          <Barchart />
          <CbxRsk name={"위험도"} checklist={checklist} />
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

  const handleClick = (itemId) => {
    setAccRsk2a(true);
    if (rsk === itemId) {
      setRsk(null);
    } else {
      setRsk(itemId);
    }
    reset();
  };

  const renderedItems = items.map((item, index) => {
    // const isExpanded = expandedIndex.includes(index);
    const isExpanded = rsk === item.id;

    return (
      <div key={item.id} className={`${item.id + "_rsk2b_accitem"}`}>
        <div
          className={`rsk2b_d1 ${item.id + "_rsk2b_d1"}`}
          onClick={() => handleClick(item.id)}
        >
          <div className="rsk2b_label">{item.label}</div>
          <div className="rsk2b_line"></div>
          <div className="rsk2b_icon">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`rsk2b_expanded ${item.id + "_rsk2b_exp"}`}>
            {item.content}
          </div>
        )}
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2b;
