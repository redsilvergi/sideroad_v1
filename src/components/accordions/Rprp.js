import './Rprp.css';
import { useEffect, useState } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Rprp = () => {
  const { pick, pfrPick, pnfo, srvy, nfidlst, length } = useInfo();
  const { getPfrProps } = useDb();
  const [open, setOpen] = useState(false);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);
  const [pfrProps, setPfrProps] = useState({
    cartrk_co: null,
    road_bt: null,
    sdwk_se: null,
    rdnet_ac: null,
    pbuld_fa: null,
    bulde_de: null,
    pubtr_ac: null,
    stair_at: null,
  });
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pick || pfrPick || (srvy && nfidlst && nfidlst.length > 0)) {
      setOpen(true);
      setAcc1(true);
      setAcc2(true);
    } else {
      setOpen(false);
      setAcc1(false);
      setAcc2(false);
    }
  }, [pick, pfrPick, srvy, nfidlst]);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchProperties = async () => {
      if (srvy && nfidlst && nfidlst.length > 0) {
        try {
          const propsdata = await getPfrProps(nfidlst);
          setPfrProps({
            cartrk_co: propsdata.data.cartrk_co,
            road_bt: propsdata.data.road_bt,
            sdwk_se: propsdata.data.sdwk_se,
            rdnet_ac: propsdata.data.rdnet_ac,
            pbuld_fa: propsdata.data.pbuld_fa,
            bulde_de: propsdata.data.bulde_de,
            pubtr_ac: propsdata.data.pubtr_ac,
            stair_at: propsdata.data.stair_at,
          });
        } catch (err) {
          console.error('Error fetching props:', err);
          setPfrProps({
            cartrk_co: null,
            road_bt: null,
            sdwk_se: null,
            rdnet_ac: null,
            pbuld_fa: null,
            bulde_de: null,
            pubtr_ac: null,
            stair_at: null,
          });
        }
      } else {
        setPfrProps({
          cartrk_co: null,
          road_bt: null,
          sdwk_se: null,
          rdnet_ac: null,
          pbuld_fa: null,
          bulde_de: null,
          pubtr_ac: null,
          stair_at: null,
        });
      }
    };

    fetchProperties();
  }, [pick, srvy, nfidlst, getPfrProps]);
  ////////////////////////////////////////////////////////////
  const roadSeTxt = (val) => {
    switch (val) {
      case 3:
        return '지방도';
      case 4:
        return '특별시도';
      case 5:
        return '광역시도';
      case 6:
        return '시도';
      case 7:
        return '군도';
      case 8:
        return '구도';
      case 10:
        return '면리간도로';
      case 11:
        return '부지안도로';
      case 14:
        return '소로';
      default:
        break;
    }
  };
  const pmtrSeTxt = (val) => {
    switch (val) {
      case 1:
        return '아스팔트';
      case 2:
        return '아스팔트콘크리트';
      case 3:
        return '콘트리트';
      case 4:
        return '블록';
      case 5:
        return '비포장';
      case 6:
        return '우레탄';
      case 7:
        return '고무';
      case 99:
        return '기타';
      default:
        break;
    }
  };
  const ospsSeTxt = (val) => {
    switch (val) {
      case 1:
        return '일방통행';
      case 2:
        return '양방통행';
      default:
        break;
    }
  };
  const sdwkSeTxt = (val) => {
    switch (val) {
      case 1:
        return '미설치';
      case 2:
        return '단측';
      case 3:
        return '양측';
      default:
        break;
    }
  };
  const stairAtTxt = (val) => {
    switch (val) {
      case '0':
        return '미설치';
      case '1':
        return '설치';
      default:
        break;
    }
  };
  const edenncAtTxt = (val) => {
    switch (val) {
      case '0':
        return '무';
      case '1':
        return '유';
      default:
        break;
    }
  };
  ////////////////////////////////////////////////////////////
  return (
    <div className="rprp_accitem">
      <div className="rprp_d1">
        {srvy && nfidlst ? (
          <div className="rprp_d2" onClick={() => setOpen(!open)}>
            <div className="rprp_lbl" onClick={() => console.log(pfrProps)}>
              다중 구간 도로 속성
            </div>
            <div className="rprp_icon">{open ? <FiMinus /> : <FiPlus />}</div>
          </div>
        ) : !pick && !pfrPick ? (
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
        {(pick || pfrPick) && open && (
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
                        style={{ margin: '5px 0 0 0' }}
                      >
                        <div className="rprp_itm1_ttl">· 도로구분</div>
                        <div className="rprp_itm1_val">
                          {roadSeTxt(pnfo && pnfo.road_se)}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">· 차로수</div>
                        <div className="rprp_itm1_val">
                          {pnfo && pnfo.cartrk_co}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">· 도로폭</div>
                        <div className="rprp_itm1_val">
                          {pnfo && pnfo.road_bt}m
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">· 포장재질</div>
                        <div className="rprp_itm1_val">
                          {pmtrSeTxt(pnfo && pnfo.pmtr_se)}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">· 통행방향</div>
                        <div className="rprp_itm1_val">
                          {ospsSeTxt(pnfo && pnfo.osps_se)}
                        </div>
                      </div>
                      <div
                        className="rprp_itm1"
                        style={{ margin: '0 0 5px 0' }}
                      >
                        <div className="rprp_itm1_ttl">· 구간 길이</div>
                        <div className="rprp_itm1_val">
                          {pnfo && pnfo.road_lt}m
                        </div>
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
                        style={{ margin: '10px 0 0 0' }}
                      >
                        <div className="rprp_itms2_ttl">· 도로기하</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 종단경사도</div>
                            <div className="rprp_itm2_val">
                              {pnfo && pnfo.slope_lg}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 교통</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 네트워크접근성
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo && pnfo.rdnet_ac}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 대중교통접근성
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo && pnfo.pubtr_ac}m
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 토지이용</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 보행유인연면적
                            </div>
                            <div className="rprp_itm2_val">
                              {pnfo && pnfo.pbuld_fa}m
                              <sup
                                style={{ fontSize: '6px', fontWeight: '700' }}
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
                              {pnfo && pnfo.bulde_de}개
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 시설</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 계단</div>
                            <div className="rprp_itm2_val">
                              {stairAtTxt(pnfo && pnfo.stair_at)}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 보도</div>
                            <div className="rprp_itm2_val">
                              {sdwkSeTxt(pnfo && pnfo.sdwk_se)}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 분리대</div>
                            <div className="rprp_itm2_val">
                              {edenncAtTxt(pnfo && pnfo.edennc_at)}
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

        {srvy && nfidlst && nfidlst.length > 0 && open && (
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
                        <div className="rprp_itm1_ttl">· 차로수</div>
                        <div className="rprp_itm1_val">
                          {pfrProps && pfrProps.cartrk_co
                            ? Math.floor(pfrProps.cartrk_co)
                            : '---'}
                        </div>
                      </div>
                      <div className="rprp_itm1">
                        <div className="rprp_itm1_ttl">· 도로폭</div>
                        <div className="rprp_itm1_val">
                          {pfrProps && pfrProps.road_bt
                            ? pfrProps.road_bt.toFixed(2)
                            : '---'}
                          m
                        </div>
                      </div>
                      <div
                        className="rprp_itm1"
                        style={{ margin: '0 0 5px 0' }}
                      >
                        <div className="rprp_itm1_ttl">· 구간 길이</div>
                        <div className="rprp_itm1_val">
                          {length ? length.toFixed(2) : '---'}km
                        </div>
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
                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 교통</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 네트워크접근성
                            </div>
                            <div className="rprp_itm2_val">
                              {pfrProps && pfrProps.rdnet_ac
                                ? pfrProps.rdnet_ac.toFixed(2)
                                : '---'}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 대중교통접근성
                            </div>
                            <div className="rprp_itm2_val">
                              {pfrProps && pfrProps.pubtr_ac
                                ? pfrProps.pubtr_ac.toFixed(2)
                                : '---'}
                              m
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 토지이용</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">
                              - 보행유인연면적
                            </div>
                            <div className="rprp_itm2_val">
                              {pfrProps && pfrProps.pbuld_fa
                                ? pfrProps.pbuld_fa.toFixed(2)
                                : '---'}
                              m
                              <sup
                                style={{ fontSize: '6px', fontWeight: '700' }}
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
                              {pfrProps && pfrProps.bulde_de
                                ? pfrProps.bulde_de.toFixed(2)
                                : '---'}
                              개
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="rprp_itms2_sqr">
                        <div className="rprp_itms2_ttl">· 시설</div>
                        <div className="rprp_itms2_cnt">
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 계단</div>
                            <div className="rprp_itm2_val">
                              {pfrProps && pfrProps.stair_at
                                ? stairAtTxt(
                                    Number(pfrProps.stair_at) > 0 ? "1" : "0"
                                  )
                                : "---"}
                            </div>
                          </div>
                          <div className="rprp_itm2">
                            <div className="rprp_itm2_ttl">- 보도</div>
                            <div className="rprp_itm2_val">
                              {sdwkSeTxt(
                                pfrProps && pfrProps.sdwk_se
                                  ? Math.floor(pfrProps.sdwk_se)
                                  : "---"
                              )}
                            </div>
                          </div>
                        </div>
                      </div> */}
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
