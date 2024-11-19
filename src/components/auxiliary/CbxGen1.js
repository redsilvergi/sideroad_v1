import './CbxGen1.css';
import React, { useEffect } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';

const CbxGen1 = ({ list }) => {
  // const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  // const obj = objRef.current
  // const list = obj.options;
  const { yr, ldcuid, genitem, setGenitem, gen } = useInfo();
  const { getEcon } = useDb();

  // useEffect ----------------------------------------------------------------------
  useEffect(() => {
    switch (gen) {
      case '사회경제지표':
        setGenitem('인구현황');
        break;
      case '보행유발시설현황':
        setGenitem('체육시설');
        break;
      case '보행안전및편의증진항목':
        setGenitem('보도없는도로');
        break;
      case '통행행태':
        setGenitem('통행수단별');
        break;
      default:
        break;
    }
  }, [setGenitem, gen]);
  useEffect(() => {
    var genitem2;
    switch (genitem) {
      case '인구현황':
        genitem2 = 'pop';
        break;
      case '도시면적':
        genitem2 = 'city_area';
        break;
      case '자동차등록대수':
        genitem2 = 'veh';
        break;
      case '도로연장':
        genitem2 = 'road_len';
        break;
      case '보행연관시설물':
        genitem2 = 'ped_facil';
        break;
      case '체육시설':
        genitem2 = 'sports';
        break;
      case '문화집회시설':
        genitem2 = 'culture';
        break;
      case '유통시설':
        genitem2 = 'dist';
        break;
      case '유통시설면적':
        genitem2 = 'dist';
        break;
      case '공원시설':
        genitem2 = 'park';
        break;
      case '공원시설면적':
        genitem2 = 'park';
        break;
      case '보호구역':
        genitem2 = 'protected';
        break;
      case '보행환경개선지구':
        genitem2 = 'ped_env';
        break;
      case '보행자전용길':
        genitem2 = 'ped_only';
        break;
      case '보행우선구역':
        genitem2 = 'ped_priority';
        break;
      case '보행자길':
        genitem2 = 'ped_paths';
        break;
      case '보행자전용도로':
        genitem2 = 'ped_roads';
        break;
      case '보도없는도로':
        genitem2 = 'no_sidewalk';
        break;
      case '통행수단별':
        genitem2 = 'travel_mode';
        break;
      case '통행목적별':
        genitem2 = 'travel_purpose';
        break;
      case '보도통행거리':
        genitem2 = 'walk_dist_behav';
        break;
      default:
        break;
    }
    var ldc = ldcuid && ldcuid[0]; //table with new ldc as of 2024/10
    var yr2 = yr && yr.slice(0, 4);

    getEcon(genitem2, ldc, yr2);
  }, [genitem, yr, ldcuid, getEcon]);

  // return ----------------------------------------------------------------------
  return (
    <form>
      {list.map((item, index) => (
        <div key={`checkbox${index + 1}`}>
          <label className="gen1_chk_lb">
            <input
              className="gen1_custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={genitem === list[index]}
              onChange={() => setGenitem(list[index])}
            />
            <div className="gen1_chk_item">
              <div className={`gen1C gen1Cbox${index}`}></div>
              <div className="gen1_chk_word">{item}</div>
            </div>
            {/* {index !== list.length - 1 ? (
              <div className="gen1_chk_item">
                <div className={`gen1C gen1Cbox${index}`}></div> {item}
              </div>
            ) : (
              <div className="gen1_chk_item" style={{ marginBottom: '13px' }}>
                {item}
              </div>
            )} */}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxGen1;
