// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import './AccrdRsk2a.css';
// import useInfo from '../../hooks/use-info';
// import { FiPlus, FiMinus } from 'react-icons/fi';
// import { FaExternalLinkAlt } from 'react-icons/fa';
// import { TbSquareRoundedNumber1Filled } from 'react-icons/tb';
// import { TbSquareRoundedNumber2Filled } from 'react-icons/tb';
// import { TbSquareRoundedNumber3Filled } from 'react-icons/tb';
// import { TbSquareRoundedNumber4Filled } from 'react-icons/tb';
// import { TbSquareRoundedNumber5Filled } from 'react-icons/tb';
// import useDb from '../../hooks/use-db';

// const AccrdRsk2a = React.memo(() => {
//   // setup ----------------------------------------------------------------------
//   const { rsk, accRsk2a, setAccRsk2a, ldcuid } = useInfo();
//   const [csvDiv, setCsvDiv] = useState(null);
//   const [nfList, setNfList] = useState([]);
//   const { getLinkProp, getCsv, getTop5 } = useDb();

//   // auxiliary ----------------------------------------------------------------------
//   const components = useMemo(() => {
//     return {
//       TbSquareRoundedNumber1Filled,
//       TbSquareRoundedNumber2Filled,
//       TbSquareRoundedNumber3Filled,
//       TbSquareRoundedNumber4Filled,
//       TbSquareRoundedNumber5Filled,
//     };
//   }, []);
//   const handleNoIcon = useCallback(
//     (no) => {
//       const string = `TbSquareRoundedNumber${no}Filled`;
//       const Component = components[string];
//       return <Component className="rsk2a_comp" />;
//     },
//     [components]
//   );
//   const handleCsvList = useCallback(async () => {
//     const top5ObLi = await getTop5();
//     // console.log("top5ObLi: ", top5ObLi);
//     const nfidLi = top5ObLi.map((item, id) => item.nf_id);
//     setNfList(nfidLi);
//     const csvList = top5ObLi.map((item, id) => {
//       return (
//         <div
//           key={id}
//           className="rsk2a_csvdwn"
//           onClick={async () => await getLinkProp(item['nf_id'])}
//         >
//           <div className="csvdwn_indside1">{handleNoIcon(id + 1)}</div>
//           <div className="csvdwn_indside2">{`${
//             item.road_nm ? item.road_nm : item['nf_id']
//           }`}</div>
//           <div className="csvdwn_indside3">
//             <FaExternalLinkAlt />
//           </div>
//         </div>
//       );
//     });
//     setCsvDiv(csvList);
//   }, [handleNoIcon, getLinkProp, getTop5]);

//   // useeffect ----------------------------------------------------------------------
//   useEffect(() => {
//     setCsvDiv(null);
//   }, [rsk, ldcuid]);

//   // items ----------------------------------------------------------------------
//   const items = [
//     {
//       id: rsk,
//       label: rsk,
//       content: csvDiv,
//     },
//   ];

//   // renderfunc ----------------------------------------------------------------------
//   const renderedItems = items.map((item, index) => {
//     return rsk ? (
//       !csvDiv ? (
//         <div key={item.id} className="rsk2a_top5req" onClick={handleCsvList}>
//           TOP5 요청
//         </div>
//       ) : (
//         <div key={item.id} className={`${item.id + '_rsk2a_accitem'}`}>
//           <div
//             className={`rsk2a_d1 ${item.id + '_rsk2a_d1'}`}
//             onClick={() => setAccRsk2a(!accRsk2a)}
//           >
//             <div className="rsk2a_label">{item.label}</div>
//             <div className="rsk2a_line"></div>
//             <div className="rsk2a_icon">
//               {accRsk2a ? <FiMinus /> : <FiPlus />}
//             </div>
//           </div>
//           {accRsk2a && (
//             <div className={`rsk2a_expanded ${item.id + '_rsk2a_exp'}`}>
//               {item.content}
//               <div
//                 className="rsk2a_dwnld"
//                 onClick={async () => await getCsv(nfList)}
//               >
//                 CSV 데이터 다운로드
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     ) : (
//       <div style={{ margin: '10px 0 10px 0' }}>아래 사고유형을 선택하세요</div>
//     );
//   });

//   // return ----------------------------------------------------------------------
//   return <div className={`accordion`}>{renderedItems}</div>;
// });

// export default AccrdRsk2a;
