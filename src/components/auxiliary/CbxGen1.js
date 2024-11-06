import './CbxGen1.css';
import React, { useEffect, useRef } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';

const CbxGen1 = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;
  const { yr, ldcuid, genitem, setGenitem } = useInfo();
  const { getEcon } = useDb();

  // useEffect ----------------------------------------------------------------------
  useEffect(() => {
    setGenitem('인구현황');
  }, [setGenitem]);
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
            {index !== list.length - 1 ? (
              <div className="gen1_chk_item">
                <div className={`gen1C gen1Cbox${index}`}></div> {item}
              </div>
            ) : (
              <div className="gen1_chk_item" style={{ marginBottom: '13px' }}>
                {item}
              </div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxGen1;
