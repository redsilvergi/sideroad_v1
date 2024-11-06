import './LandingPage.css';
import 'mapbox-gl/dist/mapbox-gl.css'; //remove console log error
import React, { useEffect, useState } from 'react';
import useInfo from '../hooks/use-info';
import LeftBar from '../components/bars/LeftBar';
import Reg from '../components/tools/Reg';
import Basemap from '../components/bases/Basemap';
import Landbase from '../components/bases/Landbase';
import Controls from '../components/tools/Controls';
import RightBar from '../components/bars/RightBar';
import Table1 from '../components/table/Table1';
import Deck from '../components/deck/Deck';
// import Test1 from '../testcomp/Test1';
// import Region from '../components/tools/Region';

const LandingPage = () => {
  const {
    info,
    LD,
    istgl,
    left,
    right,
    setPick,
    rnfo,
    scrn,
    setScrn,
    setLeft,
    setRight,
    bar,
  } = useInfo();

  const [basemap, setBasemap] = useState(
    'mapbox://styles/redsilver522/clmp6c5lw01xs01r64d5v09jn'
  );
  // useeffect ----------------------------------------------------------------------
  useEffect(() => {
    const handleResize = () => {
      setScrn(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setScrn]);
  useEffect(() => {
    if (scrn < 1015) {
      return;
    } else {
      setLeft(true);
      setRight(true);
    }
  }, [scrn, setLeft, setRight]);
  // useEffect(() => {
  //   if (scrn < 1015) {
  //     setView({
  //       longitude: 127.5176755984492,
  //       latitude: 36.87856478678846,
  //       zoom: 5,
  //       bearing: 0,
  //       pitch: 0,
  //     });
  //   } else {
  //     setLeft(true);
  //     setRight(true);
  //   }
  // }, [scrn, setLeft, setRight, setView]);
  useEffect(() => {
    setPick(null);
  }, [setPick, info, rnfo]);

  // RENDER ITEMS ------------------------------------------------
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

  // memo ----------------------------------------------------------------------
  console.log(
    'landingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpagelandingpage'
  );
  // const MemoisedTest1 = React.memo(Test1);

  // render ----------------------------------------------------------------------
  return (
    <div className="testc">
      {/* <Test1 /> */}
      <LeftBar />
      {right && <RightBar />}
      {bar === 1 && <Table1 />}
      <div className="container">
        {/* {scrn < 1015 ? !left && !right && <Region /> : <Region />} */}
        <Reg />

        {scrn < 1015 ? (
          !left &&
          !right && <Landbase basemap={basemap} setBasemap={setBasemap} />
        ) : (
          <Landbase basemap={basemap} setBasemap={setBasemap} />
        )}
        {scrn < 1015 ? (
          !left &&
          !right && <Basemap basemap={basemap} setBasemap={setBasemap} />
        ) : (
          <Basemap basemap={basemap} setBasemap={setBasemap} />
        )}
        {scrn < 1015 ? !left && !right && <Controls /> : <Controls />}
        {istgl && legend}
        <Deck basemap={basemap} />
        {LD && (
          <div className="overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
