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
  const [csvDwnList, setCsvDwnList] = useState([]);

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
  const handleCsvDwn = useCallback(
    async (item) => {
      console.log(item);
      const response = await axios.get(`http://localhost:4000/getGeoJ/${item}`);
      console.log(response.data);
      // setGeoJ([
      //   {
      //     position: [response.data.long, response.data.lat],
      //   },
      // ]);
      setPick(item);
      setView({
        longitude: response.data.long,
        latitude: response.data.lat,
        zoom: 19.5,
      });
      // setGeoJ(jsonData);

      // const selectedObj = data.features.find(
      //   (obj) => obj.properties.NF_ID === item
      // );
      // console.log(selectedObj);
    },
    [setPick, setView]
  );
  const handleCsvListDwn = useCallback(async () => {
    setLD(true);
    // console.log("csvDwnList: ", csvDwnList);
    const nf_ids = csvDwnList.map((item) => `'${item}'`).join(",");
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
  }, [csvDwnList, rsk, setLD]);
  const handleCsvList = useCallback(async () => {
    setLD(true);
    let qryClmn;
    switch (rsk) {
      case "교통사고":
        qryClmn = "PEDAC_RK";
        break;
      case "재해사고":
        qryClmn = "FLOOD_RK";
        break;
      case "범죄사고":
        qryClmn = "CRIME_RK";
        break;
      case "밀집사고":
        qryClmn = "CRWDAC_RK";
        break;
      case "낙상사고":
        qryClmn = "FALLAC_RK";
        break;
      default:
        break;
    }
    const query = `select NF_ID from side9 order by ${qryClmn} desc limit 5;`;
    const response = await axios.get(
      `http://localhost:4000/getNFID/${query}` //  /getLength/${query}
    );
    setCsvDwnList(response.data);
    const csvList = response.data.map((item, id) => {
      return (
        <div className="rsk2a_csvdwn" onClick={() => handleCsvDwn(item)}>
          {handleNoIcon(id + 1)} {item} <FaExternalLinkAlt />
        </div>
      );
    });
    setCsvDiv(csvList);
    setLD(false);
  }, [handleNoIcon, rsk, setLD, handleCsvDwn]);
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
