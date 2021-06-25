import React from "react";

const AxisLeft = ({ yScale }) =>
  yScale.domain().map((value) => (
    <g className="tick" key={value}>
      <text
        textAnchor="end"
        x={-3}
        y={yScale(value) + yScale.bandwidth() / 2}
        dy="0.32em"
      >
        {value}
      </text>
    </g>
  ));

export default AxisLeft;
