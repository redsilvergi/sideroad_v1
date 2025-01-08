import { createContext, useState, useCallback, useMemo } from 'react';

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  // const MAPBOX_ACCESS_TOKEN =
  //   'pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw';

  const [scrn, setScrn] = useState(window.innerWidth);
  // const [view, setView] = useState({
  //   longitude: 128.05161672437677,
  //   latitude: 36.06497806027222,
  //   zoom: 6.5,
  //   bearing: 0,
  //   pitch: 0,
  // });
  const [LD, setLD] = useState(false);
  // const data = useMemo(
  //   () =>
  //     `https://api.mapbox.com/v4/redsilver522.59bd8ljy/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   []
  // );

  // Primary information with a reset and allset function
  const [info, setInfo] = useState({
    rdbtOps: { name: '도로폭원', selected: null, checkboxes: null },
    slopeOps: { name: '경사도', selected: null, checkboxes: null },
    pmtrOps: { name: '포장재질', selected: null, checkboxes: null },
    rdnetOps: { name: '네트워크접근성', selected: null, checkboxes: null },
    pubtrOps: { name: '대중교통접근성', selected: null, checkboxes: null },
    pbuldOps: { name: '근생시설연면적', selected: null, checkboxes: null },
    buldeOps: { name: '건물출입구밀도', selected: null, checkboxes: null },
    stairOps: { name: '계단', selected: null, checkboxes: null },
    sdwkOps: { name: '보도', selected: null, checkboxes: null },
  });

  const reset = useCallback(() => {
    setInfo({
      rdbtOps: { name: '도로폭원', selected: null, checkboxes: null },
      slopeOps: { name: '경사도', selected: null, checkboxes: null },
      pmtrOps: { name: '포장재질', selected: null, checkboxes: null },
      rdnetOps: { name: '네트워크접근성', selected: null, checkboxes: null },
      pubtrOps: { name: '대중교통접근성', selected: null, checkboxes: null },
      pbuldOps: { name: '근생시설연면적', selected: null, checkboxes: null },
      buldeOps: { name: '건물출입구밀도', selected: null, checkboxes: null },
      stairOps: { name: '계단', selected: null, checkboxes: null },
      sdwkOps: { name: '보도', selected: null, checkboxes: null },
    });
    setLength(null);
  }, []);

  const allset = useCallback(() => {
    setInfo({
      rdbtOps: {
        name: '도로폭원',
        selected: [
          '3m 미만',
          '3m이상 ~ 8m미만',
          '8m이상 ~ 9m미만',
          '9m이상 ~ 10m미만',
          '10m이상 ~ 12m미만',
        ],
        checkboxes: [true, true, true, true, true],
      },
      slopeOps: {
        name: '경사도',
        selected: [
          '10.00 초과',
          '6.00 ~ 10.00',
          '3.00 ~ 6.00',
          '1.00 ~ 3.00',
          '0.00 ~ 1.00',
        ],
        checkboxes: [true, true, true, true, true],
      },
      pmtrOps: {
        name: '포장재질',
        selected: ['아스팔트', '콘크리트', '블록', '비포장', '우레탄 등'],
        checkboxes: [true, true, true, true, true],
      },
      rdnetOps: {
        name: '네트워크접근성',
        selected: [
          '1.35초과',
          '1.14 ~ 1.35',
          '0.98 ~ 1.14',
          '0.82 ~ 0.98',
          '0.00 ~ 0.82',
        ],
        checkboxes: [true, true, true, true, true],
      },
      pubtrOps: {
        name: '대중교통접근성',
        selected: [
          '500 초과',
          '350 ~ 500',
          '200 ~ 350',
          '100 ~ 200',
          '0 ~ 100',
        ],
        checkboxes: [true, true, true, true, true],
      },
      pbuldOps: {
        name: '근생시설연면적',
        selected: [
          '2000 이상',
          '1000 ~ 2000',
          '500 ~ 1000',
          '100 ~ 500',
          '0 ~ 100',
        ],
        checkboxes: [true, true, true, true, true],
      },
      buldeOps: {
        name: '건물출입구밀도',
        selected: [
          '20개 이상',
          '11~20개',
          '6~10개',
          '1~5개',
          '출입구 없음 (0)',
        ],
        checkboxes: [true, true, true, true, true],
      },
      stairOps: {
        name: '계단',
        selected: ['설치', '미설치'],
        checkboxes: [true, true],
      },
      sdwkOps: {
        name: '보도',
        selected: ['단측 설치', '양측 설치', '미설치'],
        checkboxes: [true, true, true],
      },
    });
  }, []);
  const [rnfo0, setRnfo0] = useState(null);
  const [rnfo1, setRnfo1] = useState(null);
  const [pnfo, setPnfo] = useState(null);
  const [isFilter, setIsFilter] = useState(true);
  const [depth1, setDepth1] = useState(null);
  const [length, setLength] = useState(false);
  // const [region, setRegion] = useState({
  //   city: { cd: null, name: null },
  //   county: { cd: null, name: null },
  // });
  const [istgl, setIstgl] = useState(false);
  const [bar, setBar] = useState(1);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [pick, setPick] = useState(null);
  const [hov, setHov] = useState(null);
  const [accRsk2a, setAccRsk2a] = useState(true);
  const [nfid, setNfid] = useState(null);
  const [prpall, setPrpall] = useState(false);
  const [yr, setYr] = useState(null);
  const [gen, setGen] = useState('사회경제지표');
  const [genitem, setGenitem] = useState('');
  const [genfo, setGenfo] = useState([]);
  const [ldcuid, setLdcuid] = useState(null);
  const [exp, setExp] = useState(0);
  const [srvy, setSrvy] = useState(false);
  const [nfidlst, setNfidlst] = useState([]);

  //////////////////////////////////
  const [pfrjs, setPfrjs] = useState(null);
  const [checkedPfr, setCheckedPfr] = useState([]);
  const [pfrPick, setPfrPick] = useState(null);
  const [pfrInfo, setPfrInfo] = useState(null);
  const [pfrdata, setPfrdata] = useState({
    parks: null,
    parks_buffer: null,
    ch_safe_zone: null,
    sn_safe_zone: null,
    multfac: null,
    multfac_entr: null,
    schl_bld: null,
    schl_buffer: null,
    schl_entr: null,
  });
  const [pfrLegendCbx, setPfrLegendCbx] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [topPfrList, setTopPfrList] = useState([]);

  const contextValue = useMemo(
    () => ({
      // view,
      // setView,
      LD,
      setLD,
      // data,
      info,
      setInfo,
      reset,
      isFilter,
      setIsFilter,
      depth1,
      setDepth1,
      length,
      setLength,
      // region,
      // setRegion,
      istgl,
      setIstgl,
      bar,
      setBar,
      left,
      setLeft,
      right,
      setRight,
      pick,
      setPick,
      hov,
      setHov,
      accRsk2a,
      setAccRsk2a,
      nfid,
      setNfid,
      pnfo,
      setPnfo,
      prpall,
      setPrpall,
      allset,
      scrn,
      setScrn,
      yr,
      setYr,
      gen,
      setGen,
      genitem,
      setGenitem,
      genfo,
      setGenfo,
      ldcuid,
      setLdcuid,
      exp,
      setExp,
      rnfo0,
      setRnfo0,
      rnfo1,
      setRnfo1,
      srvy,
      setSrvy,
      nfidlst,
      setNfidlst,
      /////////////////
      pfrjs,
      setPfrjs,
      checkedPfr,
      setCheckedPfr,
      pfrPick,
      setPfrPick,
      pfrdata,
      setPfrdata,
      pfrLegendCbx,
      setPfrLegendCbx,
      pfrInfo,
      setPfrInfo,
      topPfrList,
      setTopPfrList,
    }),
    [
      // view,
      allset,
      reset,
      LD,
      // data,
      info,
      isFilter,
      depth1,
      length,
      // region,
      istgl,
      bar,
      left,
      right,
      pick,
      hov,
      accRsk2a,
      nfid,
      pnfo,
      prpall,
      scrn,
      yr,
      gen,
      genitem,
      genfo,
      ldcuid,
      exp,
      rnfo0,
      rnfo1,
      srvy,
      nfidlst,
      /////////////////
      pfrjs,
      checkedPfr,
      pfrPick,
      pfrdata,
      pfrLegendCbx,
      pfrInfo,
      topPfrList,
    ]
  );

  return (
    <InfoContext.Provider value={contextValue}>{children}</InfoContext.Provider>
  );
};

export { InfoProvider };
export default InfoContext;
