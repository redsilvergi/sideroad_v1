import "./CbxRsk.css";
import React, { useCallback, useEffect, useState, useRef } from "react";

const CbxRsk = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;

  const [checkboxes, setCheckboxes] = useState(() => {
    const initialCheckboxes = {};
    for (let i = 1; i <= list.length; i++) {
      initialCheckboxes[`checkbox${i}`] = true;
    }

    return initialCheckboxes;
  });

  const updateF = useCallback(() => {
    const sortedItems = Object.values(checkboxes).reduce((acc, val, i) => {
      if (val) {
        acc.push([...list][i]);
      }
      return acc;
    }, []);
    obj.updateInfo(sortedItems, Object.values(checkboxes));
  }, [checkboxes, obj, list]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    updateF();
  }, [updateF]);

  return (
    <form>
      {list.map((item, index) => (
        <div key={`checkbox${index + 1}`}>
          <label className="rsk_chk_lb">
            <input
              className="rsk_custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={checkboxes[`checkbox${index + 1}`]}
              onChange={handleCheckboxChange}
            />
            {index !== list.length - 1 ? (
              <div className="rsk_chk_item">
                <div className={`rskC rskCbox${index}`}></div> {item}
              </div>
            ) : (
              <div className="rsk_chk_item" style={{ marginBottom: "13px" }}>
                <div className={`rskC rskCbox${index}`}></div> {item}
              </div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxRsk;
