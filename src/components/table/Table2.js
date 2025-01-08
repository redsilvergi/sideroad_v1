import './Table2.css';
import React, { useState } from 'react';
// import useInfo from '../../hooks/use-info';
import { TfiAngleDoubleUp, TfiAngleDoubleDown } from 'react-icons/tfi';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';

// Table2 ----------------------------------------------------------------------
const Table2 = () => {
  // setup ----------------------------------------------------------------------
  const { nfidlst } = useInfo();
  const { postSrvy } = useDb();
  const [extend, setExtend] = useState(1);
  const [formData, setFormData] = useState({
    roadLength: '',
    roadWidth: '',
    pedSeparation: '',
    slope: '',
    accTotal: '',
    accDeath: '',
    accSerious: '',
    accMinor: '',
    accReport: '',
    trafficVolume: '',
    parking: '',
    pedestrianVolume: '',
    cctv: '',
    cctvCount: '',
    securityLight: '',
    securityLightCountGood: '',
    securityLightCountBad: '',
    packageState: '',
    speedReductionFacil: '',
    pedSign: '',
    light: '',
    bench: '',
    plant: '',
    obstacle: '',
    illegalParking: '',
  });

  // handle ----------------------------------------------------------------------
  const handleExtend = () => {
    setExtend((prev) => {
      if (prev === 1) {
        return 2;
      } else if (prev === 2) {
        return 3;
      } else if (prev === 3) {
        return 1;
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (name === 'slope') {
      newValue = Math.max(0, Math.min(100, Number(newValue))).toString();
    }

    if (name === 'cctv' && value === '없음') {
      setFormData({
        ...formData,
        cctvCount: '',
        [name]: newValue,
      });
    } else if (name === 'securityLight' && value === '양호') {
      setFormData({
        ...formData,
        securityLightCountBad: '',
        [name]: newValue,
      });
    } else if (name === 'securityLight' && value === '불량') {
      setFormData({
        ...formData,
        securityLightCountGood: '',
        [name]: newValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Interact with your database here
    const tmp1 = { nfidlst: nfidlst, ...formData };
    console.log('Form data submitted:', tmp1);
    const res = await postSrvy(tmp1);
    console.log('res\n', res);
  };
  // return ----------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`tbl2_cont ${
          extend === 1
            ? ''
            : extend === 2
            ? 'tbl2_cont_extend2'
            : 'tbl2_cont_extend3'
        }`}
      >
        <div className="tbl2_head">
          <div className="tbl2_head1">실태조사 결과 입력</div>
          {extend === 3 ? (
            <div className="tbl2_angles" onClick={handleExtend}>
              <TfiAngleDoubleDown />
            </div>
          ) : (
            <div className="tbl2_angles" onClick={handleExtend}>
              <TfiAngleDoubleUp />
            </div>
          )}

          <div className="tbl2_head2">
            <div className="tbl2_edit">수정</div>
            <div className="tbl2_save" onClick={handleSubmit}>
              저장
            </div>
          </div>
        </div>
        {/* <div className="tbl2_separate"></div> */}
        <table className="tbl2">
          <thead>
            <tr>
              <th className="tbl2_th_top" colSpan={1}>
                이면도로 현황
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp tbl2_th_prp_top">도로연장</th>
              <td className="tbl2_td tbl2_td_top">
                <input
                  type="number"
                  className="tbl2_num_input1"
                  name="roadLength"
                  value={formData.roadLength}
                  onChange={handleChange}
                />
                m
              </td>
              <th className="tbl2_th_prp tbl2_th_prp_top">도로폭 (차도포함)</th>
              <td className="tbl2_td tbl2_td_top tbl2_td_rend">
                <input
                  type="number"
                  className="tbl2_num_input1"
                  name="roadWidth"
                  value={formData.roadWidth}
                  onChange={handleChange}
                />
                m
              </td>
            </tr>
            <tr>
              <th className="tbl2_th_prp">보차분리현황</th>
              <td className="tbl2_td tbl2_td_rdo">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="pedSeparation"
                    value="예"
                    checked={formData.pedSeparation === '예'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">예</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="pedSeparation"
                    value="아니오"
                    checked={formData.pedSeparation === '아니오'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">아니오</div>
                </label>
              </td>
              <th className="tbl2_th_prp">종단경사도</th>
              <td className="tbl2_td tbl2_td_rend">
                <input
                  type="number"
                  className="tbl2_num_input1"
                  name="slope"
                  value={formData.slope}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                %
              </td>
            </tr>
            <tr>
              <th className="tbl2_th_prp">보행자교통사고</th>
              <td className="tbl2_td tbl2_td_acc">
                <div className="tbl2_td_acc_inputwrap1">
                  사고
                  <input
                    type="number"
                    className="tbl2_num_input2"
                    name="accTotal"
                    value={formData.accTotal}
                    onChange={handleChange}
                  />
                  건, 사망자
                  <input
                    type="number"
                    className="tbl2_num_input2"
                    name="accDeath"
                    value={formData.accDeath}
                    onChange={handleChange}
                  />
                  명, 중상자
                  <input
                    type="number"
                    className="tbl2_num_input2"
                    name="accSerious"
                    value={formData.accSerious}
                    onChange={handleChange}
                  />
                  명
                </div>
                <div className="tbl2_td_acc_inputwrap2">
                  경상자
                  <input
                    type="number"
                    className="tbl2_num_input2"
                    name="accMinor"
                    value={formData.accMinor}
                    onChange={handleChange}
                  />
                  명, 부상신고자
                  <input
                    type="number"
                    className="tbl2_num_input2"
                    name="accReport"
                    value={formData.accReport}
                    onChange={handleChange}
                  />
                  명
                </div>
              </td>
              <th className="tbl2_th_prp">교통량</th>
              <td className="tbl2_td tbl2_td_rend">
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="trafficVolume"
                  value={formData.trafficVolume}
                  onChange={handleChange}
                />
                대/시간
              </td>
            </tr>
            <tr className="tbl2_tr_bottom">
              <th className="tbl2_th_prp">노상주차</th>
              <td className="tbl2_td">
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                />
                개소
              </td>
              <th className="tbl2_th_prp">보행량</th>
              <td className="tbl2_td tbl2_td_rend">
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="pedestrianVolume"
                  value={formData.pedestrianVolume}
                  onChange={handleChange}
                />
                인/시간
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl2_separate"></div>
        <table className="tbl2">
          <thead>
            <tr>
              <th className="tbl2_th_top" colSpan={1}>
                안전시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp">CCTV</th>
              <td className="tbl2_td tbl2_td_rdo">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="cctv"
                    value="있음"
                    checked={formData.cctv === '있음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">있음</div>
                  <input
                    type="number"
                    className="tbl2_rdo_num_input2"
                    name="cctvCount"
                    value={formData.cctvCount}
                    onChange={handleChange}
                    disabled={formData.cctv !== '있음'}
                  />
                  <div className="tbl2_num_input_txt">개</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="cctv"
                    value="없음"
                    checked={formData.cctv === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl2_th_prp">보안등</th>
              <td className="tbl2_td tbl2_td_rdo tbl2_td_rend">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="securityLight"
                    value="양호"
                    checked={formData.securityLight === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                  <input
                    type="number"
                    className="tbl2_rdo_num_input2"
                    name="securityLightCountGood"
                    value={formData.securityLightCountGood}
                    onChange={handleChange}
                    disabled={formData.securityLight !== '양호'}
                  />
                  <div className="tbl2_num_input_txt">개</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="securityLight"
                    value="불량"
                    checked={formData.securityLight === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                  <input
                    type="number"
                    className="tbl2_rdo_num_input2"
                    name="securityLightCountBad"
                    value={formData.securityLightCountBad}
                    onChange={handleChange}
                    disabled={formData.securityLight !== '불량'}
                  />
                  <div className="tbl2_num_input_txt">개</div>
                </label>
              </td>
            </tr>

            <tr className="tbl2_tr_bottom">
              <th className="tbl2_th_prp">포장상태</th>
              <td className="tbl2_td tbl2_td_rdo">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="packageState"
                    value="양호"
                    checked={formData.packageState === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="packageState"
                    value="불량"
                    checked={formData.packageState === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
              </td>
              <th className="tbl2_th_prp">속도저감시설</th>
              <td className="tbl2_td tbl2_td_rdo tbl2_td_rend">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="speedReductionFacil"
                    value="양호"
                    checked={formData.speedReductionFacil === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="speedReductionFacil"
                    value="불량"
                    checked={formData.speedReductionFacil === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="speedReductionFacil"
                    value="없음"
                    checked={formData.speedReductionFacil === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl2_separate"></div>
        <table className="tbl2">
          <thead>
            <tr>
              <th className="tbl2_th_top" colSpan={1}>
                편의시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp">보행자안내표시</th>
              <td className="tbl2_td">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="pedSign"
                    value="양호"
                    checked={formData.pedSign === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="pedSign"
                    value="불량"
                    checked={formData.pedSign === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="pedSign"
                    value="없음"
                    checked={formData.pedSign === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl2_th_prp">조명기구</th>
              <td className="tbl2_td tbl2_td_rend">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="light"
                    value="양호"
                    checked={formData.light === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="light"
                    value="불량"
                    checked={formData.light === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="light"
                    value="없음"
                    checked={formData.light === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
            </tr>

            <tr className="tbl2_tr_bottom">
              <th className="tbl2_th_prp">벤치</th>
              <td className="tbl2_td">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="bench"
                    value="양호"
                    checked={formData.bench === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="bench"
                    value="불량"
                    checked={formData.bench === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="bench"
                    value="없음"
                    checked={formData.bench === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl2_th_prp">식재</th>
              <td className="tbl2_td tbl2_td_rend">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="plant"
                    value="양호"
                    checked={formData.plant === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">양호</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="plant"
                    value="불량"
                    checked={formData.plant === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">불량</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="plant"
                    value="없음"
                    checked={formData.plant === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl2_separate"></div>
        <table className="tbl2 tbl2_4">
          <thead>
            <tr>
              <th className="tbl2_th_top" colSpan={1}>
                보행장애물
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp">노상적치물/입간판</th>
              <td className="tbl2_td tbl2_td_rdo tbl2_td_rend">
                <label className="tbl2_rdo1">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="obstacle"
                    value="있음"
                    checked={formData.obstacle === '있음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">있음</div>
                </label>
                <label className="tbl2_rdo2">
                  <input
                    type="radio"
                    className="tbl2_rdo_input"
                    name="obstacle"
                    value="없음"
                    checked={formData.obstacle === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl2_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
            <tr className="tbl2_tr_bottom">
              <th className="tbl2_th_prp">불법주차</th>
              <td className="tbl2_td tbl2_td_rend">
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="illegalParking"
                  value={formData.illegalParking}
                  onChange={handleChange}
                />
                개소
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default Table2;
