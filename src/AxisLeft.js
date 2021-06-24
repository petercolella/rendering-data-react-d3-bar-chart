import React from "react";

const AxisLeft = ({ yScale }) =>
  yScale.domain().map((value) => (
    <text
      key={value}
      textAnchor="end"
      x={-3}
      y={yScale(value) + yScale.bandwidth() / 2}
      dy="0.32em"
    >
      {value}
    </text>
  ));

export default AxisLeft;
