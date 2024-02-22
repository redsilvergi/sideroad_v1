import "./Rsrch.css";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import data from "../../data/rdnm.json";

const Rsrch = () => {
  const [open, setOpen] = useState(true);
  const [sval, setSval] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSval(e.target.value);
  };

  const onSearch = (v) => {
    setSval(v);
    console.log(v);
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
              <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={sval}
              />
              <div className="srchbttn" onClick={() => onSearch(sval)}>
                Search
              </div>
            </div>
            <div className="rsrch_drpd">
              {data.rdnm
                .filter((item) => {
                  const searchTerm = sval.toLowerCase();
                  const rdnm = item.toLowerCase();

                  return (
                    searchTerm &&
                    rdnm.startsWith(searchTerm) &&
                    searchTerm !== rdnm
                  );
                })
                // .slice(0, 10)
                .map((item) => {
                  return (
                    <div
                      className="rsrch_drpd_row"
                      onClick={() => onSearch(item)}
                      key={item}
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rsrch;
