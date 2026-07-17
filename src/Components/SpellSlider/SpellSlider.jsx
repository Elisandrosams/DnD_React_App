import React from "react";
import ReactSlider from "react-slider";
import "./SpellSlider.css";

const SpellSlider = ({ range, setRange }) => {
  const formatValue = (value) => {
    const num = Number(value);
    if (num === 0) return "Cantrip";
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <>
      <div className="range-slider">
        <ReactSlider
          className="custom-slider"
          thumbClassName="custom-thumb"
          trackClassName="custom-track"
          min={0}
          max={9}
          step={1}
          value={range}
          onChange={setRange}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          pearling
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="thumb-label">{formatValue(state.valueNow)}</div>
            </div>
          )}
        />
      </div>
      <div className="pips">
        <span className="pip leftPip">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip ">|</span>
        <span className="pip rightPip">|</span>
      </div>
      <div className="levelLabel">
        Level:{" "}
        {range[0] === range[1]
          ? formatValue(range[0])
          : `${formatValue(range[0])} - ${formatValue(range[1])}`}
      </div>
    </>
  );
};

export default SpellSlider;
