import "./Dropdown.css";
import React from "react";
import useInfo from "../hooks/use-info";

const Dropdown = ({ options, handleOps, type }) => {
  const { region } = useInfo();

  // const opt = (info && info.roadNo && info.roadNo.selected) || [];
  return (
    <div className={`dropdown ${type}`}>
      <ul>
        {options.map((option) => (
          <li
            key={option[0]}
            className={`option-label ${
              option[0] === region.city || option[0] === region.county
                ? "selected"
                : ""
            }`}
            onClick={() => handleOps(option[0])}
          >
            {option[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

// const toggle = (option) => {
//   setInfo((prev) => {
//     const prevlist = prev.roadNo.selected || [];
//     const sel = prevlist.includes(option)
//       ? prevlist.filter((o) => o !== option)
//       : [...prevlist, option];
//     return {
//       ...prev,
//       roadNo: {
//         ...prev.roadNo,
//         selected: sel,
//       },
//     };
//   });
// };

//   const opt = (info && info.roadNo && info.roadNo.selected) || [];
//   return (
//     <div className="dropdown">
//       <ul>
//         {options.map((option) => (
//           <li key={option[0]}>
//             <input
//               type="checkbox"
//               id={option[0]}
//               className="option-checkbox"
//               checked={opt.includes(option[0])}
//               onChange={() => toggle(option[0])}
//             />
//             <label
//               htmlFor={option[0]}
//               className={`option-label ${
//                 opt.includes(option[0]) ? "selected" : ""
//               }`}
//             >
//               국도 {option[0]}호선({option[1]})
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
