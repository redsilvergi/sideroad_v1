import { useEffect, useState } from 'react';
import './AccrdRsk2b.css';
import useInfo from '../../hooks/use-info';
import CbxRsk from '../auxiliary/CbxRsk';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Bar3 from '../charts/Bar3';
// import Barchart from '../tools/Barchart';
// import { BsQuestionCircleFill } from 'react-icons/bs';

const AccrdRsk2b = () => {
  // setup ----------------------------------------------------------------------
  const { rnfo0, rnfo1, setRnfo0, setRnfo1 } = useInfo();
  // const [tmpDv, setTmpDv] = useState(false);
  const [exp, setExp] = useState([true, false]);
  // console.log('topexptopexp\n', topexp);

  // items ----------------------------------------------------------------------
  const checklists = [
    ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'],
    ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'],
  ];

  const items = [
    {
      id: '교통사고위험도현황',
      label: '교통사고 위험도 현황',
      content: (
        <div className="crwdac">
          <Bar3 />
          <CbxRsk
            list={checklists[0]}
            rnfo={rnfo0}
            setRnfo={setRnfo0}
            exp={exp}
          />
        </div>
      ),
    },
    {
      id: '교통사고위험도예측',
      label: '교통사고 위험도 예측',
      content: (
        <div className="crwdac">
          <Bar3 />
          <CbxRsk
            list={checklists[1]}
            rnfo={rnfo1}
            setRnfo={setRnfo1}
            exp={exp}
          />
        </div>
      ),
    },
  ];
  // useeffect ----------------------------------------------------------------------
  // useEffect(() => {
  //   if (topexp[0]) {
  //     setExp([true, false]);
  //   } else if (!topexp[0]) {
  //     setExp([false, false]);
  //   }
  // }, [topexp]);
  useEffect(() => {
    if (exp[0] & exp[1]) {
      setRnfo0([false, false, false, false, true]);
      setRnfo1([false, false, false, false, true]);
    } else if (exp[0] & !exp[1]) {
      setRnfo0([true, true, true, true, true]);
      setRnfo1(null);
    } else if (!exp[0] & exp[1]) {
      setRnfo0(null);
      setRnfo1([true, true, true, true, true]);
    } else if (!exp[0] & !exp[1]) {
      setRnfo0(null);
      setRnfo1(null);
    }
  }, [exp, setRnfo0, setRnfo1]);

  // handle ----------------------------------------------------------------------
  const handleClick = (id) => {
    setExp((prev) => {
      const newExp = [...prev];
      newExp[id] = !newExp[id];
      return newExp;
    });
  };
  // const mover = () => {
  //   setTmpDv(true);
  // };
  // const mout = () => {
  //   setTmpDv(false);
  // };

  // renderfunc ----------------------------------------------------------------------
  const renderedItems = items.map((item, id) => {
    // const isExpanded = rsk === item.id;

    return (
      <div key={item.id} className="rsk2b_accitem">
        <div
          className={`rsk2b_d1 ${exp[id] && 'active'}`}
          onClick={() => handleClick(id)}
        >
          <div className={`rsk2b_label ${exp[id] && 'active'}`}>
            {item.label}
          </div>
          <div className={`rsk2b_icon ${exp[id] && 'active'}`}>
            {exp[id] ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {exp[id] && <div className="rsk2b_expanded">{item.content}</div>}
      </div>
    );
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
};

export default AccrdRsk2b;

// const renderedItems = items.map((item, id) => {
//   // const isExpanded = rsk === item.id;

//   return (
//     <div key={item.id} className="rsk2b_accitem">
//       <div className="rsk2b_d1" onClick={() => handleClick(id)}>
//         {/* {item.label === '교통사고' ? (
//           <div className="rsk2b_label">
//             {item.label}&nbsp;
//             <div className="rsk2b_qmrk" onMouseOver={mover} onMouseOut={mout}>
//               <BsQuestionCircleFill />
//             </div>
//             {tmpDv && (
//               <div className={`rsk2b_qmrk_div ${!rsk && 'rsk2b_qmrk_div2'}`}>
//                 <div className="rsk2b_qmrk_txt1">
//                   ※ 교통사고 위험도 산출 방식
//                 </div>
//                 <div className="rsk2b_qmrk_txt2">
//                   각 도로구간에서 발생한 보행자 교통사고 심각도에 기반,
//                   '최소인명피해환산계수' EMI (Equivalent Minor Injuries)를
//                   산출하고 이를 다시 사망자 계수(70.2)로 나눈{' '}
//                   <span>'총 사망자수 환산값'</span>을 사고위험도 지표로
//                   활용하였습니다.
//                 </div>
//                 <div className="rsk2b_qmrk_txt3">
//                   교통사고 위험도(EMId) = (사망자수 × 70.2 + 중상자수 × 13.46
//                   + 경상자수 × 1.26 + 부상신고자수 × 1) ÷ 70.2
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="rsk2b_label">{item.label}</div>
//         )} */}
//         <div className="rsk2b_label">{item.label}</div>
//         {/* <div className="rsk2b_line"></div> */}
//         <div className="rsk2b_icon">{exp[id] ? <FiMinus /> : <FiPlus />}</div>
//       </div>
//       {exp[id] && <div className="rsk2b_expanded">{item.content}</div>}
//     </div>
//   );
// });
