import { createContext, useState } from "react";

const InfoContext = createContext();

function InfoProvider({ children }) {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";
  const [info, setInfo] = useState({
    // roadNo: { name: "도로번호", selected: null },
    roadOps: { name: "도로구분", selected: null, checkboxes: null },
    laneOps: { name: "차로수", selected: null, checkboxes: null },
    widthOps: { name: "도로폭", selected: null, checkboxes: null },
    typeOps: { name: "포장재질", selected: null, checkboxes: null },
    barrierOps: { name: "중앙분리대유무", selected: null, checkboxes: null },
    onewayOps: { name: "일방통행구분", selected: null, checkboxes: null },
    statusOps: { name: "도로사용상태", selected: null, checkboxes: null },
  });
  const reset = () => {
    setInfo({
      // roadNo: { name: "도로번호", selected: null },
      roadOps: { name: "도로구분", selected: null, checkboxes: null },
      laneOps: { name: "차로수", selected: null, checkboxes: null },
      widthOps: { name: "도로폭", selected: null, checkboxes: null },
      typeOps: { name: "포장재질", selected: null, checkboxes: null },
      barrierOps: { name: "중앙분리대유무", selected: null, checkboxes: null },
      onewayOps: { name: "일방통행구분", selected: null, checkboxes: null },
      statusOps: { name: "도로사용상태", selected: null, checkboxes: null },
    });
    setLength(0);
  };

  const [LD, setLD] = useState(false);
  const [isFilter, setIsFilter] = useState(true);
  // const [isSelect, setIsSelect] = useState(false);
  const [depth1, setDepth1] = useState(null);
  const [length, setLength] = useState(false);
  const [data] = useState(
    `https://api.mapbox.com/v4/redsilver522.9c8f22nr/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}` //redsilver522.c1vrcxt3 / redsilver522.9c8f22nr
  );
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

  return (
    <InfoContext.Provider
      value={{
        info,
        setInfo,
        reset,
        LD,
        setLD,
        isFilter,
        setIsFilter,
        depth1,
        setDepth1,
        length,
        setLength,
        data,
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
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}

export { InfoProvider };
export default InfoContext;
