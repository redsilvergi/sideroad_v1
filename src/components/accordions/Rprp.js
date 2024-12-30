import './Rprp.css';
import { useEffect, useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Rprp = () => {
  const { pick, pfrPick, pnfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc1, setAcc1] = useState(false);
  const [acc2, setAcc2] = useState(false);
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pick || pfrPick) {
      setOpen(true);
      setAcc1(true);
      setAcc2(true);
    } else {
      setOpen(false);
      setAcc1(false);
      setAcc2(false);
    }
  }, [pick, pfrPick]);
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
        {!pick && !pfrPick ? (
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
      </div>
    </div>
  );
};

export default Rprp;
