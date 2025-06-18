import './Controls.css';
import React from 'react';
import useInfo from '../../hooks/use-info';
// import useQuery from "../hooks/use-query";
import { GiExpand } from 'react-icons/gi';
import { BiHide } from 'react-icons/bi';
// import axios from 'axios';
import { useViewUpdate } from '../../context/view';
import { useAuth } from '../../context/auth'; // comment out when deploying

const Controls = () => {
  const {
    isFilter,
    setIsFilter,
    right,
    scrn,
    info, // comment out when deploying
    pick, // comment out when deploying
    view, // comment out when deploying
    length, // comment out when deploying
    region, // comment out when deploying
    rsk, // comment out when deploying
    rnfo, // comment out when deploying
    gen, // comment out when deploying
    genitem, // comment out when deploying
    genfo, // comment out when deploying
    ldcuid, // comment out when deploying
    yr, // comment out when deploying
    rnfo0, // comment out when deploying
    rnfo1, // comment out when deploying
    pnfo, // comment out when deploying
    nfidlst, // comment out when deploying
    pfrPick, // comment out when deploying
    exp, // comment out when deploying
  } = useInfo();
  const { user } = useAuth(); // comment out when deploying
  const setView = useViewUpdate();
  // const { queryF } = useQuery();

  // const handleCondition = async () => {
  //   setLD(true);
  //   const query = queryF();
  //   console.log("query from control.js:", "\n", query);
  //   const response = await axios.get(
  //     `http://localhost:4000/getLength/${query}`
  //   );
  //   setLength(Math.round(response.data / 1000));
  //   setLD(false);
  // };

  // const handlegjs = async () => {
  //   console.log('gjs clicked');

  //   setLD(true);
  //   const res = await axios.get(`http://localhost:4000/getSidogjs`);
  //   console.log('handlgjshandlgjsdonedonedonedone');

  //   console.log('res.data from control.js:\n', res.data);
  //   setLD(false);
  // };

  return (
    <div className={`toggle_button_div ${right ? '' : 'rmv_control'}`}>
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => {
            return {
              ...prev,
              zoom: prev.zoom < 20 ? prev.zoom + 0.2 : prev.zoom,
            };
          })
        }
      >
        +
      </button>
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => ({
            ...prev,
            zoom: prev.zoom > 0.87 ? prev.zoom - 0.2 : prev.zoom,
          }))
        }
      >
        -
      </button>
      <button
        className="toggle_button"
        onClick={() => {
          if (scrn < 1015) {
            setView({
              longitude: 127.5176755984492,
              latitude: 36.87856478678846,
              zoom: 5,
              bearing: 0,
              pitch: 0,
            });
          } else {
            setView({
              longitude: 128.05161672437677,
              latitude: 36.06497806027222,
              zoom: 6.5,
              bearing: 0,
              pitch: 0,
            });
          }
        }}
      >
        <GiExpand />
      </button>

      <button className="toggle_button" onClick={() => setIsFilter(!isFilter)}>
        <BiHide />
      </button>
      <button // comment out when deploying
        className="toggle_button toggle_button_vs"
        onClick={() =>
          console.log(
            'view:',
            view,
            '\ninfo:',
            info,
            '\npick:',
            pick,
            '\nrsk:',
            rsk,
            '\nrnfo:',
            rnfo,
            // "\ndepth1:",
            // depth1,
            '\nlength:',
            length,
            '\nregion:',
            region,
            // "\nistgl:",
            // istgl
            '\nscrn',
            scrn,
            '\ngen:',
            gen,
            '\ngenitem:',
            genitem,
            '\ngenfo:',
            genfo,
            '\nldcuid:',
            ldcuid,
            '\nyr:',
            yr,
            '\nrnfo0:',
            rnfo0,
            '\nrnfo1:',
            rnfo1,
            '\npnfo:',
            pnfo,
            '\nnfidlst:',
            nfidlst,
            '\nuser:',
            user,
            '\npfrPick:',
            pfrPick,
            '\nexp:',
            exp
          )
        }
      >
        VS
      </button>
      {/* <button className="toggle_button" onClick={handlegjs}>
        gjs
      </button> */}
      {/* <button className="toggle_button" onClick={queryF}>
        QRY
      </button> */}
      {/* <button className="toggle_button" onClick={handleCondition}>
        REQ
      </button> */}
    </div>
  );
};

export default Controls;
