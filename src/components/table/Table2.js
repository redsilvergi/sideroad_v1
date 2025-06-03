import './Table2.css';
import React, { useState, useEffect } from 'react';
// import useInfo from '../../hooks/use-info';
import { TfiAngleDoubleUp, TfiAngleDoubleDown } from 'react-icons/tfi';
import useInfo from '../../hooks/use-info';
import { useAuth } from '../../context/auth';
import useDb from '../../hooks/use-db';
import { useNavigate } from 'react-router-dom';

// Table2 ----------------------------------------------------------------------
const Table2 = () => {
  // setup ----------------------------------------------------------------------
  const { nfidlst, srvyid, setNfidlst, setBar, setSrvy, setSrvyid } = useInfo();
  const { user } = useAuth();
  const { postSrvy, getSrvyItem, editSrvy, getCordOnly } = useDb();
  const [extend, setExtend] = useState(1);
  const [srvydata, setSrvydata] = useState(null);
  const [formData, setFormData] = useState({
    researchDate: '',
    researcher: '',
    roadName: '',
    buildingStartNo: '',
    buildingEndNo: '',
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
  const [editmode, setEditmode] = useState(false);
  const navigate = useNavigate();

  //useEffect ----------------------------------------------------------------------
  useEffect(() => {
    if (srvyid) {
      const fetchData = async (srvyid) => {
        const response = await getSrvyItem({ srvyid: srvyid });
        console.log('handleLook response\n', response);
        setSrvydata(response);
        // setEditmode(false);
      };
      fetchData(srvyid);
    }
  }, [srvyid, getSrvyItem]);

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

    // if (name === 'slope') {
    //   newValue = Math.max(0, Math.min(100, Number(newValue)))
    //     .toFixed(2)
    //     .toString();
    // }

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
    // Confirm with the user before proceeding
    const userConfirmed = window.confirm('저장하시겠습니까?');
    if (!userConfirmed) {
      return; // User clicked "Cancel", so do not proceed
    }

    // Allow only numbers and hyphens
    const formattedValue =
      formData && formData.researchDate.replace(/[^0-9-]/g, '');

    // Validate and format the date as YYYY-MM-DD
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (formattedValue.length === 10 && datePattern.test(formattedValue)) {
      const tmp1 = { userid: user && user.id, nfidlst: nfidlst, ...formData };
      // const tmp2 = { srvyid: , userid: user && user.id}
      console.log('Form data submitted:', tmp1);
      const res = await postSrvy(tmp1);

      console.log('res\n', res);
      navigate(`/mypage/${user.username}`);
      return;
    } else {
      alert('날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }

    // if (nfidlst && nfidlst.length === 0) {
    //   alert('조사구간을 선택해주세요.');
    //   return;
    // } else {
    //   const tmp1 = { userid: user && user.id, nfidlst: nfidlst, ...formData };
    //   // const tmp2 = { srvyid: , userid: user && user.id}
    //   console.log('Form data submitted:', tmp1);
    //   const res = await postSrvy(tmp1);

    //   console.log('res\n', res);
    // }
  };

  const handleChange2 = (e) => {
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

  const handleSubmit2 = async (e) => {
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

      console.log('res\n', res);
      navigate(`/mypage/${user.username}`);
      return;
    } else {
      alert('날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }
  };

  const handleNfid = async (received_srvydata) => {
    const tmp = received_srvydata;
    // console.log('tmptmptmptmptmp', tmp, tmp.nfidlst, tmp.srvyid);
    setNfidlst(tmp.nfidlst);

    setSrvyid(tmp.srvyid);
    setBar(4);
    setSrvy(true);
    await getCordOnly({ nfid: tmp.nfidlst[0] });
    navigate('/');
  };

  // return ----------------------------------------------------------------------
  return srvyid && srvydata ? (
    editmode ? (
      <form onSubmit={handleSubmit2}>
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
            <div className="tbl2_head1">실태조사 총괄표</div>
            {extend === 3 ? (
              <div className="tbl2_angles" onClick={handleExtend}>
                <TfiAngleDoubleDown />
              </div>
            ) : (
              <div className="tbl2_angles" onClick={handleExtend}>
                <TfiAngleDoubleUp />
              </div>
            )}
            <div className="tbl3_head2">
              <div className="tbl3_save" onClick={handleSubmit2}>
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
                  <div className="tbl3_nfids">
                    {srvydata.nfidlst.join(', ')}
                  </div>
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
                    onChange={handleChange2}
                  />
                </td>
                <th className="tbl3_th_prp">조사자</th>
                <td className="tbl3_td tbl3_td_rend">
                  <input
                    type="text"
                    className="tbl3_text_input1"
                    name="researcher"
                    value={srvydata.researcher}
                    onChange={handleChange2}
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
                    onChange={handleChange2}
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
                    onChange={handleChange2}
                  />
                  , 종점번호
                  <input
                    type="text"
                    className="tbl3_text_input2"
                    name="buildingendno"
                    value={srvydata.buildingendno}
                    onChange={handleChange2}
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
                    onChange={handleChange2}
                  />
                  m
                </td>
                <th className="tbl3_th_prp tbl3_th_prp_top">
                  도로폭 (차도포함)
                </th>
                <td className="tbl3_td tbl3_td_top tbl3_td_rend">
                  <input
                    type="number"
                    className="tbl3_num_input1"
                    name="roadwidth"
                    value={srvydata.roadwidth}
                    onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                    onChange={handleChange2}
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
                      onChange={handleChange2}
                    />
                    건, 사망자
                    <input
                      type="number"
                      className="tbl3_num_input2"
                      name="accdeath"
                      value={srvydata.accdeath}
                      onChange={handleChange2}
                    />
                    명, 중상자
                    <input
                      type="number"
                      className="tbl3_num_input2"
                      name="accserious"
                      value={srvydata.accserious}
                      onChange={handleChange2}
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
                      onChange={handleChange2}
                    />
                    명, 부상신고자
                    <input
                      type="number"
                      className="tbl3_num_input2"
                      name="accreport"
                      value={srvydata.accreport}
                      onChange={handleChange2}
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
                    onChange={handleChange2}
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
                    onChange={handleChange2}
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
                    onChange={handleChange2}
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
                      onChange={handleChange2}
                    />
                    <div className="tbl3_rdo_txt">있음</div>
                    <input
                      type="number"
                      className="tbl3_rdo_num_input2"
                      name="cctvcount"
                      value={srvydata.cctvcount}
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
                    />
                    <div className="tbl3_rdo_txt">양호</div>
                    <input
                      type="number"
                      className="tbl3_rdo_num_input2"
                      name="securitylightcountgood"
                      value={srvydata.securitylightcountgood}
                      onChange={handleChange2}
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
                      onChange={handleChange2}
                    />
                    <div className="tbl3_rdo_txt">불량</div>
                    <input
                      type="number"
                      className="tbl3_rdo_num_input2"
                      name="securitylightcountbad"
                      value={srvydata.securitylightcountbad}
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                      onChange={handleChange2}
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
                    onChange={handleChange2}
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
            <div className="tbl2_head1">실태조사 총괄표</div>
            {extend === 3 ? (
              <div className="tbl2_angles" onClick={handleExtend}>
                <TfiAngleDoubleDown />
              </div>
            ) : (
              <div className="tbl2_angles" onClick={handleExtend}>
                <TfiAngleDoubleUp />
              </div>
            )}

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
                  <div className="tbl3_nfids">
                    {srvydata.nfidlst.join(', ')}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="tbl3_th_prp">조사일시</th>
                <td className="tbl3_td tbl3_td_rdo">
                  <div>{srvydata.researchdate}</div>
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
                  <div>{srvydata.buildingstartno || '__'}</div>, 종점번호
                  <div>{srvydata.buildingendno || '__'}</div>
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
                <th className="tbl3_th_prp tbl3_th_prp_top">
                  도로폭 (차도포함)
                </th>
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
    )
  ) : (
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
            <div className="tbl2_save" onClick={handleSubmit}>
              저장
            </div>
          </div>
        </div>
        {/* <div className="tbl2_separate"></div> */}
        <table className="tbl2 tbl2_0">
          <thead>
            <tr>
              <th className="tbl2_th_top" colSpan={1}>
                일반정보
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp tbl2_th_prp_top ">조사구간 ID</th>
              <td className="tbl2_td tbl2_td_top tbl2_td_rend">
                <div className="tbl2_nfids">
                  {nfidlst && nfidlst.join(', ')}
                </div>
              </td>
            </tr> */}
            <tr className="tbl2_tr_top">
              <th className="tbl2_th_prp">조사일시</th>
              <td className="tbl2_td">
                <input
                  type="text"
                  className="tbl2_text_input1"
                  name="researchDate"
                  value={formData.researchDate}
                  placeholder="YYYY-MM-DD"
                  onChange={handleChange}
                />
              </td>
              <th className="tbl2_th_prp">조사자</th>
              <td className="tbl2_td tbl2_td_rend">
                <input
                  type="text"
                  className="tbl2_text_input1"
                  name="researcher"
                  value={formData.researcher}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="tbl2_tr_bottom">
              <th className="tbl2_th_prp">도로명</th>
              <td className="tbl2_td">
                <input
                  type="text"
                  className="tbl2_text_input1"
                  name="roadName"
                  value={formData.roadName}
                  onChange={handleChange}
                />
              </td>
              <th className="tbl2_th_prp">건물번호</th>
              <td className="tbl2_td tbl2_td_rend">
                시작번호
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="buildingStartNo"
                  value={formData.buildingStartNo}
                  onChange={handleChange}
                />
                , 종점번호
                <input
                  type="number"
                  className="tbl2_num_input3"
                  name="buildingEndNo"
                  value={formData.buildingEndNo}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="tbl2_separate"></div>
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
