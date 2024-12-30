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

  return { getPfrLineColor, getPfrMultFacColor };
};

export default useColor2;
