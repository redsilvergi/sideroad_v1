import './AccrdGen1.css';
// import { useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CbxGen1 from '../auxiliary/CbxGen1';
import Yr from '../dropdowns/Yr';
import { useAuth } from '../../context/auth';
import useDb from '../../hooks/use-db';

// config ----------------------------------------------------------------------
const config = {
  인구현황: {
    colname: ['계/증감률', '어린이', '청장년', '노인'],
    keys: ['age0_12', 'age13_64', 'age65_200'],
    minmax: [0, 0],
    unit: '명',
    tablenm: 'pop',
  },
  도시면적: {
    colname: ['계/증감률', '면적'],
    keys: ['ar'],
    minmax: [2, 2],
    unit: 'km²',
    tablenm: 'city_area',
  },
  자동차등록대수: {
    colname: ['계/증감률', '사륜차', '이륜차'],
    keys: ['wheel4', 'wheel2'],
    minmax: [0, 0],
    unit: '대',
    tablenm: 'veh',
  },
  도로연장: {
    colname: ['계/증감률', '1차로', '2차로', '3차로 이상'],
    keys: ['lane1', 'lane2', 'lane3_more'],
    minmax: [0, 0],
    unit: 'km',
    tablenm: 'road_len',
  },
  보행연관시설물: {
    colname: ['계/증감률', '보도육고', '지하보도'],
    keys: ['overpass', 'underpass'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'ped_facil',
  },
  체육시설: {
    colname: ['계/증감률', '운동장', '체육관', '기타운동시설'],
    keys: ['field', 'gym', 'facils'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'sports',
  },
  문화집회시설: {
    colname: ['계/증감률', '공연장', '관람장', '동식물원', '전시장', '집회장'],
    keys: ['theater', 'auditorium', 'zoo', 'exhibit', 'hall'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'culture',
  },
  유통시설: {
    colname: ['계/증감률', '백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_no', 'sales_no', 'store_no', 'retail_no'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'dist',
  },
  유통시설면적: {
    colname: ['계/증감률', '백화점', '대형판매점', '대형점', '대규모소매점'],
    keys: ['dpt_tfa', 'sales_tfa', 'store_tfa', 'retail_tfa'],
    minmax: [0, 0],
    unit: 'km²',
    tablenm: 'dist',
  },
  공원시설: {
    colname: ['계/증감률', '근린공원', '소공원', '어린이공원'],
    keys: ['neigh_no', 'small_no', 'child_no'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'park',
  },
  공원시설면적: {
    colname: ['계/증감률', '근린공원', '소공원', '어린이공원'],
    keys: ['neigh_tfa', 'small_tfa', 'child_tfa'],
    minmax: [0, 0],
    unit: 'km²',
    tablenm: 'park',
  },
  보도없는도로: {
    colname: ['계/증감률', 'km'],
    keys: ['km'],
    minmax: [0, 0],
    unit: 'km',
    tablenm: 'no_sidewalk',
  },
  보행환경개선지구: {
    colname: ['계/증감률', '지구수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'ped_env',
  },
  보행자전용길: {
    colname: ['계/증감률', '전용길수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'ped_only',
  },
  보행자길: {
    colname: ['계/증감률', 'km'],
    keys: ['km'],
    minmax: [0, 0],
    unit: 'km',
    tablenm: 'ped_paths',
  },
  보행우선구역: {
    colname: ['계/증감률', '구역수'],
    keys: ['no'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'ped_priority',
  },
  보행자전용도로: {
    colname: ['계/증감률', '연장'],
    keys: ['length'],
    minmax: [0, 0],
    unit: 'km',
    tablenm: 'ped_roads',
  },
  보호구역: {
    colname: ['계/증감률', '노인/장애인', '어린이'],
    keys: ['old_dsbld', 'child'],
    minmax: [0, 0],
    unit: '개',
    tablenm: 'protected',
  },
  통행수단별: {
    colname: ['계/증감률', '보행', '자가용', '대중교통'],
    keys: ['walk', 'car', 'transit'],
    minmax: [0, 0],
    unit: '명',
    tablenm: 'travel_mode',
  },
  통행목적별: {
    colname: ['계/증감률', '업무', '출근', '등교', '귀가'],
    keys: ['work', 'commute', 'school', 'home'],
    minmax: [0, 0],
    unit: '명',
    tablenm: 'travel_purpose',
  },
  보도통행거리: {
    colname: ['계/증감률', '500m이내', '1000m이내', '3000m이내', '3000m이상'],
    keys: ['in500m', 'in1km', 'in3km', 'up3km'],
    minmax: [0, 0],
    unit: '개?',
    tablenm: 'walk_dist_behav',
  },
};

const AccrdGen1 = () => {
  // setup ----------------------------------------------------------------------
  const { gen, setGen, yr, ldcuid, genitem } = useInfo();
  const { user } = useAuth();
  const { getCsvGen1 } = useDb();
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

  const handleCsvClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    } else if (user.role !== 'admin') {
      alert('관리자만 다운로드 가능합니다.');
      return;
    } else if (user.role === 'admin') {
      const tablename = config[genitem].tablenm;
      getCsvGen1({
        yr: yr && yr.slice(0, 4),
        ldc: ldcuid && ldcuid[0],
        tablename: tablename,
      });
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
      {yr && ldcuid && (
        <div className="gen1_csvdl" onClick={handleCsvClick}>
          CSV 데이터 다운로드
        </div>
      )}
    </div>
  );
};

export default AccrdGen1;
