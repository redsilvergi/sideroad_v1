import "./Controls.css";
import React from "react";
import useInfo from "../hooks/use-info";
// import useQuery from "../hooks/use-query";
import { GiExpand } from "react-icons/gi";
import { BiHide } from "react-icons/bi";
// import axios from "axios";

const Controls = ({ view, setView, INITIAL_VIEW_STATE }) => {
  const {
    isFilter,
    setIsFilter,
    right,
    info,
    pick,
    // depth1,
    // length,
    // setLength,
    // region,
    // istgl,
    // setLD,
  } = useInfo();
  // const { queryF } = useQuery();

  // const handleCondition = async () => {
  //   setLD(true);
  //   const query = queryF();
  //   console.log("query from control.js:", "\n", query);
  //   const response = await axios.get(
  //     `http://localhost:4000/getLength/${query}`
  //   );
  //   setLength(Math.round(response.data / 1000));
  //   setLD(false);
  // };

  return (
    <div className={`toggle_button_div ${right ? "" : "rmv_control"}`}>
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => {
            return {
              ...prev,
              zoom: prev.zoom < 20 ? prev.zoom + 1 : prev.zoom,
            };
          })
        }
      >
        +
      </button>
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => ({
            ...prev,
            zoom: prev.zoom > 0.87 ? prev.zoom - 1 : prev.zoom,
          }))
        }
      >
        -
      </button>
      <button
        className="toggle_button"
        onClick={() => setView(INITIAL_VIEW_STATE)}
      >
        <GiExpand />
      </button>

      <button className="toggle_button" onClick={() => setIsFilter(!isFilter)}>
        <BiHide />
      </button>
      <button
        className="toggle_button"
        onClick={() =>
          console.log(
            "view:",
            view,
            "\ninfo:",
            info,
            "pick:",
            pick

            // "\ndepth1:",
            // depth1,
            // "\nlength:",
            // length,
            // "\nregion:",
            // region,
            // "\nistgl:",
            // istgl
          )
        }
      >
        VS
      </button>
      {/* <button className="toggle_button" onClick={queryF}>
        QRY
      </button> */}
      {/* <button className="toggle_button" onClick={handleCondition}>
        REQ
      </button> */}
    </div>
  );
};

export default Controls;
