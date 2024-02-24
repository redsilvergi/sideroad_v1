import "./Rrsk.css";
import { useEffect, useState } from "react";
import useInfo from "../../hooks/use-info";
import { FiPlus, FiMinus } from "react-icons/fi";

const Rrsk = () => {
  const { pick, pnfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);

  ////
  const [rating, setRating] = useState(3); // Default rating
  const labels = ["매우좋음", "좋음", "보통", "나쁨", "매우나쁨"];

  ////
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
    <div className="rrsk_accitem">
      <div className="rrsk_d1">
        {!pick ? (
          <div className="rrsk_d2_x">
            <div className="rrsk_lbl">개별 구간 사고위험도</div>
            <div className="rrsk_icon">
              <FiPlus />
            </div>
          </div>
        ) : (
          <div className="rrsk_d2" onClick={() => setOpen(!open)}>
            <div className="rrsk_lbl">개별 구간 사고위험도</div>
            <div className="rrsk_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        )}
        {pick && open && (
          <div className="rrsk_exp">
            <div className="rrsk_wrap">
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div className="rrsk_acc_d2" onClick={() => setAcc1(!acc1)}>
                  <div className="rrsk_acc_lbl">교통사고</div>
                  <div className="rrsk_acc_icon">
                    {acc1 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc1 && <div className="rrsk_line"></div>}

                {acc1 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rating_wrap">
                      <div className="rating-container">
                        {labels.map((label, index) => (
                          <div className="rating_no_lbl">
                            <div
                              key={index}
                              className={`rating-item ritem${index + 1}`}
                            >
                              <div className="rating-number">{index + 1}</div>
                            </div>
                            <div className={`rating-lbl ratinglbl${index + 1}`}>
                              {label}
                            </div>
                          </div>
                        ))}
                        <div
                          className="rating-indicator"
                          style={{ left: `${rating * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div className="rrsk_acc_d2" onClick={() => setAcc2(!acc2)}>
                  <div className="rrsk_acc_lbl">재해사고</div>
                  <div className="rrsk_acc_icon">
                    {acc2 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                <div className="rrsk_line"></div>

                {acc2 && (
                  <div className="rrsk_acc2_exp">
                    <div className="rrsk_itms2">
                      <div className="rrsk_itm2_sqr">
                        <div className="rrsk_itms2_ttl">■ 도로기하</div>
                        <div className="rrsk_itms2_cnt">
                          <div className="rrsk_itm2">
                            <div>- 경사도</div>
                            <div>{pnfo.slope_lg}</div>
                          </div>
                          <div className="rrsk_itm2">
                            <div>- 보도설치 여부</div>
                            <div>{pnfo.sdwk_se}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rrsk_itm2_sqr">
                        <div className="rrsk_itms2_ttl">■ 네트워크</div>
                        <div className="rrsk_itms2_cnt">
                          <div className="rrsk_itm2">
                            <div>- 중심성</div>
                            <div>{pnfo.rdnet_ac}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rrsk_itm2_sqr">
                        <div className="rrsk_itms2_ttl">■ 토지이용</div>
                        <div className="rrsk_itms2_cnt">
                          <div className="rrsk_itm2">
                            <div>- 용도별 연면적</div>
                            <div>{pnfo.pbuld_fa}</div>
                          </div>
                          <div className="rrsk_itm2">
                            <div>- 건물출입구밀도</div>
                            <div>{pnfo.bulde_de}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rrsk_itm2_sqr">
                        <div className="rrsk_itms2_ttl">■ 시설물</div>
                        <div className="rrsk_itms2_cnt">
                          <div className="rrsk_itm2">
                            <div>- 대중교통</div>
                            <div>{pnfo.pubtr_ac}</div>
                          </div>
                          <div className="rrsk_itm2">
                            <div>- 계단</div>
                            <div>{pnfo.stair_at}</div>
                          </div>
                          <div className="rrsk_itm2">
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

export default Rrsk;
