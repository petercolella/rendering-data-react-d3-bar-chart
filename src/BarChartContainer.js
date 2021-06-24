import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { useGetData } from "./hooks/useGetData";
import useWindowDimensions from "./hooks/useWindowDimensions";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";

const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const styles = {
  pre: {
    fontSize: "2rem",
  },
};

const BarChartContainer = () => {
  const data = useGetData();
  const { height, width } = useWindowDimensions();

  if (!data) {
    return <pre style={styles.pre}>Waiting for data...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])
    .paddingInner(0.025);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        {data.map((d) => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
            fill={"black"}
          />
        ))}
      </g>
    </svg>
  );
};

export default BarChartContainer;
