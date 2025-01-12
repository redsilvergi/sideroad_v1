import useInfo from "./use-info";

const useColor2 = () => {
  const { ldcuid, checkedPfr } = useInfo();

  const getPfrLineColor = (d) => {
    if (
      ldcuid &&
      d.properties.sig_cd === ldcuid[0] &&
      checkedPfr.includes(d.properties.id)
    ) {
      return [0, 98, 175, 255];
    }
    return [169, 213, 232, 64];
  };

  const getPfrMultFacColor = (d) => {
    const p = d.properties.bdtyp_cd;

    if (p.startsWith("05")) {
      return [138, 164, 233, 196];
    } else if (p.startsWith("06")) {
      return [255, 97, 97, 196];
    } else if (p.startsWith("09")) {
      return [204, 255, 171, 196];
    } else {
      return [204, 204, 204, 196];
    }
  };

  const valid05 = [
    "05000",
    "05299",
    "05301",
    "05302",
    "05303",
    "05304",
    "05305",
    "05401",
    "05402",
    "05501",
    "05502",
    "05503",
    "05504",
    "05505",
    "05506",
    "05599",
  ];
  const valid06 = [
    "06000",
    "06100",
    "06201",
    "06202",
    "06203",
    "06204",
    "06205",
    "06299",
    "06999",
  ];
  const valid08 = ["08101", "08102", "08103"];

  const getSrvBldColor = (d) => {
    const p = d.properties.bdtyp_cd;

    if (p.startsWith("01")) {
      return [250, 254, 171];
    } else if (p.startsWith("02")) {
      return [255, 223, 117];
    } else if (p.startsWith("03") || p.startsWith("04")) {
      return [245, 188, 106];
    } else if (valid05.includes(p)) {
      return [138, 164, 233];
    } else if (valid06.includes(p)) {
      return [235, 127, 124];
    } else if (valid08.includes(p)) {
      return [192, 238, 250];
    } else if (p.startsWith("09")) {
      return [204, 255, 171];
    } else {
      return [255, 255, 255, 196];
    }
  };

  return { getPfrLineColor, getPfrMultFacColor, getSrvBldColor };
};

export default useColor2;
