import React from "react";

const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line y2={innerHeight} />
      <text textAnchor="middle" y={innerHeight + 3} dy="0.71em">
        {tickValue}
      </text>
    </g>
  ));

export default AxisBottom;
