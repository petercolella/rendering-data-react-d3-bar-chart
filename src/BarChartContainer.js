import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { useGetData } from "./hooks/useGetData";
import useWindowDimensions from "./hooks/useWindowDimensions";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Marks from "./Marks";

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
        <Marks data={data} xScale={xScale} yScale={yScale} />
      </g>
    </svg>
  );
};

export default BarChartContainer;
