import React, { useCallback, useEffect, useState } from 'react';
import './AccrdPfr2a.css';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';

const AccrdPfr2a = React.memo(() => {
  // setup ----------------------------------------------------------------------
  const { ldcuid, setPfrInfo, setBar, topPfrList, setTopPfrList } = useInfo();
  const [csvDiv, setCsvDiv] = useState(null);
  const { getCord, getCsv, getTopPfr } = useDb();

  // auxiliary ----------------------------------------------------------------------
  const handleCsvList = useCallback(async () => {
    const top10temp = await getTopPfr();
    setTopPfrList(
      top10temp.map((item) => ({
        nf_id: item.nf_id,
        ped_fitr_rank: item.ped_fitr_rank,
      }))
    );
    const uniqueRanks = new Set();
    const filteredData = top10temp.filter((item) => {
      if (!uniqueRanks.has(item.ped_fitr_rank)) {
        uniqueRanks.add(item.ped_fitr_rank);
        return true;
      }
      return false;
    });

    const top10Data = filteredData.map((item, id) => {
      return (
        <div
          key={id}
          className="pfr2a_csvdwn"
          onClick={async () => {
            await getCord(item['nf_id']);
            setPfrInfo(null);
          }}
        >
          <div className="csv_nbox">
            <div className="pfrc_number_box">{id + 1}</div>
          </div>
          <div className="csv_lbl">
            {item.road_nm ? item.road_nm : item.nf_id}
          </div>
        </div>
      );
    });

    setCsvDiv(top10Data);
  }, [getTopPfr, getCord, setPfrInfo, setTopPfrList]);

  const fetchTopPfr = async () => {
    handleCsvList();
  };

  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    setCsvDiv(null);
  }, [ldcuid]);

  // items ----------------------------------------------------------------------
  const items = [
    {
      id: 'pfrtop20',
      label: '필요구간 TOP10',
      content: csvDiv,
    },
  ];

  // renderfunc ----------------------------------------------------------------------
  const renderedItems = items.map((item, index) => {
    return ldcuid ? (
      !csvDiv ? (
        <div
          key={`${item.id}_t10bt`}
          className="pfr2a_top5req"
          onClick={fetchTopPfr}
        >
          TOP10 요청
        </div>
      ) : (
        <div
          key={`${item.id}_t10lst`}
          className={`${item.id + '_pfr2a_accitem'}`}
        >
          <div className={`pfr2a_expanded ${item.id + '_pfr2a_exp'}`}>
            {item.content}
          </div>
          <div
            className="pfr2a_dwnld"
            onClick={async () => await getCsv(topPfrList)}
          >
            CSV 데이터 다운로드
          </div>
          <div className="pfr2a_input" onClick={() => setBar(4)}>
            실태조사 입력
          </div>
        </div>
      )
    ) : (
      <div key={`${item.id}_regsc`} className="pfr2a_noreg_text">
        지역을 선택해주세요.
      </div>
    );
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
});

export default AccrdPfr2a;
