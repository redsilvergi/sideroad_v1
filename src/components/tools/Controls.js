import './Controls.css';
import React from 'react';
import useInfo from '../../hooks/use-info';
// import useQuery from "../hooks/use-query";
import { GiExpand } from 'react-icons/gi';
import { BiHide } from 'react-icons/bi';
// import axios from 'axios';
import { useViewUpdate } from '../../context/view';
// import { useAuth } from '../../context/auth';

const Controls = () => {
  const {
    isFilter,
    setIsFilter,
    right,
    scrn,
    // info,
    // pick,
    // view,
    // length,
    // region,
    // rsk,
    // rnfo,
    // gen,
    // genitem,
    // genfo,
    // ldcuid,
    // yr,
    // rnfo0,
    // rnfo1,
    // pnfo,
    // nfidlst,
    // pfrPick,
    // exp,
  } = useInfo();
  // const { user } = useAuth();
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
      {/* <button
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
      </button> */}
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
