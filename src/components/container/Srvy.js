import './Srvy.css';
import React from 'react';
import AccrdPrp from '../accordions/AccrdPrp';
import AccrdPrpBff from '../accordions/AccrdPrpBff';
// import Table2 from '../table/Table2';
// import NewComponent from './NewComponent';
import useInfo from '../../hooks/use-info';
import { useAuth } from '../../context/auth';

const Srvy = () => {
  // setup ----------------------------------------------------------------------
  const { srvy, setSrvy, nfidlst, setNfidlst } = useInfo();
  const { user } = useAuth();

  // handle ----------------------------------------------------------------------
  const handleSrvyRes = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
    } else if (user.role !== 'admin') {
      alert('관리자 권한이 필요합니다.');
    } else if (user.role === 'admin') {
      setSrvy(!srvy);
    }
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
          <div className="srvy_nfidlst_rm" onClick={() => setNfidlst([])}>
            선택구간삭제
          </div>
          <div className="srvy_nfidlst_lbl">선택구간</div>
          <div className="srvy_nfidlst_items">
            {nfidlst.map((item, id) => {
              return (
                <div key={id} className="srvy_nfidlst_item">
                  {item}
                </div>
              );
            })}
          </div>
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
