import "./Rsrch.css";
import { useState, useRef, useEffect } from "react";
import data from "../../data/rdnm.json";
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import useInfo from "../../hooks/use-info";
import useDb from "../../hooks/use-db";

const Rsrch = () => {
  const { setLD } = useInfo();
  const { getSrchId } = useDb();
  const [open, setOpen] = useState(true);
  const [sval, setSval] = useState("");
  const [svaltmp, setSvaltmp] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [sid, setSid] = useState(-1);
  const [fltItms, setFltItms] = useState([]);
  const [nfidLst, setNfidLst] = useState([]);
  const divEl = useRef();
  const inputRef = useRef(null);

  //////////////////////////////////////////////
  useEffect(() => {
    const handler = (e) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(e.target)) {
        setIsDrop(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  useEffect(() => {
    setFltItms(
      data.rdnm
        .filter((item) => {
          const srchTrm = svaltmp && svaltmp.toLowerCase();
          const rdnm = item.toLowerCase();

          return srchTrm && rdnm.startsWith(srchTrm);
        })
        .slice(0, 8)
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
  //////////////////////////////////////////////
  const handleChange = (e) => {
    e.preventDefault();
    setIsDrop(true);
    setSvaltmp(e.target.value);
    setSval(e.target.value);
    setSid(-1);
  };
  const handleClick = () => {
    setIsDrop(true);
    setSid(-1);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(sval);
      inputRef.current.blur(); // Blur the input field
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // console.log("arrowdown: ", sid);
      if (sid < fltItms.length - 1) {
        setSval(fltItms[sid + 1]);
      } else {
        setSval(svaltmp);
      }
      setSid((prvid) => (prvid < fltItms.length - 1 ? prvid + 1 : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // console.log("arrowup: ", sid);
      if (sid === -1) {
        setSval(fltItms[fltItms.length - 1]);
      } else if (sid === 0) {
        setSval(svaltmp);
      } else {
        setSval(fltItms[sid - 1]);
      }
      setSid((prvid) =>
        prvid === -1 ? fltItms.length - 1 : prvid === 0 ? -1 : prvid - 1
      );
    }
  };
  const onSearch = async (v) => {
    setLD(true);
    setSval(v);
    setIsDrop(false);
    const rtrvd = await getSrchId(v);
    setNfidLst(rtrvd);
    // console.log("Searching for: ", v); //to be erased
    setLD(false);
  };
  const handleCloseInput = () => {
    setSval("");
    setSvaltmp("");
    setNfidLst([]);
  };
  const handleFocus = () => {
    const parentDiv = inputRef.current.parentNode;
    parentDiv.classList.add("input-focused");
  };

  const handleBlur = () => {
    const parentDiv = inputRef.current.parentNode;
    parentDiv.classList.remove("input-focused");
  };
  return (
    <div className="rsrch_accitem">
      <div className={`rsrch_d1 ${open && "rsrch_d1_expanded"}`}>
        <div className="rsrch_d2" onClick={() => setOpen(!open)}>
          <div className="rsrch_lbl">도로 ID 검색</div>
          <div className="rsrch_icon">{open ? <FiMinus /> : <FiPlus />}</div>
        </div>
        {open && (
          <div className="rsrch_expanded">
            <div className="rsrch_srch">
              <div className="test333">
                <input
                  ref={inputRef}
                  className="rsrch_input"
                  type="text"
                  placeholder="ex. 마로니에길"
                  onChange={handleChange}
                  value={sval}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus} // Added onFocus event handler
                  onBlur={handleBlur}
                />
              </div>
              <div className="srchbtn" onClick={() => onSearch(sval)}>
                <div className="btn_ic">
                  <AiOutlineEnter />
                </div>
              </div>
              {sval && (
                <div className="srchbtn_x" onClick={handleCloseInput}>
                  <div className="btn_ic_x">
                    <IoCloseSharp />
                  </div>
                </div>
              )}
            </div>
            {isDrop && (
              <div ref={divEl} className="rsrch_drpd">
                {fltItms.map((item, index) => {
                  return (
                    <div
                      key={item}
                      className={`rsrch_drpd_row ${
                        index === sid ? "rsrch_selected" : ""
                      }`}
                      onClick={() => onSearch(item)}
                      onMouseMove={() => setSid(index)}
                      onMouseLeave={() => setSid(-1)}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
            {nfidLst.length !== 0 && (
              <div className="rsrch_nfidiv">
                <div className="rsrch_nfidlst">{nfidLst}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rsrch;
