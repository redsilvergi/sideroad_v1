import "./CheckboxForm.css";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useInfo from "../hooks/use-info";

// import { BsDashSquareFill } from "react-icons/bs";

const CheckboxForm = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;
  const { depth1 } = useInfo();

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
          <label className="chk_lb">
            <input
              className="custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={checkboxes[`checkbox${index + 1}`]}
              onChange={handleCheckboxChange}
            />
            {index !== list.length - 1 ? (
              <div className="chk_item_div">{item}</div>
            ) : depth1 === "이면도로" ? (
              <div className="chk_item_div" style={{ marginBottom: "15px" }}>
                {item}
              </div>
            ) : (
              <div className="chk_item_div">{item}</div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CheckboxForm;
