import './AccrdGen1.css';
// import { useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CbxGen1 from '../auxiliary/CbxGen1';
import AccrdRsk2b from './AccrdRsk2b';
import Yr from '../dropdowns/Yr';

const AccrdGen1 = () => {
  const { gen, setGen } = useInfo();

  // const [expandedIndex, setExpandedIndex] = useState([0, 1]);
  // checklist ----------------------------------------------------------------------
  const checklist = [
    {
      name: '사회경제지표',
      options: [
        '인구현황',
        '도시면적',
        '자동차등록대수',
        '도로연장',
        '보행연관시설물',
      ],
      // updateInfo: (sel, chb) =>
      //   setRnfo((prev) => ({
      //     ...prev,
      //     rskOps: { ...prev.rskOps, selected: sel, checkboxes: chb },
      //   })),
    },
  ];

  // items ----------------------------------------------------------------------
  const items = [
    {
      id: '사회경제지표',
      label: '사회경제지표',
      content: (
        <div className="road roadItem">
          <CbxGen1 name={'사회경제지표'} checklist={checklist} />
        </div>
      ),
    },
    {
      id: '보행유발시설현황',
      label: '보행유발 시설현황',
      content: (
        <div className="lane roadItem">
          <AccrdRsk2b />
        </div>
      ),
    },
    {
      id: '보행안전및편의증진항목',
      label: '보행안전 및 편의증진 항목',
      content: <div className="road roadItem">{/* <AccrdRsk2a /> */}</div>,
    },
    {
      id: '통행행태',
      label: '통행행태',
      content: <div className="lane roadItem">{/* <AccrdRsk2b /> */}</div>,
    },
  ];

  // const updateInfoState = (nextIndex) => {
  //   switch (items[nextIndex].id) {
  //     case '유형별위험도구성비':
  //       setRsk(null);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  //handles ----------------------------------------------------------------------
  const handleClick = (itemId) => {
    // setAccRsk2a(true);
    if (gen === itemId) {
      setGen(null);
    } else {
      setGen(itemId);
    }
    // reset();
  };

  // const mover = () => {
  //   setTmpDv(true);
  // };

  // const mout = () => {
  //   setTmpDv(false);
  // };

  // const handleClick = (nextIndex) => {
  //   setExpandedIndex((currentExpandedIndex) => {
  //     if (currentExpandedIndex.includes(nextIndex)) {
  //       updateInfoState(nextIndex);
  //       return currentExpandedIndex.filter((item) => item !== nextIndex);
  //     } else {
  //       return [...currentExpandedIndex, nextIndex];
  //     }
  //   });
  //   if (nextIndex === 1) {
  //     reset();
  //   }
  // };

  //return ----------------------------------------------------------------------
  const renderedItems = items.map((item, index) => {
    const isExpanded = gen === item.id;

    return (
      <div key={item.id} className={`${item.id + '_accitem'}`}>
        {item.id === '위험구간' && <div className="gen1_line"></div>}
        <div
          className={`gen1_d1 ${item.id + '_gen1_d1'}`}
          onClick={() => handleClick(item.id)}
        >
          <div className="genlbl">{item.label}</div>
          <div className="gen1_icon">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`gen1_expanded ${item.id + '_gen1_exp'}`}>
            {item.content}
          </div>
        )}
        <div className="gen1_line"></div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <Yr />
      </div>
      <div className={`accordion`}>{renderedItems}</div>
    </div>
  );
};

export default AccrdGen1;
