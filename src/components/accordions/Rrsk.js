import './Rrsk.css';
import { useEffect, useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';
import Bar4 from '../charts/Bar4';

const Rrsk = () => {
  const { pick, pnfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState({
    acc1: false,
    acc2: false,
  });
  const [scr, setScr] = useState({
    scr1: null,
    scr2: null,
  });

  const labels = ['매우좋음', '좋음', '보통', '나쁨', '매우나쁨'];

  ////
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pick && pnfo) {
      setOpen(true);
      setAcc({
        acc1: true,
        acc2: true,
      });
      setScr({
        scr1: 5 - pnfo.pedac_rk,
        scr2: 5 - pnfo.pred,
      });
    } else {
      setOpen(false);
      setAcc({
        acc1: false,
        acc2: false,
      });
      setScr({
        scr1: null,
        scr2: null,
      });
    }
  }, [pick, pnfo]);
  ////////////////////////////////////////////////////////////
  const cnvrtRate = (no) => {
    const int = parseInt(no);
    switch (int) {
      case 1:
        return 5;
      case 2:
        return 4;
      case 3:
        return 3;
      case 4:
        return 2;
      case 5:
        return 1;
      default:
        break;
    }
  };
  ////////////////////////////////////////////////////////////
  return (
    <div className="rrsk_accitem">
      <div className="rrsk_d1">
        {!pick ? (
          <div className="rrsk_d2_x">
            <div className="rrsk_lbl">개별 구간 보행환경개선 사업 적합도</div>
            <div className="rrsk_icon">
              <FiPlus />
            </div>
          </div>
        ) : (
          <div className="rrsk_d2" onClick={() => setOpen(!open)}>
            <div className="rrsk_lbl">개별 구간 보행환경개선 사업 적합도</div>
            <div className="rrsk_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        )}
        {pick && open && (
          <div className="rrsk_exp">
            <div className="rrsk_wrap">
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc1: !acc.acc1 }))
                  }
                >
                  <div className="rrsk_acc_lbl">보행환경개선 사업 적합도</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc1 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc1 && <div className="rrsk_line"></div>}

                {acc.acc1 && (
                  <div>
                    <div className="rrsk_acc1_exp">
                      <div className="rrsk_scr_wrap">
                        <div className="rrsk_scr_container">
                          {labels.map((item, id) => (
                            <div key={id} className="rrsk_scr_no_lbl">
                              <div className="indctr_wrap">
                                <div className="indcatr">
                                  {cnvrtRate(scr.scr1) === id + 1 && (
                                    <div className="indcatr_inwrap">
                                      <div className="indcatr_lbl_up">현황</div>
                                      <RxTriangleDown className="indcatr_trngl_up" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={`rrsk_scr_item ritem${id + 1}`}>
                                {id + 1}
                              </div>
                              <div className="indctr_wrap">
                                <div className="indcatr">
                                  {cnvrtRate(scr.scr2) === id + 1 && (
                                    <div className="indcatr_inwrap">
                                      <RxTriangleUp className="indcatr_trngl_down" />
                                      <div className="indcatr_lbl_down">
                                        평가
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rrsk_scr_lbl_wrap">
                      {labels.map((item, id) => (
                        <div
                          key={id}
                          className={`rrsk_scr_lbl rrsk_scrlbl${id + 1}`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc2: !acc.acc2 }))
                  }
                >
                  <div className="rrsk_acc_lbl">사업 적합도 요인 분석</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc2 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc2 && <div className="rrsk_line"></div>}

                {acc.acc2 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_anlys_mean">
                      이 차트는 보행환경 양호도 평가결과를 바탕으로 구간별
                      보행환경개선 사업의 방향을 설명합니다. 적색막대는
                      보행환경개선 사업에서 우선순위로 검토할 필요가 있는 요인을
                      의미합니다. 막대의 길이는 요인별 중요성을 나타냅니다.
                    </div>
                    <div className="rrsk_anlys">
                      <Bar4 />
                    </div>
                  </div>
                )}
                <div className="rrsk_line"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rrsk;
