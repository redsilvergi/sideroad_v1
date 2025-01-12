import './AccrdPrpBff.css';
import { useRef, useEffect } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import { FiPlus, FiMinus } from 'react-icons/fi';
import cctv_icon from '../../img/cctvicon.png';
import cross_icon from '../../img/crossicon.png';

const AccrdPrpBff = () => {
  const {
    nfidlst,
    setBufferData,
    bffLegendCbx,
    setbffLegendCbx,
    bufferExp,
    setBufferExp,
  } = useInfo();
  const { getSrvData, getSurveyBuffer, getSurveyBufferMask } = useDb();
  const isFirstFetch = useRef(false);

  useEffect(() => {
    isFirstFetch.current = false;
    setBufferExp(false);
    setbffLegendCbx([true, true, true, true, true, true]);
  }, [nfidlst, setbffLegendCbx, setBufferExp]);

  const handleBffLgCbx = (index) => {
    setbffLegendCbx((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const toggleBufferExp = async () => {
    if (!nfidlst || nfidlst.length === 0) return;

    if (!isFirstFetch.current) {
      const bufferdata = await getSurveyBuffer(nfidlst);
      const buffermask = await getSurveyBufferMask(nfidlst);
      setBufferData([bufferdata, buffermask]);
      await getSrvData(nfidlst);

      isFirstFetch.current = true;
    }
    setBufferExp((prev) => !prev);
    setbffLegendCbx([true, true, true, true, true, true]);
  };

  return (
    <div className="prpbff_wrap">
      <div className="prpbff_lbl" onClick={() => toggleBufferExp()}>
        <span
          style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}
        >
          버퍼영역
          <div className="bff_qsmark">
            ?
            <div className="bff_qs_tltp">
              실태조사구간의 주변 속성을 확인할 수 있습니다.
            </div>
          </div>
        </span>
        <div className="bffexp_icon">
          {bufferExp ? <FiMinus /> : <FiPlus />}
        </div>
      </div>
      {bufferExp && (
        <div style={{ width: '100%', justifyItems: 'center' }}>
          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox0"
                checked={bffLegendCbx[0]}
                onChange={() => handleBffLgCbx(0)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word">건물</div>
              </div>
            </label>
            <div className="bfflg_dashline" />
            <div className="bfflg_color_toggle">
              ?
              <div className="bfflg_mfac_tooltip">
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#fafeab' }}
                  ></div>
                  단독주택
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#F5BC6A' }}
                  ></div>
                  공동주택
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#fff90b' }}
                  ></div>
                  근린생활시설
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#eb7f7c' }}
                  ></div>
                  판매 및 영업시설
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#c0eefa' }}
                  ></div>
                  초.중.고등학교
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#8aa4e9' }}
                  ></div>
                  문화 및 집회시설
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#ccffab' }}
                  ></div>
                  운동시설
                </div>
                <div className="mfac_ttp_content">
                  <div
                    className="bfflg_color_inner"
                    style={{ backgroundColor: '#ffffff' }}
                  ></div>
                  기타
                </div>
              </div>
            </div>
          </div>

          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox1"
                checked={bffLegendCbx[1]}
                onChange={() => handleBffLgCbx(1)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word">보행자교통사고</div>
              </div>
            </label>

            <div className="bfflg_dashline" />
            <div
              className="bfflg_color"
              style={{ backgroundColor: '#FF0000' }}
            ></div>
          </div>

          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox2"
                checked={bffLegendCbx[2]}
                onChange={() => handleBffLgCbx(2)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word">CCTV</div>
              </div>
            </label>

            <div className="bfflg_dashline" />
            <div>
              <img
                src={cctv_icon}
                alt="cctv"
                style={{
                  width: '30px',
                  height: '30px',
                  margin: '2px -9px 0 -8px',
                }}
              />
            </div>
          </div>

          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox3"
                checked={bffLegendCbx[3]}
                onChange={() => handleBffLgCbx(3)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word" style={{ marginLeft: '-1px' }}>
                  횡단보도
                </div>
              </div>
            </label>

            <div className="bfflg_dashline" />
            <div className="bfflg_color_crosswalk">
              <img
                src={cross_icon}
                alt="cross"
                style={{
                  width: '30px',
                  height: '30px',
                  margin: '24px -7px 0 -7px',
                }}
              />
            </div>
          </div>

          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox4"
                checked={bffLegendCbx[4]}
                onChange={() => handleBffLgCbx(4)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word">보도</div>
              </div>
            </label>

            <div className="bfflg_dashline" />
            <div
              className="bfflg_color"
              style={{ backgroundColor: '#f5a7a7' }}
            ></div>
          </div>

          <div className="bfflg_content">
            <label className="bff_chk_lb">
              <input
                className="bff_custom_cb"
                type="checkbox"
                name="bfflgcheckbox5"
                checked={bffLegendCbx[5]}
                onChange={() => handleBffLgCbx(5)}
              />
              <div className="bff_chk_item">
                <div className="bff_chk_word">도로경계</div>
              </div>
            </label>

            <div className="bfflg_dashline" />
            <div
              className="bfflg_color"
              style={{ backgroundColor: '#999999' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccrdPrpBff;
