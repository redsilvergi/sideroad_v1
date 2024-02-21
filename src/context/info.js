import { createContext, useState } from "react";

const InfoContext = createContext();

function InfoProvider({ children }) {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";
  const [view, setView] = useState({
    longitude: 127.25161672437677,
    latitude: 35.86497806027222,
    zoom: 6.0,
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
    setLength(0);
  };
  const [rnfo, setRnfo] = useState({
    rskOps: {
      name: "위험도",
      selected: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
      checkboxes: [true, true, true, true, true],
    },
  });

  const [isFilter, setIsFilter] = useState(true);
  // const [isSelect, setIsSelect] = useState(false);
  const [depth1, setDepth1] = useState(null);
  const [length, setLength] = useState(false);
  const [region, setRegion] = useState({
    city: { cd: null, name: null },
    county: { cd: null, name: null },
  });
  const [istgl, setIstgl] = useState(false);
  const [bar, setBar] = useState(1);
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [pick, setPick] = useState(null);
  const [hov, setHov] = useState(null);
  const [rsk, setRsk] = useState("교통사고");
  const [accRsk2a, setAccRsk2a] = useState(true);
  // const [geoJ, setGeoJ] = useState(null);
  const [nfid, setNfid] = useState(null);

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
        // geoJ,
        // setGeoJ,
        nfid,
        setNfid,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}

export { InfoProvider };
export default InfoContext;
