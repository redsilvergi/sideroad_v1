import "./CbxPrp.css";
import React, { useCallback, useEffect, useState, useRef } from "react";

const CbxPrp = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;

  const [checkboxes, setCheckboxes] = useState(() => {
    const initialCheckboxes = {};

    for (let i = 1; i <= list.length; i++) {
      initialCheckboxes[`checkbox${i}`] = false;
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
          <label className="prp_chk_lb">
            <input
              className="prp_custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={checkboxes[`checkbox${index + 1}`]}
              onChange={handleCheckboxChange}
            />
            {index !== list.length - 1 ? (
              <div className="prp_chk_item">{item}</div>
            ) : (
              <div className="prp_chk_item" style={{ marginBottom: "10px" }}>
                {item}
              </div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CbxPrp;
