import { useCallback, useEffect, useMemo, useState } from "react";
import "./AccrdRsk2a.css";
import useInfo from "../../hooks/use-info";
import axios from "axios";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import { TbSquareRoundedNumber3Filled } from "react-icons/tb";
import { TbSquareRoundedNumber4Filled } from "react-icons/tb";
import { TbSquareRoundedNumber5Filled } from "react-icons/tb";

const AccrdRsk2a = () => {
  // const [setExpandedIndex] = useState([0]);
  const { setView, rsk, setLD, accRsk2a, setAccRsk2a, setPick } = useInfo();
  const [csvDiv, setCsvDiv] = useState(null);
  const [nfList, setNfList] = useState([]);

  // AUXILIARY -----------------------------------------------
  const components = useMemo(() => {
    return {
      TbSquareRoundedNumber1Filled,
      TbSquareRoundedNumber2Filled,
      TbSquareRoundedNumber3Filled,
      TbSquareRoundedNumber4Filled,
      TbSquareRoundedNumber5Filled,
    };
  }, []);
  const handleNoIcon = useCallback(
    (no) => {
      const string = `TbSquareRoundedNumber${no}Filled`;
      const Component = components[string];
      return <Component className="rsk2a_comp" />;
    },
    [components]
  );
  const getCord = useCallback(
    async (item) => {
      console.log(item);
      const response = await axios.get(`http://localhost:4000/getCord/${item}`);
      console.log(response.data);
      setPick(item);
      setView({
        longitude: response.data.long,
        latitude: response.data.lat,
        zoom: 19.5,
      });
    },
    [setPick, setView]
  );
  const handleCsvListDwn = useCallback(async () => {
    setLD(true);
    // console.log("nfList: ", nfList);
    const nf_ids = nfList.map((item) => `'${item}'`).join(",");
    // console.log("nf_ids: ", nf_ids);
    const query = `select * from side9 where NF_ID in (${nf_ids})`;
    // console.log("query: ", query);
    const response = await axios.get(`http://localhost:4000/getCsv/${query}`);
    console.log("csvlistdwn: ", response.data);
    const csvContent =
      "data:test/csv;charset=utf-8," +
      response.data.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${rsk}_top5.csv`);
    document.body.appendChild(link); //required for firefox
    link.click();

    setLD(false);
  }, [nfList, rsk, setLD]);
  const handleCsvList = useCallback(async () => {
    let nfidLi;
    switch (rsk) {
      case "교통사고":
        nfidLi = [
          "TRN18000000ABNXPA",
          "TRN18000000ABO0I7",
          "TRN18000000ABR06Y",
          "TRN18000000ABSSSD",
          "TRN18000000ABSUOB",
        ];
        break;
      case "재해사고":
        nfidLi = [
          "TRN18000000AB0FWC",
          "TRN18000000AB168G",
          "TRN18000000AB1F2J",
          "TRN18000000AB1IG0",
          "TRN18000000AC5NRL",
        ];
        break;
      case "범죄사고":
        nfidLi = [
          "TRN18000000MFIN3P",
          "TRN18000000AA2O5V",
          "TRN18000000AB1GWE",
          "TRN18000000AB1H5O",
          "TRN18000000AB1H6P",
        ];
        break;
      case "밀집사고":
        nfidLi = [
          "TRN18000000AA1WQN",
          "TRN18000000AA2HP8",
          "TRN18000000ABBI71",
          "TRN18000000ABBK73",
          "TRN18000000ABC0YB",
        ];
        break;
      case "낙상사고":
        nfidLi = [
          "TRN18000000AC7CN8",
          "TRN18000000LTW7PM",
          "TRN18000000LTWF6B",
          "TRN18000000LUO1L5",
          "TRN18000001ZRSD3F",
        ];
        break;
      default:
        break;
    }
    setNfList(nfidLi);
    const csvList = nfidLi.map((item, id) => {
      return (
        <div className="rsk2a_csvdwn" onClick={() => getCord(item)}>
          {handleNoIcon(id + 1)} {item} <FaExternalLinkAlt />
        </div>
      );
    });
    setCsvDiv(csvList);
    setLD(false);
  }, [handleNoIcon, rsk, setLD, getCord]);
  // USEEFFECT -----------------------------------------------
  // useEffect(() => {
  //   if (bar === 1) {
  //     setRsk("교통사고");
  //     rsk && handleCsvList();
  //   }
  // }, []);
  useEffect(() => {
    if (!rsk) {
      setCsvDiv(null);
    } else {
      handleCsvList();
    }
  }, [rsk, handleCsvList]);
  ///////////////////////////////////////////////////////////////

  const items = [
    {
      id: rsk,
      label: rsk,
      content: csvDiv,
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

  // const handleClick = (nextIndex) => {
  //   setExpandedIndex((currentExpandedIndex) => {
  //     if (currentExpandedIndex.includes(nextIndex)) {
  //       // updateInfoState(nextIndex);
  //       // setCsvDiv(null);
  //       return currentExpandedIndex.filter((item) => item !== nextIndex);
  //     } else {
  //       return [...currentExpandedIndex, nextIndex];
  //     }
  //   });
  // };

  const renderedItems = items.map((item, index) => {
    return rsk ? (
      <div key={item.id} className={`${item.id + "_rsk2a_accitem"}`}>
        <div
          className={`rsk2a_d1 ${item.id + "_rsk2a_d1"}`}
          onClick={() => setAccRsk2a(!accRsk2a)}
        >
          <div className="rsk2a_label">{item.label}</div>
          <div className="rsk2a_line"></div>
          <div className="rsk2a_icon">
            {accRsk2a ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {accRsk2a && (
          <div className={`rsk2a_expanded ${item.id + "_rsk2a_exp"}`}>
            {item.content}
            <div className="rsk2a_dwnld" onClick={handleCsvListDwn}>
              CSV 데이터 다운로드
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>아래 사고유형을 선택하세요</div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2a;
