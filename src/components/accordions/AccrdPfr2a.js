import React, { useCallback, useEffect, useState } from 'react';
import './AccrdPfr2a.css';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import { useAuth } from '../../context/auth';

const AccrdPfr2a = React.memo(() => {
  // setup ----------------------------------------------------------------------
  const {
    ldcuid,
    setPfrInfo,
    setBar,
    topPfrList,
    setTopPfrList,
    setSrvy,
    setNfidlst,
    pfrPick,
    setSrvyid,
  } = useInfo();
  const [csvDiv, setCsvDiv] = useState(null);
  const { getCord, getCsv, getTopPfr, getNfidLstByRoadnm } = useDb();
  const { user } = useAuth();

  // auxiliary ----------------------------------------------------------------------
  const handleCsvList = useCallback(async () => {
    const top10temp = await getTopPfr(); //not actaully 10 items here, will be filtered by unique rank
    setTopPfrList(
      top10temp.map((item) => ({
        nf_id: item.nf_id,
        road_nm: item.road_nm ?? null,
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
            await getCord(item['nf_id'], true);
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

  useEffect(() => {
    const fetchNfidlst = async () => {
      if (pfrPick) {
        const selectedRank = topPfrList.find(
          (item) => item.nf_id === pfrPick
        )?.ped_fitr_rank;
        const selectedRoadnm = topPfrList.find(
          (item) => item.nf_id === pfrPick
        )?.road_nm;

        const matchingIds = topPfrList
          .filter((item) => item.ped_fitr_rank === selectedRank)
          .map((item) => item.nf_id);

        const rdnmlst = (await getNfidLstByRoadnm(selectedRoadnm)) || [];

        const combinedIds = Array.from(
          new Set([
            ...matchingIds,
            ...(rdnmlst.length > 0 ? rdnmlst.map((item) => item.nf_id) : []),
          ])
        );

        setNfidlst(combinedIds);
      }
    };

    fetchNfidlst();
  }, [pfrPick, getNfidLstByRoadnm, setNfidlst, topPfrList]);

  const startSurvey = async () => {
    setBar(4);
    setSrvy(true);
    setSrvyid(null);
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
          {user && user.role === 'admin' && (
            <React.Fragment>
              <div
                className="pfr2a_dwnld"
                onClick={async () => await getCsv(topPfrList)}
              >
                CSV 데이터 다운로드
              </div>

              <div className="pfr2a_input" onClick={() => startSurvey()}>
                실태조사 시작
              </div>
            </React.Fragment>
          )}
        </div>
      )
    ) : null;
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
});

export default AccrdPfr2a;
