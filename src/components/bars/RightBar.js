import './RightBar.css';
import React, { useEffect, useState } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import Rsrch from '../accordions/Rsrch';
import Rprp from '../accordions/Rprp';
import Rrsk from '../accordions/Rrsk';
import Line1a from '../accordions/Line1a';
import Bar2a from '../accordions/Bar2a';
import BottomR from '../auxiliary/BottomR';

const RightBar = () => {
  console.log(
    'rightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbarrightbar'
  );

  const { length, info, setLength, rsk, rnfo, pick, pnfo, bar } = useInfo();
  const { getLength } = useDb();
  const [renl, setRenL] = useState(
    <div className="lengthSum2 lengthReq2">선택구간연장요청</div>
  );
  //RENDER ITEMS-------------------------------------------------
  useEffect(() => {
    if (pick) {
      setLength(Math.round(pnfo.road_lt * 1000) / 1000000);
    } else {
      setLength(null);
    }
  }, [info, rnfo, pick, rsk, pnfo.road_lt, setLength]);
  useEffect(() => {
    if (length || length === 0) {
      setRenL(
        <div className="lngthS isLngth">
          <div className="lngthS_txt" style={{ color: 'black' }}>
            선택구간 연장
          </div>
          <div className="km">
            <span style={{ color: 'black', fontWeight: 800 }}>{length}</span> km
          </div>
        </div>
      );
    } else {
      setRenL(
        <div className="lngthS lngthReq" onClick={getLength}>
          <div className="lngthS_txt">선택구간 연장요청</div>
          <div className="km">--- km</div>
        </div>
      );
    }
  }, [length, getLength, info]);

  return (
    <div className="rightbar">
      <div className="rb_accordion_div">
        <div className="id_finder">
          <Rsrch />
        </div>
        <div className="separation">
          <div className="rb_line"></div>
          <div className="sep_txt">도로속성</div>
          <div className="rb_line"></div>
        </div>
        <div className="lngth_div">{renl}</div>
        {bar !== 1 && (
          <React.Fragment>
            <div className="rb_prp">
              <Rprp />
            </div>
            <div className="rb_rsk">
              <Rrsk />
            </div>
          </React.Fragment>
        )}
        {bar === 1 && (
          <React.Fragment>
            <div className="rb_line1">
              <Line1a />
            </div>
            <div className="rb_bar2">
              <Bar2a />
            </div>
          </React.Fragment>
        )}

        <BottomR />
      </div>
    </div>
  );
};

export default RightBar;
