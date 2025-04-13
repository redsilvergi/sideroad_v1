import './Reg.css';
import React, { useEffect, useRef, useState } from 'react';
import useInfo from '../../hooks/use-info';
import { FaCheck } from 'react-icons/fa';
import useDb from '../../hooks/use-db';
import Ct from '../dropdowns/Ct';
import Sgg from '../dropdowns/Sgg';
import { useViewUpdate } from '../../context/view';

const Reg = () => {
  // settings ----------------------------------------------------------------------
  const { setLdcuid, left, scrn, setRight, setLeft, ldcuid, exp, setExp } =
    useInfo();
  const { getReg } = useDb();
  const divEl = useRef();
  const ctrf = useRef([]);
  const sggrf = useRef([]);
  const regfet = useRef(null);
  const [tmpldc, setTmpldc] = useState(null);
  const setView = useViewUpdate();

  // useEffect ----------------------------------------------------------------------
  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        if (!ldcuid) {
          setExp(0);
        } else {
          setExp(2);
        }
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [ldcuid, setExp]);

  useEffect(() => {
    if (ldcuid) {
      setExp(2);
    }
  }, [ldcuid, setExp]);

  // handles ----------------------------------------------------------------------
  const handleConfirm = () => {
    if (tmpldc) {
      setLdcuid(tmpldc);
      const long = tmpldc[5];
      const lat = tmpldc[6];
      const zm = tmpldc[7];
      const zmsm = tmpldc[8];
      setExp(2);
      setView({
        longitude: long,
        latitude: lat,
        zoom: scrn < 1015 ? zmsm : zm,
      });
      return;
    } else if (ldcuid) {
      const long = ldcuid[5];
      const lat = ldcuid[6];
      const zm = ldcuid[7];
      const zmsm = ldcuid[8];
      setView({
        longitude: long,
        latitude: lat,
        zoom: scrn < 1015 ? zmsm : zm,
      });
      return;
    } else {
      return;
    }
  };

  const handleRgBtn = async () => {
    if (scrn < 1015) {
      setRight(false);
      setLeft(false);
    }
    if (!regfet.current) {
      const dataF = await getReg();
      // console.log('asdlfknasdkfjasn:', dataF);
      regfet.current = dataF;
    }
    if (exp === 1) {
      setExp(0);
      return;
    }
    const ctlist = regfet.current.filter((item) => item.ldc.slice(2) === '000');
    const sgglist = regfet.current.filter(
      (item) => item.ldc.slice(2) !== '000'
    );
    ctrf.current = ctlist;
    sggrf.current = sgglist;

    setTmpldc(null);
    setLdcuid(null);
    setExp(1);
  };

  // render ----------------------------------------------------------------------
  var rendered;
  switch (exp) {
    case 1:
      rendered = (
        <div
          ref={divEl}
          className={`regionExp ${left ? '' : 'rmv_regionExp'} ${
            tmpldc ? 'exp1' : ''
          }`}
        >
          <div
            className={`region ${left ? '' : 'rmv_region'}`}
            style={{
              border: '0px',
              top: `${scrn < 1015 ? '11px' : '15px'}`,
              left: `${scrn < 1015 && '61px'}`,
            }}
            onClick={handleRgBtn}
          >
            지역선택
          </div>
          {/* <button
            style={{ margin: '100px 0 0 0' }}
            onClick={() => console.log('tmpldc\n', tmpldc)}
          >
            tmp1
          </button> */}
          <div className="city">
            <div className="reg_ttl">{tmpldc ? tmpldc[1] : '시/도'}</div>
            <Ct ctrf={ctrf.current} tmpldc={tmpldc} setTmpldc={setTmpldc} />
          </div>
          {tmpldc && (
            <div className="county">
              <div className="reg_ttl">
                {tmpldc && tmpldc[4].slice(2) !== '000'
                  ? tmpldc[2]
                  : '시/군/구'}
              </div>
              <Sgg
                sggrf={sggrf.current}
                tmpldc={tmpldc}
                setTmpldc={setTmpldc}
              />
            </div>
          )}
          <FaCheck
            className={`close ${tmpldc ? 'exp1' : ''}`}
            onClick={handleConfirm}
          />
        </div>
      );
      break;
    case 2:
      rendered = (
        <div
          className={`regionExp ${left ? '' : 'rmv_regionExp'} ${
            ldcuid && ldcuid[0].slice(2) !== '000' && scrn > 1015 ? 'exp1' : ''
          } exp2`}
        >
          <div
            className={`region ${left ? '' : 'rmv_region'}`}
            style={{
              border: '0px',
              top: `${scrn < 1015 ? '11px' : '15px'}`,
              left: `${scrn < 1015 && '61px'}`,
            }}
            onClick={handleRgBtn}
          >
            지역선택
          </div>
          <div className="city">
            <div className="reg_ttl">{ldcuid ? ldcuid[1] : '시/도'}</div>
          </div>

          {ldcuid && ldcuid[0].slice(2) !== '000' && (
            <div className="county scrnSmll">
              <div className="reg_ttl ">{ldcuid[2]}</div>
            </div>
          )}
          <FaCheck
            className={`close ${
              ldcuid && ldcuid[0].slice(2) !== '000' ? 'exp1' : ''
            }`}
            onClick={handleConfirm}
          />
        </div>
      );
      break;
    default:
      rendered = (
        <div
          className={`region ${left ? '' : 'rmv_region'}`}
          onClick={handleRgBtn}
        >
          지역선택
        </div>
      );
      break;
  }

  // return ----------------------------------------------------------------------
  return rendered;
};

export default Reg;
