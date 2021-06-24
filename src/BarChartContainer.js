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

  const xValue = (d) => d.Population;
  const yValue = (d) => d.Country;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.025);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default BarChartContainer;
