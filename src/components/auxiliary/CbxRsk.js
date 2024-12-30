import './CbxRsk.css';
import React from 'react';

const CbxRsk = ({ list, rnfo, setRnfo, exp }) => {
  // handle ----------------------------------------------------------------------
  const handleChange = (id) => {
    if (exp[0] & exp[1]) {
      setRnfo((prev) => {
        const newRnfo = [false, false, false, false, false];
        newRnfo[id] = true;
        return newRnfo;
      });
    } else {
      setRnfo((prev) => {
        const newRnfo = [...prev];
        newRnfo[id] = !newRnfo[id];
        return newRnfo;
      });
    }
  };

  // return ----------------------------------------------------------------------
  return (
    <form>
      {list.map((item, id) => (
        <div key={`checkbox${id + 1}`}>
          <label className="rsk_chk_lb">
            <input
              className={`rsk_custom_cb_${id}`}
              type="checkbox"
              name={`checkbox${id + 1}`}
              checked={rnfo ? rnfo[id] : false}
              onChange={() => handleChange(id)}
            />
            <div className="rsk_chk_item">
              {/* <div className={`rskC rskCbox${id}`}></div> {item} */}
              {item}
            </div>
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxRsk;
