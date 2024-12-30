import './Rpie.css';
import { useState, useCallback, useEffect } from 'react';
// import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Pie1 from '../charts/Pie1';
import useDb from '../../hooks/use-db';
import useInfo from '../../hooks/use-info';

const Rpie = ({ name, col, opt }) => {
  // setup ----------------------------------------------------------------------
  const { getPie1 } = useDb();
  const { bar, ldcuid } = useInfo();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const fetchData = useCallback(async () => {
    const datafetched = await getPie1(col, ldcuid ? ldcuid[4] : null);
    // console.log('data\n', datafetched);
    setData(datafetched);
  }, [col, getPie1, ldcuid]);

  //ueseffect ----------------------------------------------------------------------
  useEffect(() => {
    if (bar === 4) {
      if (name === '도로폭원') {
        fetchData();
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [bar, ldcuid, name, fetchData]);

  // auxiliary ----------------------------------------------------------------------
  const handleOpen = useCallback(async () => {
    if (!open) {
      fetchData();
    }
    setOpen(!open);
  }, [open, fetchData]);

  const colors = ['#8B6ECC', '#9DEA8C', '#84B1FA', '#2EC4B6', '#007EDD'];

  // return ----------------------------------------------------------------------
  return (
    <div className="rpie_accitem">
      <div className="rpie_d1">
        {!open ? (
          <div className="rpie_d2_x" onClick={handleOpen}>
            <div className="rpie_lbl">{name}</div>
            <div className="rpie_icon">
              <FiPlus />
            </div>
          </div>
        ) : (
          <div className="rpie_d2" onClick={handleOpen}>
            <div className="rpie_lbl">{name}</div>
            <div className="rpie_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        )}
        {open && (
          <div className="rpie_exp">
            <div className="rpie_chart">
              {data && <Pie1 data={data} colors={colors} />}
            </div>
            {data &&
              data.map((item, id) => {
                return (
                  <div key={id} className="rpie_leg">
                    <div
                      className="rpie_color_lbl"
                      style={{ backgroundColor: `${colors[id]}` }}
                    ></div>
                    <p className="rpie_leg_lbl">{opt[id]}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rpie;
