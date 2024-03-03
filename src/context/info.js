import { createContext, useState } from "react";

const InfoContext = createContext();

function InfoProvider({ children }) {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";
  const [scrn, setScrn] = useState(window.innerWidth);
  const [view, setView] = useState({
    longitude: 128.05161672437677,
    latitude: 36.06497806027222,
    zoom: 6.5,
    bearing: 0,
    pitch: 0,
  });
  const [LD, setLD] = useState(false);
  const [data] = useState(
    `https://api.mapbox.com/v4/redsilver522.59bd8ljy/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}` //redsilver522.c1vrcxt3 / redsilver522.9c8f22nr /redsilver522.59bd8ljy
  );

  const [info, setInfo] = useState({
    rdbtOps: { name: "도로폭원", selected: null, checkboxes: null },
    slopeOps: { name: "경사도", selected: null, checkboxes: null },
    pmtrOps: { name: "포장재질", selected: null, checkboxes: null },
    rdnetOps: { name: "네트워크접근성", selected: null, checkboxes: null },
    pubtrOps: { name: "대중교통접근성", selected: null, checkboxes: null },
    pbuldOps: { name: "근생시설연면적", selected: null, checkboxes: null },
    buldeOps: { name: "건물출입구밀도", selected: null, checkboxes: null },
    stairOps: { name: "계단", selected: null, checkboxes: null },
    sdwkOps: { name: "보도", selected: null, checkboxes: null },
  });
  const reset = () => {
    setInfo({
      rdbtOps: { name: "도로폭원", selected: null, checkboxes: null },
      slopeOps: { name: "경사도", selected: null, checkboxes: null },
      pmtrOps: { name: "포장재질", selected: null, checkboxes: null },
      rdnetOps: { name: "네트워크접근성", selected: null, checkboxes: null },
      pubtrOps: { name: "대중교통접근성", selected: null, checkboxes: null },
      pbuldOps: { name: "근생시설연면적", selected: null, checkboxes: null },
      buldeOps: { name: "건물출입구밀도", selected: null, checkboxes: null },
      stairOps: { name: "계단", selected: null, checkboxes: null },
      sdwkOps: { name: "보도", selected: null, checkboxes: null },
    });
    setRnfo({
      rskOps: {
        name: "위험도",
        selected: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
        checkboxes: [true, true, true, true, true],
      },
    });
    setLength(null);
  };
  const allset = () => {
    setInfo({
      rdbtOps: {
        name: "도로폭원",
        selected: [
          "3m 미만",
          "3m이상 ~ 8m미만",
          "8m이상 ~ 9m미만",
          "9m이상 ~ 10m미만",
          "10m이상 ~ 12m미만",
        ],
        checkboxes: [true, true, true, true, true],
      },
      slopeOps: {
        name: "경사도",
        selected: [
          "10.00 초과",
          "6.00 ~ 10.00",
          "3.00 ~ 6.00",
          "1.00 ~ 3.00",
          "0.00 ~ 1.00",
        ],
        checkboxes: [true, true, true, true, true],
      },
      pmtrOps: {
        name: "포장재질",
        selected: ["아스팔트", "콘크리트", "블록", "비포장", "우레탄 등"],
        checkboxes: [true, true, true, true, true],
      },
      rdnetOps: {
        name: "네트워크접근성",
        selected: [
          "1.35초과",
          "1.14 ~ 1.35",
          "0.98 ~ 1.14",
          "0.82 ~ 0.98",
          "0.00 ~ 0.82",
        ],
        checkboxes: [true, true, true, true, true],
      },
      pubtrOps: {
        name: "대중교통접근성",
        selected: [
          "500 초과",
          "350 ~ 500",
          "200 ~ 350",
          "100 ~ 200",
          "0 ~ 100",
        ],
        checkboxes: [true, true, true, true, true],
      },
      pbuldOps: {
        name: "근생시설연면적",
        selected: [
          "2000 이상",
          "1000 ~ 2000",
          "500 ~ 1000",
          "100 ~ 500",
          "0 ~ 100",
        ],
        checkboxes: [true, true, true, true, true],
      },
      buldeOps: {
        name: "건물출입구밀도",
        selected: [
          "20개 이상",
          "11~20개",
          "6~10개",
          "1~5개",
          "출입구 없음 (0)",
        ],
        checkboxes: [true, true, true, true, true],
      },
      stairOps: {
        name: "계단",
        selected: ["설치", "미설치"],
        checkboxes: [true, true],
      },
      sdwkOps: {
        name: "보도",
        selected: ["단측 설치", "양측 설치", "미설치"],
        checkboxes: [true, true, true],
      },
    });
  };

  const [rnfo, setRnfo] = useState({
    rskOps: {
      name: "위험도",
      selected: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
      checkboxes: [true, true, true, true, true],
    },
  });
  const [pnfo, setPnfo] = useState({
    road_se: null,
    cartrk_co: null,
    road_bt: null,
    pmtr_se: null,
    osps_se: null,
    road_lt: null,
    slope_lg: null,
    sdwk_se: null,
    rdnet_ac: null,
    pbuld_fa: null,
    bulde_de: null,
    pubtr_ac: null,
    stair_at: null,
    edennc_at: null,
    pedac_rk: null,
    crime_rk: null,
    flood_rk: null,
    crwdac_rk: null,
    fallac_rk: null,
  });

  const [isFilter, setIsFilter] = useState(true);
  const [depth1, setDepth1] = useState(null);
  const [length, setLength] = useState(false);
  const [region, setRegion] = useState({
    city: { cd: null, name: null },
    county: { cd: null, name: null },
  });
  const [istgl, setIstgl] = useState(false);
  const [bar, setBar] = useState(1);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [pick, setPick] = useState(null);
  const [hov, setHov] = useState(null);
  const [rsk, setRsk] = useState("교통사고");
  const [accRsk2a, setAccRsk2a] = useState(true);
  const [nfid, setNfid] = useState(null);
  const [prpall, setPrpall] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        view,
        setView,
        LD,
        setLD,
        data,
        info,
        setInfo,
        reset,
        rnfo,
        setRnfo,
        isFilter,
        setIsFilter,
        depth1,
        setDepth1,
        length,
        setLength,
        region,
        setRegion,
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
        rsk,
        setRsk,
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
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}

export { InfoProvider };
export default InfoContext;
