import './Table4.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import useDb from '../../hooks/use-db';

// Table4 ----------------------------------------------------------------------
const Table4 = ({ setSrvydata, setEditmode }) => {
  // setup ----------------------------------------------------------------------
  const { user } = useAuth();
  const { getSrvyhist, getCsvSrvy, getSrvyItem, delSrvyItem } = useDb();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [data1, setData1] = useState(null);

  // handle ----------------------------------------------------------------------
  const handleData = useCallback(async () => {
    const response = await getSrvyhist({ userid: user && user.id });
    // console.log('response\n', response);
    setData1(response);
  }, [getSrvyhist, user]);

  const handleLook = async (srvyid) => {
    const response = await getSrvyItem({ srvyid: srvyid });
    console.log('handleLook response\n', response);
    setSrvydata(response);
    setEditmode(false);
  };

  const handleDelete = async (srvyid) => {
    await delSrvyItem({ srvyid: srvyid });
    handleData();
    setSrvydata(null);
  };
  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSrvyhist({ userid: user && user.id });
      // console.log('response\n', response);
      setData1(response);
    };

    fetchData();
  }, [getSrvyhist, user]);

  // renderfunc ----------------------------------------------------------------------
  const totalPages = data1 && Math.ceil(data1.length / rowsPerPage);
  const renderTr = () => {
    if (data1) {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const currentData = data1.slice(startIndex, endIndex);

      return currentData.map((item, id) => {
        const isLast = id === currentData.length - 1;
        return (
          <tr key={id} className={`tbl4_tr ${isLast ? 'tbl4_tr_bottom' : ''}`}>
            <td className="tbl4_td">{startIndex + id + 1}</td>
            <td className="tbl4_td">{item.srvyid}</td>
            <td className="tbl4_td">{item.roadname}</td>
            <td className="tbl4_td">
              {new Date(item.timestamp).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </td>
            <td className="tbl4_td tbl4_td_rend">
              <div
                className="tbl4_dwl"
                onClick={() => getCsvSrvy({ srvyid: item.srvyid })}
              >
                다운로드
              </div>
              <div
                className="tbl4_look"
                onClick={() => handleLook(item.srvyid)}
              >
                보기
              </div>
              <div
                className="tbl4_del"
                onClick={() => handleDelete(item.srvyid)}
              >
                삭제
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  // return ----------------------------------------------------------------------
  return (
    <form>
      <div className={`tbl4_cont`}>
        <div className="tbl4_head">
          <div className="tbl4_head1">실태조사 총괄표 작성 목록</div>
        </div>
        {/* <div className="tbl4_separate"></div> */}
        {data1 && data1.length !== 0 ? (
          <div className="tbl4_tbl_pg_wrap">
            <table className="tbl4 tbl4_0">
              <thead>
                <tr>
                  <th className="tbl4_th_top" colSpan={1}>
                    일반정보
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="tbl4_tr_top">
                  <th className="tbl4_th_prp">연번</th>
                  <th className="tbl4_th_prp">조사구간 ID</th>
                  <th className="tbl4_th_prp">도로명</th>
                  <th className="tbl4_th_prp">작성일자</th>
                  <th className="tbl4_th_prp tbl4_th_rend"></th>
                </tr>
                {renderTr()}
              </tbody>
            </table>
            <div className="pagination">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                이전
              </button>
              <span>
                페이지 {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          </div>
        ) : (
          <div className="tbl4_nodata">데이터가 존재하지 않습니다.</div>
        )}
        <div className="tbl4_separate"></div>
      </div>
    </form>
  );
};

export default Table4;
