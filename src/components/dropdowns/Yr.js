import './Yr.css';
import { useState, useRef, useEffect } from 'react';
import data from '../../data/yr.json';
import useInfo from '../../hooks/use-info';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Yr = () => {
  // setup ----------------------------------------------------------------
  const { yr, setYr } = useInfo();
  const [sval, setSval] = useState('');
  const [svaltmp, setSvaltmp] = useState('');
  const [isDrop, setIsDrop] = useState(false);
  const [sid, setSid] = useState(-1);
  const [fltItms, setFltItms] = useState([]);
  const divEl = useRef();
  const inputRef = useRef(null);
  const yrRef = useRef(yr);

  // useeffect----------------------------------------------------------------
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

  // handles ----------------------------------------------------------------
  const handleChange = (e) => {
    e.preventDefault();
    setIsDrop(true);
    setSvaltmp(e.target.value);
    setSval(e.target.value);
    setSid(-1);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setYr(sval);
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
  };
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

  // return ----------------------------------------------------------------
  return (
    <div className="yr_accitem">
      {/* <button
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
      </button> */}

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
              value={yr ? yr : sval}
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
      </div>
    </div>
    // </div>
  );
};

export default Yr;
