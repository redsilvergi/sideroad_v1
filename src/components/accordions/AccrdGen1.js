import './AccrdGen1.css';
// import { useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CbxGen1 from '../auxiliary/CbxGen1';
import Yr from '../dropdowns/Yr';

const AccrdGen1 = () => {
  // setup ----------------------------------------------------------------------
  const { gen, setGen } = useInfo();
  const checklists = [
    ['인구현황', '도시면적', '자동차등록대수', '도로연장', '보행연관시설물'],
    [
      '체육시설',
      '문화집회시설',
      '유통시설',
      '유통시설면적',
      '공원시설',
      '공원시설면적',
    ],
    [
      '보도없는도로',
      '보행환경개선지구',
      '보행자전용길',
      '보행자길',
      '보행우선구역',
      '보행자전용도로',
      '보호구역',
    ],
    ['통행수단별', '통행목적별', '보도통행거리'],
  ];

  // items ----------------------------------------------------------------------
  const items = [
    {
      id: '사회경제지표',
      label: '사회경제지표',
      content: (
        <div className="road roadItem">
          <CbxGen1 list={checklists[0]} />
        </div>
      ),
    },
    {
      id: '보행유발시설현황',
      label: '보행유발 시설현황',
      content: (
        <div className="lane roadItem">
          <CbxGen1 list={checklists[1]} />
        </div>
      ),
    },
    {
      id: '보행안전및편의증진항목',
      label: '보행안전 및 편의증진 항목',
      content: (
        <div className="road roadItem">
          <CbxGen1 list={checklists[2]} />
        </div>
      ),
    },
    {
      id: '통행행태',
      label: '통행행태',
      content: (
        <div className="road roadItem">
          <CbxGen1 list={checklists[3]} />
        </div>
      ),
    },
  ];

  //handles ----------------------------------------------------------------------
  const handleClick = (itemId) => {
    // setAccRsk2a(true);
    if (gen === itemId) {
      setGen(null);
    } else {
      setGen(itemId);
    }
  };

  //render ----------------------------------------------------------------------
  const renderedItems = items.map((item, index) => {
    const isExpanded = gen === item.id;

    return (
      <div key={item.id} className={`${item.id + '_accitem'}`}>
        {item.id === '위험구간' && <div className="gen1_line"></div>}
        <div
          className={`gen1_d1 ${item.id + '_gen1_d1'} ${
            gen === item.id && 'active'
          }`}
          onClick={() => handleClick(item.id)}
        >
          <div className={`genlbl ${gen === item.id && 'active'}`}>
            {item.label}
          </div>
          <div className={`gen1_icon ${gen === item.id && 'active'}`}>
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </div>
        </div>
        {isExpanded && (
          <div className={`gen1_expanded ${item.id + '_gen1_exp'}`}>
            {item.content}
          </div>
        )}
        {/* <div className="gen1_line"></div> */}
      </div>
    );
  });

  //return ----------------------------------------------------------------------
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
