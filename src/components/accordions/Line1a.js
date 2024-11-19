import './Line1a.css';
import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Line1 from '../charts/Line1';
import useInfo from '../../hooks/use-info';

const Line1a = () => {
  const { yr, ldcuid } = useInfo();
  const [open, setOpen] = useState(true);
  // return ----------------------------------------------------------------------
  return (
    <div className="line1a_accitem">
      <div className="line1a_d1">
        <div className="line1a_d2" onClick={() => setOpen(!open)}>
          <div className="line1a_lbl">시계열변화</div>
          <div className="line1a_icon">{open ? <FiMinus /> : <FiPlus />}</div>
        </div>
        {yr && ldcuid && open ? (
          <div className="line1a_exp">
            <Line1 />
          </div>
        ) : (
          open && (
            <div className="line1a_exp line1a_exp_x">
              연도와 지역을 선택하세요
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Line1a;
