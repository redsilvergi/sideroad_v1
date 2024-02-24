import "./Rprp.css";
import { useEffect, useState } from "react";
import useInfo from "../../hooks/use-info";
import { FiPlus, FiMinus } from "react-icons/fi";

const Rprp = () => {
  const { pick, pnfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pick) {
      setOpen(true);
      setAcc1(true);
      setAcc2(true);
    } else {
      setOpen(false);
      setAcc1(false);
      setAcc2(false);
    }
  }, [pick]);
  ////////////////////////////////////////////////////////////
  return (
    <div className="rprp_accitem">
      <div className="rprp_d1">
        {!pick ? (
          <div className="rprp_d2_x">
            <div className="rprp_lbl">개별 구간 도로 속성</div>
            <div className="rprp_icon">
              <FiPlus />
            </div>
          </div>
        ) : (
          <div className="rprp_d2" onClick={() => setOpen(!open)}>
            <div className="rprp_lbl">개별 구간 도로 속성</div>
            <div className="rprp_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        )}
        {pick && open && (
          <div className="rprp_exp">
            <div className="rprp_wrap">
              <div className="rprp_acc_d1">
                <div className="rprp_line"></div>

                <div className="rprp_acc_d2" onClick={() => setAcc1(!acc1)}>
                  <div className="rprp_acc_lbl">기본속성</div>
                  <div className="rprp_acc_icon">
                    {acc1 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc1 && <div className="rprp_line"></div>}

                {acc1 && (
                  <div className="rprp_acc1_exp">
                    <div className="rprp_itms1">
                      <div className="rprp_itm1">
                        <div>■ 도로구분</div>
                        <div>{pnfo.road_se}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div>■ 차로수</div>
                        <div>{pnfo.cartrk_co}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div>■ 도로폭</div>
                        <div>{pnfo.road_bt}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div>■ 포장재질</div>
                        <div>{pnfo.pmtr_se}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div>■ 통행방향</div>
                        <div>{pnfo.osps_se}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div>■ 구간 길이</div>
                        <div>{pnfo.road_lt}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rprp_acc_d1">
                <div className="rprp_line"></div>

                <div className="rprp_acc_d2" onClick={() => setAcc2(!acc2)}>
                  <div className="rprp_acc_lbl">융합속성</div>
                  <div className="rprp_acc_icon">
                    {acc2 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                <div className="rprp_line"></div>

                {acc2 && (
                  <div className="rprp_acc2_exp">
                    <div className="rprp_itms2">
                      <div className="rprp_itm2_sqr">
                        <div className="rprp_itms2_ttl">■ 도로기하</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div>- 경사도</div>
                            <div>{pnfo.slope_lg}</div>
                          </div>
                          <div className="rprp_itm2">
                            <div>- 보도설치 여부</div>
                            <div>{pnfo.sdwk_se}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itm2_sqr">
                        <div className="rprp_itms2_ttl">■ 네트워크</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div>- 중심성</div>
                            <div>{pnfo.rdnet_ac}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itm2_sqr">
                        <div className="rprp_itms2_ttl">■ 토지이용</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div>- 용도별 연면적</div>
                            <div>{pnfo.pbuld_fa}</div>
                          </div>
                          <div className="rprp_itm2">
                            <div>- 건물출입구밀도</div>
                            <div>{pnfo.bulde_de}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itm2_sqr">
                        <div className="rprp_itms2_ttl">■ 시설물</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div>- 대중교통</div>
                            <div>{pnfo.pubtr_ac}</div>
                          </div>
                          <div className="rprp_itm2">
                            <div>- 계단</div>
                            <div>{pnfo.stair_at}</div>
                          </div>
                          <div className="rprp_itm2">
                            <div>- 분리대</div>
                            <div>{pnfo.edennc_at === 1 ? "유" : "무"}</div>
                          </div>
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

export default Rprp;
