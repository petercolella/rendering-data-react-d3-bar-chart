import React from "react";

const Marks = ({ data, xScale, yScale }) =>
  data.map((d) => (
    <rect
      key={d.Country}
      x={0}
      y={yScale(d.Country)}
      width={xScale(d.Population)}
      height={yScale.bandwidth()}
      fill={"black"}
    />
  ));

export default Marks;
