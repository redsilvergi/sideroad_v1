import './Reg.css';
import React, { useEffect, useRef } from 'react';
import useInfo from '../../hooks/use-info';
import { AiOutlineClose } from 'react-icons/ai';
import useDb from '../../hooks/use-db';
import Ct from '../dropdowns/Ct';
import Sgg from '../dropdowns/Sgg';

const Reg = () => {
  // settings ----------------------------------------------------------------------
  const { setLdcuid, left, scrn, setRight, setLeft, ldcuid, exp, setExp } =
    useInfo();
  const { getReg } = useDb();
  // const [exp, setExp] = useState(0);
  const divEl = useRef();
  const ctrf = useRef([]);
  const sggrf = useRef([]);
  // const sggsrtrf = useRef([]);

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

  // handles ----------------------------------------------------------------------
  const handleClose = () => {
    setExp(0);
    setLdcuid(null);
  };

  const handleRgBtn = async () => {
    if (scrn < 1015) {
      setRight(false);
      setLeft(false);
    }
    const regfet = await getReg();
    const ctlist =
      regfet && regfet.filter((item) => item.uid.slice(2) === '000');
    const ctlist2 =
      ctlist &&
      ctlist.map((item, id) => {
        return Object.values(item);
      });
    const sgglist =
      regfet && regfet.filter((item) => item.uid.slice(2) !== '000');
    const sgglist2 =
      sgglist &&
      sgglist.map((item, id) => {
        return Object.values(item);
      });
    ctrf.current = ctlist2;
    sggrf.current = sgglist2;

    // console.log('regionfetched at Reg: ', regfet);
    // console.log('ctrf.current at Reg: ', ctrf.current);
    console.log('sggrf.current at Reg: ', sggrf.current);
    setExp(1);
  };
  // renderhelper ----------------------------------------------------------------------
  // const ctmatch = ldcuid
  //   ? (() => {
  //       const match = ctrf.current.find(
  //         (item) => item[4].slice(0, 2) === ldcuid[4].slice(0, 2)
  //       );
  //       return match ? match[2] : '시/도';
  //     })()
  //   : '시/도';

  // const sggmatch = ldcuid
  //   ? (() => {
  //       const match = sggrf.current.find((item) => item[4] === ldcuid[4]);
  //       return match ? match[2] : '시군구리구리';
  //     })()
  //   : '시군구리구리';

  // render ----------------------------------------------------------------------
  var rendered;
  switch (exp) {
    case 1:
      rendered = (
        <div
          ref={divEl}
          className={`regionExp ${left ? '' : 'rmv_regionExp'} ${
            ldcuid ? 'exp1' : ''
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
          <div className="city">
            <div className="reg_ttl">{ldcuid ? ldcuid[2] : '시/도'}</div>
            <Ct options={ctrf.current} />
          </div>
          {ldcuid && (
            <div className="county">
              <div className="reg_ttl">
                {ldcuid && ldcuid[4].slice(2) !== '000'
                  ? ldcuid[2]
                  : '시/군/구'}
              </div>
              <Sgg options={sggrf.current} setExp={setExp} exp={exp} />
            </div>
          )}
          <AiOutlineClose
            className={`close ${ldcuid ? 'exp1' : ''}`}
            onClick={handleClose}
          />
        </div>
      );
      break;
    case 2:
      rendered = (
        <div
          className={`regionExp ${left ? '' : 'rmv_regionExp'} ${
            ldcuid && ldcuid[4].slice(2) !== '000' && scrn > 1015 ? 'exp1' : ''
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

          {ldcuid && ldcuid[4].slice(2) !== '000' && (
            <div className="county scrnSmll">
              <div className="reg_ttl ">{ldcuid[2]}</div>
            </div>
          )}
          <AiOutlineClose
            className={`close ${
              ldcuid && ldcuid[4].slice(2) !== '000' ? 'exp1' : ''
            }`}
            onClick={handleClose}
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
