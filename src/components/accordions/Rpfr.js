import './Rpfr.css';
import { useEffect, useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Rpfr = () => {
  const { pfrInfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc1, setAcc1] = useState(false);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pfrInfo) {
      setOpen(true);
      setAcc1(true);
    } else {
      setOpen(false);
      setAcc1(false);
    }
  }, [pfrInfo]);
  ////////////////////////////////////////////////////////////
  return (
    <div className="rpfr_accitem">
      <div className="rpfr_d1">
        {!pfrInfo ? (
          <div className="rpfr_d2_x">
            <div className="rpfr_lbl">보행자우선도로 속성</div>
            <div className="rpfr_icon">
              <FiPlus />
            </div>
          </div>
        ) : (
          <div className="rpfr_d2" onClick={() => setOpen(!open)}>
            <div className="rpfr_lbl">보행자우선도로 속성</div>
            <div className="rpfr_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        )}
        {pfrInfo && open && (
          <div className="rpfr_exp">
            <div className="rpfr_wrap">
              <div className="rpfr_acc_d1">
                <div className="rpfr_line"></div>

                <div className="rpfr_acc_d2" onClick={() => setAcc1(!acc1)}>
                  <div className="rpfr_acc_lbl">지정도로속성</div>
                  <div className="rpfr_acc_icon">
                    {acc1 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc1 && <div className="rpfr_line"></div>}

                {acc1 && (
                  <div className="rpfr_acc1_exp">
                    <div className="rpfr_itms1">
                      <div
                        className="rpfr_itm1"
                        style={{ margin: '5px 0 0 0' }}
                      >
                        <div className="rpfr_itm1_ttl">· 지정일자</div>
                        <div className="rpfr_itm1_val">
                          {pfrInfo.reg_dt
                            ? `${pfrInfo.reg_dt.slice(
                                0,
                                4
                              )}년 ${pfrInfo.reg_dt.slice(
                                4,
                                6
                              )}월 ${pfrInfo.reg_dt.slice(6, 8)}일`
                            : '---'}
                        </div>
                      </div>
                      <div className="rpfr_itm1">
                        <div className="rpfr_itm1_ttl">· 지정목적</div>
                        <div
                          className="rpfr_itm1_val"
                          style={{
                            maxWidth: '60%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={pfrInfo.purpose}
                        >
                          {pfrInfo.purpose ?? '---'}
                        </div>
                      </div>
                      <div className="rpfr_itm1">
                        <div className="rpfr_itm1_ttl">· 보호구역</div>
                        <div className="rpfr_itm1_val">
                          {pfrInfo.safe_zone
                            ? pfrInfo.safe_zone === 'Y'
                              ? '있음'
                              : '없음'
                            : '---'}
                        </div>
                      </div>
                      <div className="rpfr_itm1">
                        <div className="rpfr_itm1_ttl">· 일방통행</div>
                        <div className="rpfr_itm1_val">
                          {pfrInfo.one_way
                            ? pfrInfo.one_way === 'Y'
                              ? '있음'
                              : '없음'
                            : '---'}
                        </div>
                      </div>
                      <div className="rpfr_itm1">
                        <div className="rpfr_itm1_ttl">· 제한속도</div>
                        <div className="rpfr_itm1_val">
                          {pfrInfo.spd_lmt ? `${pfrInfo.spd_lmt}km/h` : '---'}
                        </div>
                      </div>
                      <div className="rpfr_itm1">
                        <div className="rpfr_itm1_ttl">· 구간길이</div>
                        <div className="rpfr_itm1_val">
                          {pfrInfo.h_len ? `${pfrInfo.h_len}m` : '---'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rpfr;
