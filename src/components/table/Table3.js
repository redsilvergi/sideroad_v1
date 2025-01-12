import './Table3.css';
import React from 'react';
import useInfo from '../../hooks/use-info';
// import { TfiAngleDoubleUp, TfiAngleDoubleDown } from 'react-icons/tfi';
// import useInfo from '../../hooks/use-info';
import { useAuth } from '../../context/auth';
import useDb from '../../hooks/use-db';
import { useNavigate } from 'react-router-dom';

// Table3 ----------------------------------------------------------------------
const Table3 = ({ srvydata, setSrvydata, editmode, setEditmode }) => {
  // setup ----------------------------------------------------------------------
  const { user } = useAuth();
  const { editSrvy, getCordOnly } = useDb();
  const { setNfidlst, setBar, setSrvy, setSrvyid } = useInfo();
  const navigate = useNavigate();

  // handle ----------------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // if (name === 'slope') {
    //   newValue = Math.max(0, Math.min(100, Number(newValue)))
    //     .toFixed(2)
    //     .toString();
    // }

    if (name === 'cctv' && value === '없음') {
      setSrvydata({
        ...srvydata,
        cctvcount: '',
        [name]: newValue,
      });
    } else if (name === 'securitylight' && value === '양호') {
      setSrvydata({
        ...srvydata,
        securitylightcountbad: '',
        [name]: newValue,
      });
    } else if (name === 'securitylight' && value === '불량') {
      setSrvydata({
        ...srvydata,
        securitylightcountgood: '',
        [name]: newValue,
      });
    } else {
      setSrvydata({
        ...srvydata,
        [name]: newValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm('저장하시겠습니까?');
    if (!userConfirmed) {
      return; // User clicked "Cancel", so do not proceed
    }

    // Allow only numbers and hyphens
    const formattedValue =
      srvydata && srvydata.researchdate.replace(/[^0-9-]/g, '');

    // Validate and format the date as YYYY-MM-DD
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (formattedValue.length === 10 && datePattern.test(formattedValue)) {
      const tmp1 = { userid: user && user.id, ...srvydata };
      console.log('Form data submitted:', tmp1);
      const res = await editSrvy(tmp1);
      navigate('/');
      // setSrvydata({ ...srvydata }); // Trigger re-render by updating state
      console.log('res\n', res);
      return;
    } else {
      alert('날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }
  };

  const handleNfid = async (received_srvydata) => {
    const tmp = received_srvydata;
    console.log('tmptmptmptmptmp', tmp, tmp.nfidlst, tmp.srvyid);
    setNfidlst(tmp.nfidlst);

    setSrvyid(tmp.srvyid);
    setBar(4);
    setSrvy(true);
    await getCordOnly({ nfid: tmp.nfidlst[0] });
    navigate('/');
  };

  // return ----------------------------------------------------------------------
  return editmode ? (
    <form onSubmit={handleSubmit}>
      <div className={`tbl3_cont`}>
        <div className="tbl3_head">
          <div className="tbl3_head1">실태조사 총괄표</div>
          <div className="tbl3_head2">
            <div className="tbl3_save" onClick={handleSubmit}>
              저장
            </div>
          </div>
        </div>
        <table className="tbl3 tbl3_0">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                일반정보
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">조사구간 ID</th>
              <td className="tbl3_td tbl3_srvyid_td tbl3_td_rend">
                <div>{srvydata.srvyid}</div>
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp tbl3_th_prp_top ">조사구간 NFID</th>
              <td className="tbl3_td tbl3_nfid_td tbl3_td_rend">
                <div className="tbl3_nfids">{srvydata.nfidlst.join(', ')}</div>
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">조사일시</th>
              <td className="tbl3_td">
                <input
                  type="text"
                  className="tbl3_text_input1"
                  name="researchdate"
                  value={srvydata.researchdate}
                  placeholder="YYYY-MM-DD"
                  onChange={handleChange}
                />
              </td>
              <th className="tbl3_th_prp">조사자</th>
              <td className="tbl3_td tbl3_td_rend">
                <input
                  type="text"
                  className="tbl3_text_input1"
                  name="researcher"
                  value={srvydata.researcher}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">도로명</th>
              <td className="tbl3_td">
                <input
                  type="text"
                  className="tbl3_text_input1"
                  name="roadname"
                  value={srvydata.roadname}
                  onChange={handleChange}
                />
              </td>
              <th className="tbl3_th_prp">건물번호</th>
              <td className="tbl3_td tbl3_td_rend">
                시작번호
                <input
                  type="text"
                  className="tbl3_text_input2"
                  name="buildingstartno"
                  value={srvydata.buildingstartno}
                  onChange={handleChange}
                />
                , 종점번호
                <input
                  type="text"
                  className="tbl3_text_input2"
                  name="buildingendno"
                  value={srvydata.buildingendno}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                이면도로 현황
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp tbl3_th_prp_top">도로연장</th>
              <td className="tbl3_td tbl3_td_top">
                <input
                  type="number"
                  className="tbl3_num_input1"
                  name="roadlength"
                  value={srvydata.roadlength}
                  onChange={handleChange}
                />
                m
              </td>
              <th className="tbl3_th_prp tbl3_th_prp_top">도로폭 (차도포함)</th>
              <td className="tbl3_td tbl3_td_top tbl3_td_rend">
                <input
                  type="number"
                  className="tbl3_num_input1"
                  name="roadwidth"
                  value={srvydata.roadwidth}
                  onChange={handleChange}
                />
                m
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">보차분리현황</th>
              <td className="tbl3_td tbl3_td_rdo">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="pedseparation"
                    value="예"
                    checked={srvydata.pedseparation === '예'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">예</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="pedseparation"
                    value="아니오"
                    checked={srvydata.pedseparation === '아니오'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">아니오</div>
                </label>
              </td>
              <th className="tbl3_th_prp">종단경사도</th>
              <td className="tbl3_td tbl3_td_rend">
                <input
                  type="number"
                  className="tbl3_num_input1"
                  name="slope"
                  value={srvydata.slope}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                %
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">보행자교통사고</th>
              <td className="tbl3_td tbl3_td_acc">
                <div className="tbl3_td_acc_inputwrap1">
                  사고
                  <input
                    type="number"
                    className="tbl3_num_input2"
                    name="acctotal"
                    value={srvydata.acctotal}
                    onChange={handleChange}
                  />
                  건, 사망자
                  <input
                    type="number"
                    className="tbl3_num_input2"
                    name="accdeath"
                    value={srvydata.accdeath}
                    onChange={handleChange}
                  />
                  명, 중상자
                  <input
                    type="number"
                    className="tbl3_num_input2"
                    name="accserious"
                    value={srvydata.accserious}
                    onChange={handleChange}
                  />
                  명
                </div>
                <div className="tbl3_td_acc_inputwrap2">
                  경상자
                  <input
                    type="number"
                    className="tbl3_num_input2"
                    name="accminor"
                    value={srvydata.accminor}
                    onChange={handleChange}
                  />
                  명, 부상신고자
                  <input
                    type="number"
                    className="tbl3_num_input2"
                    name="accreport"
                    value={srvydata.accreport}
                    onChange={handleChange}
                  />
                  명
                </div>
              </td>
              <th className="tbl3_th_prp">교통량</th>
              <td className="tbl3_td tbl3_td_rend">
                <input
                  type="number"
                  className="tbl3_num_input3"
                  name="trafficvolume"
                  value={srvydata.trafficvolume}
                  onChange={handleChange}
                />
                대/시간
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">노상주차</th>
              <td className="tbl3_td">
                <input
                  type="number"
                  className="tbl3_num_input3"
                  name="parking"
                  value={srvydata.parking}
                  onChange={handleChange}
                />
                개소
              </td>
              <th className="tbl3_th_prp">보행량</th>
              <td className="tbl3_td tbl3_td_rend">
                <input
                  type="number"
                  className="tbl3_num_input3"
                  name="pedestrianvolume"
                  value={srvydata.pedestrianvolume}
                  onChange={handleChange}
                />
                인/시간
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                안전시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">CCTV</th>
              <td className="tbl3_td tbl3_td_rdo">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="cctv"
                    value="있음"
                    checked={srvydata.cctv === '있음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">있음</div>
                  <input
                    type="number"
                    className="tbl3_rdo_num_input2"
                    name="cctvcount"
                    value={srvydata.cctvcount}
                    onChange={handleChange}
                    disabled={srvydata.cctv !== '있음'}
                  />
                  <div className="tbl3_num_input_txt">개</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="cctv"
                    value="없음"
                    checked={srvydata.cctv === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl3_th_prp">보안등</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="securitylight"
                    value="양호"
                    checked={srvydata.securitylight === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                  <input
                    type="number"
                    className="tbl3_rdo_num_input2"
                    name="securitylightcountgood"
                    value={srvydata.securitylightcountgood}
                    onChange={handleChange}
                    disabled={srvydata.securitylight !== '양호'}
                  />
                  <div className="tbl3_num_input_txt">개</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="securitylight"
                    value="불량"
                    checked={srvydata.securitylight === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                  <input
                    type="number"
                    className="tbl3_rdo_num_input2"
                    name="securitylightcountbad"
                    value={srvydata.securitylightcountbad}
                    onChange={handleChange}
                    disabled={srvydata.securitylight !== '불량'}
                  />
                  <div className="tbl3_num_input_txt">개</div>
                </label>
              </td>
            </tr>

            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">포장상태</th>
              <td className="tbl3_td tbl3_td_rdo">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="packagestate"
                    value="양호"
                    checked={srvydata.packagestate === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="packagestate"
                    value="불량"
                    checked={srvydata.packagestate === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
              </td>
              <th className="tbl3_th_prp">속도저감시설</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="speedreductionfacil"
                    value="양호"
                    checked={srvydata.speedreductionfacil === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="speedreductionfacil"
                    value="불량"
                    checked={srvydata.speedreductionfacil === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="speedreductionfacil"
                    value="없음"
                    checked={srvydata.speedreductionfacil === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                편의시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">보행자안내표시</th>
              <td className="tbl3_td">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="pedsign"
                    value="양호"
                    checked={srvydata.pedsign === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="pedsign"
                    value="불량"
                    checked={srvydata.pedsign === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="pedsign"
                    value="없음"
                    checked={srvydata.pedsign === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl3_th_prp">조명기구</th>
              <td className="tbl3_td tbl3_td_rend">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="light"
                    value="양호"
                    checked={srvydata.light === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="light"
                    value="불량"
                    checked={srvydata.light === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="light"
                    value="없음"
                    checked={srvydata.light === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
            </tr>

            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">벤치</th>
              <td className="tbl3_td">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="bench"
                    value="양호"
                    checked={srvydata.bench === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="bench"
                    value="불량"
                    checked={srvydata.bench === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="bench"
                    value="없음"
                    checked={srvydata.bench === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
              <th className="tbl3_th_prp">식재</th>
              <td className="tbl3_td tbl3_td_rend">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="plant"
                    value="양호"
                    checked={srvydata.plant === '양호'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">양호</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="plant"
                    value="불량"
                    checked={srvydata.plant === '불량'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">불량</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="plant"
                    value="없음"
                    checked={srvydata.plant === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3 tbl3_4">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                보행장애물
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">노상적치물/입간판</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <label className="tbl3_rdo1">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="obstacle"
                    value="있음"
                    checked={srvydata.obstacle === '있음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">있음</div>
                </label>
                <label className="tbl3_rdo2">
                  <input
                    type="radio"
                    className="tbl3_rdo_input"
                    name="obstacle"
                    value="없음"
                    checked={srvydata.obstacle === '없음'}
                    onChange={handleChange}
                  />
                  <div className="tbl3_rdo_txt">없음</div>
                </label>
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">불법주차</th>
              <td className="tbl3_td tbl3_td_rend">
                <input
                  type="number"
                  className="tbl3_num_input3"
                  name="illegalParking"
                  value={srvydata.illegalparking}
                  onChange={handleChange}
                />
                개소
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  ) : (
    <div className="tbl3_noneditmode">
      <div className={`tbl3_cont`}>
        <div className="tbl3_head">
          <div className="tbl3_head1">실태조사 총괄표</div>

          <div className="tbl3_head2">
            <div className="tbl3_edit" onClick={() => setEditmode(true)}>
              수정
            </div>
          </div>
        </div>
        <table className="tbl3 tbl3_0">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                일반정보
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">조사구간 ID</th>
              <td className="tbl3_td tbl3_srvyid_td tbl3_td_rend">
                <div>{srvydata.srvyid}</div>
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp tbl3_th_prp_top ">조사구간 NFID</th>
              <td
                className="tbl3_td tbl3_nfid_td tbl3_td_rend"
                onClick={() => {
                  // console.log('loggggggin', srvydata);
                  handleNfid(srvydata);
                }}
              >
                <div
                  className="tbl3_nfids"

                  // onClick={() => handleNfid(srvydata.nfidlst, srvydata.srvyid)}
                >
                  {srvydata.nfidlst.join(', ')}
                </div>
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">조사일시</th>
              <td className="tbl3_td tbl3_td_rdo">
                <div>{srvydata.researchdate || '__'}</div>
              </td>
              <th className="tbl3_th_prp">조사자</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.researcher || '__'}</div>
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">도로명</th>
              <td className="tbl3_td">
                <div>{srvydata.roadname || '__'}</div>
              </td>
              <th className="tbl3_th_prp">건물번호</th>
              <td className="tbl3_td tbl3_td_rend">
                시작번호
                <div>&nbsp;{srvydata.buildingstartno || '__'}</div>, 종점번호
                <div>&nbsp;{srvydata.buildingendno || '__'}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                이면도로 현황
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp tbl3_th_prp_top">도로연장</th>
              <td className="tbl3_td tbl3_td_top">
                <div>{srvydata.roadlength || '__'}</div>m
              </td>
              <th className="tbl3_th_prp tbl3_th_prp_top">도로폭 (차도포함)</th>
              <td className="tbl3_td tbl3_td_top tbl3_td_rend">
                <div>{srvydata.roadwidth || '__'}</div>m
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">보차분리현황</th>
              <td className="tbl3_td tbl3_td_rdo">
                <div>{srvydata.pedseparation || '__'}</div>
              </td>
              <th className="tbl3_th_prp">종단경사도</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.slope || '__'}</div>%
              </td>
            </tr>
            <tr>
              <th className="tbl3_th_prp">보행자교통사고</th>
              <td className="tbl3_td tbl3_td_acc">
                <div className="tbl3_td_acc_inputwrap1">
                  사고
                  <div>{srvydata.acctotal || '__'}</div>건, 사망자
                  <div>{srvydata.accdeath || '__'}</div>명, 중상자
                  <div>{srvydata.accserious || '__'}</div>명
                </div>
                <div className="tbl3_td_acc_inputwrap2">
                  경상자
                  <div>{srvydata.accminor || '__'}</div>명, 부상신고자
                  <div>{srvydata.accreport || '__'}</div>명
                </div>
              </td>
              <th className="tbl3_th_prp">교통량</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.trafficvolume || '__'}</div>대/시간
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">노상주차</th>
              <td className="tbl3_td">
                <div>{srvydata.parking || '__'}</div>개소
              </td>
              <th className="tbl3_th_prp">보행량</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.pedestrianvolume || '__'}</div>인/시간
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                안전시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">CCTV</th>
              <td className="tbl3_td tbl3_td_rdo">
                <div>{srvydata.cctv || '__'}</div>
                {srvydata.cctv === '있음' ? (
                  <div>{srvydata.cctvcount || '__'}개</div>
                ) : null}
              </td>
              <th className="tbl3_th_prp">보안등</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <div>{srvydata.securitylight || '__'}</div>
                {srvydata.securitylight === '양호' ? (
                  <div>{srvydata.securitylightcountgood || '__'}개</div>
                ) : srvydata.securitylight === '불량' ? (
                  <div>{srvydata.securitylightcountbad || '__'}개</div>
                ) : null}
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">포장상태</th>
              <td className="tbl3_td tbl3_td_rdo">
                <div>{srvydata.packagestate || '__'}</div>
              </td>
              <th className="tbl3_th_prp">속도저감시설</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <div>{srvydata.speedreductionfacil || '__'}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                편의시설
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">보행자안내표시</th>
              <td className="tbl3_td">
                <div>{srvydata.pedsign || '__'}</div>
              </td>
              <th className="tbl3_th_prp">조명기구</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.light || '__'}</div>
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">벤치</th>
              <td className="tbl3_td">
                <div>{srvydata.bench || '__'}</div>
              </td>
              <th className="tbl3_th_prp">식재</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.plant || '__'}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl3_separate"></div>
        <table className="tbl3 tbl3_4">
          <thead>
            <tr>
              <th className="tbl3_th_top" colSpan={1}>
                보행장애물
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbl3_tr_top">
              <th className="tbl3_th_prp">노상적치물/입간판</th>
              <td className="tbl3_td tbl3_td_rdo tbl3_td_rend">
                <div>{srvydata.obstacle || '__'}</div>
              </td>
            </tr>
            <tr className="tbl3_tr_bottom">
              <th className="tbl3_th_prp">불법주차</th>
              <td className="tbl3_td tbl3_td_rend">
                <div>{srvydata.illegalparking || '__'}</div>개소
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table3;
