import './BottomR.css';
import { useViewState } from '../../context/view';

const BottomR = () => {
  // setup ----------------------------------------------------------------------
  const view = useViewState();

  // return ----------------------------------------------------------------------
  return (
    <div className="bottomright">
      <div className="zoomlevel">ZOOM LEVEL: {view.zoom.toFixed(2)}</div>
      <div className="lnglat">
        longlat: {view.longitude.toFixed(5)}, {view.latitude.toFixed(5)}
      </div>
      <div className="tag">@Mapbox @OpenStreetMap @VWorld</div>
    </div>
  );
};

export default BottomR;
