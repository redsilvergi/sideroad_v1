import './Landbase.css';
import Toggle from '../tools/Toggle';
import useInfo from '../../hooks/use-info';

const Landbase = ({ setBasemap }) => {
  // setup ----------------------------------------------------------------------
  const { istgl, setIstgl, right } = useInfo();

  // handle ----------------------------------------------------------------------
  const handleTgl = () => {
    if (!istgl) {
      setBasemap('mapbox://styles/redsilver522/clmp8ra0e01wd01ra0k0731dw');
    } else {
      setBasemap('mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn');
    }
    setIstgl(!istgl);
  };
  // const handleTgl = () => {
  //   setIstgl(!istgl);
  // };

  // render ----------------------------------------------------------------------
  const legend = (
    <div className={`landuse ${right ? '' : 'landusenoright'}`}>
      <div className="g1">지도 범례</div>
      <div className="gitem g2">
        <div id="b1"></div>주거지역
      </div>
      <div className="gitem g3">
        <div id="b2"></div>공업지역
      </div>
      <div className="gitem g4">
        <div id="b3"></div>상업지역
      </div>
      <div className="gitem g5">
        <div id="b4"></div>녹지지역
      </div>
    </div>
  );

  // return ----------------------------------------------------------------------
  return (
    <div className={`landbase_tg ${right ? '' : 'rmv_landbase'}`}>
      <div id="landbase_tg_name">토지이용계획도</div>
      <div className="tg_div">
        <Toggle handleTgl={handleTgl} />
      </div>
      {istgl && legend}
    </div>
  );
};

export default Landbase;
