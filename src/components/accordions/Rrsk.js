import "./Rrsk.css";
import { useEffect, useState } from "react";
import useInfo from "../../hooks/use-info";
import { FiPlus, FiMinus } from "react-icons/fi";
import { RxTriangleDown } from "react-icons/rx";

const Rrsk = () => {
  const { pick, pnfo } = useInfo();
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState({
    acc1: false,
    acc2: false,
    acc3: false,
    acc4: false,
    acc5: false,
  });
  // const [acc2, setAcc2] = useState(false);

  ////
  const [scr, setScr] = useState({
    scr1: null,
    scr2: null,
    scr3: null,
    scr4: null,
    scr5: null,
  }); // Default Score
  const labels = ["매우좋음", "좋음", "보통", "나쁨", "매우나쁨"];

  ////
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (pick) {
      setOpen(true);
      setAcc({
        acc1: true,
        acc2: true,
        acc3: true,
        acc4: true,
        acc5: true,
      });
      setScr({
        scr1: pnfo.pedac_rk[5],
        scr2: pnfo.crime_rk[5],
        scr3: pnfo.flood_rk[5],
        scr4: pnfo.crwdac_rk[5],
        scr5: pnfo.fallac_rk[5],
      });
    } else {
      setOpen(false);
      setAcc({
        acc1: false,
        acc2: false,
        acc3: false,
        acc4: false,
        acc5: false,
      });
      setScr({
        scr1: null,
        scr2: null,
        scr3: null,
        scr4: null,
        scr5: null,
      });
    }
  }, [
    pick,
    pnfo.pedac_rk,
    pnfo.crime_rk,
    pnfo.flood_rk,
    pnfo.crwdac_rk,
    pnfo.fallac_rk,
  ]);
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

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc1: !acc.acc1 }))
                  }
                >
                  <div className="rrsk_acc_lbl">교통사고</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc1 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc1 && <div className="rrsk_line"></div>}

                {acc.acc1 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_scr_wrap">
                      <div className="rrsk_scr_container">
                        {labels.map((label, index) => (
                          <div className="rrsk_scr_no_lbl">
                            <div className="indctr_wrap">
                              <div className="indcatr">
                                {cnvrtRate(scr.scr1) === index + 1 && (
                                  <RxTriangleDown className="indcatr_trngl" />
                                )}
                              </div>
                            </div>
                            <div
                              key={index}
                              className={`rrsk_scr_item ritem${index + 1}`}
                            >
                              <div className="rrsk_scr_number">{index + 1}</div>
                            </div>
                            <div
                              className={`rrsk_scr_lbl rrsk_scrlbl${index + 1}`}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rrsk_emid">
                        <div className="rrsk_emid_lbl">
                          교통사고 사망지수 환산값 EMid ?
                        </div>
                        <div className="rrsk_emid_v">3.2</div>
                      </div>
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
                  <div className="rrsk_acc_lbl">범죄사고</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc2 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc2 && <div className="rrsk_line"></div>}

                {acc.acc2 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_scr_wrap_x">
                      <div className="rrsk_scr_container">
                        {labels.map((label, index) => (
                          <div className="rrsk_scr_no_lbl">
                            <div className="indctr_wrap">
                              <div className="indcatr">
                                {cnvrtRate(scr.scr2) === index + 1 && (
                                  <RxTriangleDown className="indcatr_trngl" />
                                )}
                              </div>
                            </div>
                            <div
                              key={index}
                              className={`rrsk_scr_item ritem${index + 1}`}
                            >
                              <div className="rrsk_scr_number">{index + 1}</div>
                            </div>
                            <div
                              className={`rrsk_scr_lbl rrsk_scrlbl${index + 1}`}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc3: !acc.acc3 }))
                  }
                >
                  <div className="rrsk_acc_lbl">재해사고</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc3 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc3 && <div className="rrsk_line"></div>}

                {acc.acc3 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_scr_wrap_x">
                      <div className="rrsk_scr_container">
                        {labels.map((label, index) => (
                          <div className="rrsk_scr_no_lbl">
                            <div className="indctr_wrap">
                              <div className="indcatr">
                                {cnvrtRate(scr.scr3) === index + 1 && (
                                  <RxTriangleDown className="indcatr_trngl" />
                                )}
                              </div>
                            </div>
                            <div
                              key={index}
                              className={`rrsk_scr_item ritem${index + 1}`}
                            >
                              <div className="rrsk_scr_number">{index + 1}</div>
                            </div>
                            <div
                              className={`rrsk_scr_lbl rrsk_scrlbl${index + 1}`}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc4: !acc.acc4 }))
                  }
                >
                  <div className="rrsk_acc_lbl">밀집사고</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc4 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                {acc.acc4 && <div className="rrsk_line"></div>}

                {acc.acc4 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_scr_wrap_x">
                      <div className="rrsk_scr_container">
                        {labels.map((label, index) => (
                          <div className="rrsk_scr_no_lbl">
                            <div className="indctr_wrap">
                              <div className="indcatr">
                                {cnvrtRate(scr.scr4) === index + 1 && (
                                  <RxTriangleDown className="indcatr_trngl" />
                                )}
                              </div>
                            </div>
                            <div
                              key={index}
                              className={`rrsk_scr_item ritem${index + 1}`}
                            >
                              <div className="rrsk_scr_number">{index + 1}</div>
                            </div>
                            <div
                              className={`rrsk_scr_lbl rrsk_scrlbl${index + 1}`}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rrsk_acc_d1">
                <div className="rrsk_line"></div>

                <div
                  className="rrsk_acc_d2"
                  onClick={() =>
                    setAcc((prev) => ({ ...prev, acc5: !acc.acc5 }))
                  }
                >
                  <div className="rrsk_acc_lbl">낙상사고</div>
                  <div className="rrsk_acc_icon">
                    {acc.acc5 ? <FiMinus /> : <FiPlus />}
                  </div>
                </div>

                <div className="rrsk_line"></div>

                {acc.acc5 && (
                  <div className="rrsk_acc1_exp">
                    <div className="rrsk_scr_wrap_x">
                      <div className="rrsk_scr_container">
                        {labels.map((label, index) => (
                          <div className="rrsk_scr_no_lbl">
                            <div className="indctr_wrap">
                              <div className="indcatr">
                                {cnvrtRate(scr.scr5) === index + 1 && (
                                  <RxTriangleDown className="indcatr_trngl" />
                                )}
                              </div>
                            </div>
                            <div
                              key={index}
                              className={`rrsk_scr_item ritem${index + 1}`}
                            >
                              <div className="rrsk_scr_number">{index + 1}</div>
                            </div>
                            <div
                              className={`rrsk_scr_lbl rrsk_scrlbl${index + 1}`}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
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
