import "./Controls.css";
import React from "react";
import useInfo from "../hooks/use-info";
import useColor from "../hooks/use-color";
import useQuery from "../hooks/use-query";
import { GiExpand } from "react-icons/gi";
import { BiHide } from "react-icons/bi";

const Controls = ({ view, setView, INITIAL_VIEW_STATE }) => {
  const { isFilter, setIsFilter, info, depth1, length, region } = useInfo();
  const { getLength } = useColor();
  const { queryF } = useQuery();

  return (
    <div className="toggle_button_div">
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
            "info:",
            info,
            "depth1:",
            depth1,
            "length:",
            length,
            "region:",
            region
          )
        }
      >
        VS
      </button>
      <button className="toggle_button" onClick={getLength}>
        DT
      </button>
      <button className="toggle_button" onClick={queryF}>
        QRY
      </button>
    </div>
  );
};

export default Controls;
