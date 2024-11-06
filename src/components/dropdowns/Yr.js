import './Yr.css';
import { useState, useRef, useEffect } from 'react';
import data from '../../data/yr.json';
// import { FiPlus, FiMinus } from 'react-icons/fi';
// import { AiOutlineEnter } from 'react-icons/ai';
// import { IoCloseSharp } from 'react-icons/io5';
import useInfo from '../../hooks/use-info';
// import useDb from '../../hooks/use-db';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Yr = () => {
  //vars----------------------------------------------------------------
  const { yr, setYr } = useInfo();
  // const { getSrchId } = useDb();
  // const [open, setOpen] = useState(true);
  const [sval, setSval] = useState('');
  const [svaltmp, setSvaltmp] = useState('');
  const [isDrop, setIsDrop] = useState(false);
  const [sid, setSid] = useState(-1);
  const [fltItms, setFltItms] = useState([]);
  // const [nfidLst, setNfidLst] = useState([]);
  const divEl = useRef();
  const inputRef = useRef(null);
  const yrRef = useRef(yr);

  //useEffect----------------------------------------------------------------
  useEffect(() => {
    yrRef.current = yr; // Update the ref with the latest yr value
  }, [yr]);
  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(e.target)) {
        setSval(yrRef.current);
        setIsDrop(false);
      }
    };
    document.addEventListener('click', handler, true);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
  useEffect(() => {
    setFltItms(
      data.yr.filter((item) => {
        const srchTrm = svaltmp && svaltmp.toString().toLowerCase();
        const yr = item.toString().toLowerCase();

        return srchTrm && yr.toString().startsWith(srchTrm.toString());
      })
      // .slice(0, 8)
    );
  }, [sval, svaltmp]);
  // useEffect(() => {
  //   if (divEl.current && sid !== -1) {
  //     divEl.current.childNodes[sid].scrollIntoView({
  //       behavior: "instant", //instant / smooth
  //       block: "nearest",
  //     });
  //   }
  // }, [sid]);
  useEffect(() => {
    if (divEl.current && sid !== -1) {
      const activeItem = divEl.current.querySelectorAll('.yr_drpd_row')[sid];
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [sid]);

  //handles----------------------------------------------------------------
  const handleChange = (e) => {
    e.preventDefault();
    setIsDrop(true);
    setSvaltmp(e.target.value);
    setSval(e.target.value);
    setSid(-1);
  };
  // const handleClick = () => {
  //   // setIsDrop(true);
  //   setSid(-1);
  // };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setYr(sval);
      // onSearch(sval);
      inputRef.current.blur(); // Blur the input field
      setIsDrop(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();

      const length = fltItms.length !== 0 ? fltItms.length : data.yr.length;
      const nextValue = sid === length - 1 ? -1 : (sid + 1) % length;

      setSval(
        nextValue === -1
          ? svaltmp
          : fltItms.length !== 0
          ? fltItms[nextValue]
          : data.yr[nextValue]
      );

      setSid(nextValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      const length = fltItms.length !== 0 ? fltItms.length : data.yr.length;
      const prevValue = (sid === -1 ? length : sid) - 1;

      setSval(
        prevValue === -1
          ? svaltmp
          : fltItms.length !== 0
          ? fltItms[prevValue]
          : data.yr[prevValue]
      );

      setSid(prevValue);
    }

    // else if (e.key === 'ArrowDown') {
    //   e.preventDefault();
    //   // console.log("arrowdown: ", sid);
    //   if (fltItms.length !== 0) {
    //     if (sid < fltItms.length - 1) {
    //       setSval(fltItms[sid + 1]);
    //     } else {
    //       setSval(svaltmp);
    //     }
    //   } else {
    //     if (sid < data.yr.length - 1) {
    //       setSval(data.yr[sid + 1]);
    //     } else {
    //       setSval(svaltmp);
    //     }
    //   }

    //   setSid((prvid) =>
    //     fltItms.length === 0 && prvid < 6
    //       ? prvid + 1
    //       : prvid < fltItms.length - 1
    //       ? prvid + 1
    //       : -1
    //   );
    // } else if (e.key === 'ArrowUp') {
    //   e.preventDefault();
    //   // console.log("arrowup: ", sid);
    //   if (fltItms.length !== 0) {
    //     if (sid === -1) {
    //       setSval(fltItms[fltItms.length - 1]);
    //     } else if (sid === 0) {
    //       setSval(svaltmp);
    //     } else {
    //       setSval(fltItms[sid - 1]);
    //     }
    //   } else {
    //     if (sid === -1) {
    //       setSval(data.yr[data.yr.length - 1]);
    //     } else if (sid === 0) {
    //       setSval(svaltmp);
    //     } else {
    //       setSval(data.yr[sid - 1]);
    //     }
    //   }
    //   setSid((prvid) =>
    //     prvid === -1
    //       ? fltItms.length === 0
    //         ? 6
    //         : fltItms.length - 1
    //       : prvid === 0
    //       ? -1
    //       : prvid - 1
    //   );
    // }
  };
  // const onSearch = async (v) => {
  //   setLD(true);
  //   setSval(v);
  //   setIsDrop(false);
  //   // const rtrvd = await getSrchId(v);
  //   // setNfidLst(rtrvd);
  //   // console.log("Searching for: ", v);
  //   setLD(false);
  // };
  // const handleCloseInput = () => {
  //   setSval('');
  //   setSvaltmp('');
  //   // setNfidLst([]);
  // };
  const handleFocus = () => {
    setSid(-1);
    setSval('');
    setSvaltmp('');
    const parentDiv = inputRef.current.parentNode;
    parentDiv.classList.add('input-focused');
  };
  const handleBlur = () => {
    const parentDiv = inputRef.current.parentNode;
    parentDiv.classList.remove('input-focused');
  };
  const handleDropClick = (item) => {
    setSval(item);
    setYr(item);
    setIsDrop(false);
    setSvaltmp('');
  };
  const handleYrsrch = () => {
    setIsDrop(!isDrop);
    inputRef.current.focus();
  };

  //return----------------------------------------------------------------
  return (
    <div className="yr_accitem">
      <button
        // onMouseEnter={() => {
        //   setSid(0);
        // }}
        onMouseEnter={() => {
          console.log(
            'sid:',
            sid,
            'fltitmslen:',
            fltItms.length,
            'yr:',
            yr,
            'sv:',
            sval,
            'svltmp:',
            svaltmp
          );
        }}
      >
        buttonbuttonvsvsvsvs
      </button>
      {/* <div className={`yr_d1 ${open && 'yr_d1_expanded'}`}> */}
      {/* <div className="yr_d2" onClick={() => setOpen(!open)}>
          <div className="yr_lbl">도로 ID 검색</div>
          <div className="yr_icon">{open ? <FiMinus /> : <FiPlus />}</div>
        </div> */}

      <div className="yr_expanded">
        <div
          className={`yr_srch ${yr !== '' && 'active'}`}
          onClick={handleYrsrch}
        >
          <div className="yr_input_cont">
            <input
              ref={inputRef}
              className="yr_input"
              type="text"
              placeholder="연도"
              onChange={handleChange}
              value={sval}
              // onClick={handleClick}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {isDrop ? (
            <div className="yr_srchbtn">
              <div className="yr_btn_ic">
                <IoIosArrowUp />
              </div>
            </div>
          ) : (
            <div className="yr_srchbtn">
              <div className="yr_btn_ic">
                <IoIosArrowDown />
              </div>
            </div>
          )}
          {/* <div className="yr_srchbtn">
            <div className="yr_btn_ic">"_"</div>
          </div> */}
          {/* {sval && (
            <div className="yr_srchbtn_x">
              <div className="yr_btn_ic_x">
                <IoCloseSharp />
              </div>
            </div>
          )} */}
        </div>
        {isDrop && (
          <div ref={divEl} className="yr_drpd">
            {svaltmp === ''
              ? data.yr.map((item, index) => {
                  return (
                    <div
                      key={item}
                      className={`yr_drpd_row ${
                        index === sid ? 'yr_selected' : ''
                      }`}
                      onClick={() => handleDropClick(item)}
                      onMouseMove={() => setSid(index)}
                      onMouseLeave={() => setSid(-1)}
                    >
                      {item}
                    </div>
                  );
                })
              : fltItms.map((item, index) => {
                  return (
                    <div
                      key={item}
                      className={`yr_drpd_row ${
                        index === sid ? 'yr_selected' : ''
                      }`}
                      onClick={() => handleDropClick(item)}
                      onMouseMove={() => setSid(index)}
                      onMouseLeave={() => setSid(-1)}
                    >
                      {item}
                    </div>
                  );
                })}
          </div>
        )}
        {/* {nfidLst.length !== 0 && (
              <div className="yr_nfidiv">
                <div className="yr_nfidlst">{nfidLst}</div>
              </div>
            )} */}
      </div>
    </div>
    // </div>
  );
};

export default Yr;
