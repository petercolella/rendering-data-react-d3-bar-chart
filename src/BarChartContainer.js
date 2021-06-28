import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { useGetData } from "./hooks/useGetData";
import useWindowDimensions from "./hooks/useWindowDimensions";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Marks from "./Marks";
import tickFormatFunction from "./utils/formatTick";

const margin = { top: 20, right: 20, bottom: 60, left: 220 };
const xAxisLabelOffset = "1.5em";

const BarChartContainer = () => {
  const data = useGetData();
  const { height, width } = useWindowDimensions();

  if (!data) {
    return <pre>Waiting for data...</pre>;
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
    .paddingInner(0.1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={tickFormatFunction}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight}
          dy={xAxisLabelOffset}
        >
          Population
        </text>
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
