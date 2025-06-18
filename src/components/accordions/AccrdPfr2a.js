import React, { useCallback, useEffect, useState } from 'react';
import './AccrdPfr2a.css';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import { useAuth } from '../../context/auth';

// auth_tier ----------------------------------------------------------------------
const auth_tier_1 = ['admin'];
const auth_tier_2 = [auth_tier_1, 'gov', 'partner'].flat();
// const auth_tier_3 = [auth_tier_2, 'guest'].flat();
// const auth_tier_4 = [auth_tier_3, 'user', 'user2', 'user3'].flat();

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
  const { getLinkProp, getCsvPfr, getTopPfr, getConnectedLinks } = useDb();
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
            await Promise.all([
              getLinkProp(item['nf_id'], true),
              getConnectedLinks(item['nf_id']),
            ]);
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
  }, [getTopPfr, getLinkProp, setPfrInfo, setTopPfrList, getConnectedLinks]);

  const fetchTopPfr = async () => {
    handleCsvList();
  };

  useEffect(() => {
    const fetchNfidlst = async () => {
      if (pfrPick) {
        // const selectedRank = topPfrList.find(
        //   (item) => item.nf_id === pfrPick
        // )?.ped_fitr_rank;
        // const selectedRoadnm = topPfrList.find(
        //   (item) => item.nf_id === pfrPick
        // )?.road_nm;

        // const matchingIds = topPfrList
        //   .filter((item) => item.ped_fitr_rank === selectedRank)
        //   .map((item) => item.nf_id);

        // const rdnmlst = (await getNfidLstByRoadnm(selectedRoadnm)) || [];

        // const combinedIds = Array.from(
        //   new Set([
        //     ...matchingIds,
        //     ...(rdnmlst.length > 0 ? rdnmlst.map((item) => item.nf_id) : []),
        //   ])
        // );

        // setNfidlst(combinedIds);
        const res = await getConnectedLinks(pfrPick);
        const connectedLinks = Object.values(res).map((item) => item.nf_id);

        setNfidlst(connectedLinks);
      }
    };

    fetchNfidlst();
  }, [pfrPick, getConnectedLinks, setNfidlst]);

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
          {user && auth_tier_2.includes(user.role) && (
            <React.Fragment>
              <div
                className="pfr2a_dwnld"
                onClick={async () => await getCsvPfr(topPfrList)}
              >
                CSV 데이터 다운로드
              </div>

              <div className="pfr2a_input" onClick={() => startSurvey()}>
                실태조사 결과 입력
              </div>
            </React.Fragment>
          )}
          {/* 
          <div className="pfr2a_dwnld" onClick={handleCsv}>
            CSV 데이터 다운로드
          </div>

          <div className="pfr2a_input" onClick={handleSrvy}>
            실태조사 시작
          </div> */}
        </div>
      )
    ) : null;
  });

  // return ----------------------------------------------------------------------
  return <div className={`accordion`}>{renderedItems}</div>;
});

export default AccrdPfr2a;
