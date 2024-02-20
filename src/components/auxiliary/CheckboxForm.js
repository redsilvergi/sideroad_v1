import "./CheckboxForm.css";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useInfo from "../../hooks/use-info";

// import { BsDashSquareFill } from "react-icons/bs";

const CheckboxForm = ({ name, checklist }) => {
  const { rsk } = useInfo();
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;

  const [checkboxes, setCheckboxes] = useState(() => {
    const initialCheckboxes = {};
    if (rsk) {
      for (let i = 1; i <= list.length; i++) {
        initialCheckboxes[`checkbox${i}`] = true;
      }
    } else {
      for (let i = 1; i <= list.length; i++) {
        initialCheckboxes[`checkbox${i}`] = false;
      }
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
            ) : (
              <div className="chk_item_div" style={{ marginBottom: "10px" }}>
                {item}
              </div>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CheckboxForm;
