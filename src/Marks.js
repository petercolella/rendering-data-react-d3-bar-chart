import React from "react";

const Marks = ({ data, xScale, xValue, yScale, yValue }) =>
  data.map((d) => (
    <rect
      className="mark"
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    />
  ));

export default Marks;
