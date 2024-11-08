import './Landbase.css';
import Toggle from '../tools/Toggle';
import useInfo from '../../hooks/use-info';

const Landbase = ({ setBasemap }) => {
  const { istgl, setIstgl, right } = useInfo();
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

  return (
    <div className={`landbase_tg ${right ? '' : 'rmv_landbase'}`}>
      <div id="landbase_tg_name">토지이용계획도</div>
      <div className="tg_div">
        <Toggle handleTgl={handleTgl} />
      </div>
    </div>
  );
};

export default Landbase;
