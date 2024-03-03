import "./Dropdown.css";
import React from "react";
import useInfo from "../../hooks/use-info";

const Dropdown = ({ options, handleOps, type }) => {
  const { region } = useInfo();

  return (
    <div className={`dropdown ${type}`}>
      <ul>
        {options.map((opt) => (
          <li
            key={opt[0]}
            className={`option-label ${
              opt[0] === region.city.cd || opt[0] === region.county.cd
                ? "selected"
                : ""
            }`}
            onClick={() =>
              handleOps(opt[0], opt[1], opt[2], opt[3], opt[4], opt[5])
            }
          >
            {opt[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
