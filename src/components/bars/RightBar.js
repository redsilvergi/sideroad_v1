import './RightBar.css';
import React, { useEffect, useState, useMemo } from 'react';
import useInfo from '../../hooks/use-info';
import useDb from '../../hooks/use-db';
import Rsrch from '../accordions/Rsrch';
import Rprp from '../accordions/Rprp';
import Rrsk from '../accordions/Rrsk';
import Line1a from '../accordions/Line1a';
import Bar2a from '../accordions/Bar2a';
import BottomR from '../auxiliary/BottomR';
import Rpie from '../accordions/Rpie';
import Rpfr from '../accordions/Rpfr';

const pieconfig = [
  {
    name: '도로폭원',
    col: 'road_bt',
    opt: [
      '3m 미만',
      '3m이상 ~ 8m미만',
      '8m이상 ~ 9m미만',
      '9m이상 ~ 10m미만',
      '10m이상 ~ 12m미만',
    ],
  },
  {
    name: '경사도',
    col: 'slope_lg',
    opt: [
      '10.00 초과',
      '6.00 ~ 10.00',
      '3.00 ~ 6.00',
      '1.00 ~ 3.00',
      '0.00 ~ 1.00',
    ],
  },
  {
    name: '포장재질',
    col: 'pmtr_se',
    opt: ['아스팔트', '콘크리트', '블록', '비포장', '우레탄 등'],
  },
  {
    name: '네트워크 접근성',
    col: 'rdnet_ac',
    opt: [
      '1.35초과',
      '1.14 ~ 1.35',
      '0.98 ~ 1.14',
      '0.82 ~ 0.98',
      '0.00 ~ 0.82',
    ],
  },
  {
    name: '대중교통 접근성',
    col: 'pubtr_ac',
    opt: ['500 초과', '350 ~ 500', '200 ~ 350', '100 ~ 200', '0 ~ 100'],
  },
  {
    name: '근생시설 연면적',
    col: 'pbuld_fa',
    opt: ['2000 이상', '1000 ~ 2000', '500 ~ 1000', '100 ~ 500', '0 ~ 100'],
  },
  {
    name: '건물 출입구 밀도',
    col: 'bulde_de',
    opt: ['20개 이상', '11~20개', '6~10개', '1~5개', '출입구 없음 (0)'],
  },
  { name: '계단', col: 'stair_at', opt: ['설치', '미설치'] },
  { name: '보도', col: 'sdwk_se', opt: ['단측 설치', '양측 설치', '미설치'] },
];

const RightBar = () => {
  const {
    length,
    info,
    setLength,

    rnfo0,
    rnfo1,
    pick,
    pfrPick,
    pnfo,
    bar,
    checkedPfr,
    ldcuid,
    pfrjs,
    //
    srvy,
    nfidlst,
  } = useInfo();
  const { getLength, getLstLength } = useDb();
  const [renl, setRenL] = useState(
    <div className="lengthSum2 lengthReq2">선택구간연장요청</div>
  );
  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const fetchLength = async () => {
      if (pick) {
        setLength(pnfo && pnfo.road_lt);
      } else if (nfidlst && nfidlst.length > 0) {
        try {
          const length = await getLstLength(nfidlst);
          setLength(length || 0);
        } catch (err) {
          console.error('Error fetching length:', err);
          setLength(0);
        }
      } else {
        setLength(null);
      }
    };
    fetchLength();
  }, [
    info,
    rnfo0,
    rnfo1,
    pick,
    pnfo,
    setLength,
    ldcuid,
    nfidlst,
    getLstLength,
  ]);

  const pedLen = useMemo(() => {
    if (!pfrjs?.features || !ldcuid?.[0] || !checkedPfr) return 0;

    return (
      pfrjs.features
        .filter(
          (feature) =>
            feature.properties?.sig_cd === ldcuid[0] &&
            checkedPfr.includes(feature.properties?.id)
        )
        .reduce((sum, feature) => sum + (feature.properties?.h_len || 0), 0) /
      1000
    );
  }, [pfrjs, ldcuid, checkedPfr]);

  useEffect(() => {
    if (pick || (nfidlst && nfidlst.length === 1)) {
      setRenL(
        <div className="lngthS isLngth">
          <div className="lngthS_txt" style={{ color: 'black' }}>
            선택구간 연장
          </div>
          <div className="km">
            <span style={{ color: 'black', fontWeight: 800 }}>{length}</span> m
          </div>
        </div>
      );
    } else if ((srvy || pfrPick) && nfidlst && nfidlst.length > 1) {
      setRenL(
        <div className="lngthS isLngth">
          <div className="lngthS_txt" style={{ color: 'black' }}>
            선택구간 연장
          </div>
          <div className="km">
            <span style={{ color: 'black', fontWeight: 800 }}>
              {length
                ? length >= 1000
                  ? `${Number((length / 1000).toFixed(2))} km`
                  : `${Number(length.toFixed(2))} m`
                : '---'}
            </span>
          </div>
        </div>
      );
    } else if (bar === 3) {
      setRenL(
        <div className="lngthS lngthP">
          <div className="lngthPfr_txt">보행자우선도로 총연장</div>
          <div className="km" style={{ color: 'black', fontWeight: 800 }}>
            {pedLen && pedLen !== 0 ? Number(pedLen.toFixed(3)) : '---'} km
          </div>
        </div>
      );
    } else if (length || length === 0) {
      setRenL(
        <div className="lngthS isLngth">
          <div className="lngthS_txt" style={{ color: 'black' }}>
            선택구간 연장
          </div>
          <div className="km">
            <span style={{ color: 'black', fontWeight: 800 }}>
              {Number(length.toFixed(3))}
            </span>
            km
          </div>
        </div>
      );
    } else {
      setRenL(
        <div className="lngthS lngthReq" onClick={getLength}>
          <div className="lngthS_txt">선택구간 연장요청</div>
          <div className="km">--- km</div>
        </div>
      );
    }
  }, [length, getLength, info, bar, pedLen, pick, pfrPick, srvy, nfidlst]);

  // renderfunc ----------------------------------------------------------------------
  const renderPie = () => {
    return pieconfig.map((item, id) => {
      return <Rpie key={id} name={item.name} col={item.col} opt={item.opt} />;
    });
  };

  // return ----------------------------------------------------------------------
  return (
    <div className="rightbar">
      <div className="rb_accordion_div">
        <div className="id_finder">
          <Rsrch />
        </div>
        <div className="separation">
          <div className="rb_line"></div>
          <div className="sep_txt">도로속성</div>
          <div className="rb_line"></div>
        </div>

        <div className="lngth_div">
          {(bar === 2 || bar === 3 || bar === 4) && renl}
        </div>
        {bar !== 1 && bar !== 3 && (
          <React.Fragment>
            <div className="rb_prp">
              <Rprp />
            </div>
            {bar === 2 && (
              <div className="rb_rsk">
                <Rrsk />
              </div>
            )}
            {bar === 4 && <div className="rb_pie">{renderPie()}</div>}
          </React.Fragment>
        )}
        {bar === 1 && (
          <React.Fragment>
            <div className="rb_line1">
              <Line1a />
            </div>
            <div className="rb_bar2">
              <Bar2a />
            </div>
          </React.Fragment>
        )}
        {bar === 3 && (
          <React.Fragment>
            <div className="rb_prp">
              <Rpfr />
            </div>
            <div className="rb_prp">
              <Rprp />
            </div>
          </React.Fragment>
        )}

        <BottomR />
      </div>
    </div>
  );
};

export default RightBar;
