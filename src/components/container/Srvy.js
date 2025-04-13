import './Srvy.css';
import React, { useState } from 'react';
import AccrdPrp from '../accordions/AccrdPrp';
import AccrdPrpBff from '../accordions/AccrdPrpBff';
// import Table2 from '../table/Table2';
// import NewComponent from './NewComponent';
import useInfo from '../../hooks/use-info';
import { useAuth } from '../../context/auth';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Srvy = () => {
  // setup ----------------------------------------------------------------------
  const {
    setLength,
    setPick,
    srvy,
    setSrvy,
    nfidlst,
    setNfidlst,
    setBufferData,
    setBufferExp,
    pfrPick,
    setPfrPick,
    topPfrList,
    setSrvyid,
  } = useInfo();
  const { user } = useAuth();
  const [pickExp, setPickExp] = useState(true);

  // handle ----------------------------------------------------------------------
  const handleSrvyRes = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    } else if (user.role !== 'admin') {
      alert('관리자 권한이 필요합니다.');
      return;
    } else if (user.role === 'admin') {
      if (srvy) {
        setNfidlst([]);
        setBufferData([null, null]);
        setSrvyid(null);
      } else if (pfrPick && nfidlst.length === 0) {
        const selectedRank = topPfrList.find(
          (item) => item.nf_id === pfrPick
        )?.ped_fitr_rank;

        const matchingIds = topPfrList
          .filter((item) => item.ped_fitr_rank === selectedRank)
          .map((item) => item.nf_id);
        setNfidlst(matchingIds);
      }
      setSrvy(!srvy);
      setLength(null);
      setPick(null);
    }
  };

  const handleDeleteLst = () => {
    setNfidlst([]);
    setBufferData([null, null]);
    setBufferExp(false);
    setPfrPick(null);
  };

  // return ----------------------------------------------------------------------
  return (
    <div className="srvy_wrap">
      <div className="srvy_res_wrap">
        <div className="srvy_res" onClick={handleSrvyRes}>
          실태조사 결과 입력
        </div>
      </div>

      {!srvy && <AccrdPrp />}
      {srvy && nfidlst && nfidlst.length > 0 && (
        <div className="srvy_nfidlst_wrap">
          <div className="srvy_nfidlst_rm" onClick={() => handleDeleteLst()}>
            선택구간삭제
          </div>
          <div
            className="srvy_nfidlst_lbl"
            onClick={() => setPickExp(!pickExp)}
          >
            <div className="srvy_nfidlst_lbl_dep1">{`선택구간 (${nfidlst.length})`}</div>
            <div className="srvy_fiicon">
              {pickExp ? <FiMinus /> : <FiPlus />}
            </div>
          </div>
          {pickExp && (
            <div className="srvy_nfidlst_items">
              {nfidlst.map((item, id) => {
                return (
                  <div key={id} className="srvy_nfidlst_item">
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {/* {srvy && (
        <div className="srvy_form_wrap">
          <div
            className="srvy_form"
            onClick={() => console.log('실태조사양식')}
          >
            실태조사양식
          </div>
        </div>
      )} */}
      {srvy && nfidlst && nfidlst.length > 0 && <AccrdPrpBff />}
      {/* {srvy && <NewComponent />} */}
    </div>
  );
};

export default Srvy;
