import "./Toggle.css";
import useInfo from "../hooks/use-info";

const Toggle = ({ handleTgl }) => {
  const { istgl } = useInfo();

  return (
    <label id="tg_lbl">
      <input
        id="tg_input"
        type="checkbox"
        checked={istgl}
        onChange={handleTgl}
      />
      <span id="tg_span" />
    </label>
  );
};

export default Toggle;
