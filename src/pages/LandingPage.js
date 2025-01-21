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
import Trigger from '../components/auxiliary/Trigger';
// import NewComponent from '../components/container/NewComponent';
import Table2 from '../components/table/Table2';

const LandingPage = () => {
  const {
    info,
    LD,
    left,
    right,
    setPick,
    rnfo,
    scrn,
    setScrn,
    setLeft,
    setRight,
    bar,
    srvy,
    nfidlst,
    setPfrPick,
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
    } else if (bar === 0) {
      setRight(true);
    } else {
      setLeft(true);
      setRight(true);
    }
  }, [scrn, setLeft, setRight, bar]);
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
    setPfrPick(null);
  }, [setPick, setPfrPick, info, rnfo]);

  // log ----------------------------------------------------------------------
  // console.log('landingpagelandingpage');

  // render ----------------------------------------------------------------------
  return (
    <div className="testc">
      {/* <Test1 /> */}
      <LeftBar />
      {right && <RightBar />}
      {bar === 1 && <Table1 />}
      {bar === 3 && <Trigger />}
      {/* {bar === 4 && <NewComponent />} */}
      {bar === 4 ? (
        srvy && nfidlst && nfidlst.length > 0 ? (
          <Table2 />
        ) : (
          <Trigger />
        )
      ) : null}

      <div className="container">
        {/* {scrn < 1015 ? !left && !right && <Region /> : <Region />} */}
        {bar !== 0 && <Reg />}

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
