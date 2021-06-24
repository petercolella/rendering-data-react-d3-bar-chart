import React from "react";

const Marks = ({ data, xScale, xValue, yScale, yValue }) =>
  data.map((d) => (
    <rect
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
      fill={"black"}
    />
  ));

export default Marks;
