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
  const roadSeTxt = (val) => {
    switch (val) {
      case "RDC003":
        return "지방도";
      case "RDC004":
        return "특별시도";
      case "RDC005":
        return "광역시도";
      case "RDC006":
        return "시도";
      case "RDC007":
        return "군도";
      case "RDC008":
        return "구도";
      case "RDC010":
        return "면리간도로";
      case "RDC011":
        return "부지안도로";
      case "RDC014":
        return "소로";
      default:
        break;
    }
  };
  const pmtrSeTxt = (val) => {
    switch (val) {
      case "PVM001":
        return "아스팔트";
      case "PVM002":
        return "아스팔트콘크리트";
      case "PVM003":
        return "콘트리트";
      case "PVM004":
        return "블록";
      case "PVM005":
        return "비포장";
      case "PVM006":
        return "우레탄";
      case "PVM007":
        return "고무";
      case "PVM999":
        return "기타";
      default:
        break;
    }
  };
  const ospsSeTxt = (val) => {
    switch (val) {
      case "OWI001":
        return "일방통행";
      case "OWI002":
        return "양방통행";
      default:
        break;
    }
  };
  const sdwkSeTxt = (val) => {
    switch (val) {
      case "SDW001":
        return "미설치";
      case "SDW002":
        return "단측";
      case "SDW003":
        return "양측";
      default:
        break;
    }
  };
  const stairAtTxt = (val) => {
    switch (val) {
      case "0":
        return "미설치";
      case "1":
        return "설치";
      default:
        break;
    }
  };
  const edenncAtTxt = (val) => {
    switch (val) {
      case "0":
        return "무";
      case "1":
        return "유";
      default:
        break;
    }
  };
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
                      <div
                        className="rprp_itm1"
                        style={{ margin: "5px 0 0 0" }}
                      >
                        <div className="rprp_itm1_ttl">■ 도로구분</div>
                        <div className="rprp_itm1_val">
                          {roadSeTxt(pnfo.road_se)}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">■ 차로수</div>
                        <div className="rprp_itm1_val">{pnfo.cartrk_co}</div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">■ 도로폭</div>
                        <div className="rprp_itm1_val">{pnfo.road_bt}m</div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">■ 포장재질</div>
                        <div className="rprp_itm1_val">
                          {pmtrSeTxt(pnfo.pmtr_se)}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">■ 통행방향</div>
                        <div className="rprp_itm1_val">
                          {ospsSeTxt(pnfo.osps_se)}
                        </div>
                      </div>
                      <div
                        className="rprp_itm1"
                        style={{ margin: "0 0 5px 0" }}
                      >
                        <div className="rprp_itm1_ttl">■ 구간 길이</div>
                        <div className="rprp_itm1_val">{pnfo.road_lt}m</div>
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
                      <div
                        className="rprp_itms2_sqr"
                        style={{ margin: "10px 0 0 0" }}
                      >
                        <div className="rprp_itms2_ttl">■ 도로기하</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 종단경사도</div>
                            <div className="rprp_itm2_val">
                              {pnfo.slope_lg}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">■ 교통</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 네트워크접근성
                            </div>
                            <div className="rprp_itm2_val">{pnfo.rdnet_ac}</div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 대중교통접근성
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo.pubtr_ac}m
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">■ 토지이용</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 보행유인연면적
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo.pbuld_fa}m
                              <sup
                                style={{ fontSize: "6px", fontWeight: "700" }}
                              >
                                2
                              </sup>
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 건물출입구밀도
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo.bulde_de}개
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">■ 시설</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 계단</div>
                            <div className="rprp_itm2_val">
                              {stairAtTxt(pnfo.stair_at)}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 보도</div>
                            <div className="rprp_itm2_val">
                              {sdwkSeTxt(pnfo.sdwk_se)}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 분리대</div>
                            <div className="rprp_itm2_val">
                              {edenncAtTxt(pnfo.edennc_at)}
                            </div>
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
