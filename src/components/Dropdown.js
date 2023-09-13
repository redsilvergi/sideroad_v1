import "./Dropdown.css";
import React from "react";
import useInfo from "../hooks/use-info";

const Dropdown = ({ options, handleOps, type }) => {
  const { region } = useInfo();

  return (
    <div className={`dropdown ${type}`}>
      <ul>
        {options.map((option) => (
          <li
            key={option[0]}
            className={`option-label ${
              option[0] === region.city.cd || option[0] === region.county.cd
                ? "selected"
                : ""
            }`}
            onClick={() => handleOps(option[0], option[1])}
          >
            {option[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
