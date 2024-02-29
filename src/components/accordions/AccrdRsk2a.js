import { useCallback, useEffect, useMemo, useState } from "react";
import "./AccrdRsk2a.css";
import useInfo from "../../hooks/use-info";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import { TbSquareRoundedNumber3Filled } from "react-icons/tb";
import { TbSquareRoundedNumber4Filled } from "react-icons/tb";
import { TbSquareRoundedNumber5Filled } from "react-icons/tb";
import useDb from "../../hooks/use-db";

const AccrdRsk2a = () => {
  // const [setExpandedIndex] = useState([0]);
  const { rsk, accRsk2a, setAccRsk2a } = useInfo();
  const [csvDiv, setCsvDiv] = useState(null);
  const [nfList, setNfList] = useState([]);
  const { getCord, getCsv, getTop5 } = useDb();

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
  // const getCsv = useCallback(async () => {
  //   setLD(true);
  //   // console.log("nfList: ", nfList);
  //   const nf_ids = nfList.map((item) => `'${item}'`).join(",");
  //   // console.log("nf_ids: ", nf_ids);
  //   const query = `select * from side10 where NF_ID in (${nf_ids})`;
  //   // console.log("query: ", query);
  //   const response = await axios.get(`http://localhost:4000/getCsv/${query}`);
  //   console.log("csvlistdwn: ", response.data);
  //   const csvContent =
  //     "data:test/csv;charset=utf-8," +
  //     response.data.map((row) => row.join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", `${rsk}_top5.csv`);
  //   document.body.appendChild(link); //required for firefox
  //   link.click();

  //   setLD(false);
  // }, [nfList, rsk, setLD]);
  const handleCsvList = useCallback(async () => {
    // let nfidLi;
    // switch (rsk) {
    //   case "교통사고":
    //     nfidLi = [
    //       "TRN18000000ABNXPA",
    //       "TRN18000000ABO0I7",
    //       "TRN18000000ABR06Y",
    //       "TRN18000000ABSSSD",
    //       "TRN18000000ABSUOB",
    //     ];
    //     break;
    //   case "재해사고":
    //     nfidLi = [
    //       "TRN18000000AB0FWC",
    //       "TRN18000000AB168G",
    //       "TRN18000000AB1F2J",
    //       "TRN18000000AB1IG0",
    //       "TRN18000000AC5NRL",
    //     ];
    //     break;
    //   case "범죄사고":
    //     nfidLi = [
    //       "TRN18000000MFIN3P",
    //       "TRN18000000AA2O5V",
    //       "TRN18000000AB1GWE",
    //       "TRN18000000AB1H5O",
    //       "TRN18000000AB1H6P",
    //     ];
    //     break;
    //   case "밀집사고":
    //     nfidLi = [
    //       "TRN18000000AA1WQN",
    //       "TRN18000000AA2HP8",
    //       "TRN18000000ABBI71",
    //       "TRN18000000ABBK73",
    //       "TRN18000000ABC0YB",
    //     ];
    //     break;
    //   case "낙상사고":
    //     nfidLi = [
    //       "TRN18000000AC7CN8",
    //       "TRN18000000LTW7PM",
    //       "TRN18000000LTWF6B",
    //       "TRN18000000LUO1L5",
    //       "TRN18000001ZRSD3F",
    //     ];
    //     break;
    //   default:
    //     break;
    // }
    const top5ObLi = await getTop5();
    // const top5 = top5ObLi.map((item, id) => {
    //   if (!item.road_nm) {
    //     return `NA (${item.nf_id})`;
    //   } else {
    //     return `${item.road_nm} (${item.nf_id})`;
    //   }
    // });
    console.log("top5ObLi: ", top5ObLi);
    const nfidLi = top5ObLi.map((item, id) => item.nf_id);
    setNfList(nfidLi);
    const csvList = top5ObLi.map((item, id) => {
      return (
        <div
          key={id}
          className="rsk2a_csvdwn"
          onClick={async () => await getCord(item["nf_id"])}
        >
          <div className="csvdwn_indside1">{handleNoIcon(id + 1)}</div>
          <div className="csvdwn_indside2">{`${
            item.road_nm ? item.road_nm : item["nf_id"]
          }`}</div>
          <div className="csvdwn_indside3">
            <FaExternalLinkAlt />
          </div>
        </div>
      );
    });
    setCsvDiv(csvList);
  }, [handleNoIcon, rsk, getCord, getTop5]);
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
            <div
              className="rsk2a_dwnld"
              onClick={async () => await getCsv(nfList)}
            >
              CSV 데이터 다운로드
            </div>
            <button onClick={getTop5}>tmp button</button>
          </div>
        )}
      </div>
    ) : (
      <div style={{ margin: "10px 0 10px 0" }}>아래 사고유형을 선택하세요</div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2a;
